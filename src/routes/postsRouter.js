import { Router } from 'express';

import { postValidationMiddleware } from '../middlewares/index.js';

import { newPost } from '../controllers/index.js';

const postsRouter = Router();

postsRouter.post('/posts/new', postValidationMiddleware, newPost);

export default postsRouter;
