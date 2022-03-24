import { Router } from "express";
import { getPostsByHashtag } from "../controllers/postsController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const postsRouter = Router();
postsRouter.get(
  "/hashtag/:hashtag",
  validateTokenMiddleware,
  getPostsByHashtag
);
export default postsRouter;
