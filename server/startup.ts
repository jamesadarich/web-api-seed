import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import { Application } from "express";
import * as expressSession from "express-session";
import { ContainerModule } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import * as passport from "passport";
import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import * as uuid from "uuid/v4";
import TYPES from "./constants/types";
import { appContainer } from "./container";
import { UserModel } from "./models/user.model";
import { ErrorCode } from "./services/http/error-code";
import { HttpRequest } from "./services/http/index";
import { writeHttpError } from "./services/http/write-http-error";
import { Logger } from "./utilities";
import { workerStartup } from "./workers/startup";

(async () => {

  Logger.info("Connecting to SQL");

  const connection = await createConnection({
    database: process.env.MSSQL_DATABASE,
    entities: [
        UserModel
    ],
    host: process.env.MSSQL_HOST,
    logging: true,
    password: process.env.MSSQL_PASSWORD,
    port: parseInt(process.env.MSSQL_PORT, 10),
    synchronize: true, // causes data loss in prod and breaks reload in dev :(
    type: "mssql",
    username: process.env.MSSQL_USERNAME
  });

  const connectionContainer = new ContainerModule(async (bind) => {
      bind<Connection>(TYPES.SqlConnection).toConstantValue(connection);
  });

  appContainer.load(connectionContainer);

  // start workers
  await workerStartup();

  // start the server
  const server = new InversifyExpressServer(appContainer)
                          .setConfig(setupApp)
                          .setErrorConfig(setupAppErrorHandler)
                          .build();

  // 404 response
  server.use((request: HttpRequest<any>, response) => {
    return writeHttpError(
      null,
      request,
      response,
      ErrorCode.ResourceNotFound
    );
  });

  const port = process.env.HTTP_PORT || 5000;

  server.listen(port);
  Logger.info(`Server started on port ${port}`);
})();

function setupApp(app: Application) {
  app.use((request: HttpRequest<any>, response, next) => {
    request.reference = uuid();
    next();
  });
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(expressSession({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
  }));
  app.use(passport.initialize());
  app.use(passport.session());
}

function setupAppErrorHandler(app: Application) {{
  app.use([
    (error, req: HttpRequest<any>, response, next) => {
      if (error) {
        return writeHttpError(
          error,
          req,
          response,
          ErrorCode.UnexpectedError
        );
      }
    }
  ]);
}}
