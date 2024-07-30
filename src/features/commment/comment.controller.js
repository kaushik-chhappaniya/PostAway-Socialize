import CommentModel from "./comment.model.js";
import { ApplicationError } from "../../errorHandler/applicationError.js";

class CommentController {
   static addComment = (req, res) => {
      try {
         const userId = req.userId;
         const postId = req.params.id;
         const content = req.body.content;
         console.log("content", content);
         const newComment = CommentModel.addComments(userId, postId, content);
         res.status(200).send(newComment);
      } catch (err) {
         console.log(err);
         throw new ApplicationError("Something went wrong with the Data", 500);
      }
   };
   static getAllComments = (req, res) => {
      try {
         const postId = req.params.id;
         // console.log("Post Id in controller is:", postId);
         const allComment = CommentModel.getAllComments(postId);
         // console.log("all comments are: ",allComment);
         res.status(200).send(allComment);
      } catch (err) {
         console.log(err);
         throw new ApplicationError("Something went wrong with the Data", 500);
      }
   };

   static updateComment = (req, res) => {
      try {
         const id = req.params.id;
         const data = req.body;
         const comment = CommentModel.getCommentById(id);
         if (!comment) {
            return res.status(404).send({ message: "Comment not found" });
         }
         const updatedComment = CommentModel.updateComment(id, data);
         res.status(200).send(updatedComment);
      } catch (err) {
         console.log(err);
         throw new ApplicationError("Something went wrong with the Data", 500);
      }
   };

   static deleteComment = (req, res) => {
      try {
         const id = req.params.id;
         const deletedComment = CommentModel.deleteComment(id);
         if (!deletedComment) {
            res.status(400).send("Comment not found");
         } else {
            res.status(200).send("comment deleted");
         }
      } catch (err) {
         console.log(err);
         throw new ApplicationError("Something went wrong with the Data", 500);
      }
   };
}
export default CommentController;
