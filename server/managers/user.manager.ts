import { injectable } from "inversify";
import { UserModel } from "../models/user.model";
import { ICreateUserDto } from "../data-transfer-objects/create-user.interface";
import * as bcrypt from "bcryptjs";

@injectable()
export class UserManager {

  private userStorage: UserModel[] =  <any>[{
    _id: 1,
    _username: "lorem@ipsum.com",
    _firstName: "Lorem",
    _lastName: "Ipsum",
    _passwordHash: bcrypt.hashSync("password", bcrypt.genSaltSync())
  },{
    _id: 2,
    _username: "dolor@sit.com",
    _firstName: "Dolor",
    _lastName: "Sit",
    _passwordHash: bcrypt.hashSync("test", bcrypt.genSaltSync())
    }];


  public getUsers(): UserModel[] {
    return this.userStorage;
  }

  public getUserById(id: number): UserModel {
    let result: UserModel;
    this.userStorage.map(user => {
      if (user.id === id) {
        result = user;
      }
    });

    return result;
  }

  public getUserByUsername(username: string): UserModel {
      const matchingUsers = this.userStorage.filter(
        user => user.username === username
      );

      console.log(username, matchingUsers);

      if (matchingUsers.length > 1) {
        throw new Error("duplicate users found");
      }

      return matchingUsers[0] || null;
  }


  public async createUser(user: ICreateUserDto) {

    const salt = await bcrypt.genSalt(12);

    const newUser = <UserModel>{};
    (newUser as any).username = user.username;
    (newUser as any).passwordHash = await bcrypt.hash(user.password, salt);
    this.userStorage.push(newUser);
    return user;
  }

  public updateUser(id: number, user: UserModel): UserModel {
    this.userStorage.map((entry, index) => {
      if (entry.id === id) {
        this.userStorage[index] = user;
      }
    });

    return user;
  }

  public deleteUser(id: number): number {
    let updatedUser: UserModel[] = [];
    this.userStorage.map(user => {
      if (user.id !== id) {
        updatedUser.push(user);
      }
    });

    this.userStorage = updatedUser;
    return id;
  }
}