import { ValidateSchema } from "../../../Shared/Application/ValidateSchema";
import { AppError } from "../../../Shared/Interface/Responses/AppError";
import { IdSchema } from "../../../Users/Interface/Schemas/IdSchema";
import { Summary } from "../../Domain/Entities/Summary";
import { SummaryRepo } from "../../Domain/Repositories/SummaryRepo";
import { DocumentRepository } from "../../Infrastructure/Repositories/CloudfareRepositoryR2";
import { UpdateSummarySchema } from "../../Interface/Schemas/UpdateSummarySchema";

export class PutSummaryUseCase {
  private SummaryRepository: SummaryRepo;
  private DocumentRepository: DocumentRepository;
  private idValidator: ValidateSchema;
  private dataValidator: ValidateSchema;
  constructor(
    SummaryRepository: SummaryRepo,
    documentRepo: DocumentRepository
  ) {
    this.SummaryRepository = SummaryRepository;
    this.DocumentRepository = documentRepo;
    this.idValidator = new ValidateSchema(IdSchema);
    this.dataValidator = new ValidateSchema(UpdateSummarySchema);
  }

  async execute(
    title: string,
    desc: string,
    pdf: Express.Multer.File | undefined,
    id: string
  ): Promise<Summary | null> {
    this.idValidator.validate(id);
    this.dataValidator.validate({ title: title, desc: desc, pdf: pdf });

    const summary = await this.SummaryRepository.findById(id);
    if (!pdf) {
      throw new AppError("Document not provided", 400);
    }
    let newSummary = null;
    if (summary) {
      summary.setTitle(title);
      summary.setDesc(desc);

      const url = await this.DocumentRepository.create(
        pdf.buffer,
        summary.getId()
      );

      if (url) {
        summary.setPdf(url);
        newSummary = await this.SummaryRepository.put(summary, id);
      } else {
        throw new AppError("Something went wrong", 500);
      }
    } else {
      throw new AppError("Summary not found", 404);
    }

    return newSummary;
  }
}
