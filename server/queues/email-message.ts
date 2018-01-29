import { Message } from "./message";

export interface IEmailMessageContents {    
    from: string;
    to: Array<string>;
    subject: string;
    text: string;
    html: string;
}

export class EmailMessage extends Message<IEmailMessageContents> {
    public static readonly queueName = "web-api-seed-send-email";
}
