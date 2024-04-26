import { DataTypes } from "sequelize";
import { database } from "../database/connection.js";
import { ProjectEntity } from "./Project.entity.js";
import { HashtagEntity } from "./Hashtags.entity.js";


export const Project_HashtagEntity = database.define('project_hashtag', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
})

ProjectEntity.belongsToMany(HashtagEntity, {through: Project_HashtagEntity})
HashtagEntity.belongsToMany(ProjectEntity, {through: Project_HashtagEntity})