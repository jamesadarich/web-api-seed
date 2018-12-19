import { createQueueService, services, QueueService } from "azure-storage";
import { isLocalDev } from "../utilities";

let queueService: QueueService;

if (isLocalDev()) {
    queueService = createQueueService("UseDevelopmentStorage=true");
}
else {
    queueService = createQueueService(
        process.env.AZURE_STORAGE_ACCOUNT,
        process.env.AZURE_STORAGE_ACCESS_KEY,
        process.env.AZURE_STORAGE_QUEUE_HOST
    )
}

export {
    queueService
}
