import { Controller, Get, Post } from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { Request, Response } from "express";
import { BasicStrategy } from "passport-http";
import TYPES from "../../constants/types";
import { UserManager } from "../../managers/user.manager";
import * as bcrypt from "bcryptjs";
import * as passport from "passport";

const GoogleStrategy = require('passport-google-oauth20').Strategy;

@injectable()
@Controller("/auth")
export class AuthenticationService {
  
  constructor(@inject(TYPES.UserManager)
              private _userService: UserManager) {
    passport.serializeUser(function(user, done) {
      done(null, user);
    });

    passport.deserializeUser(function(user, done) {
      done(null, user);
    });

    passport.use(new GoogleStrategy({        
        clientID: "",
        clientSecret: "",
        callbackURL: "http://localhost:3000/auth/google/callback"
      },
      async (accessToken: string, refreshToken: string, profile: any, callback: Function) => {
        console.log("pre get");
        try {
          let user = this._userService.getUserByUsername(profile.id);

          if (!user) {
            user = await this._userService.createUser({ 
              username: profile.id,
              password: Math.random().toString() // users signing up with google won't have a password but give them something random just so no cheeky login workarounds
            });
          }

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

  @Get("/google", passport.authenticate('google', { scope: ['profile'] }))
  public googleSignIn() {
  }

  @Get("/google/callback", passport.authenticate('google', { failureRedirect: '/login' }))
  public googleSignInCallback(request: Request, response: Response) {
    response.redirect("http://localhost:4000/");
  }
}