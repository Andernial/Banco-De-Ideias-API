import { DataTypes } from "sequelize";
import { database } from "../database/connection.js";

export const HashtagEntity = database.define('hashtag',{
    hashtag:{
        type: DataTypes.STRING(20),
        primaryKey: true,
        unique: true,
        allowNull: false
    },
})