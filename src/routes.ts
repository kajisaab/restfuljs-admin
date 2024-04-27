import { Router } from 'express';
import authController from '@feature/auth/controller';
import vendorController from '@feature/vendor/controller';
const routes = Router();
// All user operations will be available under the "users" route prefix.

routes.use('/auth', authController);

routes.use('/vendor', vendorController);

export default routes;
