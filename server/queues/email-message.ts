import { Message } from "./message";

export interface EmailMessageContents {
    from: string;
    html: string;
    subject: string;
    text: string;
    to: Array<string>;
}

export class EmailMessage extends Message<EmailMessageContents> {
    public static readonly queueName = "webapiseed-sendemail";
}
