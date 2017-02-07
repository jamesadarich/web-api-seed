import { Controller, Post } from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { Request, Response } from "express";
import { BasicStrategy } from "passport-http";
import { AuthenticationModel } from "../../models/authentication/authentication.model";
import TYPES from "../../constants/types";
import { UserManager } from "../../managers/user.manager";

@injectable()
@Controller("/session")
export class SessionService {
  
  constructor(@inject(TYPES.UserManager)
              private userService: UserManager) { }

  @Post("")
  public create(authenticationDetails: AuthenticationModel): string {
    console.log(this);
    return "Home sweet home";
  }
}