const nodemailer = require("nodemailer");
require("dotenv").config();

const mailConfig = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth : {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

module.exports = mailConfig;