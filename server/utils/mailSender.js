// const { Resend } = require("resend");
// const dotenv = require("dotenv");
// dotenv.config();

// const resend = new Resend(process.env.RESEND_API_KEY);

// const mailSender = async (email, title, body) => {
//   try {
//     const { data, error } = await resend.emails.send({
//       from: process.env.RESEND_FROM_EMAIL,
//       to: email,
//       subject: title,
//       html: body,
//     });

//     if (error) {
//       console.log("MAIL SENDER ERROR:", error);
//       throw error;
//     }

//     // Ye info object bilkul Nodemailer jaisa bana diya
//     const info = {
//       accepted: [email],
//       rejected: [],
//       response: "Email sent via Resend HTTP API",
//       messageId: data?.id,
//     };

//     console.log("MAIL SENT:", info);
//     return info;
//   } catch (err) {
//     console.log("MAIL SENDER ERROR:", err);
//     throw err;
//   }
// };
// module.exports = mailSender;


const Sib = require("sib-api-v3-sdk");
const dotenv = require("dotenv");
dotenv.config();

const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;   // xkeysib-xxxxxx API KEY

const emailApi = new Sib.TransactionalEmailsApi();

const mailSender = async (email, title, body) => {
  try {
    const sender = {
      email: process.env.BREVO_SENDER_EMAIL,  // your Gmail verified in Brevo
      name: process.env.BREVO_SENDER_NAME,    // StudyBuddy
    };

    const receivers = [{ email: email }];

    const response = await emailApi.sendTransacEmail({
      sender,
      to: receivers,
      title,
      body,
    });

    console.log("BREVO MAIL SENT:", response?.messageId || response);
    return response;
  } catch (error) {
    console.error(
      "BREVO MAIL ERROR:",
      error.response?.text || error
    );
    throw error;
  }
};

module.exports = mailSender;
