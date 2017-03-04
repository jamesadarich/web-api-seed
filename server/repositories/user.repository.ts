import { createConnection, Repository } from "typeorm";
import { UserModel } from "../models/user.model";
import * as path from "path";
import { injectable } from "inversify";

const config = require("../../config.json")

@injectable()
export class UserRepository {

    public constructor() {
        this._setupRepo();
    }

    private async _setupRepo() {

        const sqlConfig = config.databases.sql;

        const connection = await createConnection({
            driver: {
                type: "mssql",
                host: sqlConfig.host,
                port: sqlConfig.port,
                username: sqlConfig.username,
                password: sqlConfig.password,
                database: sqlConfig.databaseName
            },
            entities: [
                path.join(__dirname, "../models/**/*.modeljs")
            ],
            autoSchemaSync: true
        });

        this._ormRepository = connection.getRepository(UserModel);
    }

    private _ormRepository: Repository<UserModel>;

    public async getAllUsers() {
        return await this._ormRepository.find(UserModel);
    }

    public create(user: UserModel) {
        return this._ormRepository.create(user);
    }
}