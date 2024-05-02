import AppLogger from '@core/logger';
import type { Request, Response, NextFunction } from 'express';
import { GetVendorListRequest } from '../request/get-vendor-list.request';

async function getVendorListUsecase(req: Request, res: Response, next: NextFunction) {
  const logger = new AppLogger();
  try {
    const page = req?.query?.page || 1;
    const pageSize = req?.query?.pageSize || 10;
    const body: GetVendorListRequest = req.body;
  } catch (err) {
    logger.error(err);
    throw err;
  }
  //  try {
  // // Constructing the SQL query dynamically based on the search term
  // const query = `
  //   SELECT *
  //   FROM vendor_info
  //   WHERE userType = $1 AND(
  //     id ILIKE $1 OR
  //     created_at::text ILIKE $1 OR
  //     contact_no ILIKE $1 OR
  //     business_name ILIKE $1 OR
  //     vendor_type ILIKE $1 OR
  //     email ILIKE $1 OR
  //     country ILIKE $1 OR
  //     province ILIKE $1 OR
  //     state ILIKE $1 OR
  //     street ILIKE $1 OR
  //     municipality ILIKE $1 OR
  //     ward_no ILIKE $1 OR
  //     rural_municipality ILIKE $1 OR
  //     zip_code ILIKE $1
  //  )
  //   `;

  // const values = [`%${searchTerm}%`];
  // const result = await client.query(query, values);
  // return result.rows;
}

export default getVendorListUsecase;
