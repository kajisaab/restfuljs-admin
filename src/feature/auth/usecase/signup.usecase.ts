import executeQuery from '@common/executeQuery';
import generateId from '@common/id-generator';
import { databaseService } from '@config/db.config';
import { hashPassword } from '@core/hashing/hashing';
import AppLogger from '@core/logger';
import { BadRequestException } from '@core/middleware/errorHandler/BadRequestException';
import { Result } from '@core/middleware/ResponseHandler/Result';
import { type Request, type Response } from 'express';
import { UserRole } from 'shared/enum/userRole.constant';
import { UserType } from 'shared/enum/userType.constant';
import { type SignupRequestDto } from '../request/SignupRequestDto.dto';
import { SignupResponse } from '../response/signupResponse.response';

const logger = new AppLogger();

async function SignupUsecase(req: Request, res: Response): Promise<Result<string>> {
  try {
    const requestBody: SignupRequestDto = req.body;

    const isEmailRegistered = await executeQuery(`SELECT EXISTS(SELECT 1 FROM ecommerce.user_details where email = '${requestBody.email}') AS user_exists`);

    if (isEmailRegistered[0].userExists) {
      throw new BadRequestException(`User with the ${requestBody.email} email is registered`);
    }

    const { userDetailsQuery, userCredentialQuery, userAddressQuery } = await getUserInsertQuery(requestBody);
    await databaseService.transaction(async (userOnboardintTransaction) => {
      // Perform your database operations within the userOnboardintTransaction
      // For example:
      // await userOnboardintTransaction.query('INSERT INTO ...');
      // await userOnboardintTransaction.save(entity);
      await userOnboardintTransaction.query(userDetailsQuery);
      await userOnboardintTransaction.query(userCredentialQuery);
      await userOnboardintTransaction.query(userAddressQuery);
    });

    const response = new SignupResponse('Successfully created user');
    return Result.createSuccess(response);
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

export async function getUserInsertQuery(requestBody: SignupRequestDto): Promise<{ userDetailsQuery: string; userCredentialQuery: string; userAddressQuery: string }> {
  try {
    const userId = generateId('4');

    // Define the INSERT query
    const userDetailsQuery = `INSERT INTO ecommerce.user_details (id, created_at, is_active, email, first_name, last_name, phone_number, role, user_name, user_type, image) VALUES ('${userId}', '${new Date().toISOString()}', ${
      requestBody?.user_is_active ? `'${requestBody.user_is_active}'` : 'TRUE'
    }, '${requestBody.email}', '${requestBody.firstName}', '${requestBody.lastName}', '${requestBody.phoneNumber}', '${requestBody?.userRole ?? UserRole.ADMIN.name}', '${
      requestBody.userName
    }', '${requestBody?.userType ?? UserType.VENDOR.name}', '${requestBody.image}')`;

    const hashedPassword = await hashPassword(requestBody.password, `${requestBody.firstName} ${requestBody.lastName}`, requestBody.userName);

    const userCredentialQuery = `INSERT INTO ecommerce.user_credential (id, user_id, created_at, password) VALUES('${generateId(
      '4'
    )}','${userId}', '${new Date().toISOString()}', '${hashedPassword}')`;

    const municipality = requestBody.municipality !== '' ? `'${requestBody.municipality}'` : 'null';
    const ruralMunicipality = requestBody.ruralMunicipality !== '' ? `'${requestBody.ruralMunicipality}'` : 'null';

    const userAddressQuery = `INSERT INTO ecommerce.user_address (id, user_id, created_at, country, municipality, province, rural_municipality, state, street, ward_no, zip_code) VALUES ('${generateId(
      '4'
    )}', '${userId}', '${new Date().toISOString()}', '${requestBody.country}', ${municipality} , '${requestBody.province}', 
    ${ruralMunicipality},'${requestBody.state}', '${requestBody.street}', '${requestBody.wardNo}', '${requestBody.zipCode}')`;

    return { userDetailsQuery, userCredentialQuery, userAddressQuery };
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

export default SignupUsecase;
