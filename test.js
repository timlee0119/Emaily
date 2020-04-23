// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(
  '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'
);
const msg = {
  to: 'test@example.com',
  from: 'test@example.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>'
};
sgMail.send(msg);
