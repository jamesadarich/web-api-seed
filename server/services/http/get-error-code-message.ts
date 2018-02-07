import { ErrorCode } from "./error-code";

export function getErrorCodeMessage(errorCode: ErrorCode) {
    switch(errorCode) {
        case ErrorCode.DocumentNotFound:
            return "The requested document could not be found.";
        default:
            return "An unexpected error occurred, please quote the request reference when reporting this error.";
    }
}
