const forgetPassword = (url: string, name: string) => {
  return {
    html: `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html dir="ltr" lang="en">

      <head>
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
        <meta name="x-apple-disable-message-reformatting" />
      </head>

      <body style="background-color:#f6f9fc;padding:10px 0">
        <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;background-color:#ffffff;border:1px solid #f0f0f0;padding:45px">
          <tbody>
            <tr style="width:100%">
              <td>
                <div style="height: 40px; width: 40px; display: block; background: url(https://app.a-leads.co/img/logo-dark.png); background-size: contain;"></div>

                <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                  <tbody>
                    <tr>
                      <td>
                        <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;font-weight:300;color:#404040">Hi ${name},</p>
                        <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;font-weight:300;color:#404040">Someone recently requested a password change for your A-Leads account. If this was you, you can set a new password here:</p>
                        <a href=${url} style="line-height:100%;text-decoration:none;display:block;max-width:100%;background-color:#007ee6;border-radius:4px;color:#fff;font-family:'Open Sans', 'Helvetica Neue', Arial;font-size:15px;text-align:center;width:210px;padding:14px 7px 14px 7px" target="_blank">
                          <span style="max-width:100%;display:inline-block;line-height:120%">Reset password</span>
                        </a>
                        <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;font-weight:300;color:#404040">If you don&#x27;t want to change your password or didn&#x27;t request this, just ignore and delete this message.</p>
                        <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;font-weight:300;color:#404040">To keep your account secure, please don&#x27;t forward this email to anyone. For any help you can contact <a href="#" style="color:#067df7;text-decoration:underline" target="_blank">help@aleads.com</a>.</p>
                        <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;font-weight:300;color:#404040">Regards,</p>
                        <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;font-weight:300;color:#404040">A-Leads Team</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
      </html>
    `,
  };
};

const registerLink = (url: string, name: string) => {
  return {
    html: `<html dir="ltr" lang="en">
      <head>
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
        <meta name="x-apple-disable-message-reformatting" />
      </head>

      <body style="background-color:#f6f9fc;padding:10px 0">
        <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;background-color:#ffffff;border:1px solid #f0f0f0;padding:45px">
          <tbody>
            <tr style="width:100%">
              <td>
                <div style="height: 40px; width: 40px; display: block; background: url(https://app.a-leads.co/img/logo-dark.png); background-size: contain;"></div>

                <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                  <tbody>
                    <tr>
                      <td>
                        <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;font-weight:300;color:#404040">Hi ${name},</p>
                        <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;font-weight:300;color:#404040">Welcome to A-Leads! To continue setting up your account, please click the button below.</p>
                        <a href=${url} style="line-height:100%;text-decoration:none;display:block;max-width:100%;background-color:#007ee6;border-radius:4px;color:#fff;font-family:'Open Sans', 'Helvetica Neue', Arial;font-size:15px;text-align:center;width:210px;padding:14px 7px 14px 7px" target="_blank">
                          <span style="max-width:100%;display:inline-block;line-height:120%">Finish Registration</span>
                        </a>
                        <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;font-weight:300;color:#404040">If you don&#x27;t want to create the account or didn&#x27;t request this, just ignore and delete this message.</p>
                        <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;font-weight:300;color:#404040">To keep your account secure, please don&#x27;t forward this email to anyone. For any help you can contact <a href="#" style="color:#067df7;text-decoration:underline" target="_blank">help@aleads.com</a>.</p>
                        <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;font-weight:300;color:#404040">Regards,</p>
                        <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;font-weight:300;color:#404040">A-Leads Team</p>
                         <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;font-weight:300;color:#404040">Happy to have you onboard 🤝</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
      </html>`,
  };
};

const teamInvite = (url: string) => {
  return {
    html: `<html dir="ltr" lang="en">
        <head>
            <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
            <meta name="x-apple-disable-message-reformatting" />
        </head>
        <body style="background-color:#f6f9fc;padding:10px 0">
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;background-color:#ffffff;border:1px solid #f0f0f0;padding:45px">
              <tbody>
                  <tr style="width:100%">
                    <td>
                        <div style="height: 40px; width: 40px; display: block; background: url(https://app.a-leads.co/img/logo-dark.png); background-size: contain;"></div>
                        <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                          <tbody>
                              <tr>
                                <td>
                                    <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;font-weight:300;color:#404040">Hi</p>
                                    <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;font-weight:300;color:#404040">Welcome to A-Leads! You Have been invited to join team at A-Leads!</p>
                                    <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;font-weight:300;color:#404040">Click "Accept Invite" below to join the rest of the team.</p>
                                    <a href=${url} style="line-height:100%;text-decoration:none;display:block;max-width:100%;background-color:#007ee6;border-radius:4px;color:#fff;font-family:'Open Sans', 'Helvetica Neue', Arial;font-size:15px;text-align:center;width:210px;padding:14px 7px 14px 7px" target="_blank">
                                    <span style="max-width:100%;display:inline-block;line-height:120%">Accept Invite</span>
                                    </a>
                                    <p style="font-size:12px;line-height:26px;margin:16px 0;font-family:'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;font-weight:300;color:#404040">By Accepting the invite you will be added to the team</p>
                                    <p style="font-size:12px;line-height:26px;margin:16px 0;font-family:'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;font-weight:300;color:#404040">(you will no longer be able to login to your original account)</p>
                                    <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;font-weight:300;color:#404040">Regards,</p>
                                    <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;font-weight:300;color:#404040">A-Leads Team</p>
                                    <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;font-weight:300;color:#404040">Happy to have you onboard 🤝</p>
                                </td>
                              </tr>
                          </tbody>
                        </table>
                    </td>
                  </tr>
              </tbody>
            </table>
        </body>
      </html>`,
  };
};
export default {
  forgetPassword,
  registerLink,
  teamInvite,
};
