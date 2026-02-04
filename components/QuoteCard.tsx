import React, { useState } from 'react';
import { QuoteData, Language } from '../types';
import { HeartIcon, ShareIcon } from './Icons';

interface QuoteCardProps {
  quote: QuoteData | null;
  isLoading: boolean;
  onSave: (quote: QuoteData) => void;
  isSaved: boolean;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, isLoading, onSave, isSaved }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (!quote) return;

    const shareText = `"${quote.quote}" - ${quote.author}\n\nShared via PreranaNiti App`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Daily Motivation',
          text: shareText,
        });
      } catch (error) {
        console.log('Error sharing', error);
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-6 mx-auto"></div>
        <div className="space-y-3 mb-8">
          <div className="h-6 bg-gray-200 rounded w-full"></div>
          <div className="h-6 bg-gray-200 rounded w-5/6 mx-auto"></div>
          <div className="h-6 bg-gray-200 rounded w-4/6 mx-auto"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto"></div>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 md:p-12 text-center border border-white/50">
        <h3 className="text-xl text-gray-500 font-medium">Select a mood and generate your daily motivation!</h3>
      </div>
    );
  }

  const isKannada = quote.language === Language.KANNADA;

  return (
    <div className="w-full max-w-2xl mx-auto relative group perspective-1000">
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-50 rounded-br-full -z-10 opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-50 rounded-tl-full -z-10 opacity-50"></div>

        <div className="mb-6">
          <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-semibold tracking-wide uppercase">
            {quote.mood} Mood
          </span>
        </div>

        <blockquote className={`text-2xl md:text-4xl font-bold text-gray-800 leading-tight mb-6 ${isKannada ? 'font-kannada' : ''}`}>
          "{quote.quote}"
        </blockquote>

        {quote.englishTranslation && quote.language !== Language.ENGLISH && (
          <p className="text-gray-500 italic mb-6 text-sm md:text-base border-l-4 border-indigo-200 pl-4 text-left mx-auto max-w-lg">
             Meaning: {quote.englishTranslation}
          </p>
        )}

        <cite className="block text-gray-600 font-medium not-italic mb-8">
          — {quote.author}
        </cite>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => onSave(quote)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full transition-all duration-300 transform active:scale-95 ${
              isSaved 
                ? "bg-red-50 text-red-600 border border-red-200" 
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            }`}
          >
            <HeartIcon fill={isSaved ? "currentColor" : "none"} className={isSaved ? "w-5 h-5" : "w-5 h-5 text-gray-400"} />
            <span className="text-sm font-medium">{isSaved ? "Saved" : "Save"}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all duration-300 transform active:scale-95 shadow-lg shadow-indigo-200"
          >
            <ShareIcon className="w-4 h-4" />
            <span className="text-sm font-medium">{copied ? "Copied!" : "Share"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;