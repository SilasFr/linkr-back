import Joi from 'joi';

const followSchema = Joi.object({
  sessionUserId: Joi.number().required(),
  userId: Joi.number().required()
});

export default followSchema;
