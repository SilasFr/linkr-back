import Joi from 'joi';

const likePostSchema = Joi.object({
  postId: Joi.number().integer(),
  userId: Joi.number().integer(),
});

export default likePostSchema;
