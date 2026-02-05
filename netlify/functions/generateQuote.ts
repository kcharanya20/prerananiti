import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Handler } from "@netlify/functions";

const handler: Handler = async (event) => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing request body" }),
      };
    }

    const { language, mood } = JSON.parse(event.body);

    const apiKey = process.env.VITE_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "API key not configured" }),
      };
    }

    // ✅ Stable Gemini client
    const genAI = new GoogleGenerativeAI(apiKey);

    // ✅ USE STABLE MODEL (IMPORTANT)
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
    });

    const prompt = `
Generate a short, powerful motivational quote in ${language}
for someone who feels ${mood}.
Include the author.
If not English, include an English translation.
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quote: text }),
    };

  } catch (error: any) {
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
