import { Router } from 'express';
import TransactionContoller from '../controllers/transaction.controller';
import SchemaValidator from '../middlewares/SchemaValidator';
import authMiddleware from '../middlewares/AuthMiddleware';
import permissionMiddleware from '../middlewares/PermissionMiddleware';


const router = Router();
const validateRequest = SchemaValidator(false);

router.post('/transactions/:accountNumber/debit', authMiddleware, permissionMiddleware, validateRequest, TransactionContoller.debitUserAccount);
export default router;
