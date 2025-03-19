
import{  Request, Response } from "express";
import { FindAllSummariesUseCase } from "../../Aplication/UseCases/FindAllSummary"
import { SummaryRepo } from "../../Domain/Repositories/SummaryRepo"
import { FindByIdUseCase } from "../../Aplication/UseCases/FindByIdSummary";
import { Summary } from "../../Domain/Entities/Summary";
import { CreateSummaryUseCase } from "../../Aplication/UseCases/CreateSumary";
import { PutSummaryUseCase } from "../../Aplication/UseCases/PutSummary";
import { DeleteSummaryUseCase } from "../../Aplication/UseCases/DeleteSummary";
import { DocumentRepository } from "../../Infrastructure/Repositories/CloudfareRepositoryR2";

interface ISummaryController {
    getAll(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<void>;
    create(req: Request, res: Response): Promise<void>;
    edit(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
}

export class SummaryController implements ISummaryController {
    private repositoryInstance: SummaryRepo;
    private repositoryDocumentInstance: DocumentRepository
    constructor(repo: SummaryRepo,docRepo: DocumentRepository) {
        this.repositoryInstance = repo;
        this.repositoryDocumentInstance= docRepo
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            
            const useCase = new FindAllSummariesUseCase(this.repositoryInstance);
            const summaries = await useCase.exec(); // Added `await`
            res.status(200).json(summaries); // Use `res.json()` for JSON responses
        } catch (error) {
            res.status(500).json({ error: "Failed to retrieve summaries" });
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const useCase = new FindByIdUseCase(this.repositoryInstance);
            const summary = await useCase.exec(req.params.id);
            res.json(summary);
        } catch (error) {
            res.status(404).json({ error: "Summary not found" });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        const useCase = new CreateSummaryUseCase(this.repositoryInstance,this.repositoryDocumentInstance);
        const { title, desc, pdf } = req.body;
        try {
            const message= await useCase.execute(title, desc, pdf);
            res.status(201).json(message);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    async edit(req: Request, res: Response): Promise<void> {
        const useCase = new PutSummaryUseCase(this.repositoryInstance);
        const { title, desc, pdf } = req.body;
        const {id} = req.params
        try {
            const message = await useCase.execute(title, desc, pdf, id);
            res.status(201).json({ message: "Summary edited successfully: "+message});
        } catch (error) {
            res.status(500).json({ error: "Failed to edit summary" });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        const useCase = new DeleteSummaryUseCase(this.repositoryInstance,this.repositoryDocumentInstance);
        const { id } = req.params;
        try {
            const message = await useCase.exec(id);
            res.status(200).json({ message});
        } catch (error) {
            res.status(400).json({ error: "Failed to delete summary" });
        }
    }
}