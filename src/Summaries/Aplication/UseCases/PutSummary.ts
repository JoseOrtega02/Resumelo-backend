import { AppError } from "../../../Shared/Interface/Responses/AppError"
import { Summary } from "../../Domain/Entities/Summary"
import { SummaryRepo } from "../../Domain/Repositories/SummaryRepo"
import { DocumentRepository } from "../../Infrastructure/Repositories/CloudfareRepositoryR2"

export class PutSummaryUseCase{
    private SummaryRepository: SummaryRepo
    private DocumentRepository: DocumentRepository
        constructor(SummaryRepository:SummaryRepo,documentRepo:DocumentRepository){
            this.SummaryRepository = SummaryRepository
            this.DocumentRepository= documentRepo
        }
    
    async execute(title:string,desc:string,pdf:string,id:string): Promise<Summary | null>{
        
            const summary= await this.SummaryRepository.findById(id)
            
            let newSummary = null
            if(summary){
                summary.setTitle(title)
                summary.setDesc(desc)
                const url = await this.DocumentRepository.create(pdf,summary.getId())

                if(url){
                    summary.setPdf(url)
                    newSummary =  await this.SummaryRepository.put(summary,id)
                }else{
                    throw new AppError("Something went wrong",500)
                }

            }else{
                throw new AppError("Summary not found",404)
            }


            return newSummary
        
           
            
        }
}