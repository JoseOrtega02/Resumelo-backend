
import { LikesRepo } from "../../../../Likes/infrastructure/Repositories/LikesRepositorySQL";

export class FakeLikeRepository implements LikesRepo{
 async setLike(summaryId: string, userId: string): Promise<{ message: string; likeStatus: boolean; }> {
    return {
      message:"like set successfully",
      likeStatus: true
    }
 
 } 
 async removeLike(summaryId: string, userId: string): Promise<{ message: string; likeStatus: boolean; }> {
    return {
      message:"like remove successfully",
      likeStatus: false
    }
  }
 async checkLike(summaryId: string, userId: string): Promise<{ likes: number; likedByUser: boolean; }> {
     return {
      likes: 10,
      likedByUser:false
    } 
  }
  async countLikes(summaryId: string): Promise<number> {
      return 20
  }
}
