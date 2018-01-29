import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("User")
export class UserModel {

    @PrimaryGeneratedColumn("Id")
    private _id: number;
    public get id() {
        return this._id;
    }
    
    @Column("GivenName")
    private _givenName: string;
    public get givenName(): string {
        return this._givenName;
    }
    
    @Column("FamilyName")
    private _familyName: string;
    public get familyName(): string {
        return this._familyName;
    }
    
    @Column("Username")
    private _username: string;
    public get username(): string {
        return this._username;
    }
    
    @Column("Password")
    private _passwordHash: string;
    public get passwordHash(): string {
        return this._passwordHash;
    }
    
    @Column("EmailAddress")
    private _emailAddress: string;
    public get emailAddress(): string {
        return this._emailAddress;
    }
}