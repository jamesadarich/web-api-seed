import { injectable, inject } from "inversify";
import TYPES from "../constants/types";
import { UserManager } from "../managers/user.manager";
import * as passport from "passport";
import { UserModel } from "../models/user.model";

@injectable()
export class AuthenticationManager {

    public constructor(@inject(TYPES.UserManager) private _userManager: UserManager) {
        passport.serializeUser(this._serializeUser);
        passport.deserializeUser(this._deserializeUser);
    }

    private _serializeUser(user: UserModel, callback: (error: Error, user: any) => void) {
        callback(null, user);
    }

    private _deserializeUser(user: UserModel, callback: (error: Error, user: any) => void) {
        callback(null, user);
    }
    
    public async loginGoogle(profile: any) {

        let user = await this._userManager.getUserByUsername(profile.emails[0].value);

        if (!user) {
            user = await this._userManager.createUser({ 
                username: profile.emails[0].value,
                emailAddress: profile.emails[0].value,
                givenName: profile.name.givenName,
                familyName: profile.name.familyName,
                password: Math.random().toString() // users signing up with google won't have a password but give them something random just so no cheeky login workarounds
            });
        }

        return user;
    }
}
