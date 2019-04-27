import Joi from 'joi';

const name = Joi.string().regex(/^\D+$/).required();

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
});

const createStaffSchema = Joi.object({
  firstName: name,
  lastName: name,
  email,
  password,
  isAdmin: Joi.boolean().required(),
});

const loginUserSchema = Joi.object({
  email,
  password,
});

const createAccountSchema = Joi.object({
  type: Joi.string().lowercase().valid('savings', 'current').required(),
  balance: Joi.number().positive().allow(0).precision(2)
    .default(0.00),
});

const updateStatusSchema = Joi.object({
  status: Joi.string().lowercase().valid('dormant', 'active').required(),
});

const transactionSchema = Joi.object({
  amount: Joi.number().positive().precision(2).required(),
});


export default {
  '/signup': createUserSchema,
  '/signin': loginUserSchema,
  '/accounts': createAccountSchema,
  '/accounts/:accountNumber': updateStatusSchema,
  '/transactions/:accountNumber/debit': transactionSchema,
  '/transactions/:accountNumber/credit': transactionSchema,
  '/create/staff': createStaffSchema,
};
