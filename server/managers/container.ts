import { ContainerModule } from "inversify";
import TYPES from "../constants/types";
import { UserManager } from "./user.manager";
import { AuthenticationManager } from "./authentication.manager";

// create container
const container = new ContainerModule((bind) => {
    bind<UserManager>(TYPES.UserManager).to(UserManager);
    bind<AuthenticationManager>(TYPES.AuthenticationManager).to(AuthenticationManager);
});

export {
    container
};
