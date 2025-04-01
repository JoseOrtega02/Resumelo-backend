import { NextFunction, Request, Response } from "express";
import { CreateUseCase } from "../../Application/UseCases/createUseCase";
import { UserRepo } from "../../Domain/Repositories/UserRepo";
import { GetByIdUseCase } from "../../Application/UseCases/getByIdUseCase";
import { GetAllUseCase } from "../../Application/UseCases/getAllUseCase";
import { UpdateUseCase } from "../../Application/UseCases/updateUseCase";
import { DeleteUseCase } from "../../Application/UseCases/deleteUseCase";
import ApiResponse from "../../../Shared/Interface/Responses/ApiResponse";
import { AppError } from "../../../Shared/Interface/Responses/AppError";

export class UserController {
  private repository: UserRepo;
  constructor(repo: UserRepo) {
    this.repository = repo;
  }
  async create(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body;
    const useCase = new CreateUseCase(this.repository);
    try {
      const data = await useCase.exec(name, email, password);

      res
        .status(201)
        .json(new ApiResponse("success", "User created Successfully", data));
    } catch (error: any) {
      next(error);
    }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const useCase = new GetByIdUseCase(this.repository);
      const user = await useCase.exec(id);
      res
        .status(200)
        .json(new ApiResponse("success", "User found successfully", user));
    } catch (error) {
      next(error);
    }
  }
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const useCase = new GetAllUseCase(this.repository);
      const data = await useCase.exec();
      res
        .status(200)
        .json(new ApiResponse("success", "Users found successfully", data));
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      const useCase = new UpdateUseCase(this.repository);
      const data = await useCase.exec(id, name, email, password);
      res
        .status(201)
        .json(new ApiResponse("success", "User Edited successfully", data));
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const useCase = new DeleteUseCase(this.repository);
      await useCase.exec(id);
      res
        .status(200)
        .json(new ApiResponse("success", "User Deleted Successfully"));
    } catch (error) {
      next(error);
    }
  }
}
