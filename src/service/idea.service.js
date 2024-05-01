import { HashtagEntity } from "../entities/Hashtags.entity.js";
import { ProjectEntity } from "../entities/Project.entity.js";
import { Project_HashtagEntity } from "../entities/Project_Hashtags.entity.js";

export class IdeaService{

    async ShowAllIdeas() {
        try{
            await HashtagEntity.sync()
            await ProjectEntity.sync()
            await Project_HashtagEntity.sync()

            const AllIdeas = await ProjectEntity.findAll({

                attributs:{
                    exclude: ['id_user']
                }

                include: [{
                    
                }]
            })
        }
    }
}