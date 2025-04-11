import { File } from "buffer";
import { ValidateSchema } from "../../../Shared/Application/ValidateSchema";
import { AppError } from "../../../Shared/Interface/Responses/AppError";
import { Summary } from "../../Domain/Entities/Summary";
import { SummaryRepo } from "../../Domain/Repositories/SummaryRepo";
import { DocumentRepository } from "../../Infrastructure/Repositories/CloudfareRepositoryR2";
import { CreateSummarySchema } from "../../Interface/Schemas/CreateSummarySchema";

export class CreateSummaryUseCase {
  private SummaryRepository: SummaryRepo;
  private DocumentRepository: DocumentRepository;
  private validation: ValidateSchema;
  constructor(
    SummaryRepository: SummaryRepo,
    documentRepo: DocumentRepository
  ) {
    this.SummaryRepository = SummaryRepository;
    this.DocumentRepository = documentRepo;
    this.validation = new ValidateSchema(CreateSummarySchema);
  }

  async execute(
    title: string,
    desc: string,
    pdf: Express.Multer.File | undefined,
    author: string
  ): Promise<Summary | null> {
    this.validation.validate({
      title: title,
      desc: desc,
      pdf: pdf,
      author: author,
    });
    if (!pdf) {
      throw new AppError("file not provided", 400);
    }
    const summary = new Summary(title, desc, "", author);

    const url = await this.DocumentRepository.create(
      pdf.buffer,
      summary.getId()
    );
    if (!url) return null;
    summary.setPdf(url);
    const res = await this.SummaryRepository.create(summary);

    if (!res) {
      this.DocumentRepository.delete(summary.getId());
      return null;
    }

    return res;
  }
}
