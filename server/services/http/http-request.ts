import { Request } from "express";
import { UserModel } from "../../models/user.model";

export interface HttpRequest<BodyType> extends Request {
    reference: string;
    body: BodyType;
    user: UserModel;
}
