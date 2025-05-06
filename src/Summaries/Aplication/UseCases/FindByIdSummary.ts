import { LikesRepo } from "../../../Likes/infrastructure/Repositories/LikesRepositorySQL";
import { ValidateSchema } from "../../../Shared/Application/ValidateSchema";
import { AppError } from "../../../Shared/Interface/Responses/AppError";
import { IdSchema } from "../../../Users/Interface/Schemas/IdSchema";
import { SummaryRepo } from "../../Domain/Repositories/SummaryRepo";

export class FindByIdUseCase {
  private SummaryRepository: SummaryRepo;
  private LikesRepository: LikesRepo;
  private idValidate: ValidateSchema;
  constructor(SummaryRepository: SummaryRepo, LikesRepository: LikesRepo) {
    this.SummaryRepository = SummaryRepository;
    this.LikesRepository = LikesRepository;
    this.idValidate = new ValidateSchema(IdSchema);
  }
  async exec(id: string) {
    this.idValidate.validate(id);

    const summary = await this.SummaryRepository.findById(id);
    if (summary) {
      const likes = await this.LikesRepository.countLikes(summary?.getId());
      summary.setLikesCount(likes);
      return summary;
    } else {
      throw new AppError("error finding the summary", 404);
    }
  }
}
