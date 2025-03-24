import { Router } from "express";
import { UserSqlRepository } from "../../Infrastructure/Repositories/UserSqlRepository";
import { UserController } from "../Controllers/UserController";

const repositoryInstance = new UserSqlRepository()
const controller = new UserController(repositoryInstance)
const userRouter = Router()

userRouter.get("/",controller.getAll.bind(controller))
userRouter.get("/:id",controller.getById.bind(controller))
userRouter.post("/",controller.create.bind(controller))
userRouter.put("/:id",controller.update.bind(controller))
userRouter.delete("/:id",controller.delete.bind(controller))

export default userRouter