import { ErrorCode } from "./error-code";

export function getErrorCodeMessage(errorCode: ErrorCode) {
    switch(errorCode) {
        case ErrorCode.ResourceNotFound:
            return "The requested resource could not be found, please check your URI.";
        case ErrorCode.DocumentNotFound:
            return "The requested document could not be found.";
        default:
            return "An unexpected error occurred, please quote the request reference when reporting this error.";
    }
}
