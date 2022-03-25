import { Router } from "express";
import userRouter from "./userRouter.js";
import loginRouter from "./loginRouter.js";
import postsRouter from "./postsRouter.js";
import logoutRouter from "./logoutRouter.js";
import postsRouter from "./postsRouter.js";

const router = Router();

router.use(userRouter);
router.use(loginRouter);
router.use(logoutRouter);
router.use(postsRouter);

export default router;
