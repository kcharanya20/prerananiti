import React from 'react';
import { QuoteData, Language } from '../types';
import { ShareIcon } from './Icons';

interface SavedQuotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  quotes: QuoteData[];
  onRemove: (id: string) => void;
}

const SavedQuotesModal: React.FC<SavedQuotesModalProps> = ({ isOpen, onClose, quotes, onRemove }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-3xl w-full max-w-md max-h-[80vh] flex flex-col shadow-2xl overflow-hidden animate-scale-in">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800">Your Collection</h2>
          <button 
            onClick={onClose}
            className="p-2 bg-white rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
          >
            ✕
          </button>
        </div>
        
        <div className="overflow-y-auto p-6 space-y-4">
          {quotes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-2">No saved quotes yet.</p>
              <p className="text-sm text-gray-500">Tap the heart icon on a quote to save it here.</p>
            </div>
          ) : (
            quotes.map((quote) => (
              <div key={quote.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-semibold text-indigo-500 bg-indigo-50 px-2 py-1 rounded-full">{quote.language}</span>
                  <button 
                    onClick={() => onRemove(quote.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <p className={`text-gray-800 font-medium mb-2 ${quote.language === Language.KANNADA ? 'font-kannada' : ''}`}>
                  "{quote.quote}"
                </p>
                {quote.englishTranslation && quote.language !== Language.ENGLISH && (
                   <p className="text-gray-500 text-xs italic mb-2 border-l-2 border-gray-200 pl-2">
                     {quote.englishTranslation}
                   </p>
                )}
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs text-gray-500">— {quote.author}</span>
                  <button 
                    onClick={() => {
                       const text = `"${quote.quote}" - ${quote.author}\nShared via PreranaNiti`;
                       if (navigator.share) navigator.share({ text });
                       else navigator.clipboard.writeText(text);
                    }}
                    className="text-indigo-600 hover:text-indigo-800 p-1"
                  >
                    <ShareIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedQuotesModal;