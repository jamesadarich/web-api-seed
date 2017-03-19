import { injectable, inject } from "inversify";
import TYPES from "../constants/types";
import { UserModel } from "../models/user.model";
import { ICreateUserDto } from "../data-transfer-objects/create-user.interface";
import * as bcrypt from "bcryptjs";
import { UserRepository } from "../repositories/user.repository";
import { EmailManager } from ".";

@injectable()
export class UserManager {

  public constructor(@inject(TYPES.UserRepository) private _userRepository: UserRepository,
                    @inject(TYPES.EmailManager) private _emailManager: EmailManager) {}

  public async getUsers() {
    return this._userRepository.getAllUsers();
  }

  public async getUserById(id: number) {

    this._emailManager.sendUserRegistrationEmail();
    
    const allUsers = await this._userRepository.getAllUsers();

    let result: UserModel;
    allUsers.map(user => {
      if (user.id === id) {
        result = user;
      }
    });

    return result;
  }

  public async getUserByUsername(username: string) {
      const allUsers = await this._userRepository.getAllUsers();
      
      const matchingUsers = allUsers.filter(
        user => user.username === username
      );

      if (matchingUsers.length > 1) {
        throw new Error("duplicate users found");
      }

      return matchingUsers[0] || null;
  }


  public async createUser(user: ICreateUserDto) {

    const salt = await bcrypt.genSalt(12);

    const newUser = <UserModel>{};
    (newUser as any)._username = user.username;
    (newUser as any)._firstName = user.firstName;
    (newUser as any)._lastName = user.lastName;
    (newUser as any)._passwordHash = await bcrypt.hash(user.password, salt);
    return this._userRepository.create(newUser);
  }
}