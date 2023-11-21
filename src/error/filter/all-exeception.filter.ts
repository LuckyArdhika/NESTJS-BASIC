import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const req = ctx.getRequest();
    const res = ctx.getResponse();

    const path = httpAdapter.getRequestUrl(ctx.getRequest());
    const timestamp = new Date().toISOString();
    const responseBody = {
      data: exception.response?.message ?? exception.response,
      statusCode: httpStatus,
      respCode: exception.respCode ?? "UNKNOWN",
      error: exception.name,
      message: exception instanceof HttpException ? exception.message : `[${exception.code ?? "UNKNOWN"}] Internal Server Error`,
      timestamp,
      path,
    };

    // basic 400
    if (httpStatus == 400) {
      responseBody.data = {};
      responseBody.respCode = "body.BAD_REQUEST";
    }
    
    // uncaught exception
    if (exception.code == 'invalid_grant'){ // expired token google
      responseBody.statusCode = 400;
      responseBody.respCode = "auth.GOOGLE_OAUTH_INV_GRANT";
      responseBody.message = "Bad Request";
    } 

    // traceo logger
    const logData = {
      uncaught: exception instanceof HttpException ? false : true,
      req: {
        user: req.user,
        headers: req.headers,
        body: req.body,
        path,
      },
      res: {
        headers: res.headers,
        body: responseBody,
        status: httpStatus
      },
      timestamp,
      exception
    };
    
    if (responseBody.statusCode == 500){
      console.error(logData);
    }

    delete responseBody.path;
    delete responseBody.timestamp;
    httpAdapter.reply(res, responseBody, responseBody.statusCode);
  }
}