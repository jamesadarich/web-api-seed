import { ContainerModule } from "inversify";
import { interfaces, TYPE } from "inversify-express-utils";
import { appContainer } from "../container";
import TYPES from "../constants/types";
import TAGS from "../constants/tags";
import { AuthenticationService } from "./authentication";
import { UserService } from "./user.service";

// create container
const container = new ContainerModule((bind) => {
    // setup bindings for services
    // bind<interfaces.Controller>(TYPE.Controller).to(AuthenticationService).whenTargetNamed(TAGS.AuthenticationService);
    bind<interfaces.Controller>(TYPE.Controller).to(UserService).whenTargetNamed(TAGS.UserService);
});

export {
    container
};
