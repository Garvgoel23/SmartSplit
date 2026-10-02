export async function sendOtpEmail(toEmail: string, otp: string): Promise<boolean> {
  const smtpUser = (
    process.env.SMTP_USER ||
    process.env.EMAIL_USER ||
    process.env.SMTP_EMAIL ||
    process.env.MAIL_USER ||
    process.env.GMAIL_USER ||
    ""
  ).trim();

  const smtpPass = (
    process.env.SMTP_PASS ||
    process.env.EMAIL_PASS ||
    process.env.SMTP_PASSWORD ||
    process.env.MAIL_PASS ||
    process.env.MAIL_PASSWORD ||
    process.env.GMAIL_PASS ||
    process.env.GMAIL_APP_PASSWORD ||
    ""
  ).replace(/\s+/g, "").trim();

  if (!smtpUser || !smtpPass) {
    console.error(`[EMAIL SERVICE] Missing SMTP credentials. Checked SMTP_USER and SMTP_PASS. OTP for ${toEmail}: ${otp}`);
    return false;
  }

  try {
    const nodemailerModule = await import("nodemailer");
    const nodemailer = (nodemailerModule as any).default || nodemailerModule;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 32px 24px; background-color: #0d0d0f; color: #ffffff; border-radius: 16px; border: 1px solid rgba(255,255,255,0.08);">
        <div style="text-align: center; margin-bottom: 28px;">
          <h1 style="color: #27ff9a; margin: 0; font-size: 26px; font-weight: 700; letter-spacing: -0.5px;">SmartSplit <span style="color: #ffffff;">Pro</span></h1>
          <p style="color: #88888e; font-size: 14px; margin-top: 8px;">Secure Password Reset</p>
        </div>
        
        <p style="font-size: 15px; line-height: 1.6; color: #d0d0d5;">
          Hello,
        </p>
        <p style="font-size: 15px; line-height: 1.6; color: #d0d0d5;">
          We received a request to reset the password for your SmartSplit account (<strong>${toEmail}</strong>). Please use the verification code below to set a new password:
        </p>

        <div style="background-color: rgba(39, 255, 154, 0.08); border: 1px solid rgba(39, 255, 154, 0.25); border-radius: 12px; padding: 20px; text-align: center; margin: 28px 0;">
          <span style="font-size: 34px; font-weight: 800; letter-spacing: 8px; color: #27ff9a; font-family: 'Courier New', Courier, monospace;">${otp}</span>
          <p style="margin: 8px 0 0 0; font-size: 12px; color: #999999;">Expires in 10 minutes</p>
        </div>

        <p style="font-size: 13px; color: #88888e; line-height: 1.5;">
          If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
        </p>

        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 28px 0 20px 0;" />
        
        <p style="font-size: 12px; color: #55555e; text-align: center; margin: 0;">
          SmartSplit Pro — AI Expense Splitting & Debt Minimization
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: `"SmartSplit Pro" <${smtpUser}>`,
      to: toEmail,
      subject: `Your SmartSplit Reset Code: ${otp}`,
      text: `Your SmartSplit password reset code is: ${otp}. It expires in 10 minutes.`,
      html: htmlContent,
    });

    console.log(`[EMAIL SERVICE] Successfully dispatched OTP email to ${toEmail}`);
    return true;
  } catch (error) {
    console.error("[EMAIL SERVICE] Failed to send email via SMTP:", error);
    return false;
  }
}
