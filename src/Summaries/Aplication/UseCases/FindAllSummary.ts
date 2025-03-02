import { SummaryRepo } from "../../Domain/Repositories/SummaryRepo"

export class FindAllSummariesUseCase{
     private SummaryRepository: SummaryRepo
        constructor(SummaryRepository:SummaryRepo){
            this.SummaryRepository = SummaryRepository
        }
    async exec(){
        try {
            const summaries= await this.SummaryRepository.findAll()
        return summaries
        } catch (error) {
            throw new Error("Failed to retrieve summaries");
        }
        
    }
}