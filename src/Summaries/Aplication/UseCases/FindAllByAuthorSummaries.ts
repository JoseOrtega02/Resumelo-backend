import { SummaryRepo } from "../../Domain/Repositories/SummaryRepo";

export class FindAllByAuthorUseCase {
  private repository;
  constructor(repo: SummaryRepo) {
    this.repository = repo;
  }
  async exec(authorId: string) {
    console.log(authorId)
    return await this.repository.findAllByAuthor(authorId);
  }
}
