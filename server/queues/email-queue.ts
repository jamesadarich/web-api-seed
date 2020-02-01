import { injectable } from "inversify";
import { EmailMessage, EmailMessageContents } from "./email-message";
import { Queue } from "./queue";

@injectable()
export class EmailQueue extends Queue<EmailMessage, EmailMessageContents> {
    public constructor() {
        super(EmailMessage.queueName);
    }
}
