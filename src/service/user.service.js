import { UserEntity} from "../entities/User.entity.js";
import { BlackListedToken } from "../entities/BlackList.entity.js"
import {SECRET} from "../middlewares/auth.js";
import jwt from "jsonwebtoken"

export class UserService {
    async CreateUserService(name, email, password) {
        try {
            await UserEntity.sync()

            const newUser = await UserEntity.create({
                name, email, password
            })

            return newUser
        } catch (error) {
            throw error
        }
    }

    async UpdateUserService(id, name, email, password) {
        try {
            await UserEntity.sync()

            const userExists = await UserEntity.findByPk(id)

            if (!userExists) {
                return 'nao encontrado'
            }

            await UserEntity.update({ name, email, password }, {
                where: {
                    id
                }
            })

            return await UserEntity.findByPk(id)
        } catch (error) {
            throw error
        }   

    }

    async DeleteUserService(id) {
        try {
            await UserEntity.sync()

            const userExists = await UserEntity.findByPk(id)

            if (!userExists) {
                return 'nao encontrado'
            }

            await userExists.destroy()

            return 'deletado'

        } catch (error) {
            throw error
        }
    }

    async LoginUserService(name,password) {
        try {
            await UserEntity.sync()

            const userExists = await UserEntity.findAll({
                where:{
                    name,password
                }
            })

            if (!userExists) {
                return 'nao encontrado'
            }

            const token = jwt.sign({id:userExists.id, role: 'user'}, SECRET, {expiresIn: '10h'})
            return {auth: true, token}

        } catch (error) {
            console.log(error)
            throw error
        }

    }

    async LogoutUserService(token){
        try {
            await BlackListedToken.sync()
            const blacklist = await BlackListedToken.create({token})
        
            return blacklist
        }catch (error) {
            throw error 
        }
    }

}