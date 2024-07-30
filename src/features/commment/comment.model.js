import { comments } from "../utils/data.js";

class CommentModel {
   constructor(userId, postId, content) {
      this.id = comments.length + 1;
      (this.userId = userId), (this.postId = postId), (this.content = content);
   }
   static addComments(userId, postId, content) {
      const newComment = new CommentModel(userId, +postId, content);
      newComment.id = comments.length + 1;
      comments.push(newComment);
      return newComment;
   }

   static getAllComments(postId) {
      // console.log("postId :", postId);
      const comment = comments.filter((c) => c.postId == postId);
      // console.log("commenst : ", comment);
      return comment;
   }

   static updateComment(id, comment) {
      const index = comments.findIndex((c) => c.id == id);
      comments[index] = { ...comments[index], ...comment };
      return comments[index];
   }

   static getCommentById(id) {
      const comment = comments.find((i) => i.id == id);
      return comment;
   }

   static deleteComment(id) {
      const index = comments.findIndex((c) => c.id == id);
      if (index == -1) {
         return false;
      } else {
         comments.splice(index, 1);
         return true;
      }
   }
}
export default CommentModel;