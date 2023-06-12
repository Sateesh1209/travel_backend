function generateUserTripWithdrawEmailFormat (userName) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        /* CSS Styles */
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          margin: 0;
          padding: 20px;
        }
    
        .container {
          max-width: 600px;
          margin: 0 auto;
        }
    
        h1 {
          color: #333;
        }
    
        p {
          margin-bottom: 10px;
        }
    
        .button {
          display: inline-block;
          background-color: #007bff;
          color: #fff;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 4px;
        }
    
        .footer {
          margin-top: 40px;
          text-align: center;
          color: #777;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>We Miss You!</h1>
        <p>Dear ${userName},</p>
        <p>We're sorry to hear that you've withdrawn from the trip plan.</p>
        <p>At SHV-DJ Travel Agent, we strive to provide exceptional travel experiences, and we regret that we couldn't have you with us this time.</p>
        <p>We hope that in the future, you will consider choosing us again for your travel needs. We're always here to assist you in planning your dream trips and creating wonderful memories.</p>
        <p>If you have any feedback or suggestions for us, please don't hesitate to share. We value your input as we continuously work towards improving our services.</p>
        <p>Thank you for considering SHV-DJ Travel Agent, and we hope to have the opportunity to serve you in the future.</p>
        <div class="footer">
          <p>Best regards,</p>
          <p>The SHV-DJ Travel Agent Team</p>
        </div>
      </div>
    </body>
    </html>`
}

module.exports = {
    generateUserTripWithdrawEmailFormat
}