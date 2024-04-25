import { DataTypes } from "sequelize";
import { database } from "../database/connection.js";


const UserEntity = database.define("user",{
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.VARCHAR(200),
        unique: true,
        validate: {
            notEmpty:{
                msg: "nome não pode ser vazio!"
            },
            len: {
                args: [4, 9],
                msg: "nome deve ter entre 4 a 9 caracteres"
            }
        }
    },
    email:{
        type: DataTypes.VARCHAR(200),
        unique: true,
        validate:{
            isEmail: {
                msg: 'O campo deve ser um endereço de email válido'
              }
        }
    },
    password:{
        type: DataTypes.VARCHAR(10),
        unique: true,
        validate: {
            notEmpty:{
                msg: "Precisa ter uma senha"
            },
            len: {
                args: [6, 10],
                msg: "A senha deve ter entre 6 a 10 caracteres"
            }
        }
    },
    ideasNumber:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
})


export {UserEntity}