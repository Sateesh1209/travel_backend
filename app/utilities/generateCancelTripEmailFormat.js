function generateCancelTripEmailFormat() {
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
        <h1>Apologies for Trip Cancellation</h1>
        <p>Dear Traveller,</p>
        <p>We sincerely apologize for the inconvenience, but we regret to inform you that the trip plan you have registered for has been cancelled by the admin.</p>
        <p>We understand the disappointment this may cause and we deeply apologize for any inconvenience or disruption to your travel plans. Our team is currently working on alternative arrangements and will provide you with suitable options or refunds.</p>
        <p>If you have any questions or concerns regarding the cancellation or require any assistance, please feel free to contact our support team. We are here to help and make this situation as smooth as possible for you.</p>
        <p>Once again, we apologize for the cancellation and any inconvenience caused. We appreciate your understanding and look forward to assisting you with your future travel plans.</p>
        <div class="footer">
          <p>Best regards,</p>
          <p>The SHV-DJ Travel Agent Team</p>
        </div>
      </div>
    </body>
    </html>`
}

module.exports = {
    generateCancelTripEmailFormat
}