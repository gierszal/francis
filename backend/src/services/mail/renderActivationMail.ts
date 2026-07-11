export const renderActivationEmail = (link: string) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Francis | Account Activation</title>
</head>
<body style="margin:0; padding:0; background-color:#ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">

  <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
    Confirm your email to start listening on Francis.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff; padding:40px 16px;">
    <tr>
      <td align="center">

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px; border:1px solid #000000;">

          <tr>
            <td style="padding:32px 40px 24px 40px; border-bottom:1px solid #000000;" align="center">
              <span style="font-size:20px; font-weight:700; color:#000000; letter-spacing:0.5px;">
                Francis | Web Player
              </span>
            </td>
          </tr>

          <tr>
            <td style="padding:36px 40px 8px 40px;" align="center">
              <h1 style="margin:0 0 12px 0; font-size:22px; line-height:30px; color:#000000; font-weight:700;">
                Activate your account
              </h1>
              <p style="margin:0; font-size:15px; line-height:22px; color:#444444;">
                Thanks for signing up for Francis. Confirm your email address below to get started.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 40px 8px 40px;" align="center">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#000000;">
                    <a href="{{ACTIVATION_LINK}}"
                       target="_blank"
                       style="display:inline-block; padding:14px 32px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none;">
                      Activate account
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 40px 0 40px;" align="center">
              <p style="margin:0; font-size:13px; line-height:20px; color:#666666;">
                Button not working? Copy and paste this link into your browser:
              </p>
              <p style="margin:6px 0 0 0; font-size:13px; line-height:20px; word-break:break-all;">
                <a href="{{ACTIVATION_LINK}}" style="color:#000000; text-decoration:underline;">{{ACTIVATION_LINK}}</a>
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:32px 40px 32px 40px; border-top:1px solid #000000; margin-top:24px;" align="center">
              <p style="margin:0; font-size:12px; line-height:18px; color:#666666;">
                If you didn't create an account on Francis, you can safely ignore this email.
              </p>
              <p style="margin:12px 0 0 0; font-size:12px; color:#999999;">
                &copy; {{YEAR}} Francis | Web Player
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`
    .replace(/{{ACTIVATION_LINK}}/g, link)
    .replace(/{{YEAR}}/g, new Date().getFullYear().toString());
};
