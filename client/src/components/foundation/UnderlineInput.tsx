import React, { useId } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface UnderlineInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  rightElement?: React.ReactNode;
}

export const UnderlineInput: React.FC<UnderlineInputProps> = ({
  label,
  error,
  helperText,
  rightElement,
  className,
  id,
  ...props
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className="flex flex-col w-full relative group">
      {label && (
        <label
          htmlFor={inputId}
          className="font-sans text-label-caps uppercase tracking-[0.1em] font-bold text-earth-indigo/85 dark:text-earth-fixed/80 mb-2 transition-colors group-focus-within:text-earth-indigo dark:group-focus-within:text-earth-fixed"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center w-full">
        <input
          id={inputId}
          className={twMerge(
            clsx(
              'w-full bg-transparent border-0 border-b-2 py-2.5 px-0 text-body-md font-sans text-earth-indigo placeholder:text-muted focus:outline-none transition-all duration-200 ease-editorial',
              rightElement ? 'pr-10' : '',
              error
                ? 'border-vitality-coral focus:border-vitality-coral'
                : 'border-surface-dim focus:border-earth-indigo dark:focus:border-white',
              className
            )
          )}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center">
            {rightElement}
          </div>
        )}
      </div>
      {error ? (
        <span className="font-sans text-metadata text-vitality-coral font-semibold mt-1.5">{error}</span>
      ) : helperText ? (
        <span className="font-sans text-metadata text-secondary mt-1.5">{helperText}</span>
      ) : null}
    </div>
  );
};
