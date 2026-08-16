import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export interface SelectionChipProps {
  label: string;
  subtitle?: string;
  icon?: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

export const SelectionChip: React.FC<SelectionChipProps> = ({
  label,
  subtitle,
  icon,
  selected,
  onClick,
  orientation = 'vertical',
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={shouldReduceMotion ? undefined : { y: -2 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
      transition={{ duration: 0.18, ease: [0.19, 1, 0.22, 1] }}
      className={`relative w-full border rounded-xl p-5 text-left transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-vitality-coral cursor-pointer ${
        selected
          ? 'bg-earth-indigo text-clay border-earth-indigo shadow-md'
          : 'bg-clay dark:bg-surface-low border-surface-dim hover:border-earth-indigo/60 text-earth-indigo'
      } ${
        orientation === 'vertical'
          ? 'flex flex-col items-center text-center justify-center'
          : 'flex items-start gap-4'
      } ${className}`}
    >
      {icon && (
        <div
          className={`shrink-0 mb-3 text-2xl transition-transform ${
            selected ? 'text-vitality-coral scale-105' : 'text-secondary'
          }`}
        >
          {icon}
        </div>
      )}
      <div className="flex-1">
        <span
          className={`font-sans text-ui-medium font-semibold block ${
            selected ? 'text-clay' : 'text-earth-indigo'
          }`}
        >
          {label}
        </span>
        {subtitle && (
          <span
            className={`font-sans text-xs mt-1 block leading-relaxed ${
              selected ? 'text-surface-dim opacity-90' : 'text-secondary'
            }`}
          >
            {subtitle}
          </span>
        )}
      </div>
    </motion.button>
  );
};
