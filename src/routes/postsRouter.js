import { Router } from "express";
import {
  editPostById,
  getPostsByHashtag,
} from "../controllers/postsController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import { postValidationMiddleware } from "../middlewares/postValidationMiddleware.js";
import {
  deletePostById,
  getPosts,
  getPostsByUserId,
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
postsRouter.delete("/posts/:id", validateTokenMiddleware, deletePostById);
postsRouter.put(
  "/posts/:id",
  validateTokenMiddleware,
  postValidationMiddleware,
  editPostById
);

export default postsRouter;
