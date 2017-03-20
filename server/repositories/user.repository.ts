import { createConnection, Repository } from "typeorm";
import { UserModel } from "../models/user.model";
import * as path from "path";
import { injectable } from "inversify";

const config = require("../../config.json");
const users: Array<UserModel> = [ <UserModel>{
    id: 1,
    givenName: "James"
}];

@injectable()
export class UserRepository {

    public constructor() {
        this._setupRepo();
    }

    private _setupRepo() {

        const sqlConfig = config.databases.sql;

        console.log("connecting...");
    
        createConnection({
            driver: {
                type: "mssql",
                host: sqlConfig.host,
                port: sqlConfig.port,
                username: sqlConfig.username,
                password: sqlConfig.password,
                database: sqlConfig.databaseName
            },
            entities: [
                path.join(__dirname, "../models/user.model.js")
            ],
            autoSchemaSync: true
        })
        .then((connection) => {
            console.log("connected", connection);
            this._ormRepository = connection.getRepository(UserModel);
            console.log("repo", this._ormRepository);
        })
        .catch((e) => console.log("did not connect", e));
    }

    private _ormRepository: Repository<UserModel>;

    public async getAllUsers() {
        return users;
        /*

        while(!this._ormRepository) {

        }
        return await this._ormRepository.find(UserModel);*/
    }

    public create(user: UserModel) {
        return this._ormRepository.create(user);
    }
}