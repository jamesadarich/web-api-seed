import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("User")
export class UserModel {

    @PrimaryGeneratedColumn("Id")
    private _id: number;
    public get id() {
        return this._id;
    }
    
    @Column("FirstName")
    private _firstName: string;
    public get firstName(): string {
        return this._firstName;
    }
    
    @Column("LastName")
    private _lastName: string;
    public get lastName(): string {
        return this._lastName;
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
}