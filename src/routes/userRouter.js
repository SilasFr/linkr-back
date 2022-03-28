import { Router } from "express";
import userSchema from "../schemas/userSchema.js";
import { createUser, searchUser } from "../controllers/userController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const userRouter = Router();

userRouter.post("/sign-up", validateSchemaMiddleware(userSchema), createUser);
userRouter.get("/timeline/users", validateTokenMiddleware, searchUser);

export default userRouter;
