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

ProjectEntity.belongsToMany(HashtagEntity, {
    through: {
        model: Project_HashtagEntity,
        foreignKey: 'id_project',
        otherKey: 'id_hashtag'
    }
});

HashtagEntity.belongsToMany(ProjectEntity, {
    through: {
        model: Project_HashtagEntity,
        foreignKey: 'id_hashtag',
        otherKey: 'id_project'
    }
});