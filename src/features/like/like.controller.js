import LikeModel from "./like.model.js";
import { ApplicationError } from "../../errorHandler/applicationError.js";
class LikeController {
   static addLike = (req, res) => {
      try {
         const userId = req.userId;
         const postId = req.params.id;
         const newLike = LikeModel.addLike(userId, +postId);
         if (newLike?.error) {
            return res.status(404).send({ msg: newLike.error });
         }
         if (newLike) {
            console.log(newLike);
            res.status(200).send({ like: newLike, msg: "Post Liked" });
         } else {
            res.status(200).send({ like: newLike, msg: "Post already Liked" });
         }
      } catch (err) {
         console.log(err);
         throw new ApplicationError("Something went wrong with the Data", 500);
      }
   };

   static removeLike = (req, res) => {
      try {
         const postId = req.params.id;
         const removeLike = LikeModel.removeLike(postId);
         if (removeLike) {
            res.status(200).send("Like removed");
         } else {
            res.status(200).send("Post does not exist");
         }
      } catch (err) {
         console.log(err);
         throw new ApplicationError("Something went wrong with the Data", 500);
      }
   };

   static getLikesForPost = (req, res) => {
      try {
         const postId = req.params.id;
         const likes = LikeModel.getLikesForPost(postId);
         res.status(200).send(likes);
      } catch (err) {
         console.log(err);
         throw new ApplicationError("Something went wrong with the Data", 500);
      }
   };

   static toggleLike = (req, res) => {
      try {
         const userId = req.userId;
         const postId = req.params.id;

         const result = LikeModel.toggleLike(userId, postId);

         if (result.error) {
            return res.status(404).send({ msg: result.error });
         }

         if (result.removed) {
            return res.status(200).send({ like: false, msg: "Like removed" });
         }

         return res.status(200).send({ like: true, msg: "Post Liked", data: result.like });
      } catch (err) {
         console.log(err);
         throw new ApplicationError("Something went wrong with the Data", 500);
      }
   };
}
export default LikeController;
