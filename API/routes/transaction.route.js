import { Router } from 'express';
import TransactionContoller from '../controllers/transaction.controller';
import SchemaValidator from '../middlewares/SchemaValidator';
import authMiddleware from '../middlewares/AuthMiddleware';
import PermissionMiddleware from '../middlewares/PermissionMiddleware';


const router = Router();
const validateRequest = SchemaValidator();

router
  .post('/transactions/:accountNumber/debit',
    authMiddleware,
    PermissionMiddleware.cashierPermission,
    validateRequest,
    TransactionContoller.debitUserAccount);

router
  .post('/transactions/:accountNumber/credit',
    authMiddleware,
    PermissionMiddleware.cashierPermission,
    validateRequest,
    TransactionContoller.creditUserAccount);

router
  .get('/accounts/:accountNumber/transactions',
    authMiddleware,
    PermissionMiddleware.strictAccountPermission,
    validateRequest,
    TransactionContoller.getTransactions);

router
  .get('/transactions/:transactionId',
    authMiddleware,
    PermissionMiddleware.strictTransactionPermission,
    validateRequest,
    TransactionContoller.getATransaction);

export default router;
