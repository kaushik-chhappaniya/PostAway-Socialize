import express from 'express';
import LikeController from './like.controller.js';

const likeRouter = new express.Router();
likeRouter.route('/:id').get(LikeController.getLikesForPost);
likeRouter.route('/toggles/:id').get(LikeController.toggleLike);
likeRouter.route('/:id').post(LikeController.addLike);
likeRouter.route('/removeLike/:id').post(LikeController.removeLike);

export default likeRouter;