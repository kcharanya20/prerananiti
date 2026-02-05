import { GoogleGenerativeAI } from "@google/generative-ai";

export default async (req: Request) => {
  try {
    // Read data sent from frontend
    const { language, mood } = await req.json();

    // API key comes from Netlify environment variables
    const apiKey = process.env.VITE_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "API key not configured" }),
        { status: 500 }
      );
    }

    // Initialize Gemini (SERVER-SIDE — SAFE ✅)
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

    return new Response(
      JSON.stringify({ result: text }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to generate quote" }),
      { status: 500 }
    );
  }
};
