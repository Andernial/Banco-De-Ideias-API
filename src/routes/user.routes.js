import Express from "express"
import { CreateUser, DeleteUser, LoginUser, LogoutUser, UpdateUser} from "../controller/user.controller.js"
import { verifyJwt } from "../middlewares/auth.js"
import { verifyLogin } from "../middlewares/verifySession.js"


const UserRouter = Express()

UserRouter.post("/create", CreateUser)

UserRouter.patch("/update",verifyJwt('user'), UpdateUser)

UserRouter.delete("/delete",verifyJwt('user'), DeleteUser)

UserRouter.post("/login", verifyLogin,LoginUser)

UserRouter.post("/logout", verifyJwt('user'),LogoutUser)

export { UserRouter }