import { injectable } from "inversify";
import { UserModel } from "../models/user.model";
import { ICreateUserDto } from "../data-transfer-objects/create-user.interface";
import * as bcrypt from "bcryptjs";

const userStorage: UserModel[] =  <any>[{
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

@injectable()
export class UserManager {


  public getUsers(): UserModel[] {
    return userStorage;
  }

  public getUserById(id: number): UserModel {
    let result: UserModel;
    userStorage.map(user => {
      if (user.id === id) {
        result = user;
      }
    });

    return result;
  }

  public getUserByUsername(username: string): UserModel {
      const matchingUsers = userStorage.filter(
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
    (newUser as any).username = user.username;
    (newUser as any).firstName = user.firstName;
    (newUser as any).lastName = user.lastName;
    (newUser as any).passwordHash = await bcrypt.hash(user.password, salt);
    userStorage.push(newUser);
    return newUser;
  }

  public updateUser(id: number, user: UserModel): UserModel {
    userStorage.map((entry, index) => {
      if (entry.id === id) {
        userStorage[index] = user;
      }
    });

    return user;
  }

  public deleteUser(id: number): number {
    userStorage.map(user => {
      if (user.id !== id) {
        userStorage.splice(userStorage.indexOf(user), 1);
      }
    });
    
    return id;
  }
}