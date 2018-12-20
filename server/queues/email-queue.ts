import { injectable } from "inversify";
import { EmailWorker } from "../workers/email-worker";
import { EmailMessage, EmailMessageContents } from "./email-message";
import { Queue } from "./queue";

@injectable()
export class EmailQueue extends Queue<EmailMessage, EmailMessageContents> {

    private _worker = new EmailWorker();

    public constructor() {
        super(EmailMessage.queueName);
    }
}
