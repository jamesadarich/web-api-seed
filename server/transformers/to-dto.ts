import { UserDto } from "../data-transfer-objects/user.interface";
import { UserModel } from "../models/user.model";
import { userModelToDto } from "./user-model-to-dto";

export function toDto<T>(model: T) {
    if (model instanceof UserModel) {
        return userModelToDto(model);
    }

    throw new Error("Not implemented.");
}
