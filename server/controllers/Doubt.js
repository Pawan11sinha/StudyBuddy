let modelPromise = null;

async function getModel() {
  if (!modelPromise) {
    modelPromise = (async () => {
      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

      // ✅ New Gemini v1 model
      return genAI.getGenerativeModel({
       model: "gemini-2.5-flash",
      });
    })();
  }
  return modelPromise;
}

async function handleDoubt(req, res) {
  try {
    const { message, subject, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    let historyText = "";
    if (Array.isArray(history) && history.length > 0) {
      history.forEach((m) => {
        historyText += `${m.role === "user" ? "Student" : "Tutor"}: ${
          m.text
        }\n`;
      });
    }

    const prompt = `
You are an AI tutor for a college student.

Subject: ${subject || "General"}

Conversation so far:
${historyText || "No previous conversation."}

Now the student asks:
"${message}"

Answer in a clear, step-by-step way. If it is a coding question, explain the logic as well.
`;

    const model = await getModel();
    const result = await model.generateContent(prompt);
    
    if (!result || !result.response) {
      throw new Error("Failed to get response from AI model");
    }
    
    const text = result.response.text();
    // console.log("AI Response:", text);

    return res.json({
      success: true,
      reply: text,
    });
  } catch (error) {
    console.error("AI DOUBT ERROR:", {
      msg: error.message,
      status: error.status,
      details: error.errorDetails,
    });
    return res.status(500).json({
      success: false,
      message: "Failed to generate answer",
    });
  }
} 

module.exports = { handleDoubt };
