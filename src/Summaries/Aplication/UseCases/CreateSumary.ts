import { Summary } from "../../Domain/Entities/Summary";
import { SummaryRepo } from "../../Domain/Repositories/SummaryRepo";

export class CreateSummaryUseCase{
    private SummaryRepository: SummaryRepo
    constructor(SummaryRepository:SummaryRepo){
        this.SummaryRepository = SummaryRepository
    }

    async execute(title:string,desc:string,pdf:string): Promise<string>{
        try {
             const summary= new Summary(title,desc,pdf)

             this.SummaryRepository.create(summary)
             return "Summary created Successfully"
        } catch (error) {
            return "Error in the creation of summary : "+error
        }
       
    }
}