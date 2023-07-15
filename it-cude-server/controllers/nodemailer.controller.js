const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
    }
});

class NodemailerController {
    async sendTestMail(user_login, user_mail, password_from_email) {
        const mailOptions = {
            from: 'itcodebot@gmail.com',
            to: user_mail,
            subject: `Привет, ${user_login}! Это IT-CUBE.Chat, необходимо подтвердить Вашу электронную почту.`,
            text: `Для подтверждения почты перейдите по ссылке и введите код: ${password_from_email}`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log('success: ' + info);
            }
        });
    }


    // Для отправки нового кода
    async sendNewCode(user_login, user_mail, new_password_from_email) {
        const mailOptions = {
            from: 'itcodebot@gmail.com',
            to: user_mail,
            subject: `Привет, ${user_login}! Новый код для подтверждения электронной почты.`,
            text: `Ваш новый код для подтверждения почты: ${new_password_from_email}`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log('success: ' + info);
            }
        });
    }
}

module.exports = new NodemailerController();
