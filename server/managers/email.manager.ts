import { createTransport }  from "nodemailer";
import { injectable } from "inversify";
import { readFile } from "fs";
import { join } from "path";
import { UserModel } from "../models/user.model";
import { compile } from "handlebars";

const config = require("../../config.json");

let exampleEmailHtml = "";

readFile(join(process.cwd(), "./server/emails/example.html"), "utf-8", (error, template) => {
    exampleEmailHtml = template;
});

let welcomeEmailHtml: HandlebarsTemplateDelegate;

readFile(join(process.cwd(), "./server/emails/welcome.html"), "utf-8", (error, template) => {
    welcomeEmailHtml = compile(template);
});

const transporter = createTransport({
    service: "gmail",
    auth: {
        user: config.email.username,
        pass: config.email.password
    }
});

@injectable()
export class EmailManager {

    public async sendUserRegistrationEmail(user: UserModel) {

        console.log(JSON.stringify(user));

        const mailOptions = {
            from: 'Welcome Service', // sender address
            to: config.email.username, // list of receivers
            subject: 'Welcome', // Subject line
            text: 'Welcome', // plain text body
            html: welcomeEmailHtml(user) // html body
        };

        try {
            console.log("sending email");
            await transporter.sendMail(mailOptions);
            console.log("email sent");
        }
        catch(error) {
            console.log("email failed to send", error);
        }

    }

}