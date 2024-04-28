import Express from 'express'
import { CreateAdm, DeleteAdm, LoginAdm, LogoutAdm, UpdateADm } from '../controller/adm.controller.js'
import { verifyJwt } from '../middlewares/auth.js'
// import { verifyJwt } from '../middlewares/auth.js'
const AdmRouter = Express()


AdmRouter.post('/create',CreateAdm )

AdmRouter.patch('/update/:id', UpdateADm )

AdmRouter.delete('/delete/:id',DeleteAdm )

AdmRouter.post('/login/', LoginAdm )

AdmRouter.post('/logout/', verifyJwt('adm'),LogoutAdm )


export {AdmRouter}