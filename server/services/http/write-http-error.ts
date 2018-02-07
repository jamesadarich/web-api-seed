import { IHttpRequest } from "./index";
import { Response } from "express";
import { ErrorCode } from "./error-code";
import { getErrorCodeHttpStatus } from "./get-error-code-http-status";
import { getErrorCodeMessage } from "./get-error-code-message";

export function writeHttpError(error: Error, request: IHttpRequest<any>, response: Response, errorCode: ErrorCode, extras?: object) {
    const httpStatus = getErrorCodeHttpStatus(errorCode);

    if (httpStatus >= 500) {
        console.error(error);
    }
    else {
        console.warn(error);
    }

    response.status(httpStatus);

    response.send({
      ...extras,
      requestReference: request.reference,
      errorCode,
      message: getErrorCodeMessage(errorCode),
      httpStatus,
      timestamp: new Date().toISOString()
    });
}
