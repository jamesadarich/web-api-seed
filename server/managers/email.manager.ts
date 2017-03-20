import { createTransport }  from "nodemailer";
import { injectable } from "inversify";
import { readFile } from "fs";
import { join } from "path";

const config = require("../../config.json");

let exampleEmailHtml = "";

readFile(join(process.cwd(), "./server/emails/example.html"), "utf-8", (error, template) => {
    exampleEmailHtml = template;
});

const transporter = createTransport({
    service: "gmail",
    auth: {
        user: config.email.account,
        pass: config.email.password
    }
});

@injectable()
export class EmailManager {

    public async sendUserRegistrationEmail() {

        console.log(join(process.cwd(), "../emails/example.html"));

        const mailOptions = {
            from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
            to: config.email.account, // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world ?', // plain text body
            html: exampleEmailHtml // html body
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