import { UserService } from "../service/user.service.js"
import { ERRORS, SUCCESS } from "../shared/messages.js"
import session from "express-session";

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

        res.status(200).json({ message: `user ${SUCCESS.UPDATED}`})
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

        req.session.jwt = result.token;
        req.session.user = { userid:result.id ,useremail: email, password };

        return res.status(200).json({message:`user logado com sucesso`,result})
    }catch(error){
        next(error)
    }
}

const LogoutUser = (req, res,next) => {
    try{
        const token = req.headers['x-acess-token']

        const tokenValidation = instanceOfUserService.LogoutUserService(token)

        req.session.destroy(err => {
            if (err) {
              return res.status(500).send('Erro ao fazer logout');
            }
          });

        res.status(200).json({message: `token ${SUCCESS.UPDATED}`, BlackListedToken: tokenValidation.token})
    }catch(error){
        next(error)
    }

}

export {CreateUser, UpdateUser, DeleteUser, LoginUser, LogoutUser}