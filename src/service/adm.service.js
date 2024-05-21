import { AdmEntity } from "../entities/Adm.entity.js"
import { BlackListedToken } from "../entities/BlackList.entity.js";
import { SECRET } from "../middlewares/auth.js";
import jwt from 'jsonwebtoken';
import { HashtagEntity } from "../entities/Hashtags.entity.js";
import { ProjectEntity } from "../entities/Project.entity.js";
import { Project_HashtagEntity } from "../entities/Project_Hashtags.entity.js";
import { UserEntity } from "../entities/User.entity.js";

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

            const admExists = await AdmEntity.findOne({
                where: {
                    name, password
                }
            })

            if (!admExists) {
                return 'nao encontrado'
            }

            const token = jwt.sign({ userid: admExists.id, role: 'adm' }, SECRET, { expiresIn: "10h" })
            const object = { token: token, name: admExists.name, id: admExists.id, role:'adm', auth: true }
            return object

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async LogoutAdmService(token) {
        try {
            await BlackListedToken.sync()
            const blacklist = await BlackListedToken.create({ token })

            return blacklist
        } catch (error) {
            throw error
        }
    }

    async RegisterFirstAdmService(name, password) {
        try {
            await AdmEntity.sync()

            const allAdm = await AdmEntity.findAll()

            console.log("adms aqui",allAdm)


            if (allAdm.length) {
                return null
            }

            const newAdm = await AdmEntity.create({
                name, password
            })

            return newAdm
        } catch (error) {
            throw error
        }
    }

    async ShowAllProjectsService(limit, offset) {
        try {
            await UserEntity.sync()
            await HashtagEntity.sync()
            await ProjectEntity.sync()
            await Project_HashtagEntity.sync()

            const AllProjects = await ProjectEntity.findAll({

                offset: offset,
                limit: limit,
                order: [['updatedAt', 'DESC']],

                include: [{
                    model: UserEntity,
                    attributes: ["name"]
                },
                {
                    model: HashtagEntity,
                    through: {
                        model: Project_HashtagEntity,
                    },
                    as: 'hashtags',
                    attributes: ["hashtag"],
                    through: { attributes: [] }
                }]


            })

            const count = await AllProjects.count()


            return {projects: AllProjects, number: count}

        } catch (error) {
            throw error
        }
    }

    async ShowInvalidProjectsService(limit, offset) {
        try {
            await UserEntity.sync()
            await HashtagEntity.sync()
            await ProjectEntity.sync()
            await Project_HashtagEntity.sync()

            const InvalidProjects = await ProjectEntity.findAll({

                where: {
                    isValid: false
                },

                offset: offset,
                limit: limit,
                order: [['updatedAt', 'DESC']],

                include: [{
                    model: UserEntity,
                    attributes: ["name"]
                },
                {
                    model: HashtagEntity,
                    through: {
                        model: Project_HashtagEntity,
                    },
                    as: 'hashtags',
                    attributes: ["hashtag"],
                    through: { attributes: [] }
                }]


            })

            const count = await InvalidProjects.count()

            return {projects: InvalidProjects, number: count}

        } catch (error) {
            throw error
        }
    }

    async ProjectUpdateAdmService(id, title, text, difficultLevel, isValid) {

        try {
            await UserEntity.sync()
            await HashtagEntity.sync()
            await ProjectEntity.sync()
            await Project_HashtagEntity.sync()

            const project = await ProjectEntity.findByPk(id)

            if (!project) {
                return null
            }

            const id_user = project.dataValues.id_user

            const user = await UserEntity.findByPk(id_user)

            await project.update({
                title, text, difficultLevel, isValid
            })

            if (isValid === true) {
               
            const numberOfUserValidProjecst = await ProjectEntity.count({
                where:{
                    isValid: true,
                    id_user: id_user
                }
            })

            await user.update({ideasNumber: numberOfUserValidProjecst})

            }



            return await ProjectEntity.findByPk(id)

        } catch (error) {
            throw error
        }

    }

    async ProjectDeleteAdmService(id,) {

        try {
            await UserEntity.sync()
            await ProjectEntity.sync()


            const project = await ProjectEntity.findByPk(id)



            if (!project) {
                return null
            }

            const id_user = project.dataValues.id_user

            const user = await UserEntity.findByPk(id_user)

            if(project.dataValues.isValid === true){
                await user.decrement('ideasNumber')
            }

            await project.destroy()



            return 'deleted'

        } catch (error) {
            throw error
        }

    }

    async ShowAllUsersService() {
        try {
            await UserEntity.sync()


            const AllUsers = await UserEntity.findAll()




            return AllUsers

        } catch (error) {
            throw error
        }
    }

    async UserDeleteAdmService(id) {

        try {
            await UserEntity.sync()
            await ProjectEntity.sync()


            const user = await UserEntity.findByPk(id)


            if (!user) {
                return null
            }

            await ProjectEntity.destroy({
                where: {
                    id_user: id
                }
            })

            await user.destroy()

            return 'deleted'

        } catch (error) {
            throw error
        }

    }


}