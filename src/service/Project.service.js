import { HashtagEntity } from "../entities/Hashtags.entity.js";
import { ProjectEntity } from "../entities/Project.entity.js";
import { Project_HashtagEntity } from "../entities/Project_Hashtags.entity.js";
import { UserEntity } from "../entities/User.entity.js";



export class ProjectService {
    async CreateProjectService(id_user, title, text, difficultLevel, hashtags, postColor) {
        try {
            await UserEntity.sync()
            await ProjectEntity.sync()
            await Project_HashtagEntity.sync()

            const newProject = await ProjectEntity.create({ id_user, title, text, difficultLevel, postColor })

            const id_project = newProject.dataValues.id

            if (newProject) {


                await Promise.all(hashtags.map(async hashtag => {


                    let currentHashtag = await HashtagEntity.findOne({
                        where: {
                            hashtag
                        }
                    })

                    let id_hashtag = await currentHashtag.dataValues.hashtag

                    console.log(id_hashtag)

                    await Project_HashtagEntity.create({
                        projectId: id_project,
                        hashtagHashtag: id_hashtag
                    })

                }))

            }

            const completeNewProject = await ProjectEntity.findOne({
                where: {
                    id: id_project
                },

                attributes: {
                    exclude: ["id_user", "isValid"]
                },

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


            console.log(completeNewProject)

            return completeNewProject


        } catch (error) {
            console.log("erro aqui", error)
            throw error
        }
    }

    async CheckHashtagService(hashtags) {
        try {
            await HashtagEntity.sync()

            await Promise.all(hashtags.map(async hashtag => {

                const hashtagExists = await HashtagEntity.findOne({
                    where: {
                        hashtag
                    }

                })

                if (!hashtagExists) {
                    await HashtagEntity.create({ hashtag })
                }

            }))

        } catch (error) {
            console.log("deu erro aqui", error)
            throw error
        }
    }

    async CountProjectsNumber() {
        try {
            await ProjectEntity.sync()

            const projectNumber = await ProjectEntity.count()

            return projectNumber

        } catch (error) {
            next(error)
        }
    }

    async ShowProjectsService(limit, offset) {
        try {
            await ProjectEntity.sync()


            const AllProjects = await ProjectEntity.findAll({

                where: {
                    isValid: true
                },

                offset: offset,
                limit: limit,
                order: [['id', 'DESC']],

                attributes: {
                    exclude: ["id_user", "isValid"]
                },

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
                }],


            })

            if (!AllProjects.length) {
                return 'nenhum projeto encontrado'
            }

            return AllProjects

        } catch (error) {
            throw error
        }
    }

    async ShowMyProjectsService(id, limit, offset) {
        try {
            await ProjectEntity.sync()

            const AllProjects = await ProjectEntity.findAll({

                where: {
                    id_user: id,
                    isValid: true
                },

                offset: offset,
                limit: limit,
                order: [['id', 'DESC']],


                attributes: {
                    exclude: ["id_user", "isValid"]
                },

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

            if (!AllProjects.length) {
                return 'nenhum projeto encontrado'
            }

            const count = await ProjectEntity.count({
                where: {
                    id_user: id,
                    isValid: true
                }
            })

            return { projects: AllProjects, number: count }

        } catch (error) {
            throw error
        }
    }

    async ShowMyStandbyProjectssService(id, limit, offset) {
        try {
            const rows = await ProjectEntity.findAll({
                where: {
                    id_user: id,
                    isValid: false
                },

                offset: offset,
                limit: limit,
                order: [['id', 'DESC']],


                attributes: {
                    exclude: ["id_user", "isValid"]
                },

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


            if (!rows.length) {
                return 'nenhum projeto encontrado'
            }

            const count = await ProjectEntity.count({
                where: {
                    isValid: false
                }
            })

            return { projects: rows, number: count }

        } catch (error) {
            throw error
        }
    }

    async UpdateProjectService(id, id_user, title, text) {
        try {
            await ProjectEntity.sync()

            const projectExists = await ProjectEntity.findOne({
                where: {
                    id,
                    id_user
                },

            })


            if (!projectExists) {
                return 'nao encontrado'
            }

            await ProjectEntity.update({ title, text }, {
                where: {
                    id
                },

            })

            const updatedProject = await ProjectEntity.findByPk(id, {
                attributes: {
                    exclude: ["id_user"]
                }
            })


            return updatedProject
        } catch (error) {
            throw error
        }

    }

    async DeleteMyProjectService(id, id_user) {
        try {
            await ProjectEntity.sync()
            await UserEntity.sync()

            const user = await UserEntity.findByPk(id_user)
            const projectExists = await ProjectEntity.findOne({
                where: {
                    id,
                    id_user
                },

            })


            if (!projectExists) {
                return 'nao encontrado'
            }
            
            if(projectExists.dataValues.isValid === true){
                await user.decrement('ideasNumber')
            }
          

            await Project_HashtagEntity.destroy({
                where: {
                    projectId: id
                }
            })

            projectExists.destroy()

            return 'projeto deletado'
        } catch (error) {
            throw error
        }
    }
}