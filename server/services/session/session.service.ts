import { Controller, Post } from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { Request, Response } from "express";
import { BasicStrategy } from "passport-http";
import TYPES from "../../constants/types";
import { UserManager } from "../../managers/user.manager";
import * as bcrypt from "bcryptjs";

@injectable()
@Controller("/session")
export class SessionService {
  
  constructor(@inject(TYPES.UserManager)
              private _userService: UserManager) { }

  @Post("")
  public async create(request: Request, response: Response) {

    console.log(request.body);

    const matchingUser = this._userService.getUserByUsername(request.body.username);

    if (matchingUser) {
      const passwordMatch = await bcrypt.compare(request.body.password, matchingUser.passwordHash);

      if (passwordMatch) {        
        return "Welcome";
      }      
    }

    response.status(401);

    return "Unauthorized";
  }
}