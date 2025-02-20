import { Summary } from "../../Domain/Entities/Summary";
import { SummaryRepo } from "../../Domain/Repositories/SummaryRepo";

export class CreateSummaryUseCase{
    private SummaryRepository: SummaryRepo
    constructor(SummaryRepository:SummaryRepo){
        this.SummaryRepository = SummaryRepository
    }

    async execute(title:string,desc:string,pdf:string): Promise<void>{
        const summary= new Summary(title,desc,pdf)

        await this.SummaryRepository.create(summary)
    }
}