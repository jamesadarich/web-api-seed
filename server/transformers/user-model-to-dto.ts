import { UserModel } from "../models/user.model";
import { IUserDto } from "../data-transfer-objects/user.interface";

export function userModelToDto(model: UserModel) {    
    return {
        id: model.id,
        username: model.username,
        emailAddress: model.emailAddress,
        givenName: model.givenName,
        familyName: model.familyName,
        activated: model.activated
    } as IUserDto;
}