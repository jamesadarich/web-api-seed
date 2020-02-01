import { inject, injectable } from "inversify";
import * as passport from "passport";
import TYPES from "../constants/types";
import { UserManager } from "../managers/user.manager";
import { UserModel } from "../models/user.model";

@injectable()
export class AuthenticationManager {

    public constructor(@inject(TYPES.UserManager) private _userManager: UserManager) {
        passport.serializeUser(this._serializeUser);
        passport.deserializeUser(this._deserializeUser);
    }

    public async loginGoogle(profile: any) {

        let user = await this._userManager.getUserByUsername(profile.emails[0].value);

        if (!user) {
            user = await this._userManager.createUser({
                emailAddress: profile.emails[0].value,
                familyName: profile.name.familyName,
                givenName: profile.name.givenName,
                // users signing up with google won't have a password
                // but give them something random just so no cheeky login workarounds
                password: Math.random().toString(),
                username: profile.emails[0].value
            });
        }

        return user;
    }

    private _serializeUser(user: UserModel, callback: (error: Error | null, user: UserModel) => void) {
        callback(null, user);
    }

    private _deserializeUser(user: UserModel, callback: (error: Error | null, user: UserModel) => void) {
        callback(null, user);
    }
}
