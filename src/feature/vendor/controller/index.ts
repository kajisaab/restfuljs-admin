/* eslint-disable @typescript-eslint/no-misused-promises */
import { asyncHandler } from '@core/middleware/ResponseHandler/asyncHandler';
import { Router } from 'express';
import addVendorUsecase from '../usecase/add-vendor.usecase';
import { validate } from '@core/validation';
import { addVendorValidationSchema } from '../validationSchema/add-vendor.validation';

const router = Router();

router.post(
  '',
  validate(addVendorValidationSchema),
  asyncHandler(addVendorUsecase)
);
