import { DataTypes } from "sequelize";
import { database } from "../database/connection.js";

const ExemploEntity = database.define("exemplo",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.CHAR(200),
        unique: true
    }
})


export {ExemploEntity}