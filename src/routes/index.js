import { Router } from "express";
import userRouter from "./userRouter.js";
import loginRouter from "./loginRouter.js";
import logoutRouter from "./logoutRouter.js";

const router = Router();

router.use(userRouter);
router.use(loginRouter);
router.use(logoutRouter)

export default router;
