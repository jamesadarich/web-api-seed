import { Response } from "express";
import { inject, injectable } from "inversify";
import { Controller, Delete, Get, Post, Put } from "inversify-express-utils";
import TYPES from "../constants/types";
import { CreateUserDto } from "../data-transfer-objects/create-user.interface";
import { SearchQuery } from "../data-transfer-objects/search-query";
import { UserManager } from "../managers/user.manager";
import { UserModel } from "../models/user.model";
import { toDto } from "../transformers/to-dto";
import { Logger } from "../utilities";
import { HttpRequest } from "./http";
import { ErrorCode } from "./http/error-code";
import { writeHttpError } from "./http/write-http-error";

@injectable()
@Controller("/users")
export class UserService {

  constructor(@inject(TYPES.UserManager)
              private _userManager: UserManager) { }

  @Get("/")
  public async getUsers(request: HttpRequest<void>) {
    const searchCriteria = new SearchQuery(request.query);

    return await this._userManager.getUsers(searchCriteria);
  }

  @Get("/current")
  public getCurrentUser(request: HttpRequest<void>, response: Response) {
    if (request.user) {
      return request.user;
    }

    return writeHttpError(null, request, response, ErrorCode.DocumentNotFound);
  }

  @Get("/:id")
  public async getUser(request: HttpRequest<void>, response: Response) {
    try {
      return toDto(await this._userManager.getUserById(parseInt(request.params.id, 10)));
    }
    catch (e) {
      // this is naughty
      if (e.message === "Not Found") {
        return writeHttpError(e, request, response, ErrorCode.DocumentNotFound);
      }

      throw e;
    }
  }

  @Post("/")
  public async createUser(request: HttpRequest<CreateUserDto>) {
    return toDto(await this._userManager.createUser(request.body));
  }

  @Put("/:id")
  public updateUser(request: HttpRequest<UserModel>) {
    // return this._userManager.updateUser(request.params.id, request.body);
  }

  @Delete("/:id")
  public deleteUser(request: HttpRequest<void>) {
    // return this._userManager.deleteUser(request.params.id);
  }

  @Put("/:id/activated")
  public async setUserActivated(request: HttpRequest<boolean>, response: Response) {
    if (request.body === false) {
      throw new Error("Deactivating a user not implemented.");
    }

    try {
      await this._userManager.activateUserById(parseInt(request.params.id, 10));
      response.sendStatus(200);
    }
    catch (error) {
      Logger.error(
        `Error updating activated to ${request.body} for user ${request.params.id}`,
        error
      );
    }
  }

  @Delete("/:id/password")
  public deleteUserPassword(request: HttpRequest<void>) {
    throw new Error("not implemented");
  }

  @Put("/:id/password")
  public updateUserPassword(request: HttpRequest<string>) {
    // request.query.resetPasswordToken; // if the user has tried to reset the password they'll also need a token
    // request.body; // new password
    throw new Error("not implemented");
  }
}
