import { injectable } from "inversify";
import { UserModel } from "../models/user.model";

@injectable()
export class UserManager {

  private userStorage: UserModel[] =  <any>[{
    _id: 2,
    _username: "lorem@ipsum.com",
    _firstName: "Lorem",
    _lastName: "Ipsum"
  },{
    _id: 2,
    _username: "dolor@sit.com",
    _firstName: "Dolor",
    _lastName: "Sit"
    }];


  public getUsers(): UserModel[] {
    return this.userStorage;
  }

  public getUser(id: number): UserModel {
    let result: UserModel;
    this.userStorage.map(user => {
      if (user.id === id) {
        result = user;
      }
    });

    return result;
  }

  public newUser(user: UserModel): UserModel {
    this.userStorage.push(user);
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

  public deleteUser(id: number): string {
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