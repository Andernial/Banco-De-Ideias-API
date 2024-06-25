import session from 'express-session';
import connectSessionSequelize from 'connect-session-sequelize'
import { database as sequelize } from "../database/connection.js";


const SequelizeStore = connectSessionSequelize(session.Store)


const sessionStore = new SequelizeStore({
    db: sequelize
})

sessionStore.sync()

export {sessionStore}