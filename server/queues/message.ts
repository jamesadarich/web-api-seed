import { services } from "azure-storage";

export class Message<T> {
    public static readonly queueName: string;
    public readonly contents: any;
    public readonly messageId: string;
    public readonly popReceipt: string;

    public constructor(result: services.queue.QueueService.QueueMessageResult) {
        this.contents = JSON.parse(result.messageText);
        this.popReceipt = result.popReceipt;
        this.messageId = result.messageId;
    }
}
