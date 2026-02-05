import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Handler } from "@netlify/functions";

const handler: Handler = async (event) => {
  try {
    // Read data sent from frontend
    const body = event.body ? JSON.parse(event.body) : {};
    const { language, mood } = body;

    // API key from Netlify environment variables
    const apiKey = process.env.VITE_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "API key not configured" }),
      };
    }

    // Initialize Gemini (SERVER-SIDE — SAFE)
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
Generate a short, powerful motivational quote in ${language} for a person who feels ${mood}.
Include the author name.
If not English, also give an English translation.
Return the response clearly.
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return {
      statusCode: 200,
      body: JSON.stringify({ result: text }),
    };

  } catch (error: any) {
    // 🔴 DEBUG: expose the real Gemini / runtime error
    console.error("Gemini error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error?.message || String(error),
      }),
    };
  }
};

export { handler };
