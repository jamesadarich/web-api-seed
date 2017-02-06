import { Controller, Get, Post, Put, Delete } from 'inversify-express-utils';
import { injectable, inject } from 'inversify';
import { IUser, UserManager } from '../managers/user.manager';
import { Request } from 'express';
import TYPES from '../constants/types';

@injectable()
@Controller('/user')
export class UserService {

  constructor(@inject(TYPES.UserManager) private userService: UserManager) { }

  @Get('/')
  public getUsers(): IUser[] {
    return this.userService.getUsers();
  }

  @Get('/:id')
  public getUser(request: Request): IUser {
    return this.userService.getUser(request.params.id);
  }

  @Post('/')
  public newUser(request: Request): IUser {
    return this.userService.newUser(request.body);
  }

  @Put('/:id')
  public updateUser(request: Request): IUser {
    return this.userService.updateUser(request.params.id, request.body);
  }

  @Delete('/:id')
  public deleteUser(request: Request): string {
    return this.userService.deleteUser(request.params.id);
  }
}