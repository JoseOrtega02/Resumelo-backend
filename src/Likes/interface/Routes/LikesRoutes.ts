import { Router } from "express";
import { LikesController } from "../Controller/LikesController";
import { LikesRepositorySQL } from "../../infrastructure/Repositories/LikesRepositorySQL";
import { AuthHandler } from "../../../Middlewares/AuthHandler";
const repo = new LikesRepositorySQL();
const controller = new LikesController(repo);
const likesRouter = Router();

likesRouter.post("/", AuthHandler, controller.setLike.bind(controller));
likesRouter.get("/:summaryId&:userId", controller.checkLike.bind(controller));
likesRouter.delete(
  "/:summaryId&:userId",
  AuthHandler,
  controller.removeLike.bind(controller)
);

export default likesRouter;
