const nodemailer = require('nodemailer');
require('dotenv').config();
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendMail = async(to,subject,html)=>{
    let info = await transporter.sendMail({
        from: `"Education Hub Support" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html
    })
    console.log("Message sent %s",info.messageId);
    console.log("Preview URL %s", nodemailer.getTestMessageUrl(info));
}
module.exports = sendMail;