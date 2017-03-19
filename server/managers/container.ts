import { ContainerModule } from "inversify";
import TYPES from "../constants/types";
import { UserManager } from "./user.manager";
import { AuthenticationManager } from "./authentication.manager";
import { EmailManager } from "."

// create container
const container = new ContainerModule((bind) => {
    bind<UserManager>(TYPES.UserManager).to(UserManager);
    bind<AuthenticationManager>(TYPES.AuthenticationManager).to(AuthenticationManager);
    bind<EmailManager>(TYPES.EmailManager).to(EmailManager);
});

export {
    container
};
