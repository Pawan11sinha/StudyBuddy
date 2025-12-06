const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");  // Resend version
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
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
    expires: 60 * 5,
  },
});

// PRE HOOK - mail DB me save hone se pehle bhejega
// OTPSchema.pre("save", async function () {
//   console.log("PRE: About to send verification email…");
//   try {
//     await mailSender(this.email, "Verification Email", emailTemplate(this.otp));
//     console.log("PRE: Email sent successfully");
//     next();
//   } catch (err) {
//     console.log("PRE HOOK EMAIL ERROR:", err);
//     // Important → Even if email fails, DON'T block DB save
     
//   }
// });

module.exports = mongoose.model("OTP", OTPSchema);
