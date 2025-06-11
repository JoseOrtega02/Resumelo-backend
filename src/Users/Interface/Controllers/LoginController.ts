import { NextFunction, Request, Response } from "express";
import { AuthRepo } from "../../Domain/Repositories/AuthRepo";
import { LoginUseCase } from "../../Application/UseCases/LoginUseCase";
import ApiResponse from "../../../Shared/Interface/Responses/ApiResponse";
import { CheckUserUseCase } from "../../Application/UseCases/checkUserUseCase";

export class LoginController {
  private repostitoryInstance;
  constructor(repository: AuthRepo) {
    this.repostitoryInstance = repository;
  }
  async login(req: Request, res: Response, next: NextFunction) {
    const useCase = new LoginUseCase(this.repostitoryInstance);
    const { email, password } = req.body;

    try {
      const data = await useCase.exec(email, password);
      res
        .status(200)
        .cookie("access_token", data, {
          httpOnly: true,
          secure: true, // ⚠️ IMPORTANTE: Solo se envía en HTTPS
          sameSite: "none",
          // secure: process.env.NODE_ENV === "production",
        })
        .json(new ApiResponse("success", "Log in successfully"));
    } catch (error) {
      next(error);
    }
  }
  async logOut(req: Request, res: Response, next: NextFunction) {
    try {
      res
        .clearCookie("access_token")
        .status(200)
        .json(new ApiResponse("success", "Log out successfully"));
    } catch (error) {
      next(error);
    }
  }
  async checkUser(req: Request, res: Response, next: NextFunction) {
    const id = res.locals.userId;
    try {
      const useCase = new CheckUserUseCase(this.repostitoryInstance);
      const data = await useCase.exec(id);
      res.status(200).json(new ApiResponse("success", "User Exists", data));
    } catch (error) {
      next(error);
    }
  }
}
