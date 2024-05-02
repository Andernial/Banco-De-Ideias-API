import { DataTypes} from "sequelize";
import { database } from "../database/connection.js";


const UserEntity = database.define("user",{
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: database.Sequelize.UUIDV4
    },
    name:{
        type: DataTypes.STRING(30),
        
        unique:{
            args: true,
            msg:'Campo já existe!'
        },
       
        validate: {
            notEmpty:{
                msg: "Campo não pode ser vazio!"
            },

            len: {
                args: [4, 15],
                msg: "Campo deve ter entre 4 a 15 caracteres"
            }
        }
    },
    email:{
        type: DataTypes.STRING(200),
        unique:{
            args:true,
            msg:'Campo já existe'
        },
        validate:{
            isEmail: {
                msg: 'Campo deve ser um endereço de email válido'
              }
        }
    },
    password:{
        type: DataTypes.STRING(10),
        unique:false,
        validate: {
            notEmpty:{
                msg: "Campo não pode ser vazio"
            },
            len: {
                args: [6, 10],
                msg: "Campo deve ter entre 6 a 10 caracteres"
            }
        }
    },
    ideasNumber:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
})


export {UserEntity}