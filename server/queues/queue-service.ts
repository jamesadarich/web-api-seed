import { createQueueService, services } from "azure-storage";

// const queueService = createQueueService("UseDevelopmentStorage=true");

const queueService = createQueueService(
    process.env.AZURE_STORAGE_ACCOUNT,
    process.env.AZURE_STORAGE_ACCESS_KEY,
    process.env.AZURE_STORAGE_QUEUE_HOST
);

export {
    queueService
}
