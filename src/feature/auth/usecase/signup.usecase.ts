import { type Request, type Response } from 'express';
import { Result } from '@core/middleware/ResponseHandler/Result';
import { type SignupRequestDto } from '../request/SignupRequestDto.dto';
import executeQuery from '@common/executeQuery';
import { BadRequestException } from '@core/middleware/errorHandler/BadRequestException';
import AppLogger from '@core/logger';
import generateId from '@common/id-generator';
import { UserRole } from 'shared/enum/userRole.constant';
import { UserType } from 'shared/enum/userType.constant';
import { hashPassword } from '@core/hashing/hashing';

async function SignupUsecase(req: Request, res: Response): Promise<Result<string>> {
  const logger = new AppLogger();
  try {
    const requestBody: SignupRequestDto = req.body;

    const isEmailRegistered = await executeQuery(`SELECT * FROM ecommerce.user_details where email = '${requestBody.email}'`);

    if (isEmailRegistered.length > 0) {
      throw new BadRequestException(`User with the ${requestBody.email} email is registered`);
    }

    const userId = generateId('4');

    // Define the INSERT query
    const userDetailsQuery = `INSERT INTO ecommerce.user_details (id, created_at, is_active, email, first_name, last_name, phone_number, role, user_name, user_type) VALUES ('${userId}', '${new Date().toISOString()}', 'TRUE', '${
      requestBody.email
    }', '${requestBody.firstName}', '${requestBody.lastName}', '${requestBody.phoneNumber}', '${UserRole.ADMIN.name}', '${requestBody.userName}', '${UserType.VENDOR.name}')`;

    const hashedPassword = await hashPassword(requestBody.password, `${requestBody.firstName} ${requestBody.lastName}`, requestBody.userName);

    const userCredentialQuery = `INSERT INTO ecommerce.user_credential (id, user_id, created_at, password) VALUES('${generateId(
      '4'
    )}','${userId}', '${new Date().toISOString()}', '${hashedPassword}')`;

    await executeQuery(userDetailsQuery);
    await executeQuery(userCredentialQuery);

    return Result.createSuccess({ message: 'Successfully created user' });
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

export default SignupUsecase;
