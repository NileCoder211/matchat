// src/emails/emailTemplate.js

export const createWelcomeEmailTemplate = (name, clientURL) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="color-scheme" content="light dark">
      <meta name="supported-color-schemes" content="light dark">
      <title>Welcome to Matchat!</title>
      <style>
        /* RESET + BASE */
        body, table, td, a {
          text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
        }
        body {
          margin: 0;
          padding: 0;
          width: 100%;
          background-color: #f7f8fa;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          color: #333;
        }

        /* CONTAINER */
        .container {
          background-color: #ffffff;
          max-width: 600px;
          margin: 40px auto;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.06);
          overflow: hidden;
        }

        /* HEADER */
        .header {
          background: linear-gradient(135deg, #0078ff, #00b7ff);
          color: white;
          padding: 40px 20px;
          font-size: 26px;
          font-weight: bold;
          text-align: center;
        }

        /* CONTENT */
        .content {
          padding: 30px 25px 40px;
          text-align: center;
        }

        .content p {
          font-size: 16px;
          line-height: 1.6;
          color: #555;
          margin-bottom: 30px;
        }

        /* BUTTON */
        .button {
          display: inline-block;
          background-color: #0078ff;
          color: #ffffff !important;
          text-decoration: none;
          padding: 14px 32px;
          border-radius: 8px;
          font-weight: 600;
          transition: background-color 0.2s ease;
        }
        .button:hover {
          background-color: #005ec4;
        }

        /* FOOTER */
        .footer {
          font-size: 12px;
          color: #999;
          padding: 20px;
          text-align: center;
        }

        /* MOBILE RESPONSIVE */
        @media only screen and (max-width: 600px) {
          .container {
            margin: 20px;
            border-radius: 8px;
          }
          .header {
            font-size: 22px;
            padding: 30px 10px;
          }
          .content p {
            font-size: 15px;
          }
          .button {
            padding: 12px 24px;
            font-size: 15px;
          }
        }

        /* DARK MODE */
        @media (prefers-color-scheme: dark) {
          body {
            background-color: #0e0e10;
            color: #ddd;
          }
          .container {
            background-color: #1b1b1f;
            box-shadow: none;
          }
          .header {
            background: linear-gradient(135deg, #1a73e8, #3ea2ff);
            color: #ffffff;
          }
          .content p {
            color: #ccc;
          }
          .button {
            background-color: #3ea2ff;
            color: #000 !important;
          }
          .footer {
            color: #777;
          }
        }
      </style>
    </head>

    <body>
      <div class="container">
        <div class="header">
          👋 Welcome to Matchat, ${name}!
        </div>
        <div class="content">
          <p>We’re so excited to have you join our chat community!  
          Connect, share, and enjoy real-time conversations with people who matter to you.</p>
          <a href="${clientURL}" class="button">Go to Matchat</a>
        </div>
        <div class="footer">
          If you didn’t sign up for Matchat, you can safely ignore this email.<br />
          &copy; ${new Date().getFullYear()} Matchat. All rights reserved.
        </div>
      </div>
    </body>
  </html>
  `;
};
