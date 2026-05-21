import React, { useState, useEffect, useRef } from 'react';

function SearchBar({ value, onChange, placeholder = 'Buscar...' }) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  return (
    <div
      className={`relative flex items-center transition-all duration-300 ${
        focused ? 'ring-2 ring-blue-500 dark:ring-purple-500' : ''
      } bg-white dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 rounded-lg overflow-hidden`}
    >
      <div className="pl-3 text-gray-400 dark:text-gray-500">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 bg-transparent text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none text-sm"
      />
      {value && (
        <button
          onClick={() => {
            onChange('');
            inputRef.current?.focus();
          }}
          className="pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default SearchBar;
