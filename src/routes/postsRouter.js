import { Router } from 'express';

import { postValidationMiddleware } from '../middlewares/postValidationMiddleware.js';
import { validateTokenMiddleware } from '../middlewares/validateTokenMiddleware.js';
import { likeValidationMiddleware } from '../middlewares/likeValidationMiddleware.js';

import { getPosts } from "../controllers/postsController.js";
import { newPost, likePost } from '../controllers/postsController.js';

const postsRouter = Router();

postsRouter.post('/posts/new', postValidationMiddleware, validateTokenMiddleware, newPost);
postsRouter.get("/timeline", validateTokenMiddleware, getPosts);
postsRouter.post('/posts/like', validateTokenMiddleware, likeValidationMiddleware, likePost);

export default postsRouter;
