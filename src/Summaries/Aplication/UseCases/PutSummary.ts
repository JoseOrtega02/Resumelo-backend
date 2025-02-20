import { Summary } from "../../Domain/Entities/Summary"
import { SummaryRepo } from "../../Domain/Repositories/SummaryRepo"

export class PutSummaryUseCase{
    private SummaryRepository: SummaryRepo
        constructor(SummaryRepository:SummaryRepo){
            this.SummaryRepository = SummaryRepository
        }
    
    async execute(title:string,desc:string,pdf:string,id:string): Promise<void>{
            const summary= await this.SummaryRepository.findById(id)
            if(summary){
                await this.SummaryRepository.put(summary,title,desc,pdf)
            }
            
        }
}