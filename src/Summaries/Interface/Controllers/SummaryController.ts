import { NextFunction, Request, Response } from "express";
import { FindAllSummariesUseCase } from "../../Aplication/UseCases/FindAllSummary";
import { SummaryRepo } from "../../Domain/Repositories/SummaryRepo";
import { FindByIdUseCase } from "../../Aplication/UseCases/FindByIdSummary";
import { CreateSummaryUseCase } from "../../Aplication/UseCases/CreateSumary";
import { PutSummaryUseCase } from "../../Aplication/UseCases/PutSummary";
import { DeleteSummaryUseCase } from "../../Aplication/UseCases/DeleteSummary";
import { DocumentRepository } from "../../Infrastructure/Repositories/CloudfareRepositoryR2";
import ApiResponse from "../../../Shared/Interface/Responses/ApiResponse";
import { IdSchema } from "../../../Users/Interface/Schemas/IdSchema";
import { CreateSummarySchema } from "../Schemas/CreateSummarySchema";
import { UpdateSummarySchema } from "../Schemas/UpdateSummarySchema";

interface ISummaryController {
  getAll(req: Request, res: Response, next: NextFunction): Promise<void>;
  getById(req: Request, res: Response, next: NextFunction): Promise<void>;
  create(req: Request, res: Response, next: NextFunction): Promise<void>;
  edit(req: Request, res: Response, next: NextFunction): Promise<void>;
  delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export class SummaryController implements ISummaryController {
  private repositoryInstance: SummaryRepo;
  private repositoryDocumentInstance: DocumentRepository;
  constructor(repo: SummaryRepo, docRepo: DocumentRepository) {
    this.repositoryInstance = repo;
    this.repositoryDocumentInstance = docRepo;
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const useCase = new FindAllSummariesUseCase(this.repositoryInstance);
      const summaries = await useCase.exec();
      res
        .status(200)
        .json(new ApiResponse("success", "Summaries found", summaries));
    } catch (error) {
      next(error);
    }
  }

  async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const result = IdSchema.safeParse(id);
    if (!result.success) {
      res.status(400).json(new ApiResponse("error", result.error.message));
    }
    try {
      const useCase = new FindByIdUseCase(this.repositoryInstance);
      const summary = await useCase.exec(id);

      res
        .status(200)
        .json(new ApiResponse("success", "Summary found", summary));
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const useCase = new CreateSummaryUseCase(
      this.repositoryInstance,
      this.repositoryDocumentInstance
    );
    const { title, desc, pdf, author } = req.body;
    try {
      const data = await useCase.execute(title, desc, pdf, author);
      if (data == null) {
        res
          .status(500)
          .json(
            new ApiResponse(
              "error",
              "Something went wrong creating the summary"
            )
          );
      }
      res
        .status(201)
        .json(new ApiResponse("success", "Summary created successfully", data));
    } catch (error) {
      next(error);
    }
  }

  async edit(req: Request, res: Response, next: NextFunction): Promise<void> {
    const useCase = new PutSummaryUseCase(
      this.repositoryInstance,
      this.repositoryDocumentInstance
    );
    const { title, desc, pdf } = req.body;
    const { id } = req.params;

    const result = IdSchema.safeParse(id);
    if (!result.success) {
      res.status(400).json(new ApiResponse("error", result.error.message));
    }
    const bodyResult = UpdateSummarySchema.safeParse({
      title: title,
      desc: desc,
      pdf: pdf,
    });
    if (!bodyResult.success) {
      res.status(400).json(new ApiResponse("error", bodyResult.error.message));
    }
    try {
      const data = await useCase.execute(title, desc, pdf, id);
      res
        .status(201)
        .json(new ApiResponse("success", "Summary edited successfully", data));
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    const useCase = new DeleteSummaryUseCase(
      this.repositoryInstance,
      this.repositoryDocumentInstance
    );
    const { id } = req.params;
    const result = IdSchema.safeParse(id);
    if (!result.success) {
      res.status(400).json(new ApiResponse("error", result.error.message));
    }
    try {
      const message = await useCase.exec(id);
      res.status(200).json(new ApiResponse("success", message));
    } catch (error) {
      next(error);
    }
  }
}
