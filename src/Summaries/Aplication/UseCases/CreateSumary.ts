import { Summary } from "../../Domain/Entities/Summary";
import { SummaryRepo } from "../../Domain/Repositories/SummaryRepo";
import { DocumentRepository } from "../../Infrastructure/Repositories/CloudfareRepositoryR2";

export class CreateSummaryUseCase {
  private SummaryRepository: SummaryRepo;
  private DocumentRepository: DocumentRepository;
  constructor(
    SummaryRepository: SummaryRepo,
    documentRepo: DocumentRepository
  ) {
    this.SummaryRepository = SummaryRepository;
    this.DocumentRepository = documentRepo;
  }

  async execute(
    title: string,
    desc: string,
    pdf: string,
    author: string
  ): Promise<Summary | null> {
    const summary = new Summary(title, desc, "", author);
    const url = await this.DocumentRepository.create(pdf, summary.getId());

    let res = null;
    if (url) {
      summary.setPdf(url);
      res = await this.SummaryRepository.create(summary);
    }
    return res;
  }
}
