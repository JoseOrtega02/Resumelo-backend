import { LikesRepo } from "../../infrastructure/Repositories/LikesRepositorySQL";

export class CheckLikeUseCase {
  private repository;
  constructor(repo: LikesRepo) {
    this.repository = repo;
  }
  async exec(summaryId: string, userId: string) {
    const response = await this.repository.checkLike(summaryId, userId);
    return response;
  }
}
