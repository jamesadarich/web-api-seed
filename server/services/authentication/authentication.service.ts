import { Controller, Get, Post } from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { Request, Response } from "express";
import { BasicStrategy } from "passport-http";
import TYPES from "../../constants/types";
import { AuthenticationManager, UserManager } from "../../managers";
import * as bcrypt from "bcryptjs";
import * as passport from "passport";

const GoogleStrategy = require('passport-google-oauth20').Strategy;

@injectable()
@Controller("/auth")
export class AuthenticationService {
  /*
  constructor(@inject(TYPES.UserManager) private _userManager: UserManager,
              @inject(TYPES.AuthenticationManager) private _authManager: AuthenticationManager) {

    passport.use(new GoogleStrategy({
        clientID: config.oauth.google.clientId,
        clientSecret: config.oauth.google.clientSecret,
        callbackURL: config.oauth.google.callbackUrl
      },
      async (accessToken: string, refreshToken: string, profile: any, callback: Function) => {
         try {
           const user = await this._authManager.loginGoogle(profile);
           callback(null, user);
         }
         catch (error) {
            callback(error, null);
         }
      })
    );
  }

  @Post("")
  public async create(request: Request, response: Response) {

    const matchingUser = await this._userManager.getUserByUsername(request.body.username);

    if (matchingUser) {
      const passwordMatch = await bcrypt.compare(request.body.password, matchingUser.passwordHash);

      if (passwordMatch) {        
        return "Welcome";
      }      
    }

    response.status(401);

    return "Unauthorized";
  }

  @Get("/google", passport.authenticate('google', { scope: ['profile', "email"] }))
  public googleSignIn() {
  }

  @Get("/google/callback", passport.authenticate('google', { failureRedirect: '/login' }))
  public googleSignInCallback(request: Request, response: Response) {
    response.redirect("http://localhost:4000/");
  }*/
}
