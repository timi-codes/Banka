/**
 * schema.js
 */

import Joi from 'joi';

const name = Joi.string().regex(/^[A-Z]|[a-z]+$/).required();
const email = Joi.string().email().lowercase()
  .required();

const password = Joi.string().min(7).required().strict();

const createUserSchema = Joi.object({
  firstName: name,
  lastName: name,
  email,
  password,
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().strict()
    .error(new Error('your password and confirm password do not match')),
  type: Joi.when('isAdmin', {
    is: true,
    then: Joi.string().valid('staff').default('staff').error(new Error('an admin cannot register as a client')),
    otherwise: Joi.string().lowercase().valid('client', 'staff').required(),
  }),
  isAdmin: Joi.boolean().default(false),
});

const loginUserSchema = Joi.object({
  email,
  password,
});


module.exports = {
  '/signup': createUserSchema,
  '/signin': loginUserSchema,
};
