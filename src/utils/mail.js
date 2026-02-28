import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
    new Mailgen({
        theme: "default",
        product: {
            name: "Task Manager",
            link: "https://taskmanagerlink.com"
        }
    })
    const emailTextual = mailGenerator.generatePlaintext
    (options.mailGenContent)
    const emailHtml = mailGenerator.generate
    (options.mailGenContent)

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS,
        }
    })

    const mail = {
        from: "himanshuchaudhari855@gmail.com",
        to: options.email,
        subject: options.subject,
        text: emailTextual,
        html: emailHtml
    }
    try {
        await transporter.sendMail(mail)
    } catch (error) {
        console.error("Email Service Failure!!")
    }
}

var Mailgen = require('mailgen');

const emailVerificationMailgenContent = (username, verificationUrl) => {
    return {
        body: {
            name : username,
            intro: "Welcome To the Project Camp",
            action: {
                instructions : "To verify Email Please Click Below Button",
                button: {
                    color : "#0e0e0e",
                    text: "Verify Now",
                    link: verificationUrl
                },
            },
            outro: "If you have any queries Please contact at xyz@email.com"
        },
    };
}

const forgotPasswordMailgenContent = (username, passResetUrl) => {
    return {
        body: {
            name : username,
            intro: "Reset Password",
            action: {
                instructions : "Please Reset Your from below Button",
                button: {
                    color : "#22BC66",
                    text: "Reset Now",
                    link: passResetUrl
                },
            },
            outro: "If you have any queries Please contact at xyz@email.com"
        },
    };
}

export {
    emailVerificationMailgenContent,
    forgotPasswordMailgenContent,
    sendEmail
}