import { createTransport, Transporter } from "nodemailer";
import * as mg from "nodemailer-mailgun-transport";
import { EmailMessage } from "../queues/email-message";
import { queueService } from "../queues/queue-service";
import { isLocalDev, Logger } from "../utilities";
import { Worker } from "./worker";

let transporter: Transporter;

// TODO: simplify local setup to ensure local setup properly mimics irl setup
if (isLocalDev()) {
    transporter = createTransport({
        host: "localhost",
        port: 25,
        secure: false,
        tls: {
            rejectUnauthorized: false
        }
    });
}
else {
    transporter = createTransport(mg({
        auth: {
            api_key: process.env.MAILGUN_API_KEY,
            domain: process.env.MAILGUN_DOMAIN
        }
    }));
}

export class EmailWorker extends Worker<EmailMessage> {

    public constructor() {
        super(EmailMessage.queueName);
    }

    public async process(message: EmailMessage) {
        try {
            Logger.info("SENDING EMAIL:", message);
            await transporter.sendMail(message.contents);
            queueService.deleteMessage(EmailMessage.queueName, message.messageId, message.popReceipt, (error) => {
                if (error) {
                    Logger.info("ERROR DELETING", error);
                }
            });
        }
        catch (error) {
            Logger.info("SEND EMAIL FAILED", error);
        }
    }
}
