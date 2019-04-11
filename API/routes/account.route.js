import { Router } from 'express';
import AccountContoller from '../controllers/account.controller';
import SchemaValidator from '../middlewares/SchemaValidator';
import authMiddleware from '../middlewares/AuthMiddleware';
import permissionMiddleware from '../middlewares/PermissionMiddleware';


const router = Router();
const validateRequest = SchemaValidator(false);

router.post('/accounts', authMiddleware, validateRequest, AccountContoller.createBankAccount);
router.get('/accounts', authMiddleware, permissionMiddleware, AccountContoller.fetchAllAccounts);
router.patch('/accounts/:accountNumber', authMiddleware, validateRequest, permissionMiddleware, AccountContoller.changeStatus);

export default router;
