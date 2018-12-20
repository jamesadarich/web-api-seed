import { Container } from "inversify";
import { container as managerContainer } from "./managers/container";
import { container as queueContainer } from "./queues/container";
import { container as repositoryContainer } from "./repositories/container";
import { container as serviceContainer } from "./services/container";

const appContainer = new Container();
appContainer.load(
    serviceContainer,
    managerContainer,
    repositoryContainer,
    queueContainer
);

export {
    appContainer
};
