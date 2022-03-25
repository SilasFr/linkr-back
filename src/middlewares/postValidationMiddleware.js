import newPostSchema from "../schemas/newPostSchema.js";

export function postValidationMiddleware(req, res, next) {
  const newPostData = req.body;
  const newPostValidation = newPostSchema.validate(newPostData);

  if (newPostValidation.error) {
    const errorDetails = newPostValidation.error.details[0];
    return res.status(500).send(errorDetails.message);
  }
  res.locals.newPostData = newPostValidation.value;
  return next();
}
