import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import * as bodyParser from "body-parser";
import { SessionService } from "./services/session";
import { UserService } from "./services/user.service";
import { UserManager } from "./managers/user.manager";
import { appContainer } from "./container";

// start the server
let server = new InversifyExpressServer(appContainer);
server.setConfig((app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
});

let app = server.build();
app.listen(3000);
console.log("Server started on port 3000 :)");