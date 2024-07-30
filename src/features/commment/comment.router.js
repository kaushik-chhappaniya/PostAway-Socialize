import express from "express";
import CommentController from "./comment.controller.js";

const commentRouter = new express.Router();
commentRouter.route("/:id").get(CommentController.getAllComments);
commentRouter.route("/:id").post(CommentController.addComment);
commentRouter.route("/:id").put(CommentController.updateComment);
commentRouter.route("/:id").delete(CommentController.deleteComment);
export default commentRouter;
