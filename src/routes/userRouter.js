import { Router } from "express";
import userSchema from "../schemas/userSchema.js";
<<<<<<< HEAD
import {
  createUser,
  getUser,
  searchUser,
} from "../controllers/userController.js";
=======
import { createUser, searchUser, searchUserId } from "../controllers/userController.js";
>>>>>>> main
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const userRouter = Router();

userRouter.post("/sign-up", validateSchemaMiddleware(userSchema), createUser);
userRouter.get("/timeline/users", validateTokenMiddleware, searchUser);
<<<<<<< HEAD
userRouter.get("/user/:id", validateTokenMiddleware, getUser);
=======
userRouter.get("/userpage/user", validateTokenMiddleware, searchUserId)
>>>>>>> main

export default userRouter;
