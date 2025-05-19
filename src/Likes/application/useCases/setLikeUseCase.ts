import { LikesRepo } from "../../infrastructure/Repositories/LikesRepositorySQL";

export class SetLikeUseCase {
  private repository;
  constructor(repo: LikesRepo) {
    this.repository = repo;
  }
  async exec(summaryId: string, userId: string) {
    const response = await this.repository.setLike(summaryId, userId);
    return response;
  }
}
