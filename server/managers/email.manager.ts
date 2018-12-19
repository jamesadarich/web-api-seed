import { injectable, inject } from "inversify";
import { readFile } from "fs";
import { join } from "path";
import { UserModel } from "../models/user.model";
import { compile } from "handlebars";
import { EmailQueue } from "../queues/email-queue";
import TYPES from "../constants/types";
import { Logger } from "../utilities";

let exampleEmailHtml = "";

readFile(join(process.cwd(), "./server/emails/example.html"), "utf-8", (error, template) => {
    exampleEmailHtml = template;
});

let welcomeEmailHtml: HandlebarsTemplateDelegate<UserModel>;

readFile(join(process.cwd(), "./server/emails/welcome.html"), "utf-8", (error, template) => {
    welcomeEmailHtml = compile(template);
});

@injectable()
export class EmailManager {

    public constructor(@inject(TYPES.EmailQueue) private _emailQueue: EmailQueue) {}

    public async sendUserRegistrationEmail(user: UserModel) {
        Logger.info("add email to queue");
        // queue send example
        this._emailQueue.add({            
            from: "welcome@web-api-seed.net", // sender address
            to: [ user.emailAddress ], // list of receivers
            subject: "Welcome", // Subject line
            text: "Welcome", // plain text body
            html: welcomeEmailHtml(user) // html body
        });

        Logger.info("email added to queue");

        /*
        Logger.info(JSON.stringify(user));

        const mailOptions = {
            from: "Welcome Service", // sender address
            to: config.email.username, // list of receivers
            subject: "Welcome", // Subject line
            text: "Welcome", // plain text body
            html: welcomeEmailHtml(user) // html body
        };

        try {
            Logger.info("sending email");
            await transporter.sendMail(mailOptions);
            Logger.info("email sent");
        }
        catch(error) {
            Logger.info("email failed to send", error);
        }
        */

    }

}