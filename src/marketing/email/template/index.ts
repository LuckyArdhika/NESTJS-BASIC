export default {
  "FG": (link) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forgot Password</title>
    <style>
      * {
        box-sizing: border-box;
        font-family: Arial, sans-serif;
      }
  
      body {
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }
  
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
  
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
  
      .logo img {
        max-width: 150px;
      }
  
      .content {
        background-color: #ffffff;
        padding: 30px;
        border-radius: 5px;
      }
  
      .title {
        font-size: 24px;
        text-align: center;
        margin-bottom: 30px;
      }
  
      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
        font-size: 16px;
      }
  
      .button:hover {
        background-color: #0056b3;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="logo">
        <img src="https://example.com/logo.png" alt="Logo">
      </div>
      <div class="content">
        <h2 class="title">Forgot Password</h2>
        <p>Hello,</p>
        <p>You have requested to reset your password. Click the button below to reset it:</p>
        <p>
        <a href="${link}" class="button">Reset Password</a>
        </p>
        <p>or use this link: ${link}:</p>
        <p>If you didn't request a password reset, please ignore this email.</p>
        <p>Best regards,<br>${process.env.APP_NAME}</p>
      </div>
    </div>
  </body>
  </html>  
  

  `
}