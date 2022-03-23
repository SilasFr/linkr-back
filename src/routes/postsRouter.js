import { Router } from "express";
import { getPosts } from "../controllers/postsController.js";

const postsRouter = Router();

postsRouter.get("/timeline", getPosts);

export default postsRouter;
