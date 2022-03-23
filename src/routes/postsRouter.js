import { Router } from 'express';

import { postValidationMiddleware } from '../middlewares/index.js';

import { newPost, getPosts } from '../controllers/index.js';

const postsRouter = Router();

postsRouter.post('/posts/new', postValidationMiddleware, newPost);
postsRouter.get('/posts', getPosts);

export default postsRouter;
