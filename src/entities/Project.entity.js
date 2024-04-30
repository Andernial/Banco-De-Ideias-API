import { DataTypes } from "sequelize";
import { database } from "../database/connection.js";
import { UserEntity } from "./User.entity.js";

export const ProjectEntity = database.define("project", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(50),
        validate: {

            notEmpty: {
                msg: "Titulo não pode ser vazio!"
            },

            len: {
                args: [5, 50],
                msg: "Titulo deve ter entre 5 a 50 caracteres"
            },

        }
    },
    isValid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false

    },
    text:{
        type: DataTypes.TEXT,
        validate:{
            notEmpty: {
                msg: "Texto não pode ser vazio!"
            },

            len: {
                args: [50, 1000],
                msg: "Texto deve ter entre 50 a 1000 caracteres"
            },
        }
    },
    difficultLevel:{
        type: DataTypes.INTEGER,
        validate:{
            notEmpty: {
                msg: "Titulo não pode ser vazio!"
            },

            isIn: [[1, 2, 3]]
        }
        
    },
    postColor:{
        type: DataTypes.STRING,
        defaultValue:'FFD602',
        validate:{
            isIn:{
                args:[["FFD602","02FFD1","FF02C7"]],
                msg:"Cor indisponível"
            } 
        }
    }
})

ProjectEntity.belongsTo(UserEntity,{
    constraints: true,
    foreignKey: "id_user",
})
