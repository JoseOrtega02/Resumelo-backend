import { SummaryRepo } from "../../Domain/Repositories/SummaryRepo"

export class FindByIdUseCase{
     private SummaryRepository: SummaryRepo
        constructor(SummaryRepository:SummaryRepo){
            this.SummaryRepository = SummaryRepository
        }
    async exec(id:string){
        const summary = await this.SummaryRepository.findById(id)
        return summary
    }
}