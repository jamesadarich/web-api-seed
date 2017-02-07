import { Controller, Get, Post, Put, Delete } from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { UserManager } from "../managers/user.manager";
import { UserModel } from "../models/user.model";
import { Request } from "express";
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
  public getCurrentUser(request: Request) {
    return request.user;
  }

  @Get("/:id")
  public getUser(request: Request): UserModel {
    return this.userService.getUser(request.params.id);
  }

  @Post("/")
  public newUser(request: Request): UserModel {
    return this.userService.newUser(request.body);
  }

  @Put("/:id")
  public updateUser(request: Request): UserModel {
    return this.userService.updateUser(request.params.id, request.body);
  }

  @Delete("/:id")
  public deleteUser(request: Request): string {
    return this.userService.deleteUser(request.params.id);
  }
}