const logger = require('./logger');
const nodemailer = require('nodemailer');

exports.sendMail = (recipient, subject, html) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    
    const mailOptions = {
        from: process.env.MAIL,
        to: recipient,
        subject: subject,
        html: html
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if(err)
            logger.error({
                message: "There was an error sending an email.",
                error: err
            });
        else
            console.log('Email sent: '+ info.response);
    });
};

