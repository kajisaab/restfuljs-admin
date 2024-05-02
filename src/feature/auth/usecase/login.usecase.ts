import { BadRequestException } from '@core/middleware/errorHandler/BadRequestException';
import type { Request, Response, NextFunction } from 'express';
import { LoginResponse } from '../response/loginResponse.response';
import { Result } from '@core/middleware/ResponseHandler/Result';
import executeQuery from '@common/executeQuery';
import { type LoginRequestDto } from '../request/loginReuqestDto.dto';
import { type loginFindUserDbQueryResonseDto } from '../dto/dbResponseDto.dto';
import { createToken } from '@core/auth/JwtStrategy';
import config from '@config/index';
import { type JwtConfigurationInterface } from 'utils/jwtConfigInterface.interface';
import AppLogger from '@core/logger';
import { comparePassword } from '@core/hashing/hashing';
import { UserType } from 'shared/enum/userType.constant';
import { UserRole } from 'shared/enum/userRole.constant';
import type { LoginResponseDto } from '../dto/loginResponse.dto';

async function LoginUsecase(req: Request, res: Response, next: NextFunction): Promise<Result<LoginResponseDto>> {
  const logger = new AppLogger();
  try {
    const body: LoginRequestDto = req.body;

    const query = `SELECT ud.id, ud.email, concat(ud.first_name, ' ', ud.last_name) as "fullName", ud.phone_number, ud.role, ud.user_name, ud.user_type, uc.login_attempts, uc.max_login_attempts, 
    uc.password FROM ecommerce.user_details ud LEFT JOIN ecommerce.user_credential uc on ud.id = uc.user_id where ud.email = '${body.email}'`;

    const result: loginFindUserDbQueryResonseDto[] = await executeQuery(query);

    if (result === null || Object.keys(result).length === 0) {
      throw new BadRequestException(`Sorry! cannot find user with ${body.email} email. `);
    }

    const isPasswordCorrect = await comparePassword(body.password, result[0].password, `${result[0].fullName}`, result[0].userName);

    if (!isPasswordCorrect) {
      throw new BadRequestException("Sorry, password doesn't match. Please try again");
    }

    const { id, email, fullName, role, userType } = result[0];
    const tokenPayload = {
      id,
      email,
      fullName,
      role,
      userType
    };
    const { accessToken, refreshToken } = generateAccessAndRefreshToken(tokenPayload);

    await executeQuery(`UPDATE ecommerce.user_details SET refresh_token = '${refreshToken}' WHERE id = '${id}'`);

    const responseStruct: LoginResponseDto = {
      email,
      fullName,
      role: UserRole.getByName(role)?.displayName,
      userType: UserType.getByName(userType)?.displayName,
      userName: result[0].userName,
      phoneNumber: result[0].phoneNumber,
      accessToken,
      refreshToken
    };

    const response = new LoginResponse(responseStruct).data;

    return Result.createSuccess(response);
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

export default LoginUsecase;

function generateAccessAndRefreshToken(payload: string | object | Buffer): {
  accessToken: string;
  refreshToken: string;
} {
  const accessToken = createToken(payload, config.accessJwt as JwtConfigurationInterface, config.accessJwt.audience as string);
  const refreshToken = createToken(payload, config.refreshJwt as JwtConfigurationInterface, config.refreshJwt.audience as string);

  return { accessToken, refreshToken };
}
