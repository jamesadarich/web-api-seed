import { Message } from "./message";

export interface IEmailMessageContents {    
    from: string;
    to: Array<string>;
    subject: string;
    text: string;
    html: string;
}

export class EmailMessage extends Message<IEmailMessageContents> {
    public static readonly queueName = "webapiseed-sendemail"; // temporarily removed dashes to support azurite whilst bug unfixed
}
