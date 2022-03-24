import { Router } from "express";
import { getPosts } from "../controllers/postsController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const postsRouter = Router();

postsRouter.get("/timeline", validateTokenMiddleware, getPosts);

export default postsRouter;
