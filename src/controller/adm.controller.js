import { AdmService } from "../service/adm.service.js";
import { ERRORS, SUCCESS } from "../shared/messages.js";



const instanceOfAdmService = new AdmService()


const CreateAdm = async (req,res,next) =>{
    try {
        const {name,password} = req.body

        const result = await instanceOfAdmService.CreateAdmService(name,password)
    
        res.status(201).json({message:`adm ${SUCCESS.CREATED}`, adm: result})
    } catch (error) {
        next(error)
    }
        
   
   
}

const UpdateADm = async (req,res,next)=>{
    try {
        const {id} = req.params
        const {name,password} = req.body

        if(!name && !password){
           return res.status(400).json('dados faltando!')
        }

        const result = await instanceOfAdmService.UpdateADmService(id,name,password)

        if(result === 'nao encontrado'){
            return res.status(404).json('adm não encontrado')
        }

        res.status(200).json({message:`adm atualizado com sucesso !`, updated: result})
    } catch (error) {
        next(error)
    }
}

const DeleteAdm = async (req,res,next)=>{
    try{
        const {id} = req.params

        const result = await instanceOfAdmService.DeleteAdmService(id)

        if(result === 'nao encontrado'){
            return res.status(404).json({message:'adm não encontrado'})
        }

        res.status(200).json({message:`adm ${SUCCESS.UPDATED}`})
    } catch (error){
        next(error)
    }
}

const LoginAdm = async (req,res,next)=>{
    try {
        const {name,password} = req.body

        const result = await instanceOfAdmService.LoginAdmService(name,password)

        if(result === 'nao encontrado'){
            return res.status(401).json({message:`ADM ${ERRORS.NOT_FOUND}`})
        }

        return res.status(200).json({message:`adm logado com sucesso`,result})

    } catch (error) {
        next(error)
    }
}

const LogoutAdm = async (req,res,next)=>{
    try {
        const token = req.headers['x-acess-token']


        const tokenValidation = await instanceOfAdmService.LogoutAdmService(token)

        res
            .status(201)
            .json({ message: `token ${SUCCESS.UPDATED}`, BlackListedToken: tokenValidation })
    } catch (error) {
        next(error)
    }
}

const RegisterFirstAdm = async (req, res) => {
    try {
        const { name, password } = req.body
        const result = await instanceOfAdmService.RegisterFirstAdmService(name, password)

        if (!result) {
            return res.status(401).json({ message: 'BANCO JÀ CONTEM ADMS!' })
        }

        res.status(201).json({ message: `adm ${SUCCESS.CREATED}`, adm: result })
    } catch (error) {
        res.status(400).json(error.message)
    }
}


const ShowAllProjects = async (req, res, next) => {
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
        const {projects, number} = await instanceOfAdmService.ShowAllProjectsService(limit,offset)
        const total = number
        if (!projects.length) {
            return res.status(404).json({message:`projetos ${ERRORS.NOT_FOUND}`})
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
            projects
        })
    } catch (error) {
      next(error)  
    }

}

const ShowInvalidProjects = async (req, res, next) => {
    try{

        let{ limit, offset } = req.query

        limit = Number(limit)
        offset = Number(offset)
    
        if(!limit){
            limit = 5
        }

        if(!offset){
            offset = 0
        }

        const {projects,number} = await instanceOfAdmService.ShowInvalidProjectsService(limit,offset)
        const total = number

        if(!projects.length){
            return res.status(404).json({message:`projetos não validados ${ERRORS.NOT_FOUND}`})
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
            projects
        })
    }catch(error){
        next(error)
    }
}

const ProjectUpdateAdm = async (req, res, next) => {
    try {
        const {id} = req.params
        const {title, text, difficultLevel, isValid, hashtags} = req.body

        if(!title && !text && !difficultLevel && !isValid && !hashtags){
            return  res.status(400).json({message:'Dados faltando'})
        }

        if(hashtags){
            await instanceOfAdmService.CheckHashtagService(hashtags)
        }
     
        const result = await  instanceOfAdmService.ProjectUpdateAdmService(id, title, text, difficultLevel,isValid,hashtags)

        if(!result){
            return res.status(404).json({message:`projeto ${ERRORS.NOT_FOUND}`})
        }

        res.status(200).json({message:`projeto ${SUCCESS.UPDATED}`,project: result})
        
    } catch (error) {
        next(error)
    }
}

const ProjectDeleteAdm = async (req, res, next) =>{
    try {
        const {id} = req.params

        const result = await instanceOfAdmService.ProjectDeleteAdmService(id);

        if(!result){
            return res.status(404).json({message:`projeto ${ERRORS.NOT_FOUND}`})
        }

        res.status(200).json({message:`projeto ${SUCCESS.DELETED}`})

    } catch (error) {
        next(error)
    }
}

const ShowAllUsers = async (req, res, next) => {
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

        const {users,number} = await instanceOfAdmService.ShowAllUsersService(limit,offset)
        const total = number
        if (!users.length) {
            return res.status(404).json({message:`users ${ERRORS.NOT_FOUND}`})
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
            users
        })
    } catch (error) {
      next(error)  
    }

}

const ShowAllAdm = async (req, res, next) => {
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

        const {users,number} = await instanceOfAdmService.ShowAllAdmService(limit,offset)
        const total = number
        if (!users.length) {
            return res.status(404).json({message:`Adms ${ERRORS.NOT_FOUND}`})
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
            users
        })
    } catch (error) {
      next(error)  
    }

}

const UserDeleteAdm = async (req, res, next) =>{
    try {
        const {id} = req.params

        const result = await instanceOfAdmService.UserDeleteAdmService(id);

        if(!result){
            return res.status(404).json({message:`user ${ERRORS.NOT_FOUND}`})
        }

        res.status(200).json({message:`user ${SUCCESS.DELETED}`})

    } catch (error) {
        next(error)
    }
}
export { CreateAdm, UpdateADm, DeleteAdm, LoginAdm, LogoutAdm, ShowAllProjects, ShowInvalidProjects, ProjectUpdateAdm, ProjectDeleteAdm, ShowAllUsers, UserDeleteAdm, RegisterFirstAdm, ShowAllAdm  }