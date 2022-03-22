/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */

import { newPostSchema } from '../schemas/index.js';

export function postValidationMiddleware(req, res, next) {
  const newPostData = req.body;
  const newPostValidation = newPostSchema.validate(newPostData);
  console.log('reached middleware: ', newPostData);

  if (newPostValidation.error) {
    const errorDetails = newPostValidation.error.details[0];
    console.log(errorDetails);
    return res.status(500).send(errorDetails.message);
  }
  res.locals.newPostData = newPostValidation.value;
  return next();
}
