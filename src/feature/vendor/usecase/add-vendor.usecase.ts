import AppLogger from '@core/logger';
import { Result } from '@core/middleware/ResponseHandler/Result';
import type { Request, Response } from 'express';

async function addVendorUsecase(
  req: Request,
  res: Response
): Promise<Result<string>> {
  const logger = new AppLogger();
  try {
    const body: any = req.body;
    console.log({ body });

    return Result.createSuccess('Successfully onboarded vendor');
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

export default addVendorUsecase;
