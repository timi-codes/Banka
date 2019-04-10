import { Router } from 'express';
import UserController from '../controllers/user.controller';
import SchemaValidator from '../middlewares/SchemaValidator';

const router = Router();
const validateRequest = SchemaValidator(false);

router.post('/signup', validateRequest, UserController.createUser);


export default router;
