import { SummaryRepo } from "../../Domain/Repositories/SummaryRepo"

export class FindAllSummariesUseCase{
     private SummaryRepository: SummaryRepo
        constructor(SummaryRepository:SummaryRepo){
            this.SummaryRepository = SummaryRepository
        }
    async exec(){
      
            const summaries= await this.SummaryRepository.findAll()
            return summaries
        
        
    }
}