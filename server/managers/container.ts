import { ContainerModule } from "inversify";
import { EmailManager } from ".";
import TYPES from "../constants/types";
import { AuthenticationManager } from "./authentication.manager";
import { UserManager } from "./user.manager";

// create container
const container = new ContainerModule((bind) => {
    bind<UserManager>(TYPES.UserManager).to(UserManager);
    bind<AuthenticationManager>(TYPES.AuthenticationManager).to(AuthenticationManager);
    bind<EmailManager>(TYPES.EmailManager).to(EmailManager);
});

export {
    container
};
