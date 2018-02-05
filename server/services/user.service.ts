import { Controller, Get, Post, Put, Delete } from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { UserManager } from "../managers/user.manager";
import { UserModel } from "../models/user.model";
import { ICreateUserDto } from "../data-transfer-objects/create-user.interface";
import { IHttpRequest } from "./http";
import { Response } from "express";
import TYPES from "../constants/types";
import { IUserDto } from "../data-transfer-objects/user.interface";
import { SearchQuery } from "../data-transfer-objects/search-query";
import { DataSet } from "../data-transfer-objects/data-set";
import { toDto } from "../transformers/to-dto";

@injectable()
@Controller("/users")
export class UserService {

  constructor(@inject(TYPES.UserManager)
              private _userManager: UserManager) { }

  @Get("/")
  public async getUsers(request: IHttpRequest<void>) {
    const searchCriteria = new SearchQuery(request.query);

    return await this._userManager.getUsers(searchCriteria);
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
      return toDto(await this._userManager.getUserById(parseInt(request.params.id)));
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
    return toDto(await this._userManager.createUser(request.body));
  }

  @Put("/:id")
  public updateUser(request: IHttpRequest<UserModel>) {
    // return this._userManager.updateUser(request.params.id, request.body);
  }

  @Delete("/:id")
  public deleteUser(request: IHttpRequest<void>) {
    // return this._userManager.deleteUser(request.params.id);
  }

  @Put("/:id/activated")
  public async setUserActivated(request: IHttpRequest<boolean>, response: Response) {
    if (request.body === false) {
      throw new Error("Deactivating a user not implemented.");
    }
    
    try {
      await this._userManager.activateUserById(parseInt(request.params.id));
      response.sendStatus(200);
    }
    catch (error) {

    }
  }
}
