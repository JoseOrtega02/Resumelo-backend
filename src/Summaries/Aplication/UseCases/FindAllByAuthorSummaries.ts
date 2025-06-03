import { SummaryRepo } from "../../Domain/Repositories/SummaryRepo";

export class FindAllByAuthorUseCase {
  private repository;
  constructor(repo: SummaryRepo) {
    this.repository = repo;
  }
  async exec(authorId: string) {
    return await this.repository.findAllByAuthor(authorId);
  }
}
