import * as uuid from "uuid";
import { User } from "./user";

abstract class DomainEvent<PayloadType extends object> {

    public readonly id = uuid();
    public readonly timestamp = new Date();
    public readonly author: User;
    public readonly type: string;
    public readonly payload: PayloadType;

    constructor(type: string, payload: PayloadType, author: User) {
        if (isNullUndefinedOrEmpty(type)) {
            throw new TypeError("type is required.");
        }

        if (isNullOrUndefined(payload)) {
            throw new TypeError("payload is required.");
        }

        if (isNullOrUndefined(author)) {
            throw new TypeError("author is required.");
        }

        this.type = type;
        this.payload = payload;
        this.author = author;
    }
}

function isNullUndefinedOrEmpty(value: string) {
    return isNullOrUndefined(value) || value.length === 0;
}

function isNullOrUndefined(value: any) {
    return value === null || value === undefined;
}
