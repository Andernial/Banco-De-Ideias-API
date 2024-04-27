import { userService } from "../service/user.service.js"
import { ERRORS, SUCESS } from "../shared/menssage.js"

const instanceOfUserService = new userService()

const CreateUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        
        const result = await instanceOfUserService.CreateUserService(name, email, password)

        res.status(201).json({ message: `user ${SUCESS.CREATED}`, user: result })
    }catch (error) {
        next(error)
    }
}

const UpdateUser = async (req, res, next) => {
    try{
        const {id} = req.params
        const {name, password} = req.body
    
        if(!name && !password) {
            return res.status(400).json('dados faltando')
        }

        const result = await instanceOfUserService.UpdateUserService(id, name, password)

        if(result === 'nao encontrado'){
            return res.status(404).json('user não encontrado')
        }
    } catch (error){
        next(error)
    }

} 

const DeleteUser = async (req,res,next) => {
    try{
        const {id} = req.params

        const result = await instanceOfUserService.DeleteUserService(id)

        if(result === 'nao encontrado'){
            return res.status(404).json('user não encontrado')
        }

        res.status(200).json({message:`user ${SUCESS.UPDATED}`})
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

const LogoutUser = (req, res) => {
    try{
        const token = req.headers['x-acess-token']

        const tokenValidation = instanceOfUserService.LogoutUserService(token)

        res.status(200).json({message: `token ${SUCESS.UPDATED}`, BlackListedToken: tokenValidation.token})
    }catch(error){
        next(error)
    }

}

export {CreateUser, UpdateUser, DeleteUser, LoginUser, LogoutUser}