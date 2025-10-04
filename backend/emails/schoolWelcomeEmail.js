const schoolWelcomeEmail = (schoolName, adminName, loginLink, tempPassword) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1E3A8A; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; }
        .button { background: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; }
        .password-box { background: #FFFBEB; border: 1px solid #F59E0B; padding: 15px; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎓 Welcome to TrendWave Connect!</h1>
        </div>
        <div class="content">
          <h2>Hello ${adminName},</h2>
          <p>Your school <strong>${schoolName}</strong> has been successfully registered!</p>
          
          <h3>Your Login Details:</h3>
          <div class="password-box">
            <strong>Login URL:</strong> <a href="${loginLink}">${loginLink}</a><br>
            <strong>Temporary Password:</strong> ${tempPassword}
          </div>
          
          <p><strong>Important:</strong> You must reset your password on first login.</p>
          
          <a href="${loginLink}" class="button">Login to Your Admin Dashboard</a>
          
          <h3>Next Steps:</h3>
          <ol>
            <li>Click the login button above</li>
            <li>Reset your password immediately</li>
            <li>Set up your school profile</li>
            <li>Add teachers and students</li>
          </ol>
          
          <p>Need help? Contact our support team.</p>
          
          <p>Best regards,<br>The TrendWave Connect Team</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = schoolWelcomeEmail;
