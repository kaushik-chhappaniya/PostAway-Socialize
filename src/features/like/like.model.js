import PostModel from "../post/post.model.js";
import { likes } from "../utils/data.js";
class LikeModel {
   constructor(userId, postId, id) {
      this.id = id;
      this.userId = userId;
      this.postId = postId;
   }
   static addLike(userId, postId) {
      if (!PostModel.postExists(postId)) {
         return { error: "Post does not exist" };
      }
      const newLike = new LikeModel(userId, postId);
      const existingLike = likes.find((like) => like.userId == userId && like.postId == postId);
      if (existingLike) {
         return null; // Post already liked by this user
      }
      newLike.id = likes.length + 1;
      likes.push(newLike);
      return newLike;
   }

   static removeLike(postId) {
      const index = likes.findIndex((u) => u.postId == postId);
      if (index == -1) {
         return false;
      }
      likes.splice(index, 1);
      return true;
   }
   static toggleLike(userId, postId) {
      // Check if the post exists
      if (!PostModel.postExists(postId)) {
         return { error: "Post does not exist" };
      }

      // Check if the like already exists
      const existingLikeIndex = likes.findIndex(
         (like) => like.userId == userId && like.postId == postId,
      );
      if (existingLikeIndex !== -1) {
         // If exists, remove the like
         likes.splice(existingLikeIndex, 1);
         return { removed: true };
      }

      // Otherwise, add the like
      const newLike = { userId, postId };
      likes.push(newLike);
      return { added: true, like: newLike };
   }

   static getLikesForPost(postId) {
      return likes.filter((like) => like.postId == postId);
   }
}

export default LikeModel;