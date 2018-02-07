import { ErrorCode } from "./error-code";

export function getErrorCodeHttpStatus(errorCode: ErrorCode) {
    switch(errorCode) {
        default:
            return 500;
    }
}