import nodemailer from 'nodemailer';
import { scheduleEmail } from '../constants';

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_AUTH_MAIL,
        pass: process.env.EMAIL_AUTH_PASS,
    },
});

type MailOptionsType = {
    from: string;
    to: string;
    subject: string;
    text: string;
};

export const mailer = (to: string, subject: string, text: string) => {
    const mailOptions: MailOptionsType = {
        from: scheduleEmail,
        to,
        subject,
        text,
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email: ", error);
        } else {
            console.log("Email sent: ", info.response);
        }
    });
};
