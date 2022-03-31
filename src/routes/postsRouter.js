import { Router } from "express";
import {
  editPostById,
  getPostById,
  getPostsByHashtag,
  dislikePostById,
  likePostById,
} from "../controllers/postsController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import { postValidationMiddleware } from "../middlewares/postValidationMiddleware.js";
import {
  deletePostById,
  getPosts,
  getPostsByUserId,
  insertComment,
} from "../controllers/postsController.js";

import { newPost } from "../controllers/postsController.js";

const postsRouter = Router();
postsRouter.get(
  "/hashtag/:hashtag",
  validateTokenMiddleware,
  getPostsByHashtag
);
postsRouter.post(
  "/posts/new",
  postValidationMiddleware,
  validateTokenMiddleware,
  newPost
);
postsRouter.get("/timeline", validateTokenMiddleware, getPosts);
postsRouter.get("/timeline/:id", validateTokenMiddleware, getPostsByUserId);
postsRouter.get("/posts/:id", validateTokenMiddleware, getPostById);
postsRouter.delete("/posts/:id", validateTokenMiddleware, deletePostById);
postsRouter.put(
  "/posts/:id",
  validateTokenMiddleware,
  postValidationMiddleware,
  editPostById
);

postsRouter.post("/posts/:id/like", validateTokenMiddleware, likePostById);
postsRouter.post(
  "/posts/:id/dislike",
  validateTokenMiddleware,
  dislikePostById
);
postsRouter.post("/posts/:id/comment", validateTokenMiddleware, insertComment);

export default postsRouter;
