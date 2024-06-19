const nodemailer = require("nodemailer");

function sendMail(merchantEmail, msgTxt){
  var transporter = nodemailer.createTransport({

    service: 'gmail',
    auth: {
      user: process.env.SMTPUSER,
      pass: process.env.SMTPPASS
    }
  });
  
  var mailOptions = {
    from: process.env.SMTPUSER,
    to: merchantEmail,
    subject: 'Sending Email using Node.js',
    text: msgTxt
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = sendMail