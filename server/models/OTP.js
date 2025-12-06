const mongoose = require("mongoose")
const mailSender = require("../utils/mailSender")
// Yaha apna actual template import karo
const emailTemplate = require("../mail/templates/emailVerificationTemplate")

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
      expires: 5 * 60, 
    },
  },
  { timestamps: true }
)

async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      emailTemplate(otp)
    )
    console.log("Email sent successfully: ", mailResponse.response)
  } catch (error) {
    console.log("Error occurred while sending email: ", error)
   
  }
}

OTPSchema.post("save", async function (doc) {
  console.log("New OTP document saved to database")

  await sendVerificationEmail(doc.email, doc.otp)
})

module.exports = mongoose.model("OTP", OTPSchema)
