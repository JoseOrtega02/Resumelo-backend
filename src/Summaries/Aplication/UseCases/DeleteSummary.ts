import { SummaryRepo } from "../../Domain/Repositories/SummaryRepo"

export class DeleteSummaryUseCase{
     private SummaryRepository: SummaryRepo
        constructor(SummaryRepository:SummaryRepo){
            this.SummaryRepository = SummaryRepository
        }
    exec(id:string){
        try {
            this.SummaryRepository.delete(id)
            return "Summary Deleted Successfully"
        } catch (error) {
            return "Error in the Delete process : " + error
        }
         
    }
}