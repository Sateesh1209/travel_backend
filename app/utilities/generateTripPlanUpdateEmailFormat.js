function generateTripPlanEmailFormate() {
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
        <h1>Trip Plan Modification Notification</h1>
        <p>Dear Traveller,</p>
        <p>We want to inform you that the trip plan you have registered for has been modified by the admin. Please review the updated details by visiting our website</p>
     
        <p>We apologize for any inconvenience caused by these modifications. If you have any questions or concerns regarding the updated trip plan, please feel free to contact our support team.</p>
        <p>Thank you for your understanding, and we look forward to providing you with an enjoyable travel experience.</p>
        <div class="footer">
          <p>Best regards,</p>
          <p>The SHV-DJ Travel Agent Team</p>
        </div>
      </div>
    </body>
    </html>`
}

module.exports = {
    generateTripPlanEmailFormate
}