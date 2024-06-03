import Express from 'express'
import { CreateAdm, DeleteAdm, LoginAdm, LogoutAdm, UpdateADm, ShowAllProjects, ShowInvalidProjects, ProjectUpdateAdm, ProjectDeleteAdm, ShowAllUsers, UserDeleteAdm, RegisterFirstAdm } from '../controller/adm.controller.js'
import { verifyJwt } from '../middlewares/auth.js'
// import { verifyJwt } from '../middlewares/auth.js'
const AdmRouter = Express()


AdmRouter.post('/create-first', RegisterFirstAdm)

AdmRouter.post('/create', verifyJwt('adm'),CreateAdm )

AdmRouter.patch('/update/:id', verifyJwt('adm'),UpdateADm )

AdmRouter.delete('/delete/:id',verifyJwt('adm'),DeleteAdm )

AdmRouter.post('/login/', LoginAdm )

AdmRouter.post('/logout/', verifyJwt('adm'),LogoutAdm )

AdmRouter.get('/all-projects', verifyJwt('adm'),ShowAllProjects)

AdmRouter.get('/invalid-projects',verifyJwt('adm'), ShowInvalidProjects)

AdmRouter.get('/all-adms',verifyJwt('adm'), ShowAllAdm)

AdmRouter.patch('/update-project/:id', verifyJwt('adm'),ProjectUpdateAdm)

AdmRouter.delete('/delete-project/:id', verifyJwt('adm'),ProjectDeleteAdm)

AdmRouter.get('/all-users', verifyJwt('adm'),ShowAllUsers)

AdmRouter.delete('/delete-user/:id', verifyJwt('adm'),UserDeleteAdm )

export {AdmRouter}