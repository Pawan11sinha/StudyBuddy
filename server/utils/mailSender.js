const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,          // e.g. smtp.gmail.com / smtp-relay.brevo.com / sandbox.smtp.mailtrap.io
      port: process.env.MAIL_PORT,          
      secure: false,                        // 587 -> false, 465 -> true
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      // ye teen optional hai, but ok:
      connectionTimeout: 10000, // 10 sec
      greetingTimeout: 10000,
      socketTimeout: 10000,
      tls: {
        rejectUnauthorized: false, // kabhi-kabhi cert issue hota hai hosted env pe
      },
    });

    const info = await transporter.sendMail({
      from: `"StudyBuddy || Aayan" <${process.env.MAIL_USER}>`, // from me bhi valid email rakho
      to: email,
      subject: title,
      html: body,
    });

    console.log("MAIL SENT:", info.messageId);
    return info;
  } catch (error) {
    console.log("MAIL SENDER ERROR:", error);
    throw error;
  }
};

module.exports = mailSender;
