import { Router } from "express";
import userSchema from "../schemas/userSchema.js";
import {
  createUser,
  getUser,
  searchUser,
  searchUserId,
} from "../controllers/userController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const userRouter = Router();

userRouter.post("/sign-up", validateSchemaMiddleware(userSchema), createUser);
userRouter.get("/timeline/users", validateTokenMiddleware, searchUser);
userRouter.get("/user/:id", validateTokenMiddleware, getUser);
userRouter.get("/userpage/user", validateTokenMiddleware, searchUserId);

export default userRouter;
