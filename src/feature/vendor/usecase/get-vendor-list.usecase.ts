import AppLogger from '@core/logger';
import type { Request, Response, NextFunction } from 'express';
import { GetVendorListRequest } from '../request/get-vendor-list.request';
import executeQuery from '@common/executeQuery';
import { databaseService } from '@config/db.config';
import { getConnection } from 'typeorm';
import { VendorType } from 'shared/enum/vendorType.constant';
import { VendorListDto } from '../dto/get-vendor-list.dto';
import { StatusEnum } from 'shared/enum/statusEnum.constant';
import { GetVendorListResponse } from '../response/get-vendor-list.response';
import { Result } from '@core/middleware/ResponseHandler/Result';

async function getVendorListUsecase(req: Request, res: Response, next: NextFunction): Promise<Result<GetVendorListResponse>> {
  const logger = new AppLogger();
  try {
    const page = Number(req?.query?.page) || 1;
    const pageSize = Number(req?.query?.pageSize) || 10;
    const { filters, searchText }: GetVendorListRequest = req.body;

    const skip = (page - 1) * pageSize;

    const filterStatus = Object.values(filters[0])[0];

    const query = `
      SELECT
      business_name, province, state,
      municipality,
        CASE WHEN rural_municipality = '{}' THEN NULL ELSE rural_municipality END AS rural_municipality,
      image, contact_no, email,
      vendor_type,
      status,
      country
      FROM ecommerce.vendor_info
      WHERE status ${filterStatus.toLowerCase() === 'all' || filterStatus === '' ? '<>' : '='} '${filterStatus || ''}' AND (
        created_at::text ILIKE '${searchText || ''}%' 
        OR contact_no ILIKE '${searchText || ''}%' 
        OR business_name ILIKE '${searchText || ''}%' 
        OR vendor_type ILIKE '${searchText || ''}%' 
        OR email ILIKE '${searchText || ''}%' 
        OR country ILIKE '${searchText || ''}%' 
        OR province ILIKE '${searchText || ''}%' 
        OR state ILIKE '${searchText || ''}%' 
        OR municipality ILIKE '${searchText || ''}%' 
        OR rural_municipality ILIKE '${searchText || ''}%'
      )
      OFFSET ${skip}
      LIMIT ${pageSize};
    `;

    const dbresults = await executeQuery(query);

    const results = dbresults.map((result: VendorListDto) => {
      return {
        ...result,
        vendorType: VendorType.getByName(result.vendorType).displayName,
        status: StatusEnum.getByName(result.status).displayName
      };
    });

    const response = new GetVendorListResponse(results).list;

    return Result.createSuccess(response);
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

export default getVendorListUsecase;
