import { ProjectEntity } from "../entities/Project.entity.js";
import { UserEntity } from "../entities/User.entity.js";



export class ProjectService{
    async CreateProjectService(id_user,title,text,difficultLevel){
        try {
            await ProjectEntity.sync()

            const newProject = await ProjectEntity.create({id_user,title,text,difficultLevel})

            return newProject


        } catch (error) {
            throw error
        }
    }

    async ShowProjectsService(){
        try {
            await ProjectEntity.sync()

            const AllProjects = await ProjectEntity.findAll({
                              
                attributes:{
                    exclude: ["id_user","isValid"]
                },

                include: [{
                    model: UserEntity, 
                    attributes: ["name"] 
                }]
            })

            if(!AllProjects.length){
                return 'nenhum projeto encontrado'
            }

            return AllProjects

        } catch (error) {
            throw error
        }
    }

    async ShowMyProjectsService(id){
        try {
            await ProjectEntity.sync()

            const AllProjects = await ProjectEntity.findAll({
                where:{
                    id_user: id
                },

                attributes:{
                    exclude: ["id_user","isValid"]
                },

                include: [{
                    model: UserEntity, 
                    attributes: ["name"] 
                }]
            })

            if(!AllProjects.length){
                return 'nenhum projeto encontrado'
            }

            return AllProjects

        } catch (error) {
            throw error
        }
    }

    async UpdateProjectService(id, id_user,title,text) {
        try {
            await ProjectEntity.sync()

            const projectExists = await ProjectEntity.findOne({
                where:{
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

            const updatedProject = await ProjectEntity.findByPk(id,{
                attributes:{
                    exclude: ["id_user"]
                }
            })


            return updatedProject
        } catch (error) {
            throw error
        }   

    }

    async DeleteMyProjectService(id,id_user){
        try {
            await ProjectEntity.sync()

            const projectExists = await ProjectEntity.findOne({
                where:{
                    id,
                    id_user
                },
               
            })

            if (!projectExists) {
                return 'nao encontrado'
            }

            projectExists.destroy()

            return 'projeto deletado'
        } catch (error) {
            throw error
        }
    }
}