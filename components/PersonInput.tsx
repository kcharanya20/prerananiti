import React from 'react';
import { SearchIcon, XIcon } from './Icons';

interface PersonInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

const PersonInput: React.FC<PersonInputProps> = ({ value, onChange, onClear }) => {
  return (
    <div className="w-full max-w-md mx-auto mb-8 relative group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Inspired by... (e.g. Steve Jobs, Rumi)"
        className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out sm:text-sm shadow-sm hover:shadow-md"
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-600"
        >
          <XIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default PersonInput;
