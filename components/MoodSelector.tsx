import React from 'react';
import { Mood } from '../types';

interface MoodSelectorProps {
  selectedMood: Mood;
  onSelect: (mood: Mood) => void;
}

const moodEmojis: Record<Mood, string> = {
  [Mood.MOTIVATED]: '🚀',
  [Mood.SAD]: '😔',
  [Mood.ANXIOUS]: '😰',
  [Mood.HAPPY]: '☀️',
  [Mood.TIRED]: '😴',
  [Mood.CONFUSED]: '🤔',
  [Mood.GRATEFUL]: '🙏',
};

const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onSelect }) => {
  return (
    <div className="w-full mb-8">
      {/* Scrollable container with negative margin on mobile to allow edge-to-edge scrolling while preserving padding effect */}
      <div className="overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible scrollbar-hide">
        <div className="flex gap-3 md:flex-wrap md:justify-center w-max md:w-full mx-auto md:mx-0">
          {Object.values(Mood).map((mood) => (
            <button
              key={mood}
              onClick={() => onSelect(mood)}
              className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-200 whitespace-nowrap ${
                selectedMood === mood
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
              }`}
            >
              <span className="text-lg">{moodEmojis[mood]}</span>
              <span className="text-sm font-medium">{mood}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodSelector;