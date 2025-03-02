import { SummaryRepo } from "../../Domain/Repositories/SummaryRepo"

export class FindByIdUseCase{
     private SummaryRepository: SummaryRepo
        constructor(SummaryRepository:SummaryRepo){
            this.SummaryRepository = SummaryRepository
        }
    async exec(id:string){
        try {
            const summary = await this.SummaryRepository.findById(id)
            return summary
        } catch (error) {
            throw new Error("Failed to retrieve summaries");
        }
        
    }
}