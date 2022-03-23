import logoutSchema from "../schemas/logoutSchema.js";

export default function logoutSchemaValidation(req, res, next) {
  const validation = logoutSchema.validate(req.body);
  if (validation.error) {
    return res.sendStatus(400);
  }

  next();
}
