import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const { language, mood } = body;

    if (!language || !mood) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing language or mood" }),
      };
    }

    const apiKey = process.env.VITE_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "API key not configured" }),
      };
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
Generate a short, powerful motivational quote in ${language}
for a person feeling ${mood}.
Include the author.
If not English, include English translation.
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ result: text }),
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
