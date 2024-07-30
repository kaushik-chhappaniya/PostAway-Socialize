import express from "express";
import path from "path";
import bodyParser from "body-parser";

// Import routes
import userRouter from "./src/features/user/user.router.js";
import postRouter from "./src/features/post/post.router.js";
import likeRouter from "./src/features/like/like.router.js";
import commentRouter from "./src/features/commment/comment.router.js";
import { ApplicationError } from "./src/errorHandler/applicationError.js";
import jwtAuth from "./src/features/middlewares/auth.middleware.js";
import loggerMiddleware from "./src/features/middlewares/logger.middleware.js";

const app  = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve("./public")));
app.use(loggerMiddleware);

// Routers
app.use("/api", userRouter);
app.use("/api/posts", jwtAuth, postRouter);
app.use("/api/comments", jwtAuth, commentRouter);
app.use("/api/likes", jwtAuth, likeRouter);

app.use((err, req, res, next) => {
   console.log("err :", err);
   if (err instanceof ApplicationError) {
      res.status(err.code).send(err.message);
   }
   res.status(500).send("Something went wrong");
   next();
});


app.use((req, res) => {
   res.status(404).send("API not found");
});


export default app;
