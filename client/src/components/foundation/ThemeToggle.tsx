import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.js';

export interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  showLabel = false,
}) => {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`relative inline-flex items-center justify-center p-2.5 rounded-full bg-clay/95 dark:bg-earth-container/95 backdrop-blur-xl border border-surface-dim dark:border-white/20 shadow-md text-earth-indigo hover:border-vitality-coral focus-visible:outline-2 focus-visible:outline-vitality-coral transition-all cursor-pointer select-none ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 text-vitality-coral transition-transform duration-300 rotate-0 hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 text-earth-indigo transition-transform duration-300 rotate-0 hover:-rotate-12" />
        )}
      </div>
      {showLabel && (
        <span className="font-sans text-xs font-bold tracking-wider uppercase pr-1 text-earth-indigo">
          {isDark ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  );
};
