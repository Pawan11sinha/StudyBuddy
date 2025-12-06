const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
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
		expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
	},
});

// Define a function to send emails
async function sendVerificationEmail(email, otp) {
	// Create a transporter to send emails

	// Define the email options

	// Send the email
	try {
		const mailResponse = await mailSender(
			email,
			"Verification Email",
			emailTemplate(otp)
		);
		if (mailResponse && mailResponse.response) {
			console.log("Email sent successfully: ", mailResponse.response);
		} else {
			console.log("Email sent successfully");
		}
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}


// Define a post-save hook to send email after the document has been saved
// Using post-save and fire-and-forget to avoid blocking the response
OTPSchema.post("save", function (doc) {
	console.log("OTP document saved to database, sending email in background");

	// Fire and forget - don't await, send email in background
	// This ensures the API response is not delayed by email sending
	sendVerificationEmail(doc.email, doc.otp).catch(error => {
		console.error("Failed to send verification email:", error);
		// Email failure doesn't affect the OTP creation
	});
});

const OTP = mongoose.model("OTP", OTPSchema);