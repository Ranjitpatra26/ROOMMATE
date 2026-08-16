import React, { useId } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface UnderlineInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const UnderlineInput: React.FC<UnderlineInputProps> = ({
  label,
  error,
  helperText,
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
          className="font-sans text-label-caps uppercase tracking-[0.1em] font-bold text-earth-indigo/85 mb-2 transition-colors group-focus-within:text-earth-indigo"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={twMerge(
          clsx(
            'w-full bg-transparent border-0 border-b-2 py-2 px-0 text-body-md font-sans text-earth-indigo placeholder:text-muted focus:outline-none transition-all duration-250 ease-editorial',
            error
              ? 'border-vitality-coral focus:border-vitality-coral'
              : 'border-earth-indigo/30 focus:border-earth-indigo',
            className
          )
        )}
        {...props}
      />
      {error ? (
        <span className="font-sans text-metadata text-vitality-coral font-semibold mt-1.5">{error}</span>
      ) : helperText ? (
        <span className="font-sans text-metadata text-secondary mt-1.5">{helperText}</span>
      ) : null}
    </div>
  );
};
