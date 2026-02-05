import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Language, Mood, GenerateQuoteResponse } from "../types";

// ✅ Correct way to access env vars in Vite
const apiKey = import.meta.env.VITE_API_KEY;

if (!apiKey) {
  throw new Error("VITE_API_KEY is not defined");
}

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey });

const quoteSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    quote: {
      type: Type.STRING,
      description: "The motivational quote in the requested language.",
    },
    author: {
      type: Type.STRING,
      description: "The name of the author of the quote.",
    },
    englishTranslation: {
      type: Type.STRING,
      description:
        "The English translation of the quote if the requested language is not English. Otherwise null or empty string.",
    },
  },
  required: ["quote", "author"],
};

export const generateQuoteFromGemini = async (
  language: Language,
  mood: Mood
): Promise<GenerateQuoteResponse> => {
  try {
    const prompt = `Generate a powerful, short, and inspiring motivational quote in ${language} language specifically for someone who is feeling ${mood}. 
If the language is Kannada or Hindi, provide the script correctly. 
Also provide the author name. 
If the language is not English, provide a clear English translation.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: quoteSchema,
        temperature: 1.2,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini.");
    }

    return JSON.parse(text) as GenerateQuoteResponse;
  } catch (error) {
    console.error("Error generating quote:", error);
    throw error;
  }
};
