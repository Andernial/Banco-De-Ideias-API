import { Router } from "express"
import { AdmRouter } from "./adm.routes.js"
import { UserRouter } from "./user.routes.js"
import { PostRouter } from "./project.routes.js"

const routers = Router()

routers.use("/adm", AdmRouter)
routers.use("/user", UserRouter)
routers.use("/project", PostRouter)

export { routers }