import { AdmService } from "../service/Adm.service.js";
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

export { CreateAdm, UpdateADm, DeleteAdm, LoginAdm, LogoutAdm }