import { UserModel } from "../models/user.model";
import { userModelToDto } from "./user-model-to-dto";
import { IUserDto } from "../data-transfer-objects/user.interface";

export function toDto<T>(model: T) {
    if (model instanceof UserModel) {
        return userModelToDto(model);
    }
    
    throw new Error("Not implemented.");
}
