import { createQueueService, services } from "azure-storage";

const queueService = createQueueService("UseDevelopmentStorage=true");

export {
    queueService
}
