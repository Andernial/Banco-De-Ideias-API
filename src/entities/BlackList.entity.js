import { DataTypes } from "sequelize";
import { database } from "../database/connection.js";


export const BlackListedToken = database.define('blacklist',{
    token:{
        type: DataTypes.STRING(255),
        primaryKey: true,
        unique: true,
        allowNull: false
    },
})