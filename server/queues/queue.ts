import { createQueueService, services } from "azure-storage";
import { Message } from "./message";
import { queueService } from "./queue-service";
import { injectable, unmanaged } from "inversify";
import { createQueueIfNotExists } from "./create-queue-if-not-exists";
import { Logger } from "../utilities";

@injectable()
export abstract class Queue<T extends Message<U>, U> {

    protected readonly queueName: string;
    
    public constructor(@unmanaged() queueName: string) {
        this.queueName = queueName;
        this._setupQueue();
    }

    private async _setupQueue() {
        try {
            await createQueueIfNotExists(this.queueName);
        }
        catch (error) {
            Logger.error("Failed to set up queue:", error);
        }
    }

    public add(message: U, options?: services.queue.QueueService.CreateMessageRequestOptions) {
        
        queueService.createMessage(this.queueName, JSON.stringify(message), options, (error, result, response) => {
            if (error) {
                return Logger.info(error);
            }
        });
    }
}
