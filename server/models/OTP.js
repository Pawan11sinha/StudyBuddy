const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

// OTP Schema
const OTPSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 5 * 60, // OTP expires in 5 minutes
    },
  },
  { timestamps: true }
);

// Safe Email Sender (does NOT crash on Render)
async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      emailTemplate(otp)
    );

    console.log(
      "Email sent:",
      mailResponse?.response || "no response returned"
    );
  } catch (error) {
    console.error("Failed to send verification email:", error.message);
  }
}

// Fire-and-forget Post-save Hook (does not block API)
OTPSchema.post("save", function (doc) {
  console.log("OTP saved:", doc.email, doc.otp);

  // Background email sending — never await (prevents hanging)
  sendVerificationEmail(doc.email, doc.otp).catch((err) =>
    console.error("Email sending error:", err.message)
  );
});

module.exports = mongoose.model("OTP", OTPSchema);
