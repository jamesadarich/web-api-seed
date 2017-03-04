import { Container } from "inversify";
import { container as serviceContainer } from "./services/container";
import { container as managerContainer } from "./managers/container";
import { container as repositoryContainer } from "./repositories/container";

const appContainer = new Container();
appContainer.load(
    serviceContainer,
    managerContainer,
    repositoryContainer
);

export {
    appContainer
};
