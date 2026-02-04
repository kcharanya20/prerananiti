import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Language, Mood, GenerateQuoteResponse } from "../types";

// Initialize Gemini Client
// Accessing API_KEY from process.env as strictly required
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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
      description: "The English translation of the quote if the requested language is not English. Otherwise null or empty string.",
    },
  },
  required: ["quote", "author"],
};

export const generateQuoteFromGemini = async (language: Language, mood: Mood): Promise<GenerateQuoteResponse> => {
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
        temperature: 1.2, // Slightly higher for creativity
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini.");
    }

    const data = JSON.parse(text) as GenerateQuoteResponse;
    return data;
  } catch (error) {
    console.error("Error generating quote:", error);
    throw error;
  }
};
