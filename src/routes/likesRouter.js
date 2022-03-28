import { Router } from "express";
import { getLikesByPostId } from "../controllers/likesController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const likesRouter = Router();

likesRouter.get("/likes/:id", validateTokenMiddleware, getLikesByPostId);

export default likesRouter;
