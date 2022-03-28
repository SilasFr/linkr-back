import { Router } from "express";
import userRouter from "./userRouter.js";
import loginRouter from "./loginRouter.js";
import postsRouter from "./postsRouter.js";
import logoutRouter from "./logoutRouter.js";
import hashtagRouter from "./hashtagRouter.js";
import likesRouter from "./likesRouter.js";

const router = Router();

router.use(userRouter);
router.use(loginRouter);
router.use(logoutRouter);
router.use(postsRouter);
router.use(hashtagRouter);
router.use(likesRouter);

export default router;
