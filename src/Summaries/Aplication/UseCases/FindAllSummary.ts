import { SummaryRepo } from "../../Domain/Repositories/SummaryRepo";

export class FindAllSummariesUseCase {
  private SummaryRepository: SummaryRepo;

  constructor(SummaryRepository: SummaryRepo) {
    this.SummaryRepository = SummaryRepository;
  }
  async exec(page:number) {
    const limit = 10
    const offset = (page-1) * limit
    const summaries = await this.SummaryRepository.findAll(limit,offset,page);
    return summaries;
  }
}
