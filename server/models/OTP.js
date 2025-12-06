const mongoose = require("mongoose");

// SIMPLE, CLEAN OTP MODEL — NO EMAIL SENDING
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
      expires: 5 * 60, // OTP 5 minutes me expire ho jayega
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OTP", OTPSchema);
