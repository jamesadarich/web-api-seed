import { ErrorCode } from "./error-code";

export function getErrorCodeHttpStatus(errorCode: ErrorCode) {
    switch(errorCode) {
        case ErrorCode.DocumentNotFound:
        case ErrorCode.ResourceNotFound:
            return 404;
        default:
            return 500;
    }
}