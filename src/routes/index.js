
import { Router } from "express";
import userRouter from "./userRouter.js";
import loginRouter from "./loginRouter.js";
import logoutRouter from "./logoutRouter.js";
import postsRouter from './postsRouter.js';

const router = Router();

router.use(userRouter);
router.use(loginRouter);
router.use(postsRouter);
router.use(logoutRouter)

export default router;
