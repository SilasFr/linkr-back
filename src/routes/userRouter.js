import { Router } from "express";
import userSchema from "../schemas/userSchema.js";
import { createUser } from "../controllers/userController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";

const userRouter = Router();

userRouter.post("/sign-up", validateSchemaMiddleware(userSchema), createUser);

export default userRouter;
