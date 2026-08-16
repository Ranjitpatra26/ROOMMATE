import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, useReducedMotion, HTMLMotionProps } from 'motion/react';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  disabled,
  isLoading,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();

  const baseStyles =
    'inline-flex items-center justify-center font-sans font-semibold transition-colors duration-200 select-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer text-center';

  const sizeStyles = {
    sm: 'h-9 px-4 text-ui-medium rounded-lg gap-1.5',
    md: 'h-11 px-6 text-ui-medium rounded-xl gap-2',
    lg: 'h-14 px-8 text-body-md rounded-xl gap-3',
  }[size];

  const variantStyles = {
    primary:
      'bg-earth-indigo text-clay hover:bg-earth-container shadow-sm shadow-earth-indigo/10',
    secondary:
      'bg-transparent text-earth-indigo border border-earth-indigo/30 hover:border-earth-indigo hover:bg-earth-indigo/5',
    ghost:
      'bg-transparent text-earth-indigo hover:bg-earth-indigo/5 underline-offset-4 hover:underline',
    danger:
      'bg-vitality-coral text-white hover:bg-vitality-coral/90 shadow-sm shadow-vitality-coral/20',
  }[variant];

  return (
    <motion.button
      whileHover={shouldReduceMotion || disabled || isLoading ? undefined : { scale: 1.012 }}
      whileTap={shouldReduceMotion || disabled || isLoading ? undefined : { scale: 0.985 }}
      transition={{ duration: 0.15, ease: [0.19, 1, 0.22, 1] }}
      className={twMerge(clsx(baseStyles, sizeStyles, variantStyles, className))}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </motion.button>
  );
};
