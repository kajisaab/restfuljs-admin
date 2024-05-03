import type { Request, Response, NextFunction } from 'express';
import { GetIndividualVendorDetailResponse } from '../response/get-individual-vendor-detail.response';
import { Result } from '@core/middleware/ResponseHandler/Result';
import { BadRequestException } from '@core/middleware/errorHandler/BadRequestException';
import AppLogger from '@core/logger';
import executeQuery from '@common/executeQuery';

async function getIndividualVendorDetails(req: Request, res: Response, next: NextFunction): Promise<Result<GetIndividualVendorDetailResponse>> {
  const id = req?.params.id;
  const logger = new AppLogger();

  if (!id) {
    throw new BadRequestException('Id is required');
  }

  try {
    const searchQuery = `select * from ecommerce.vendor_info as vi left join ecommerce.vendor_bank_detail as vbd on vi.id = vbd.vendor_id
    left join ecommerce.vendor_social_setting as vss on vi.id = vss.vendor_id where vi.id = '${id}'`;

    const result = await executeQuery(searchQuery);

    if (result.length === 0) {
      throw new BadRequestException('Sorry!! Wrong Vendor Id');
    }
    const response = new GetIndividualVendorDetailResponse(result[0]);
    return Result.createSuccess(response);
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

export default getIndividualVendorDetails;
