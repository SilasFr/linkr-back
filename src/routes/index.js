/* eslint-disable import/extensions */

import { Router } from 'express';

import postsRouter from './postsRouter.js';

const mainRouter = Router();

mainRouter.use(postsRouter);

export default mainRouter;
