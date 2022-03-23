import { Router } from 'express';

import postsRouter from './postsRouter.js';
import loginRouter from './loginRouter.js';
import userRouter from './userRouter.js';

const router = Router();

router.use(userRouter);
router.use(loginRouter);
router.use(postsRouter);

export default router;
