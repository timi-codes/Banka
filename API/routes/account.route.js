import { Router } from 'express';
import AccountContoller from '../controllers/account.controller';
import BodySchemaValidator from '../middlewares/BodySchemaValidator';
import ParamsSchemaValidator from '../middlewares/ParamsSchemaValidator';

import authMiddleware from '../middlewares/AuthMiddleware';
import PermissionMiddleware from '../middlewares/PermissionMiddleware';


const router = Router();
const validateBody = BodySchemaValidator();
const validateParams = ParamsSchemaValidator();


router
  .post('/accounts',
    authMiddleware,
    validateBody,
    AccountContoller.createBankAccount);

router
  .get('/accounts',
    authMiddleware,
    PermissionMiddleware.staffPermission,
    AccountContoller.fetchAllAccounts);

router
  .get('/accounts/:accountNumber',
    authMiddleware,
    validateParams,
    PermissionMiddleware.strictAccountPermission,
    AccountContoller.getAccount);

router
  .patch('/accounts/:accountNumber',
    authMiddleware,
    validateParams,
    validateBody,
    PermissionMiddleware.adminPermission,
    AccountContoller.changeStatus);

router
  .delete('/accounts/:accountNumber',
    authMiddleware,
    validateParams,
    PermissionMiddleware.staffPermission,
    AccountContoller.deleteAccount);

router
  .get('/user/:email/accounts',
    authMiddleware,
    validateParams,
    PermissionMiddleware.strictAccountPermission,
    AccountContoller.getAUserAccounts);

export default router;
