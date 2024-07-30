import PostModel from "./post.model.js";

import { ApplicationError } from "../../errorHandler/applicationError.js";

class PostController {
  static createPost = (req, res) => {
      try {
         const userId = req.userId;
         const { filename } = req.file;
         const imageUrl = "/images/" + filename;
         const caption = req.body.caption;
         const newPost = PostModel.CreatePost(userId, caption, imageUrl);
         // console.log(newPost);
         res.status(200).send(newPost);
      } catch (err) {
         console.log(err);
         throw new ApplicationError("Something went wrong with the Data", 500);
      }
   };

   static getPostByID = (req, res) => {
      try {
         const id = req.params.id;
         const post = PostModel.getPostById(id);
         res.status(200).send(post);
      } catch (err) {
         console.log(err);
         throw new ApplicationError("Something went wrong with the Data", 500);
      }
   }

   static  getAllPosts = (req, res) => {
      try {
         const Allposts = PostModel.getAllPost();
         res.status(200).send(Allposts);
      } catch (err) {
         console.log(err);
         throw new ApplicationError("Something went wrong with the Data", 500);
      }
   };

   static  updatePost = (req, res) => {
      try {
         const id = req.params.id;
         const post = PostModel.getPostById(id);
         const updatedPost = PostModel.updatePost({ ...post, ...req.body });
         res.status(200).send(updatedPost);
      } catch (err) {
         console.log(err);
         throw new ApplicationError("Something went wrong with the Data", 500);
      }
   };

   static  deletePost = (req, res) => {
      try {
         const id = req.params.id;
         const deletePost = PostModel.deletePost(id);
         if (deletePost) {
            res.status(200).send("Post Deleted!");
         } else {
            res.status(200).send("Post not exist");
         }
      } catch (err) {
         console.log(err);
         throw new ApplicationError("Something went wrong with the Data", 500);
      }
   };

   static  getUserPost = (req, res) => {
      try {
         const userId = req.userId;
         const post = PostModel.getUserPost(userId);
         console.log("User Post is:", post);
         res.status(200).send(post);
      } catch (err) {
         console.log(err);
         throw new ApplicationError("Something went wrong with the Data", 500);
      }
   };

   static  getPostByCaption = (req, res) => {
      console.log("In the getPostByCaption function");
      try {
         const caption = req.query.caption || "";
         console.log("caption is :", caption);
         const filteredPost = PostModel.getPostByCaption(caption);
         console.log("filtered post is..", filteredPost);
         res.status(200).send(filteredPost);
      } catch (err) {
         console.log(err);
         throw new ApplicationError("Something went wrong with the Data", 500);
      }
   };
}
export default PostController;