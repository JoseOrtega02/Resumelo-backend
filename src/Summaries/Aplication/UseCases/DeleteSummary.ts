import { SummaryRepo } from "../../Domain/Repositories/SummaryRepo"

export class DeleteSummaryUseCase{
     private SummaryRepository: SummaryRepo
        constructor(SummaryRepository:SummaryRepo){
            this.SummaryRepository = SummaryRepository
        }
    async exec(id:string){
        await this.SummaryRepository.delete(id)
    }
}