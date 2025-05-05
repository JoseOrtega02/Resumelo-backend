import { client } from "../../../DB/TursoDB";
import { AppError } from "../../../Shared/Interface/Responses/AppError";

export interface LikesRepo {
  setLike(summaryId: string, userId: string): Promise<string>;
  removeLike(summaryId: string, userId: string): Promise<string>;
  checkLike(summaryId: string, userId: string): Promise<Boolean>;
}

export class LikesRepositorySQL implements LikesRepo {
  //todo: make this line instead import client
  //   constructor(private client: DBClientInterface) {}

  async setLike(summaryId: string, userId: string): Promise<string> {
    const response = await client.execute({
      sql: "INSERT INTO likes (summaryId,userId) VALUES (?,?)",
      args: [summaryId, userId],
    });

    if (!response.rowsAffected) {
      throw new AppError("error setting the like", 400);
    }

    return "Liked successfully";
  }
  async removeLike(summaryId: string, userId: string): Promise<string> {
    const response = await client.execute({
      sql: "DELETE FROM likes WHERE summaryId = ? AND userId = ?",
      args: [summaryId, userId],
    });
    if (!response.rowsAffected) {
      throw new AppError("error deleting the like", 400);
    }
    return "Like removed successfully";
  }
  async checkLike(summaryId: string, userId: string): Promise<Boolean> {
    const response = await client.execute({
      sql: "SELECT summaryId,userId FROM likes WHERE summaryId = ? AND userId = ? ",
      args: [summaryId, userId],
    });
    if (!response.rowsAffected) {
      return false;
    } else {
      return true;
    }
  }
}
