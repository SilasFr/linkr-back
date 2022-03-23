import { Router } from "express";
import userRouter from "./userRouter.js";
import loginRouter from "./loginRouter.js";

const router = Router();

router.use(userRouter);
router.use(loginRouter);
router.use(postsRouter);

export default router;
