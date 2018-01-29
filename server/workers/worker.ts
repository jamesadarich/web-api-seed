import { queueService } from "../queues/queue-service";
import { Message } from "../queues/message";
import { services, ServiceResponse } from "azure-storage";

export abstract class Worker<T extends Message<any>> {
    public constructor(queueName: string) {
        queueService.getMessages(queueName, this._handleMessage.bind(this));
    }

    private async _handleMessage(error: Error, results: services.queue.QueueService.QueueMessageResult[], response: ServiceResponse) {
        // console.log("PROCESSING " + results.length + " MESSAGES\n");
        // console.log("MESSAGE TEXT", results[0].messageText, "\n");
        // console.log("\nTHIS", this, "\n");

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
