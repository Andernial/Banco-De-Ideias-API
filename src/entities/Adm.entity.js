import { DataTypes } from "sequelize";
import { database } from "../database/connection.js";



export const AdmEntity = database.define('adm',{
        id:{
            type: DataTypes.UUID,
            primaryKey: true,
           defaultValue: database.Sequelize.UUIDV4

        },
        name:{
            type: DataTypes.CHAR(30),
            unique:{
                args: true,
                msg:'O nome já existe'
            }
        },
        password:{
            type: DataTypes.CHAR(30),
        }

})