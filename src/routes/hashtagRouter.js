import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js"
import { insertHashtag } from "../controllers/hashtagController.js";
import hashtagSchema from "../schemas/hashtagSchema.js";

const hashtagRouter = Router();

hashtagRouter.post("/hashtag", validateSchemaMiddleware(hashtagSchema), insertHashtag);

export default hashtagRouter;
