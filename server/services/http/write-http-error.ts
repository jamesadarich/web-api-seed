import { Response } from "express";
import { Logger } from "../../utilities";
import { ErrorCode } from "./error-code";
import { getErrorCodeHttpStatus } from "./get-error-code-http-status";
import { getErrorCodeMessage } from "./get-error-code-message";
import { HttpRequest } from "./index";

export function writeHttpError(
                    error: Error,
                    request: HttpRequest<any>,
                    response: Response,
                    errorCode: ErrorCode,
                    extras?: object
                ) {
    const httpStatus = getErrorCodeHttpStatus(errorCode);

    if (httpStatus >= 500) {
        Logger.error(error);
    }
    else {
        Logger.warn(error);
    }

    response.status(httpStatus);

    response.send({
      ...extras,
      errorCode,
      httpStatus,
      message: getErrorCodeMessage(errorCode),
      requestReference: request.reference,
      timestamp: new Date().toISOString()
    });
}
