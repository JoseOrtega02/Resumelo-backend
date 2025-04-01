import { Router } from "express";
import { AuthRepositorySql } from "../../Infrastructure/Repositories/AuthRepositorySql";
import { LoginController } from "../Controllers/LoginController";

const loginRouter = Router();
const repository = new AuthRepositorySql();
const controller = new LoginController(repository);

loginRouter.post("/", controller.login.bind(controller));

export default loginRouter;
