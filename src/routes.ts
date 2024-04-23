import { Router } from 'express';
import authController from '@feature/auth/controller';

const routes = Router();
// All user operations will be available under the "users" route prefix.

routes.use('/auth', authController);

export default routes;
