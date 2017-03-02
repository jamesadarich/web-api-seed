import { createConnection, Repository } from "typeorm";
import { UserModel } from "../models/user.model";

export class UserRepository {

    public constructor() {
        this._setupRepo();
    }

    private async _setupRepo() {
        const connection = await createConnection();

        this._ormRepository = connection.getRepository(UserModel);
    }

    private _ormRepository: Repository<UserModel>;

    public async getAllUsers() {
        this._ormRepository.createQueryBuilder("user")
                  .setParameter("test", "something");

        const users = await this._ormRepository.find(UserModel);
    }
}