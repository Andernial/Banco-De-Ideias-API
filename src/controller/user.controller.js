import { UserService } from "../service/User.service.js"
import { ERRORS, SUCCESS } from "../shared/messages.js"

const instanceOfUserService = new UserService()

const CreateUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        
        const result = await instanceOfUserService.CreateUserService(name, email, password)

        res.status(201).json({ message: `user ${SUCCESS.CREATED}`, user: result })
    }catch (error) {
        next(error)
    }
}

const UpdateUser = async (req, res, next) => {
    try{
        const {name, password} = req.body
    
        const id = req.userid
        console.log(id)

        if(!name && !password) {
            return res.status(400).json('dados faltando')
        }

        const result = await instanceOfUserService.UpdateUserService(id, name, password)

        if(result === 'nao encontrado'){
            return res.status(404).json('user não encontrado')
        }

        res.status(204).json({ message: `user ${SUCCESS.UPDATED}`, user: result })
    } catch (error){
        next(error)
    }

} 

const DeleteUser = async (req,res,next) => {
    try{
        const id = req.userid
        const result = await instanceOfUserService.DeleteUserService(id)

        if(result === 'nao encontrado'){
            return res.status(404).json('user não encontrado')
        }

        res.status(200).json({message:`user ${SUCCESS.DELETED}`})
    }catch (error){
        next(error)
    }
}

const LoginUser = async (req,res,next) => {
    try {
        const {email, password} = req.body

        const result = await instanceOfUserService.LoginUserService(email, password)

        if(result === 'nao encontrado'){
            return res.status(401).json({message:`user ${ERRORS.NOT_FOUND}`})
        }

        return res.status(200).json({message:`user logado com sucesso`,result})
    }catch(error){
        next(error)
    }
}

const LogoutUser = (req, res,next) => {
    try{
        const token = req.headers['x-acess-token']

        const tokenValidation = instanceOfUserService.LogoutUserService(token)

        res.status(200).json({message: `token ${SUCCESS.UPDATED}`, BlackListedToken: tokenValidation.token})
    }catch(error){
        next(error)
    }

}

export {CreateUser, UpdateUser, DeleteUser, LoginUser, LogoutUser}