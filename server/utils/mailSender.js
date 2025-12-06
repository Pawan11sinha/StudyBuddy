const { Resend } = require("resend");
const dotenv = require("dotenv");
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const mailSender = async (email, title, body) => {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: email,
      subject: title,
      html: body,
    });

    if (error) {
      console.log("MAIL SENDER ERROR:", error);
      throw error;
    }

    // Ye info object bilkul Nodemailer jaisa bana diya
    const info = {
      accepted: [email],
      rejected: [],
      response: "Email sent via Resend HTTP API",
      messageId: data?.id,
    };

    console.log("MAIL SENT:", info);
    return info;
  } catch (err) {
    console.log("MAIL SENDER ERROR:", err);
    throw err;
  }
};
module.exports = mailSender;


