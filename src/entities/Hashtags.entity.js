import { DataTypes, Sequelize } from "sequelize";
import { database } from "../database/connection.js";


export const HashtagEntity = database.define('hashtag',{
    hashtag:{
        type: DataTypes.STRING(20),
        primaryKey: true,
        unique: true,
        allowNull: false,
        validate: {
            isHashtag: function(value) {
              // Verifica se o valor começa com '#'
              if (!value.startsWith('#')) {
                throw new Sequelize.ValidationError('Campo deve começar com #');
              }
            },

            noSpaces: function(value){
                if(/\s/.test(value)){
                    throw new Sequelize.ValidationError('Campo não pode conter espaços')
                  }
            },

            len: {
              args: [4, 20],
              msg: 'Campo deve ter de 4 a 20 caracteres'
            }
          }
       
    },
})