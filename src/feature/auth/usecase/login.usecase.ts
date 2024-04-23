import { ClientError } from '@core/middleware/errorHandler/clientError';
import type { Request, Response, NextFunction } from 'express';
import { type LoginResponseDto } from '../response/loginResponseDto.dto';
import { Result } from '@core/middleware/ResponseHandler/Result';
import executeQuery from '@common/executeQuery';
import { type LoginRequestDto } from '../request/loginReuqestDto.dto';
import * as bcrypt from 'bcrypt';
import { type loginFindUserDbQueryResonseDto } from '../dto/dbResponseDto.dto';
import { createToken } from '@core/auth/JwtStrategy';
import config from '@config/index';
import { type JwtConfigurationInterface } from 'utils/jwtConfigInterface.interface';
import AppLogger from '@core/logger';

async function LoginUsecase(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Result<LoginResponseDto>> {
  const logger = new AppLogger();
  try {
    const body: LoginRequestDto = req.body;

    const query = `SELECT ud.id, ud.email, concat(ud.first_name, ' ', ud.last_name) as 'fullName', \n
    ud.phone_number, ud.role, ud.user_name, \n
    ud.user_type, uc.login_attempts, uc.max_login_attempts, \n
    uc.password FROM user_details ud LEFT JOIN user_credential \n
    uc on ud.id = uc.user_id where ud.email = '${body.email}'`;

    const result: loginFindUserDbQueryResonseDto = await executeQuery(query);

    if (result === null || Object.keys(result).length === 0) {
      throw new ClientError(
        `Sorry! cannot find user with ${body.email} email. `
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      body.password,
      result.password
    );

    if (!isPasswordCorrect) {
      throw new ClientError("Sorry, password doesn't match. Please try again");
    }

    const { id, email, fullName, role, userType } = result;
    const tokenPayload = {
      id,
      email,
      fullName,
      role,
      userType
    };
    const { accessToken, refreshToken } =
      generateAccessAndRefreshToken(tokenPayload);

    await executeQuery(
      `UPDATE ecommerce.user_details SET refresh_token = '${refreshToken}' WHERE id = '${id}'`
    );

    const response: LoginResponseDto = {
      id,
      email,
      fullName,
      role,
      userType,
      userName: result.userName,
      phoneNumber: result.phoneNumber,
      accessToken,
      refreshToken
    };

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
  const accessToken = createToken(
    payload,
    config.accessJwt as JwtConfigurationInterface,
    config.accessJwt.audience as string
  );
  const refreshToken = createToken(
    payload,
    config.refreshJwt as JwtConfigurationInterface,
    config.refreshJwt.audience as string
  );

  return { accessToken, refreshToken };
}
