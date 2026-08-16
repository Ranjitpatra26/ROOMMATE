import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'trust' | 'vitality' | 'earth' | 'neutral';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  children,
  className,
  ...props
}) => {
  const variantStyles = {
    trust: 'bg-trust-light/40 text-trust-teal border border-trust-teal/30',
    vitality: 'bg-vitality-fixed/50 text-vitality-dark border border-vitality-coral/40',
    earth: 'bg-earth-fixed/40 text-earth-indigo border border-earth-indigo/20',
    neutral: 'bg-clay-container text-earth-indigo/70 border border-outline-variant/50',
  }[variant];

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-label-caps font-bold tracking-[0.08em] uppercase',
          variantStyles,
          className
        )
      )}
      {...props}
    >
      {children}
    </span>
  );
};
