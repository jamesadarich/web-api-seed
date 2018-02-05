import { EmailMessage } from "../queues/email-message";
import { Worker } from "./worker";
import { createTransport }  from "nodemailer";
import { EmailManager } from "../managers/email.manager";
import { queueService } from "../queues/queue-service";
import { QueryBuilder } from "typeorm/query-builder/QueryBuilder";
import * as mg from "nodemailer-mailgun-transport";

const transporter = createTransport(mg({
    auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN
    }
}
));

export class EmailWorker extends Worker<EmailMessage> {

    public constructor() {
        super(EmailMessage.queueName);
    }

    public async process(message: EmailMessage) {
        try {
            console.log("SENDING EMAIL:", message);
            await transporter.sendMail(message.contents);
            queueService.deleteMessage(EmailMessage.queueName, message.messageId, message.popReceipt, (error) => {
                if (error) {
                    console.log("ERROR DELETING", error);
                }
            });
        }
        catch (error) {
            console.log("SEND EMAIL FAILED", error);
        }
    }
}
