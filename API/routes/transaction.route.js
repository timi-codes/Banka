import { Router } from 'express';
import TransactionContoller from '../controllers/transaction.controller';
import BodySchemaValidator from '../middlewares/BodySchemaValidator';
import ParamsSchemaValidator from '../middlewares/ParamsSchemaValidator';

import authMiddleware from '../middlewares/AuthMiddleware';
import PermissionMiddleware from '../middlewares/PermissionMiddleware';


const router = Router();
const validateBody = BodySchemaValidator();
const validateParams = ParamsSchemaValidator();


router
  .post('/transactions/:accountNumber/debit',
    authMiddleware,
    PermissionMiddleware.cashierPermission,
    validateParams,
    validateBody,
    TransactionContoller.debitUserAccount);

router
  .post('/transactions/:accountNumber/credit',
    authMiddleware,
    PermissionMiddleware.cashierPermission,
    validateParams,
    validateBody,
    TransactionContoller.creditUserAccount);

router
  .get('/accounts/:accountNumber/transactions',
    authMiddleware,
    validateParams,
    PermissionMiddleware.strictAccountPermission,
    TransactionContoller.getTransactions);

router
  .get('/transactions/:transactionId',
    authMiddleware,
    validateParams,
    PermissionMiddleware.strictTransactionPermission,
    TransactionContoller.getATransaction);

export default router;
