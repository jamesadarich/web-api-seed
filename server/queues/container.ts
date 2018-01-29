import { ContainerModule } from "inversify";
import TYPES from "../constants/types";
import { EmailQueue } from "./email-queue";

// create container
const container = new ContainerModule((bind) => {
    bind<EmailQueue>(TYPES.EmailQueue).to(EmailQueue);
});

export {
    container
};
