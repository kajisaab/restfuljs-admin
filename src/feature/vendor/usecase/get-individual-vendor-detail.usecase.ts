import executeQuery from '@common/executeQuery';
import AppLogger from '@core/logger';
import { Result } from '@core/middleware/ResponseHandler/Result';
import { BadRequestException } from '@core/middleware/errorHandler/BadRequestException';
import type { NextFunction, Request, Response } from 'express';
import { StatusEnum } from 'shared/enum/statusEnum.constant';
import { VendorType } from 'shared/enum/vendorType.constant';
import { GetIndividualVendorDetailResponse } from '../response/get-individual-vendor-detail.response';

async function getIndividualVendorDetails(req: Request, res: Response, next: NextFunction): Promise<Result<GetIndividualVendorDetailResponse>> {
  const id = req?.params.id;
  const logger = new AppLogger();

  if (!id) {
    throw new BadRequestException('Id is required');
  }

  try {
    const searchQuery = `select * from ecommerce.vendor_info as vi left join ecommerce.vendor_bank_detail as vbd on vi.id = vbd.vendor_id
    left join ecommerce.vendor_social_setting as vss on vi.id = vss.vendor_id where vi.id = '${id}'`;

    const dbresult = await executeQuery(searchQuery);

    if (dbresult.length === 0) {
      throw new BadRequestException('Sorry!! Wrong Vendor Id');
    }

    const { createdAt, updatedAt, isDeleted, modifiedAt, id: vendorSocialSettingId, vendorId, ...rest } = dbresult[0];

    const result = {
      id: vendorId,
      ...rest,
      status: StatusEnum.getByName(rest.status).displayName,
      vendorType: VendorType.getByName(rest.vendorType).displayName
    };
    const response = new GetIndividualVendorDetailResponse(result).data;
    return Result.createSuccess(response);
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

export default getIndividualVendorDetails;
