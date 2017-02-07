export class UserModel {

    private _id: number;
    public get id() {
        return this._id;
    }

    private _firstName: string;
    public get firstName(): string {
        return this._firstName;
    }

    private _lastName: string;
    public get lastName(): string {
        return this._lastName;
    }

    private _username: string;
    public get username(): string {
        return this._username;
    }

    private _passwordHash: string;
    public get passwordHash(): string {
        return this._passwordHash;
    }

}