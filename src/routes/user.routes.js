import Express from "express"
import { CreateUser, DeleteUser, LoginUser, LogoutUser, UpdateUser} from "../controller/user.controller.js"
import { verifyJwt } from "../"

const UserRouter = Express()

AdmRouter.post("/create", CreateUser)

AdmRouter.patch("/update/:id", UpdateUser)

AdmRouter.delete("/delete/:id", DeleteUser)

AdmRouter.post("/login", LoginUser)

AdmRouter.post("/logout", LogoutUser)

export { UserRouter }