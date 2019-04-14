import { Router } from 'express';
import TransactionContoller from '../controllers/transaction.controller';
import SchemaValidator from '../middlewares/SchemaValidator';
import authMiddleware from '../middlewares/AuthMiddleware';
import permissionMiddleware from '../middlewares/PermissionMiddleware';


const router = Router();
const validateRequest = SchemaValidator();

router.post('/transactions/:accountNumber/debit', authMiddleware, permissionMiddleware, validateRequest, TransactionContoller.debitUserAccount);
router.post('/transactions/:accountNumber/credit', authMiddleware, permissionMiddleware, validateRequest, TransactionContoller.creditUserAccount);
export default router;
