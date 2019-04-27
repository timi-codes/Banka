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
    to, subject, text, password,
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
      html: `<b>Email Adress: ${to}<br/><br/>Password: ${password}<br/><br/>Visit <a href='https://banka-timi.herokuapp.com/'>Banka App</a> today</b>`,
    });

    debug('development')('Message sent: %s', info.messageId);
    debug('development')('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (err) {
    debug('development')(err);
  }
};

export default mailer;
