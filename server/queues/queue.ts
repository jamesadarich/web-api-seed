import { services } from "azure-storage";
import { injectable, unmanaged } from "inversify";
import { Logger } from "../utilities";
import { createQueueIfNotExists } from "./create-queue-if-not-exists";
import { Message } from "./message";
import { queueService } from "./queue-service";

@injectable()
export abstract class Queue<T extends Message<U>, U> {

    protected readonly queueName: string;

    public constructor(@unmanaged() queueName: string) {
        this.queueName = queueName;
        this._setupQueue();
    }

    public add(message: U, options: services.queue.QueueService.CreateMessageRequestOptions = {}) {

        queueService.createMessage(this.queueName, JSON.stringify(message), options, (error, result, response) => {
            if (error) {
                Logger.info(error);
            }
        });
    }

    private async _setupQueue() {
        try {
            await createQueueIfNotExists(this.queueName);
        }
        catch (error) {
            Logger.error("Failed to set up queue:", error);
        }
    }
}
