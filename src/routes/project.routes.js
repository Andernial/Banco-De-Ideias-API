import  Express from "express";
import { CreateProject, ShowMyProjects, UpdateMyProject,ShowValidProjects, DeleteMyProject } from "../controller/project.controller.js";
import { verifyJwt } from "../middlewares/auth.js";


const PostRouter = Express()

PostRouter.post("/create", verifyJwt('user'),CreateProject )
PostRouter.get("/show-valid", ShowValidProjects )
PostRouter.get("/show-my", verifyJwt('user'),ShowMyProjects )
PostRouter.patch("/update-my/:id", verifyJwt('user'),UpdateMyProject )
PostRouter.delete("/delete-my/:id", verifyJwt('user'), DeleteMyProject)


export { PostRouter }