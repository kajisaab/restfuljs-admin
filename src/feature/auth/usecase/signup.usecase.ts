import { type Request, type Response } from 'express';
import { Result } from '@core/middleware/ResponseHandler/Result';
import { type SignupRequestDto } from '../request/SignupRequestDto.dto';

async function SignupUsecase(
  req: Request,
  res: Response
): Promise<Result<string>> {
  const requestBody: SignupRequestDto = req.body;
  console.log({ requestBody });
  return Result.createSuccess({ message: 'Successfully created user' });
}

export default SignupUsecase;
