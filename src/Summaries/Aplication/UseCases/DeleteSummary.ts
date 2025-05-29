import { ValidateSchema } from "../../../Shared/Application/ValidateSchema";
import { AppError } from "../../../Shared/Interface/Responses/AppError";
import { IdSchema } from "../../../Users/Interface/Schemas/IdSchema";
import { SummaryRepo } from "../../Domain/Repositories/SummaryRepo";
import { DocumentRepository } from "../../Infrastructure/Repositories/CloudfareRepositoryR2";

export class DeleteSummaryUseCase {
  private SummaryRepository: SummaryRepo;
  private DocumentRepository: DocumentRepository;
  private idValidate: ValidateSchema;
  constructor(
    SummaryRepository: SummaryRepo,
    documentRepo: DocumentRepository
  ) {
    this.SummaryRepository = SummaryRepository;
    this.DocumentRepository = documentRepo;
    this.idValidate = new ValidateSchema(IdSchema);
  }
  async exec(id: string,userId:string) {
     const summary = await this.SummaryRepository.findById(id)
    if (summary?.getAuthor() != userId){
        throw new AppError("Only the owner can delete",403)
    }
    this.idValidate.validate(id);
    await this.DocumentRepository.delete(id);
    await this.SummaryRepository.delete(id);
    return "Summary Deleted Successfully";
  }
}
