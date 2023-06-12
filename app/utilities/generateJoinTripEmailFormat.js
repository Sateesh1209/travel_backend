function generateJoinTripEmailFormat(payload) {
    return (
        `<!DOCTYPE html>
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
            <h1>Successful Trip Registration</h1>
            <p>Dear ${payload.userName},</p>
            <p>Congratulations! You have successfully joined the trip to ${payload.destination}. We are thrilled to have you on board!</p>
            <p>Here are the details of your trip:</p>
            <ul>
              <li><strong>Trip Name:</strong> ${payload.tripName}</li>
              <li><strong>Duration:</strong> ${payload.fromDate} to ${payload.toDate}</li>
              <li><strong>Description:</strong> ${payload.description}
            </ul>
            <p>We hope you have an amazing time exploring [Dreating unforgettable memories.</p>
            <p>If you have any questions or need further assistance, please feel free to contact our support team.</p>
            <p>Have a fantastic trip!</p>
            <div class="footer">
              <p>Best regards,</p>
              <p>The SHV-DJ Travel Agent Team</p>
            </div>
          </div>
        </body>
        </html>`
    )
}
module.exports = {
    generateJoinTripEmailFormat
}