import { UserEntity } from "../entities/User.entity.js";
import { BlackListedToken } from "../entities/BlackList.entity.js"
import { SECRET } from "../middlewares/auth.js";
import jwt from "jsonwebtoken"
import { ProjectEntity } from "../entities/Project.entity.js";

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

    async UpdateUserService(id, name, password) {
        try {
            await UserEntity.sync()

            const userExists = await UserEntity.findByPk(id)

            if (!userExists) {
                return 'nao encontrado'
            }

            await UserEntity.update({ name, password }, {
                where: {
                    id
                },

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
            const userPosts = await ProjectEntity.findAll({
                where: {
                    id_user: id
                }
            })

            if (userPosts.length) {
                userPosts.forEach(async post => {
                    await post.destroy()
                })
            }

            await userExists.destroy()

            return 'deletado'

        } catch (error) {
            throw error
        }
    }

    async LoginUserService(email, password) {
        try {
            await UserEntity.sync()

            const userExists = await UserEntity.findOne({
                where: {
                    email, password
                }
            })

            if (!userExists) {
                return 'nao encontrado'
            }

            const token = jwt.sign({ userid: userExists.id, role: 'user' }, SECRET, { expiresIn: '10h' })

            const object = { token: token, name: userExists.name, email: userExists.email, id: userExists.id, auth: true }
            return object

        } catch (error) {
            console.log(error)
            throw error
        }

    }

    async LogoutUserService(token) {
        try {
            await BlackListedToken.sync()
            const blacklist = await BlackListedToken.create({ token })

            return blacklist
        } catch (error) {
            throw error
        }
    }

}