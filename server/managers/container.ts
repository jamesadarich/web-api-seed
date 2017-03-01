import { ContainerModule } from "inversify";
import TYPES from "../constants/types";
import { UserManager } from "./user.manager";

// create container
const container = new ContainerModule((bind) => {
    bind<UserManager>(TYPES.UserManager).to(UserManager);
});

export {
    container
};
