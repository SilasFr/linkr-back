import { Router } from "express";
import loginSchemaValidation from "../middlewares/loginSchemaValidation.js";
import { login } from "../controllers/loginController.js";

const loginRouter = Router();

loginRouter.post("/", loginSchemaValidation, login);

export default loginRouter;
