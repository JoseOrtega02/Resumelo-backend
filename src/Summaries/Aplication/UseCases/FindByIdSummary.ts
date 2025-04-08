import { ValidateSchema } from "../../../Shared/Application/ValidateSchema";
import { IdSchema } from "../../../Users/Interface/Schemas/IdSchema";
import { SummaryRepo } from "../../Domain/Repositories/SummaryRepo";

export class FindByIdUseCase {
  private SummaryRepository: SummaryRepo;
  private idValidate: ValidateSchema;
  constructor(SummaryRepository: SummaryRepo) {
    this.SummaryRepository = SummaryRepository;
    this.idValidate = new ValidateSchema(IdSchema);
  }
  async exec(id: string) {
    this.idValidate.validate(id);

    return await this.SummaryRepository.findById(id);
  }
}
