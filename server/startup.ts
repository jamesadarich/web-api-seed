import 'reflect-metadata';
import { interfaces, Controller, InversifyExpressServer, TYPE } from 'inversify-express-utils';
import { Container } from 'inversify';
import * as bodyParser from 'body-parser';
import TYPES from './constants/types';
import TAGS from './constants/tags';
import { HomeService } from './services/home.service';
import { UserService } from './services/user.service';
import { UserManager } from './managers/user.manager';

// load everything needed to the Container
let container = new Container();

container.bind<interfaces.Controller>(TYPE.Controller).to(HomeService).whenTargetNamed(TAGS.HomeService);
container.bind<interfaces.Controller>(TYPE.Controller).to(UserService).whenTargetNamed(TAGS.UserService);
container.bind<UserManager>(TYPES.UserManager).to(UserManager);

// start the server
let server = new InversifyExpressServer(container);
server.setConfig((app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
});

let app = server.build();
app.listen(3000);
console.log('Server started on port 3000 :)');