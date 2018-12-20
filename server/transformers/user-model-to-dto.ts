import { UserDto } from "../data-transfer-objects/user.interface";
import { UserModel } from "../models/user.model";

export function userModelToDto(model: UserModel) {
    return {
        activated: model.activated,
        createdOn: model.createdOn.toISOString(),
        emailAddress: model.emailAddress,
        familyName: model.familyName,
        givenName: model.givenName,
        id: model.id,
        username: model.username
    } as UserDto;
}
