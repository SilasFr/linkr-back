export function validateSchemaMiddleware(schema) {
  return (req, res, next) => {
    const payload = req.body;
    const validation = schema.validate(payload);

    if (validation.error) {
      return res.sendStatus(422);
    }

    res.locals.payload = payload;
    next();
  };
}
