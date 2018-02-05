import { Connection, Repository, SelectQueryBuilder } from "typeorm";
import { UserModel } from "../models/user.model";
import * as path from "path";
import { injectable, inject } from "inversify";
import TYPES from "../constants/types";

const users: Array<UserModel> = [ <UserModel>{
    id: 1,
    givenName: "James",
    emailAddress: "jamesrichford@gmail.com"
}];

@injectable()
export class UserRepository {

    public constructor(@inject(TYPES.SqlConnection) private _sqlConnection: Connection) {
        // temporarily disable whilst ORM setup not finished
        this._setupRepo();
    }

    private _setupRepo() {

        console.log("connecting...");
        try {

            console.log("connected");//, connection);
            this._ormRepository = this._sqlConnection.getRepository(UserModel);
            console.log("repo", this._ormRepository);
        }
        catch (e) {
            console.log("did not connect", e);
        }
    }

    private _ormRepository: Repository<UserModel>;

    public getAllUsers() {
        return this._ormRepository.createQueryBuilder("user");
        // return users;
        /*

        while(!this._ormRepository) {

        }
        return await this._ormRepository.find(UserModel);*/
    }

    public async getById(id: number) {
        return await this._ormRepository.findOneById(id);
    }

    public save(user: UserModel) {
        return this._ormRepository.save(user);
    }
}