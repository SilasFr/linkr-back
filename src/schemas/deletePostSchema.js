import Joi from "joi";

const deletePostSchema = Joi.object({
  id: Joi.integer().required(),
});

export default deletePostSchema;
