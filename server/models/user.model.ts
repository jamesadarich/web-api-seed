import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("User")
export class UserModel {
    @Column({
        name: "GivenName"
    })
    public get givenName(): string {
        return this._givenName;
    }
    public set givenName(newGivenName: string) {
        if (this._givenName !== newGivenName) {
            this._givenName = newGivenName;
        }
    }
    @Column({
        name: "FamilyName"
    })
    public get familyName(): string {
        return this._familyName;
    }
    public set familyName(newFamilyName: string) {
        if (this._familyName !== newFamilyName) {
            this._familyName = newFamilyName;
        }
    }
    @Column({
        name: "Username"
    })
    public get username(): string {
        return this._username;
    }
    public set username(newUsername: string) {
        if (this._username !== newUsername) {
            this._username = newUsername;
        }
    }
    @Column({
        name: "PasswordHash"
    })
    public get passwordHash(): string {
        return this._passwordHash;
    }
    public set passwordHash(newPasswordHash: string) {
        if (this._passwordHash !== newPasswordHash) {
            this._passwordHash = newPasswordHash;
        }
    }
    @Column({
        name: "EmailAddress"
    })
    public get emailAddress(): string {
        return this._emailAddress;
    }
    public set emailAddress(newEmailAddress: string) {
        if (this._emailAddress !== newEmailAddress) {
            this._emailAddress = newEmailAddress;
        }
    }
    @Column({
        name: "Activated"
    })
    public get activated(): boolean {
        return this._activated;
    }
    public set activated(newActivated: boolean) {
        if (this._activated !== newActivated) {
            this._activated = newActivated;
        }
    }

    @PrimaryGeneratedColumn({
        name: "Id"
    })
    public readonly id: number;

    @Column("datetime", {
        name: "CreatedOn"
    })
    public readonly createdOn: Date;

    private _givenName: string;

    private _familyName: string;

    private _username: string;

    private _passwordHash: string;

    private _emailAddress: string;

    private _activated: boolean = false;
}
