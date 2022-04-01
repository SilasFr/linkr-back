import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js"
import { insertFollow, removeFollow, verifyFollow } from "../controllers/followController.js";
import followSchema from "../schemas/followSchema.js";

const followRouter = Router();

followRouter.post("/follows", verifyFollow)
followRouter.post("/follow", insertFollow);
followRouter.post("/unfollow", removeFollow)

export default followRouter;