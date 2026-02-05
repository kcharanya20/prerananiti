import { Language, Mood, GenerateQuoteResponse } from "../types";

export const generateQuoteFromGemini = async (
  language: Language,
  mood: Mood
): Promise<GenerateQuoteResponse> => {
  try {
    const response = await fetch("/.netlify/functions/generateQuote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ language, mood }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate quote");
    }

    const data = await response.json();

    // Backend returns plain text, so we map it
    return {
      quote: data.result,
      author: "",
      englishTranslation: "",
    };
  } catch (error) {
    console.error("Error generating quote:", error);
    throw error;
  }
};
