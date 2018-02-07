import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as expressSession from "express-session";
import { appContainer } from "./container";
import * as passport from "passport";
import { workerStartup } from "./workers/startup";
import { createConnection, Connection } from "typeorm";
import { UserModel } from "./models/user.model";
import { ContainerModule } from "inversify";
import TYPES from "./constants/types";
import * as uuid from "uuid/v4";
import { writeHttpError } from "./services/http/write-http-error";
import { IHttpRequest } from "./services/http/index";
import { ErrorCode } from "./services/http/error-code";

(async() => {
  
  const connection = await createConnection({
    type: "mssql",
    host: process.env.MSSQL_HOST,
    port: parseInt(process.env.MSSQL_PORT),
    username: process.env.MSSQL_USERNAME,
    password: process.env.MSSQL_PASSWORD,
    database: process.env.MSSQL_DATABASE,
    entities: [
        // this was the old way but I believe we can change to using the class now...
        // remove when tested and confirmed
        // path.join(__dirname, "../models/user.model.js")
        UserModel
    ],
    synchronize: true, // causes data loss in prod and breaks reload in dev :(
    logging: true
  });
  

  const connectionContainer = new ContainerModule(async (bind) => {
      bind<Connection>(TYPES.SqlConnection).toConstantValue(connection);
  });

  appContainer.load(connectionContainer);

  // start the server
  const server = new InversifyExpressServer(appContainer);

  server.setConfig((app) => {
    app.use((request: IHttpRequest<any>, response, next) => {
      request.reference = uuid();
      next();
    });
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());
    app.use(expressSession({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true 
    }));
    app.use(passport.initialize());
    app.use(passport.session());
  });

  server.setErrorConfig((app) => {
    app.use([
      (error, req, response, next) => {
        if (error) {
          writeHttpError(
            error,
            req as IHttpRequest<any>,
            response,
            ErrorCode.UnexpectedError
          );
        }
      }
    ]);
  });

  // start workers
  await workerStartup();

  const app = server.build();
  app.listen(3000);
  console.log("Server started on port 3000 :)");
})();