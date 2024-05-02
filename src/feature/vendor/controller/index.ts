/* eslint-disable @typescript-eslint/no-misused-promises */
import { asyncHandler } from '@core/middleware/ResponseHandler/asyncHandler';
import { Router } from 'express';
import addVendorUsecase from '../usecase/add-vendor.usecase';
import { validate } from '@core/validation';
import { addVendorValidationSchema } from '../validationSchema/add-vendor.validation';
import getVendorListUsecase from '../usecase/get-vendor-list.usecase';

const router = Router();

router.post('/onboard', validate(addVendorValidationSchema), asyncHandler(addVendorUsecase));

router.get('/list', asyncHandler(getVendorListUsecase));

export default router;
