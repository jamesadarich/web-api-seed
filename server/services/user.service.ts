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
              private userService: UserManager) { }

  @Get("/")
  public getUsers(): UserModel[] {
    return this.userService.getUsers();
  }

  @Get("/current")
  public getCurrentUser(request: IHttpRequest<void>, response: Response) {
    if (request.user) {
      return request.user;
    }

    response.sendStatus(404);
  }

  @Get("/:id")
  public getUser(request: IHttpRequest<void>): UserModel {
    return this.userService.getUserById(request.params.id);
  }

  @Post("/")
  public async createUser(request: IHttpRequest<ICreateUserDto>) {
    return await this.userService.createUser(request.body);
  }

  @Put("/:id")
  public updateUser(request: IHttpRequest<UserModel>): UserModel {
    return this.userService.updateUser(request.params.id, request.body);
  }

  @Delete("/:id")
  public deleteUser(request: IHttpRequest<void>): number {
    return this.userService.deleteUser(request.params.id);
  }
}