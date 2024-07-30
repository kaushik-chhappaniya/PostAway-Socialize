import { posts } from "../utils/data.js";
class PostModel {
   constructor(userId, caption, imageUrl) {
      this.id = posts.length + 1;
      (this.userId = userId), (this.caption = caption), (this.imageUrl = imageUrl);
   }

   //   Post exists or not
   static postExists(postId) {
      return posts.some((post) => post.id == postId);
   }

   //  Create a new post
   static CreatePost(userId, caption, imageUrl) {
      const newPost = new PostModel(userId, caption, imageUrl);
      posts.push(newPost);
      return newPost;
   }

   // Get All posts from database
   static getAllPost() {
      return posts;
   }

   // Get User posts from database
   static getUserPost(userId) {
      console.log("UserId is:", userId);
      const post = posts.filter((u) => u.userId == userId);
      console.log("Specific user Post", post);
      return post;
   }

   // Get post from ID
   static getPostById(id) {
      const index = posts.findIndex((i) => i.id == id);
      return posts[index];
   }

   // Update post from ID
   static updatePost(post) {
      // console.log(post.id);
      const index = posts.findIndex((p) => p.id == post.id);
      console.log("index", index);
      posts[index] = post;
      return post;
   }

   // Delete a post
   static deletePost(id) {
      const index = posts.findIndex((i) => i.id == id);
      console.log("Index:", index);
      if (index == -1) {
         return false;
      } else {
         posts.splice(index, 1);
         return true;
      }
   }

   //   Get post by caption
   static getPostByCaption(caption) {
      console.log("caption:", caption);
      const post = posts.filter((post) =>
         post.caption.toLowerCase().includes(caption.toLowerCase()),
      );
      console.log("post: ", post);
      return post;
   }
}


export default PostModel;