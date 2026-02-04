import React, { useState, useEffect } from 'react';
import { Language, Mood, QuoteData } from './types';
import { generateQuoteFromGemini } from './services/geminiService';
import QuoteCard from './components/QuoteCard';
import LanguageSelector from './components/LanguageSelector';
import MoodSelector from './components/MoodSelector';
import SavedQuotesModal from './components/SavedQuotesModal';
import { SparklesIcon, BookmarkIcon } from './components/Icons';

export const App: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState<QuoteData | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(Language.ENGLISH);
  const [selectedMood, setSelectedMood] = useState<Mood>(Mood.MOTIVATED);
  const [savedQuotes, setSavedQuotes] = useState<QuoteData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);

  // Load saved quotes from local storage on mount
  useEffect(() => {
    const stored = localStorage.getItem('prerana_saved_quotes');
    if (stored) {
      try {
        setSavedQuotes(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse saved quotes");
      }
    }
    
    // Initial fetch to make the app look alive
    handleGenerate(Language.ENGLISH, Mood.MOTIVATED);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save to local storage whenever list changes
  useEffect(() => {
    localStorage.setItem('prerana_saved_quotes', JSON.stringify(savedQuotes));
  }, [savedQuotes]);

  const handleGenerate = async (lang: Language = selectedLanguage, mood: Mood = selectedMood) => {
    setIsLoading(true);
    try {
      const response = await generateQuoteFromGemini(lang, mood);
      
      const newQuote: QuoteData = {
        ...response,
        language: lang,
        mood: mood,
        id: crypto.randomUUID(),
        timestamp: Date.now(),
      };
      
      setCurrentQuote(newQuote);
    } catch (error) {
      console.error("Failed to generate quote", error);
      // Optional: Add toast or error message here
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveQuote = (quote: QuoteData) => {
    const exists = savedQuotes.some(q => q.quote === quote.quote);
    if (exists) {
      setSavedQuotes(prev => prev.filter(q => q.quote !== quote.quote));
    } else {
      setSavedQuotes(prev => [quote, ...prev]);
    }
  };

  const isCurrentQuoteSaved = currentQuote ? savedQuotes.some(q => q.quote === currentQuote.quote) : false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] right-[20%] w-[50%] h-[50%] bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/70 backdrop-blur-md border-b border-white/50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
               <SparklesIcon className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              PreranaNiti
            </h1>
          </div>
          <button 
            onClick={() => setIsSavedModalOpen(true)}
            className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors rounded-full hover:bg-indigo-50"
          >
            <BookmarkIcon className="w-6 h-6" />
            {savedQuotes.length > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-24 pb-12 px-4 max-w-4xl mx-auto min-h-screen flex flex-col items-center">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">How are you feeling today?</h2>
          <p className="text-gray-500">Select a mood and language to get your daily dose of AI wisdom.</p>
        </div>

        <LanguageSelector 
          selectedLanguage={selectedLanguage} 
          onSelect={setSelectedLanguage} 
        />

        <MoodSelector 
          selectedMood={selectedMood} 
          onSelect={setSelectedMood} 
        />

        <div className="w-full mb-12">
          <QuoteCard 
            quote={currentQuote} 
            isLoading={isLoading} 
            onSave={handleSaveQuote}
            isSaved={isCurrentQuoteSaved}
          />
        </div>

        <button
          onClick={() => handleGenerate()}
          disabled={isLoading}
          className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white transition-all duration-200 bg-indigo-600 font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-700 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-indigo-300"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <SparklesIcon className="w-5 h-5 group-hover:animate-pulse" />
              Inspire Me
            </span>
          )}
        </button>

      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} PreranaNiti. Powered by Gemini AI.</p>
      </footer>

      {/* Modals */}
      <SavedQuotesModal 
        isOpen={isSavedModalOpen} 
        onClose={() => setIsSavedModalOpen(false)} 
        quotes={savedQuotes}
        onRemove={(id) => setSavedQuotes(prev => prev.filter(q => q.id !== id))}
      />
    </div>
  );
};