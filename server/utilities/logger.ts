import * as winston from "winston";
import { isLocalDev } from "./is-local-dev";

const logger = winston.createLogger({
    format: winston.format.json(),
    level: "info",
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "combined.log" })
    ]
});

    //
    // If we're not in production then log to the `console` with the format:
    // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
    //
if (isLocalDev()) {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

logger.info("Logger setup successfully");

export {
    logger as Logger
};
