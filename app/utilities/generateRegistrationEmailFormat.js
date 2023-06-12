function generateRegistrationEmailFormat(userName) {

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
        <h1>Welcome to SHV-DJ Travel Agent!</h1>
        <p>Dear ${userName},</p>
        <p>Thank you for registering with SHV-DJ Travel Agent. We are excited to have you on board!</p>
        <p>At SHV-DJ Travel Agent, we offer a wide range of travel services and personalized trip planning options to make your travel experience memorable.</p>
        <p>Feel free to explore our website, search for destinations, and find the best deals for flights, accommodations, and activities.</p>
        <p>If you have any questions or need assistance, please don't hesitate to reach out to our support team. We're here to help!</p>
        <p>Start planning your dream trip today!</p>
        <p><a class="button" href="https://www.shv-djtravelagent.com">Visit SHV-DJ Travel Agent</a></p>
        <div class="footer">
          <p>Best regards,</p>
          <p>The SHV-DJ Travel Agent Team</p>
        </div>
      </div>
    </body>
    </html>`

}

module.exports = {
  generateRegistrationEmailFormat
}