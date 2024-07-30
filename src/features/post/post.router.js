import express from 'express';
import PostController from './post.controller.js';
import { upload } from '../middlewares/fileUpload.middleware.js';
import { formValidation } from '../middlewares/validate.middleware.js';
const postRouter = express.Router();

postRouter.route('/').post(upload.single('imageUrl'), formValidation, PostController.createPost);
postRouter.route('/').get(PostController.getAllPosts);

postRouter.route('/:id').get(PostController.getPostByID);
postRouter.route('/:id').put(upload.single('imageUrl'), formValidation, PostController.updatePost);
postRouter.route('/:id').delete(PostController.deletePost);

postRouter.route('/getUserPost').get(PostController.getUserPost);

postRouter.route('/filter').get(PostController.getPostByCaption);


export default postRouter;