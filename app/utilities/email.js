
var nodemailer = require('nodemailer');
var {generateRegistrationEmailFormat} = require('./generateRegistrationEmailFormat.js') ;
const { generateJoinTripEmailFormat } = require('./generateJoinTripEmailFormat.js');
const { generateTripPlanEmailFormate } = require('./generateTripPlanUpdateEmailFormat.js');
const { generateCancelTripEmailFormat } = require('./generateCancelTripEmailFormat.js');
const { generateUserTripWithdrawEmailFormat } = require('./generateUserTripWithdrawEmailFormat.js');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shvdjtravel@gmail.com',
      pass: 'avielwexphutyczr'
    }
  });

//   var mailOptions = {
//     from: 'youremail@gmail.com',
//     to: 'myfriend@yahoo.com',
//     subject: 'Sending Email using Node.js',
//     text: 'That was easy!'
//   };
exports.sendMail = (receivers, subject, content,payload) => {
    const mailSettings = generateEmailTemplate(receivers, subject, content,payload)
    transporter.sendMail(mailSettings, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

const generateEmailTemplate = (receivers, subject, content,payload) => {
    const html = htmlCollect[content](payload)
    return {
        from:'shvdjtravel@gmail.com',
        to:receivers,
        subject:subject,
        html: html
    }

}

const htmlCollect = {
    registration: (payload) =>generateRegistrationEmailFormat(payload),
    joinTrip:(payload) => generateJoinTripEmailFormat(payload),
    tripUpdate: () => generateTripPlanEmailFormate(),
    deleteOrUnpublish: () => generateCancelTripEmailFormat(),
    tripWithdraw: (payload) => generateUserTripWithdrawEmailFormat(payload)
}