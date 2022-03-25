import likePostSchema from '../schemas/likePostSchema.js';

export function likeValidationMiddleware(req, res, next) {
  const newLikeData = req.body;
  const newLikeValidation = newLikeSchema.validate(newLikeData);

  if (newLikeValidation.error) {
    const errorDetails = newLikeValidation.error.details[0];
    console.log(errorDetails);
    return res.status(500).send(errorDetails.message);
  }
  res.locals.newLikeData = newLikeValidation.value;
  return next();
}
