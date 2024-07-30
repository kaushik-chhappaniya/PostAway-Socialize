import express from 'express';
import UserController from './user.controller.js';

const userRouter = express.Router();

userRouter.route("/getAllUsers").get(UserController.getAllUsers);
userRouter.route('/signUp').post(UserController.getRegister);
userRouter.route('/signIn').post(UserController.getLogin);

export default userRouter;