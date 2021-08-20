const nodemailer = require('nodemailer');
const logger = require('../lib/logger');

function sentMail(mssg) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: process.env.MAIL_TO,
    subject: 'Alert your API was accessed',
    text: mssg,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.error(`Error while sending mail : ${error}`);
    } else {
      logger.debug('Status Mail sent');
    }
  });
}

module.exports = { sentMail };
