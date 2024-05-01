import Express from 'express'
import { CreateAdm, DeleteAdm, LoginAdm, LogoutAdm, UpdateADm, ShowAllProjects, ShowInvalidProjects, ProjectUpdateAdm, ProjectDeleteAdm, ShowAllUsers, UserDeleteAdm } from '../controller/adm.controller.js'
import { verifyJwt } from '../middlewares/auth.js'
// import { verifyJwt } from '../middlewares/auth.js'
const AdmRouter = Express()


AdmRouter.post('/create',CreateAdm )

AdmRouter.patch('/update/:id', UpdateADm )

AdmRouter.delete('/delete/:id',DeleteAdm )

AdmRouter.post('/login/', LoginAdm )

AdmRouter.post('/logout/', verifyJwt('adm'),LogoutAdm )

AdmRouter.get('/all-projects', ShowAllProjects)

AdmRouter.get('/invalid-projects', ShowInvalidProjects)

AdmRouter.patch('/update-project/:id', ProjectUpdateAdm)

AdmRouter.delete('/delete-project/:id', ProjectDeleteAdm)

AdmRouter.get('/all-users', ShowAllUsers)

AdmRouter.delete('/delete-user/:id', UserDeleteAdm )

export {AdmRouter}