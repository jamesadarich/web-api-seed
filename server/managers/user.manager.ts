import * as bcrypt from "bcryptjs";
import { inject, injectable } from "inversify";
import { EmailManager } from ".";
import TYPES from "../constants/types";
import { CreateUserDto } from "../data-transfer-objects/create-user.interface";
import { DataSet } from "../data-transfer-objects/data-set";
import { SearchQuery } from "../data-transfer-objects/search-query";
import { UserDto } from "../data-transfer-objects/user.interface";
import { UserModel } from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";
import { toDto } from "../transformers/to-dto";

@injectable()
export class UserManager {

  public constructor(@inject(TYPES.UserRepository) private _userRepository: UserRepository,
                     @inject(TYPES.EmailManager) private _emailManager: EmailManager) {}

  public async getUsers(searchCriteria: SearchQuery) {
    return await searchCriteria.apply(this._userRepository.getAllUsers());
  }

  public async getUserById(id: number) {
    const user = await this._userRepository.getById(id);

    if (!user) {
      throw new Error("Not Found");
    }

    return user;
  }

  public async activateUserById(id: number) {
    const user = await this.getUserById(id);
    user.activated = true;
    this._userRepository.save(user);
  }

  public async getUserByUsername(username: string) {
      const allUsers = await this._userRepository.getAllUsers();

      const user = await allUsers.where("user.Username = :username").setParameter("username", username).getOne();

      return user || null;
  }

  public async createUser(user: CreateUserDto) {

    const salt = await bcrypt.genSalt(12);

    const newUser = new UserModel();
    newUser.username = user.username;
    newUser.emailAddress = user.emailAddress;
    newUser.givenName = user.givenName;
    newUser.familyName = user.familyName;
    newUser.passwordHash = await bcrypt.hash(user.password, salt);
    (newUser as any).createdOn = new Date();

    const createdUser = await this._userRepository.save(newUser);

    this._emailManager.sendUserRegistrationEmail(createdUser);

    return createdUser;
  }
}
