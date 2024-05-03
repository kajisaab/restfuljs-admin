import executeQuery from '@common/executeQuery';
import generateId from '@common/id-generator';
import generateRandomPassword from '@common/randomPassword';
import { databaseService } from '@config/db.config';
import AppLogger from '@core/logger';
import { BadRequestException } from '@core/middleware/errorHandler/BadRequestException';
import { Result } from '@core/middleware/ResponseHandler/Result';
import { SignupRequestDto } from '@feature/auth/request/SignupRequestDto.dto';
import { getUserInsertQuery } from '@feature/auth/usecase/signup.usecase';
import type { NextFunction, Request, Response } from 'express';
import { StatusEnum } from 'shared/enum/statusEnum.constant';
import { VendorType } from 'shared/enum/vendorType.constant';
import { AddVendorValidationSchema } from '../request/add-vendor.request';
import { UserType } from 'shared/enum/userType.constant';
import { UserRole } from 'shared/enum/userRole.constant';
import { AddVendorResponse } from '../response/add-vendor.response';

async function addVendorUsecase(req: Request, res: Response, next: NextFunction): Promise<Result<string>> {
  const logger = new AppLogger();
  try {
    const body: AddVendorValidationSchema = req.body;
    const { owner, vendor } = body;

    const vendor_id = generateId('4');

    const isOwnerRegistered = await executeQuery(`SELECT EXISTS(SELECT 1 FROM ecommerce.user_details WHERE email = '${vendor.email}' AND user_type = 'VENDOR') AS user_exists;`);

    if (isOwnerRegistered[0].userExists) {
      throw new BadRequestException(`Owner with ${vendor.email} is already registered`);
    }

    const isVendorContactDetailsRegistered = await executeQuery(`SELECT EXISTS(SELECT 1 FROM ecommerce.vendor_info WHERE contact_no = '${vendor.contactNo}') AS exists`);

    if (isVendorContactDetailsRegistered[0].exists) {
      throw new BadRequestException(`Vendor with ${vendor.contactNo} details already exists`);
    }

    const vendorInfoQuery = `INSERT INTO ecommerce.vendor_info (id, created_at, business_name, contact_no, image, status, vendor_type, email, country, province, state, street, 
      municipality, ward_no, rural_municipality, zip_code) VALUES ('${vendor_id}', '${new Date().toISOString()}', '${vendor.businessName}', '${vendor.contactNo}', '${
      vendor.image
    }',
    '${StatusEnum.PENDING.name}', '${VendorType.PRODUCT_SELLER.name}', '${vendor.email}', '${vendor.country}', '${vendor.province}', '${vendor.state}', '${vendor.street}', 
    ${vendor.municipality ? `'${vendor.municipality}'` : null}, '${vendor.wardNo}', ${vendor.ruralMunicipality ? `'${vendor.ruralMunicipality}'` : null}, '${vendor.zipCode}'
    )`;

    const vendorBankDetailsQuery = `INSERT INTO ecommerce.vendor_bank_detail (id, created_at, account_holder, account_number, bank_name, vendor_id) VALUES ('${generateId(
      '4'
    )}', '${new Date().toISOString()}', '${vendor.accountHolderName}', '${vendor.accountNumber}', '${vendor.bankName}', '${vendor_id}')`;

    const vendorSocialSettingQuery = `INSERT INTO ecommerce.vendor_social_setting (id, created_at, facebook_url, instagram_url, twitter_url, vendor_id) VALUES ('${generateId(
      '4'
    )}', '${new Date().toISOString()}', ${vendor.facebookUrl ? `'${vendor.facebookUrl}'` : null}, ${vendor.instagramUrl ? `'${vendor.instagramUrl}'` : null}, ${
      vendor.twitterUrl ? `'${vendor.twitterUrl}'` : null
    }, '${vendor_id}')`;

    const userDetails: SignupRequestDto = {
      firstName: owner.firstName,
      lastName: owner.lastName,
      email: vendor.email,
      password: generateRandomPassword(12),
      userName: owner.userName,
      phoneNumber: owner.contactNo,
      country: owner.country,
      province: owner.province,
      state: owner.state,
      street: owner.street,
      wardNo: owner.wardNo,
      municipality: owner.municipality,
      ruralMunicipality: owner.ruralMunicipality,
      image: owner.image,
      zipCode: owner.zipCode,
      userType: UserType.VENDOR.name,
      userRole: UserRole.ADMIN.name,
      user_is_active: 'FALSE'
    };

    const { userDetailsQuery, userCredentialQuery, userAddressQuery } = await getUserInsertQuery(userDetails);

    await databaseService.transaction(async (userOnboardintTransaction) => {
      // Perform your database operations within the userOnboardintTransaction
      // For example:
      // await userOnboardintTransaction.query('INSERT INTO ...');
      // await userOnboardintTransaction.save(entity);
      await userOnboardintTransaction.query(vendorInfoQuery);
      await userOnboardintTransaction.query(vendorBankDetailsQuery);
      await userOnboardintTransaction.query(vendorSocialSettingQuery);
      await userOnboardintTransaction.query(userDetailsQuery);
      await userOnboardintTransaction.query(userCredentialQuery);
      await userOnboardintTransaction.query(userAddressQuery);
    });

    const response = new AddVendorResponse('Successfully onboarded vendor');

    return Result.createSuccess(response);
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

export default addVendorUsecase;
