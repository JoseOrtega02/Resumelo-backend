import { Router } from "express";
import { LikesController } from "../Controller/LikesController";
import { LikesRepositorySQL } from "../../infrastructure/Repositories/LikesRepositorySQL";
const repo = new LikesRepositorySQL();
const controller = new LikesController(repo);
const likesRouter = Router();

likesRouter.post("/", controller.setLike.bind(controller));
likesRouter.delete("/", controller.removeLike.bind(controller));

export default likesRouter;
