import { Router } from "express";
import { AuthRepositorySql } from "../../Infrastructure/Repositories/AuthRepositorySql";
import { LoginController } from "../Controllers/LoginController";
import { AuthHandler } from "../../../Middlewares/AuthHandler";

const loginRouter = Router();
const repository = new AuthRepositorySql();
const controller = new LoginController(repository);

loginRouter.post("/", controller.login.bind(controller));
loginRouter.post("/logout", controller.logOut.bind(controller));
loginRouter.get(
  "/checkUser",
  AuthHandler,
  controller.checkUser.bind(controller)
);
export default loginRouter;
