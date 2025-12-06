
const Sib = require("sib-api-v3-sdk");
const dotenv = require("dotenv");
dotenv.config();

const client = Sib.ApiClient.instance;
const emailApi = new Sib.TransactionalEmailsApi();

const mailSender = async (toEmail, subject, htmlContent) => {
  try {
    // yaha har call pe fresh env se key lo
    const apiKey = client.authentications["api-key"];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    console.log("BREVO_API_KEY present? =>", !!process.env.BREVO_API_KEY);
    console.log("BREVO mailSender args =>", { toEmail, subjectPresent: !!subject });

    const sender = {
      email: process.env.BREVO_SENDER_EMAIL,  // verified sender email
      name: process.env.BREVO_SENDER_NAME,    // e.g. "StudyBuddy",
    };

    const receivers = [{ email: toEmail }];

    const response = await emailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject,
      htmlContent,
    });

    console.log("BREVO MAIL SENT:", response?.messageId || response);
    return response;
  } catch (error) {
    console.error("BREVO MAIL ERROR:", error.response?.text || error);
    throw error;
  }
};

module.exports = mailSender;
