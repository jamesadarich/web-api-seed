import { inject, injectable } from "inversify";
import * as path from "path";
import { Connection, Repository, SelectQueryBuilder } from "typeorm";
import TYPES from "../constants/types";
import { UserModel } from "../models/user.model";
import { Logger } from "../utilities";

@injectable()
export class UserRepository {

    private _ormRepository: Repository<UserModel>;

    public constructor(@inject(TYPES.SqlConnection) private _sqlConnection: Connection) {
        // temporarily disable whilst ORM setup not finished
        this._setupRepo();
    }

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

    private _setupRepo() {

        Logger.info("connecting...");
        try {

            Logger.info("connected"); // , connection);
            this._ormRepository = this._sqlConnection.getRepository(UserModel);
            Logger.info("repo", this._ormRepository);
        }
        catch (e) {
            Logger.info("did not connect", e);
        }
    }
}
