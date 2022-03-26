import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js"
import { getHashtags, insertHashtag } from "../controllers/hashtagController.js";
import hashtagSchema from "../schemas/hashtagSchema.js";

const hashtagRouter = Router();

hashtagRouter.post("/hashtag", validateSchemaMiddleware(hashtagSchema), insertHashtag);
hashtagRouter.get("/hashtag", getHashtags)

export default hashtagRouter;
