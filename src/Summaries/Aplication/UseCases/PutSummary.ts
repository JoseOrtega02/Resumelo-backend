import { Summary } from "../../Domain/Entities/Summary"
import { SummaryRepo } from "../../Domain/Repositories/SummaryRepo"

export class PutSummaryUseCase{
    private SummaryRepository: SummaryRepo
        constructor(SummaryRepository:SummaryRepo){
            this.SummaryRepository = SummaryRepository
        }
    
    async execute(title:string,desc:string,pdf:string,id:string): Promise<Summary | null>{
            const summary= await this.SummaryRepository.findById(id)
            let newSummary = null
            if(summary){
                summary.setTitle(title)
                summary.setDesc(desc)
                summary.setPdf(pdf)
                newSummary =  await this.SummaryRepository.put(summary,id)
                
            }
            return newSummary
            
        }
}