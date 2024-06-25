import { sessionStore } from "../entities/Sessions.js";
import session from 'express-session';
const sessionMiddleware = session({
    secret: 'seu segredo',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  });


export { sessionMiddleware }