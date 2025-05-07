import { NextFunction, Request, Response } from "express";
import { LikesRepo } from "../../infrastructure/Repositories/LikesRepositorySQL";
import { SetLikeUseCase } from "../../application/useCases/setLikeUseCase";
import ApiResponse from "../../../Shared/Interface/Responses/ApiResponse";
import { RemoveLIke } from "../../application/useCases/removeLikeUseCase";

export class LikesController {
  private repository;
  constructor(repo: LikesRepo) {
    this.repository = repo;
  }
  async setLike(req: Request, res: Response, next: NextFunction) {
    const { summaryId, userId } = req.body;
    try {
      console.log(req.body);
      const useCase = new SetLikeUseCase(this.repository);
      const data = await useCase.exec(summaryId, userId);

      res.status(201).json(new ApiResponse("success", data));
    } catch (error) {
      next(error);
    }
  }
  async removeLike(req: Request, res: Response, next: NextFunction) {
    const { summaryId, userId } = req.body;
    try {
      const useCase = new RemoveLIke(this.repository);
      const data = await useCase.exec(summaryId, userId);

      res.status(201).json(new ApiResponse("success", data));
    } catch (error) {
      next(error);
    }
  }
}
