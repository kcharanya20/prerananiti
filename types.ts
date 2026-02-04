export enum Language {
  ENGLISH = 'English',
  HINDI = 'Hindi',
  KANNADA = 'Kannada'
}

export enum Mood {
  MOTIVATED = 'Motivated',
  SAD = 'Sad',
  ANXIOUS = 'Anxious',
  HAPPY = 'Happy',
  TIRED = 'Tired',
  CONFUSED = 'Confused',
  GRATEFUL = 'Grateful'
}

export interface QuoteData {
  quote: string;
  author: string;
  englishTranslation?: string;
  language: Language;
  mood: Mood;
  id: string;
  timestamp: number;
}

export interface GenerateQuoteResponse {
  quote: string;
  author: string;
  englishTranslation?: string;
}
