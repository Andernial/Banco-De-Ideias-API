import { Sequelize } from "sequelize";
                                //nome provisório do banco antes da gente fazer o deploy da api
 export const database = new Sequelize('teste3','root','', {
    host: 'localhost',
    dialect: 'mysql'
})


export async function testConnection(){
    try {
        await database.authenticate()
        console.log('conexão estabelecida com sucesso!')
    } catch (error) {
        console.log(`erro de conexão ${error}`)
    }
}