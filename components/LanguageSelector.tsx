import React from 'react';
import { Language } from '../types';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onSelect: (lang: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onSelect }) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="bg-white/50 backdrop-blur-sm p-1.5 rounded-2xl shadow-sm border border-white/60 flex flex-wrap gap-1 justify-center">
        {Object.values(Language).map((lang) => (
          <button
            key={lang}
            onClick={() => onSelect(lang)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              selectedLanguage === lang
                ? 'bg-white text-indigo-600 shadow-md transform scale-105'
                : 'text-gray-500 hover:text-gray-700 hover:bg-white/40'
            }`}
          >
            {lang}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
