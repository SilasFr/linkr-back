import { Router } from "express";
import loginSchemaValidation from "../middlewares/loginSchemaValidation.js";
import { getSession, login } from "../controllers/loginController.js";

const loginRouter = Router();

loginRouter.post("/", loginSchemaValidation, login);
loginRouter.get("/", getSession);

export default loginRouter;
