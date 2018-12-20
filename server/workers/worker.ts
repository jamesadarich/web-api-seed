import { ServiceResponse, services } from "azure-storage";
import { createQueueIfNotExists } from "../queues/create-queue-if-not-exists";
import { Message } from "../queues/message";
import { queueService } from "../queues/queue-service";
import { Logger } from "../utilities";

export abstract class Worker<T extends Message<any>> {
    public constructor(protected queueName: string) {
        this._setupQueue();
    }

    public abstract async process(message: T): Promise<void>;

    private async _setupQueue() {
        try {
            await createQueueIfNotExists(this.queueName);
            queueService.getMessages(this.queueName, this._handleMessage.bind(this));
        }
        catch (error) {
            Logger.error("Failed to set up queue:", error);
        }
    }

    private async _handleMessage(
                    error: Error,
                    results: Array<services.queue.QueueService.QueueMessageResult>,
                    response: ServiceResponse
                  ) {

        try {

            if (error) {
                Logger.info("BAD MESSAGE", error);
            }
            else if (results.length > 0) {
                results
                    .map(result => new Message(result) as T)
                    .forEach(message => this.process(message));
            }

        }
        catch (e) {
            Logger.info("ARGH", e, "\n");
        }
    }
}
