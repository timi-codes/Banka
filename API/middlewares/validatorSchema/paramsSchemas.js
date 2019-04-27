import Joi from 'joi';

const accountNumberSchema = Joi.object({
  accountNumber: Joi.string()
    .regex(/^\d+$/)
    .required()
    .error(new Error('accountNumber must be an integer')),
});

const transactionIdSchema = Joi.object({
  transactionId: Joi.string()
    .regex(/^\d+$/)
    .required()
    .error(new Error('trasactionId must be an integer')),
});

const emailSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainAtoms: 2 })
    .lowercase()
    .required(),
});

export default {
  '/accounts/:accountNumber': accountNumberSchema,
  '/transactions/:accountNumber/credit': accountNumberSchema,
  '/transactions/:accountNumber/debit': accountNumberSchema,
  '/accounts/:accountNumber/transactions': accountNumberSchema,
  '/transactions/:transactionId': transactionIdSchema,
  '/user/:email/accounts': emailSchema,
};
