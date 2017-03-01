import { Container } from "inversify";
import { container as serviceContainer } from "./services/container";
import { container as managerContainer } from "./managers/container";

const appContainer = new Container();
appContainer.load(serviceContainer, managerContainer);

export {
    appContainer
};
