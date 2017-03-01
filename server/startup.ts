import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as expressSession from "express-session";
import { appContainer } from "./container";
import * as passport from "passport";

// start the server
const server = new InversifyExpressServer(appContainer);
server.setConfig((app) => {
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(expressSession({
    secret: "SUPER SECRET SECRET",
    resave: true,
    saveUninitialized: true 
  }));
  app.use(passport.initialize());
  app.use(passport.session());
});

const app = server.build();
app.listen(3000);
console.log("Server started on port 3000 :)");