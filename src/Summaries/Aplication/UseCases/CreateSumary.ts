import { Summary } from "../../Domain/Entities/Summary";
import { SummaryRepo } from "../../Domain/Repositories/SummaryRepo";

export class CreateSummaryUseCase {
    private SummaryRepository: SummaryRepo;

    constructor(SummaryRepository: SummaryRepo) {
        this.SummaryRepository = SummaryRepository;
    }

    async execute(title: string, desc: string, pdf: string): Promise<string> {
        try {
            const summary = new Summary(title, desc, pdf);
            await this.SummaryRepository.create(summary);
            return "Summary created successfully";
        } catch (error) {
            console.error("Error in summary creation:", error);
            throw new Error("Failed to create summary"); // ✅ Throw an error
        }
    }
}