import { NextFunction, Request, Response } from "express";
import { AuthRepo } from "../../Domain/Repositories/AuthRepo";
import { LoginUseCase } from "../../Application/UseCases/LoginUseCase";
import ApiResponse from "../../../Shared/Interface/Responses/ApiResponse";

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
        .json(new ApiResponse("success", "Log in successfully", data));
    } catch (error) {
      next(error);
    }
  }
}
