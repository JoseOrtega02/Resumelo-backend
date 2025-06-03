import { Value } from "@libsql/client/.";
import { client } from "../../../DB/TursoDB";
import { AppError } from "../../../Shared/Interface/Responses/AppError";

export interface LikesRepo {
  setLike(summaryId: string, userId: string): Promise<{message:string,likeStatus:boolean}>;
  removeLike(summaryId: string, userId: string): Promise<{message:string,likeStatus:boolean}>;
  checkLike(summaryId: string, userId: string): Promise<{likes:Value,likedByUser:boolean}>;
  countLikes(summaryId: string): Promise<number>;
}

export class LikesRepositorySQL implements LikesRepo {
  //todo: make this line instead import client
  //   constructor(private client: DBClientInterface) {}

  async setLike(summaryId: string, userId: string): Promise<{message:string,likeStatus:boolean}> {
    const response = await client.execute({
      sql: "INSERT INTO likes (summaryId,userId) VALUES (?,?)",
      args: [summaryId, userId],
    });

    if (!response.rowsAffected) {
      throw new AppError("error setting the like", 400);
    }
console.log(response)
    return {message:"liked susessfully",likeStatus:true};
  }

  async removeLike(summaryId: string, userId: string): Promise<{message:string,likeStatus:boolean}> {
    const response = await client.execute({
      sql: "DELETE FROM likes WHERE summaryId = ? AND userId = ?",
      args: [summaryId, userId],
    });
    if (!response.rowsAffected) {
      throw new AppError("error deleting the like", 400);
    }
    return {message:"Like removed successfully",likeStatus:false};
  }

  async checkLike(summaryId: string, userId: string): Promise<{likes:Value,likedByUser:boolean}> {
    const response = await client.execute({
      sql: 
`SELECT 
     COUNT(*) AS totalLikes,
     MAX(CASE WHEN userId = ? THEN 1 ELSE 0 END) AS likedByUser
   FROM likes
   WHERE summaryId = ?`,
      args: [userId,summaryId],
    });
    console.log(response.rows)

    const result ={
      likes: response.rows[0].totalLikes,
      likedByUser: response.rows[0].likedByUser ? true:false
    }
    return result
  }

  async countLikes(summaryId: string): Promise<number> {
    const response = await client.execute({
      sql: "SELECT COUNT(*) as count FROM likes WHERE summaryId = ?",
      args: [summaryId],
    });
    const row = response.rows?.[0];
    const count = row?.count ?? 0;

    return Number(count);
  }
}
