import { createTransport }  from "nodemailer";
import { injectable } from "inversify";

const config = require("../../config.json");

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
        const mailOptions = {
            from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
            to: config.email.account, // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world ?', // plain text body
            html: '<b>Hello world ?</b>' // html body
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