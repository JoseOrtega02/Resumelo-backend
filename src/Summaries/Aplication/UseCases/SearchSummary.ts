import { SummaryRepo } from "../../Domain/Repositories/SummaryRepo";

export class SearchSummaryUseCase {
  private repository;
  constructor(repo: SummaryRepo) {
    this.repository = repo;
  }
  async exec(title: string) {
    return await this.repository.search(title);
  }
}
