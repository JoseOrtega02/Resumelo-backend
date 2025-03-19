import { Summary } from "../../Domain/Entities/Summary";
import { SummaryRepo } from "../../Domain/Repositories/SummaryRepo";
import { DocumentRepository } from "../../Infrastructure/Repositories/CloudfareRepositoryR2";

export class CreateSummaryUseCase {
    private SummaryRepository: SummaryRepo;
    private DocumentRepository: DocumentRepository
    constructor(SummaryRepository: SummaryRepo,documentRepo:DocumentRepository) {
        this.SummaryRepository = SummaryRepository;
        this.DocumentRepository= documentRepo
    }

    async execute(title: string, desc: string, pdf: string): Promise<string | undefined> {
        try { 
            const summary = new Summary(title, desc, "");
            const url = await this.DocumentRepository.create(pdf,summary.getId())
            console.log(url)
            if (url){
            summary.setPdf(url)
            await this.SummaryRepository.create(summary);
            return "Summary created successfully";
            }
        } catch (error) {
            console.error("Error in summary creation:", error);
            throw new Error("Failed to create summary");
        }
    }
}