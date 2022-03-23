import { Router } from "express";
import logoutSchemaValidation from "../middlewares/logoutSchemaValidation.js";
import { logout } from "../controllers/logoutCountroller.js";

const logoutRouter = Router();

logoutRouter.post("/logout", logoutSchemaValidation, logout);

export default logoutRouter;
