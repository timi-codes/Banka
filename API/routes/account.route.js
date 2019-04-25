import { Router } from 'express';
import AccountContoller from '../controllers/account.controller';
import SchemaValidator from '../middlewares/SchemaValidator';
import authMiddleware from '../middlewares/AuthMiddleware';
import PermissionMiddleware from '../middlewares/PermissionMiddleware';


const router = Router();
const validateRequest = SchemaValidator();

router
  .post('/accounts',
    authMiddleware,
    validateRequest,
    AccountContoller.createBankAccount);

router
  .get('/accounts',
    authMiddleware,
    PermissionMiddleware.staffPermission,
    AccountContoller.fetchAllAccounts);

router
  .get('/accounts/:accountNumber',
    authMiddleware,
    PermissionMiddleware.strictAccountPermission,
    AccountContoller.getAccount);

router
  .patch('/accounts/:accountNumber',
    authMiddleware,
    validateRequest,
    PermissionMiddleware.adminPermission,
    AccountContoller.changeStatus);

router
  .delete('/accounts/:accountNumber',
    authMiddleware,
    PermissionMiddleware.staffPermission,
    AccountContoller.deleteAccount);

export default router;
