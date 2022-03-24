import { Router } from "express";
import userRouter from "./userRouter.js";
import loginRouter from "./loginRouter.js";
<<<<<<< HEAD
import postsRouter from "./postsRouter.js";
=======
import logoutRouter from "./logoutRouter.js";
>>>>>>> main

const router = Router();

router.use(userRouter);
router.use(loginRouter);
<<<<<<< HEAD
router.use(postsRouter);
=======
router.use(logoutRouter)
>>>>>>> main

export default router;
