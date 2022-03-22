import Joi from "joi";

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  userName: Joi.string().required(),
  pictureUrl: Joi.uri().required(),
});

export default userSchema;
