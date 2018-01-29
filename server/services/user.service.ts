import { Controller, Get, Post, Put, Delete } from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { UserManager } from "../managers/user.manager";
import { UserModel } from "../models/user.model";
import { ICreateUserDto } from "../data-transfer-objects/create-user.interface";
import { IHttpRequest } from "./http";
import { Response } from "express";
import TYPES from "../constants/types";

@injectable()
@Controller("/users")
export class UserService {

  constructor(@inject(TYPES.UserManager)
              private _userManager: UserManager) { }

  @Get("/")
  public async getUsers() {
    return await this._userManager.getUsers();
  }

  @Get("/current")
  public getCurrentUser(request: IHttpRequest<void>, response: Response) {
    if (request.user) {
      return request.user;
    }

    response.sendStatus(404);
  }

  @Get("/:id")
  public async getUser(request: IHttpRequest<void>, response: Response) {
    try {
      return await this._userManager.getUserById(parseInt(request.params.id));
    }
    catch (e) {
      // this is naughty
      if (e.message === "Not Found") {
        response.sendStatus(404);
      }
      else {
        response.sendStatus(500);
      }


    }
  }

  @Post("/")
  public async createUser(request: IHttpRequest<ICreateUserDto>) {
    return await this._userManager.createUser(request.body);
  }

  @Put("/:id")
  public updateUser(request: IHttpRequest<UserModel>) {
    // return this._userManager.updateUser(request.params.id, request.body);
  }

  @Delete("/:id")
  public deleteUser(request: IHttpRequest<void>) {
    // return this._userManager.deleteUser(request.params.id);
  }
}