import { DataTypes } from "sequelize";
import { database } from "../database/connection.js";

export const HashtagEntity = database.define('hashtag',{
    hashtag:{
        type: DataTypes.STRING(20),
        primaryKey: true,
        unique: true,
        allowNull: false,
        validate:{
        //     customValidation: function(value) {
        //         if (!/^#/.test(value)) {
        //             throw new SequelizeError.ValidationError('A hashtag deve começar com uma #', [
        //                 new SequelizeError.ValidationErrorItem(
        //                     'A hashtag deve começar com uma #',
        //                     'Validation error',
        //                     'hashtag',
        //                     value
        //                 )
        //             ]);
        //     }
        // },
        len: {
            args:[4,20],
            msg: 'Campo deve ter de 4 a 20 caracteres'
          }
        }
    },
})