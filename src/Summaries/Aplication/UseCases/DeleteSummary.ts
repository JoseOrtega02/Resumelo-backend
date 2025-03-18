import { SummaryRepo } from "../../Domain/Repositories/SummaryRepo"
import { DocumentRepository } from "../../Infrastructure/Repositories/CloudfareRepositoryR2"

export class DeleteSummaryUseCase{
     private SummaryRepository: SummaryRepo
     private DocumentRepository: DocumentRepository
        constructor(SummaryRepository:SummaryRepo,documentRepo:DocumentRepository){
            this.SummaryRepository = SummaryRepository
            this.DocumentRepository= documentRepo
        }
   async exec(id:string){
        try {
            await this.DocumentRepository.delete(id)
            await this.SummaryRepository.delete(id)
            return "Summary Deleted Successfully"
        } catch (error) {
            return "Error in the Delete process : " + error
        }
         
    }
}