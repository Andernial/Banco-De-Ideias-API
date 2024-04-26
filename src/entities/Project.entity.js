import { DataTypes } from "sequelize";
import { database } from "../database/connection.js";

export const ProjectEntity = database.define("project", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.VARCHAR(100),
        validate: {

            notEmpty: {
                msg: "titulo não pode ser vazio!"
            },

            len: {
                args: [5, 100],
                msg: "titulo deve ter entre 5 a 100 caracteres"
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
                msg: "titulo não pode ser vazio!"
            },

            len: {
                args: [20, 1000],
                msg: "titulo deve ter entre 5 a 1000 caracteres"
            },
        }
    },
    difficultLevel:{
        type: DataTypes.INTEGER(),
        validate:{
            notEmpty: {
                msg: "titulo não pode ser vazio!"
            },

            isIn: [[1, 2, 3, 4, 5]]
        }
        
    }
})


