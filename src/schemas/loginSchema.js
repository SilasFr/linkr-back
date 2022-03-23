import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export default loginSchema;
