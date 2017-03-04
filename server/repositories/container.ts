import { ContainerModule } from "inversify";
import TYPES from "../constants/types";
import { UserRepository } from "./user.repository";

// create container
const container = new ContainerModule((bind) => {
    bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
});

export {
    container
};
