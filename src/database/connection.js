import { Sequelize } from "sequelize";
import dotenv from 'dotenv'

dotenv.config();



const dbUser= process.env.DB_USERNAME
const dbPassword = process.env.DB_PASSWORD
const databaseName = process.env.DATABASE
const dbHost = process.env.DB_HOST
const dbPort = process.env.DB_PORT
const dbDialect = process.env.DB_DIALECT




//nome provisório do banco antes da gente fazer o deploy da api
 export const database = new Sequelize(databaseName,dbUser,dbPassword, {
    host: dbHost,
    dialect: dbDialect
})


export async function testConnection(){
    try {
        await database.authenticate()
        console.log('conexão estabelecida com sucesso!')
    } catch (error) {
        console.log(`erro de conexão ${error}`)
    }
}