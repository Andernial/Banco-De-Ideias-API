import { ProjectService } from "../service/Project.service.js";
import { SUCCESS,ERRORS } from "../shared/messages.js";



const instanceOfProjectService = new ProjectService()


const CreateProject = async (req,res,next) =>{
    try {
        const { title, text, difficultLevel, hashtags } = req.body
        const id_user = req.userid

        console.log(hashtags)

        await instanceOfProjectService.CheckHashtagService(hashtags)

        const result = await instanceOfProjectService.CreateProjectService(id_user,title,text,difficultLevel,hashtags)
        
        console.log(result)


        res.status(201).json({ message: `Project ${SUCCESS.CREATED}`, project: result })

    } catch (error) {
        next(error)
    }
}

   
const ShowValidProjects = async (req,res,next) =>{
    try {

        const result = await instanceOfProjectService.ShowProjectsService()

        if(result === 'nenhum projeto encontrado'){
            return res.status(404).json({message: `project ${ERRORS.NOT_FOUND}`})
        }

        

        res.status(201).json({projects: result})

    } catch (error) {
        next(error)
    }
}

const ShowMyProjects = async (req,res,next) =>{
    try {

        const id = req.userid
        const result = await instanceOfProjectService.ShowMyProjectsService(id)

        if(result === 'nenhum projeto encontrado'){
            return res.status(404).json({message: `project ${ERRORS.NOT_FOUND}`})
        }



        res.status(200).json({projects: result})

    } catch (error) {
        next(error)
    }
}


const UpdateMyProject = async (req, res, next) => {
    try{
        const { id } = req.params
        const {title, text} = req.body
        const id_user = req.userid

        if(!title && !text) {
            return res.status(400).json('dados faltando')
        }

        const result = await instanceOfProjectService.UpdateProjectService(id,id_user, title, text)

        if(result === 'nao encontrado'){
            return res.status(404).json({message:`post ${ERRORS.NOT_FOUND}`})
        }

        res.status(200).json({ message: `Post ${SUCCESS.UPDATED}`, post: result })

    } catch (error){
        next(error)
    }

} 

const DeleteMyProject = async (req,res,next) =>{
    try {
        const { id } = req.params
        const id_user = req.userid

        const result = await instanceOfProjectService.DeleteMyProjectService(id,id_user)

        if(result === 'nao encontrado'){
            return res.status(404).json({message:`post ${ERRORS.NOT_FOUND}`})
        }

        res.status(200).json({ message: `Post ${SUCCESS.DELETED}`})

    } catch (error) {
        next(error)
    }
}





export { CreateProject, ShowValidProjects, ShowMyProjects, UpdateMyProject, DeleteMyProject }