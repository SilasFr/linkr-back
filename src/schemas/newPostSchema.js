import Joi from 'joi';

const newPostSchema = Joi.object({
  description: Joi.string().trim().allow(''),
  link: Joi.string().trim().uri(),
});

export default newPostSchema;
