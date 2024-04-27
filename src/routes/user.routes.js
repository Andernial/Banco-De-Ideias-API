import Express from "express"
import { CreateUser, DeleteUser, LoginUser, LogoutUser, UpdateUser} from "../controller/user.controller.js"
import { verifyJwt } from "../"

const UserRouter = Express()

AdmRouter.post("/createuser", CreateUser)

AdmRouter.patch("/updateuser/:id", UpdateUser)

AdmRouter.delete("/deleteuser/:id", DeleteUser)

AdmRouter.post("/loginuser", LoginUser)

AdmRouter.post("/logoutuser", LogoutUser)

export { UserRouter }