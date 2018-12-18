import { queueService } from "../queues/queue-service";
import { Message } from "../queues/message";
import { services, ServiceResponse } from "azure-storage";
import { createQueueIfNotExists } from "../queues/create-queue-if-not-exists";

export abstract class Worker<T extends Message<any>> {
    public constructor(protected queueName: string) {
        this._setupQueue();
    }

    private async _setupQueue() {
        try {
            await createQueueIfNotExists(this.queueName);
            queueService.getMessages(this.queueName, this._handleMessage.bind(this));
        }
        catch (error) {
            console.log("Failed to set up queue:", error);
        }
    }

    private async _handleMessage(error: Error, results: services.queue.QueueService.QueueMessageResult[], response: ServiceResponse) {

        try {
            
            if (error) {
                console.log("BAD MESSAGE", error);
            }
            else if (results.length > 0) {
                results
                    .map(result => new Message(result) as T)
                    .forEach(message => this.process(message));
            }

        }
        catch (e) {
            console.log("ARGH", e, "\n");
        }
    }

    public abstract async process(message: T): Promise<void>;
}
