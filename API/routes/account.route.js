import { Router } from 'express';
import AccountContoller from '../controllers/account.controller';
import SchemaValidator from '../middlewares/SchemaValidator';
import authMiddleware from '../middlewares/AuthMiddleware';
import permissionMiddleware from '../middlewares/PermissionMiddleware';


const router = Router();
const validateRequest = SchemaValidator();

router.post('/accounts', authMiddleware, validateRequest, AccountContoller.createBankAccount);
router.get('/accounts', authMiddleware, permissionMiddleware, AccountContoller.fetchAllAccounts);
router.get('/accounts/:accountNumber', authMiddleware, permissionMiddleware, AccountContoller.getAccount);
router.patch('/accounts/:accountNumber', authMiddleware, validateRequest, permissionMiddleware, AccountContoller.changeStatus);
router.delete('/accounts/:accountNumber', authMiddleware, permissionMiddleware, AccountContoller.deleteAccount);

export default router;
