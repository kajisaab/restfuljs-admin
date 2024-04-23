import { StatusCode } from '@common/statucCodeEnum';
import { CustomError } from './CustomError';
export class ClientError extends CustomError<ClientError> {
  constructor(message: string, title: string = 'Bad Request') {
    super(message, StatusCode.BAD_REQUEST, title);
  }
}
