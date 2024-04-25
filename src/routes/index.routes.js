import { Router } from "express"
import { ExemploRouter } from "./exemplo.routes.js"
import { AdmRouter } from "./adm.routes.js"

const routers = Router()

routers.use("/exemplo", ExemploRouter)
routers.use("/adm", AdmRouter)

export { routers }