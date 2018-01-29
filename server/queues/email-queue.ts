import { Queue } from  "./queue";
import { EmailMessage, IEmailMessageContents } from "./email-message";
import { injectable } from "inversify";
import { EmailWorker } from "../workers/email-worker";

@injectable()
export class EmailQueue extends Queue<EmailMessage, IEmailMessageContents> {

    private _worker = new EmailWorker();

    public constructor() {
        super(EmailMessage.queueName);
    }
}