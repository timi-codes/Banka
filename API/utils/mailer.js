import nodemailer from 'nodemailer';
import debug from 'debug';

/**
 *@description - A function for sending mail
 *
 * @param {Object} mailData Mail Details
 *
 * @returns {void} void
 */
const mailer = async (mailData) => {
  const {
    to, subject, text, html,
  } = mailData;

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: '"Banka App " <tejumoladavid@gmail.com>',
      to,
      subject,
      text,
      html,
    });

    debug('development')('Message sent: %s', info.messageId);
    debug('development')('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (err) {
    debug('development')(err);
  }
};

export default mailer;
