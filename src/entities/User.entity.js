import { DataTypes} from "sequelize";
import { database } from "../database/connection.js";


const UserEntity = database.define("user",{
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: database.Sequelize.UUIDV4
    },
    name:{
        type: DataTypes.CHAR(200),
        unique:{
            args: true,
            msg:'O nome de usuário já existe!'
        },
        validate: {
            notEmpty:{
                msg: "nome não pode ser vazio!"
            },
            len: {
                args: [4, 15],
                msg: "nome deve ter entre 4 a 15 caracteres"
            }
        }
    },
    email:{
        type: DataTypes.CHAR(200),
        unique: true,
        validate:{
            isEmail: {
                msg: 'O campo deve ser um endereço de email válido'
              }
        }
    },
    password:{
        type: DataTypes.CHAR(10),
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