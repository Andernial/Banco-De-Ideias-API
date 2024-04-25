import { AdmEntity } from "../entities/Adm.entity.js"
import { BlackListedToken } from "../entities/BlackList.entity.js";
import { SECRET } from "../middlewares/auth.js";
import jwt from 'jsonwebtoken';

export class AdmService {
    async CreateAdmService(name, password) {
        try {
            await AdmEntity.sync()

            const newADM = await AdmEntity.create({
                name, password
            })

            return newADM
        } catch (error) {
            throw error
        }
    }
    async UpdateADmService(id, name, password) {
        try {
            await AdmEntity.sync()

            const admExists = await AdmEntity.findByPk(id)

            if (!admExists) {
                return 'nao encontrado'
            }

            await AdmEntity.update({ name, password }, {
                where: {
                    id
                }
            })

            return await AdmEntity.findByPk(id)
        } catch (error) {
            throw error
        }
    }
    async DeleteAdmService(id) {
        try {
            await AdmEntity.sync()

            const admExists = await AdmEntity.findByPk(id)

            if (!admExists) {
                return 'nao encontrado'
            }

            await admExists.destroy()

            return 'deletado'

        } catch (error) {
            throw error
        }
    }

    async LoginAdmService(name, password) {
        try {
            await AdmEntity.sync()

            const admExists = await AdmEntity.findAll({
                where:{
                    name,password
                }
            })

            if (!admExists) {
                return 'nao encontrado'
            }

            const token = jwt.sign({userid : admExists.id, role: 'adm'}, SECRET, { expiresIn: "10h"  })
            return  {auth : true, token}

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async LogoutAdmService(token){
        try {
            await BlackListedToken.sync()
            const blacklist = await BlackListedToken.create({token})
    
            return blacklist
        } catch (error) {
            throw error 
        }
    }

}