import { ProjectService } from "../service/project.service.js";
import { SUCCESS,ERRORS } from "../shared/messages.js";



const instanceOfProjectService = new ProjectService()


const CreateProject = async (req,res,next) =>{
    try {
        const { title, text, difficultLevel, hashtags, postColor } = req.body
        const id_user = req.userid

       
        await instanceOfProjectService.CheckHashtagService(hashtags)

        const result = await instanceOfProjectService.CreateProjectService(id_user,title,text,difficultLevel,hashtags,postColor)
        
        console.log(result)


        res.status(201).json({ message: `Project ${SUCCESS.CREATED}`, project: result })

    } catch (error) {
        next(error)
    }
}

   
const ShowValidProjects = async (req,res,next) =>{
    try {
        let{ limit, offset } = req.query

        limit = Number(limit)
        offset = Number(offset)
    
        if(!limit){
            limit = 5
        }

        if(!offset){
            offset = 0
        }

        const result = await instanceOfProjectService.ShowProjectsService(limit,offset)
        const total = await instanceOfProjectService.CountProjectsNumber()

        if(result === 'nenhum projeto encontrado'){
            return res.status(404).json({message: `project ${ERRORS.NOT_FOUND}`})
        }

        const currentUrl = `${req.baseUrl}${req.path}`;
        
        const next = offset + limit;
        const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

        const previous = offset - limit < 0 ? null : offset - limit;
        const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

        
        res.status(201).json({
            totalOfProjects: total,
            nextUrl,
            previousUrl,
            limit,
            offset,
            projects: result
        })

    } catch (error) {
        next(error)
    }
}

const ShowMyProjects = async (req,res,next) =>{
    try {

        let{ limit, offset } = req.query

        limit = Number(limit)
        offset = Number(offset)
    
        if(!limit){
            limit = 5
        }

        if(!offset){
            offset = 0
        }

        const id = req.userid
        const result = await instanceOfProjectService.ShowMyProjectsService(id,limit,offset)
        const total = await instanceOfProjectService.CountProjectsNumber()

        if(result === 'nenhum projeto encontrado'){
            return res.status(404).json({message: `project ${ERRORS.NOT_FOUND}`})
        }

        
        const currentUrl = `${req.baseUrl}${req.path}`;
        
        const next = offset + limit;
        const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

        const previous = offset - limit < 0 ? null : offset - limit;
        const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;



        res.status(200).json({
                totalOfProjects: total,
                nextUrl,
                previousUrl,
                limit,
                offset,
                projects: result
            })

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