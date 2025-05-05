import { LikesRepo } from "../../infrastructure/Repositories/LikesRepositorySQL";

export class RemoveLIke {
  private repository;
  constructor(repo: LikesRepo) {
    this.repository = repo;
  }
  async exec(summaryId: string, userId: string) {
    const response = await this.repository.removeLike(summaryId, userId);
    return response;
  }
}
