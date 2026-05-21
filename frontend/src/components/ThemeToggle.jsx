import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg transition-all duration-300 hover:bg-white/20 cursor-pointer group"
      title={isDark ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
    >
      <div className="relative w-6 h-6 overflow-hidden">
        {/* Sol */}
        <svg
          className={`absolute inset-0 w-6 h-6 transition-all duration-500 ${
            isDark
              ? 'rotate-90 scale-0 opacity-0'
              : 'rotate-0 scale-100 opacity-100'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="5" strokeWidth={2} />
          <path
            strokeLinecap="round"
            strokeWidth={2}
            d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
          />
        </svg>

        {/* Lua */}
        <svg
          className={`absolute inset-0 w-6 h-6 transition-all duration-500 ${
            isDark
              ? 'rotate-0 scale-100 opacity-100'
              : '-rotate-90 scale-0 opacity-0'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
          />
        </svg>
      </div>
    </button>
  );
}

export default ThemeToggle;
