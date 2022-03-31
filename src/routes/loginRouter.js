import { Router } from "express";
import loginSchema from '../schemas/loginSchema.js';
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { getSession, login } from "../controllers/loginController.js";

const loginRouter = Router();

loginRouter.post("/", validateSchemaMiddleware(loginSchema), login);
loginRouter.get("/", getSession);

export default loginRouter;
