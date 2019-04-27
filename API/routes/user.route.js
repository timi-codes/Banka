import { Router } from 'express';
import UserController from '../controllers/user.controller';
import BodySchemaValidator from '../middlewares/BodySchemaValidator';

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

export default router;
