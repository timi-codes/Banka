import Joi from 'joi';

const statusSchema = Joi.object({
  status: Joi.string().lowercase().valid('dormant', 'active'),
});

export default {
  '/accounts?status=dormant': statusSchema,
};
