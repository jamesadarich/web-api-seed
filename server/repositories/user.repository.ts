import { createConnection, Repository } from "typeorm";
import { UserModel } from "../models/user.model";
import * as path from "path";
import { injectable } from "inversify";
import { getConfig } from "../configuration/get-config";

const config = getConfig();

const users: Array<UserModel> = [ <UserModel>{
    id: 1,
    givenName: "James",
    emailAddress: "jamesrichford@gmail.com"
}];

@injectable()
export class UserRepository {

    public constructor() {
        // temporarily disable whilst ORM setup not finished
        // this._setupRepo();
    }

    private async _setupRepo() {

        const sqlConfig = config.databases.sql;

        console.log("connecting...");
        try {
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
                    // this was the old way but I believe we can change to using the class now...
                    // remove when tested and confirmed
                    // path.join(__dirname, "../models/user.model.js")
                    UserModel
                ],
                autoSchemaSync: true
            });

            console.log("connected", connection);
            this._ormRepository = connection.getRepository(UserModel);
            console.log("repo", this._ormRepository);
        }
        catch (e) {
            console.log("did not connect", e);
        }
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