import loginSchema from "../schemas/loginSchema.js";

export default function loginSchemaValidation(req, res, next) {
  const validation = loginSchema.validate(req.body);
  if (validation.error) {
    return res.sendStatus(400);
  }

  next();
}
