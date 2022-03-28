import { Router } from "express";
import { postValidationMiddleware } from "../middlewares/postValidationMiddleware.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import {
  deletePostById,
  getPosts,
  getPostsByUserId,
} from "../controllers/postsController.js";

import { newPost } from "../controllers/postsController.js";

const postsRouter = Router();

postsRouter.post(
  "/posts/new",
  postValidationMiddleware,
  validateTokenMiddleware,
  newPost
);
postsRouter.get("/timeline", validateTokenMiddleware, getPosts);
postsRouter.get("/timeline/:id", validateTokenMiddleware, getPostsByUserId);
postsRouter.delete("/posts/:id", validateTokenMiddleware, deletePostById);

//asiduhbasodyb

export default postsRouter;
