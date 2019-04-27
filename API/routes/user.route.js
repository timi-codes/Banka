import { Router } from 'express';
import UserController from '../controllers/user.controller';
import BodySchemaValidator from '../middlewares/BodySchemaValidator';
import PermissionMiddleware from '../middlewares/PermissionMiddleware';
import authMiddleware from '../middlewares/AuthMiddleware';


const router = Router();
const validateRequest = BodySchemaValidator();

router
  .post('/signup',
    validateRequest,
    UserController.createUser);

router
  .post('/signin',
    validateRequest,
    UserController.loginUser);

router
  .post('/create/staff',
    authMiddleware,
    validateRequest,
    PermissionMiddleware.adminPermission,
    UserController.createStaff);


export default router;
