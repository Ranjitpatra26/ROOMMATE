import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 
    | 'display-hero'
    | 'headline-lg'
    | 'headline-md'
    | 'headline-sm'
    | 'body-lg'
    | 'body-md'
    | 'body-sm'
    | 'ui-medium'
    | 'label-caps'
    | 'metadata';
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body-md',
  as,
  children,
  className,
  ...props
}) => {
  let Component: React.ElementType = as || 'p';

  // Semantic default tag mapping based on variant
  if (!as) {
    switch (variant) {
      case 'display-hero':
        Component = 'h1';
        break;
      case 'headline-lg':
        Component = 'h2';
        break;
      case 'headline-md':
        Component = 'h3';
        break;
      case 'headline-sm':
        Component = 'h4';
        break;
      case 'label-caps':
      case 'metadata':
        Component = 'span';
        break;
      default:
        Component = 'p';
    }
  }

  const variantStyles = {
    'display-hero': 'font-serif text-display-hero tracking-[-0.02em] font-bold text-earth-indigo',
    'headline-lg': 'font-serif text-headline-lg tracking-[-0.01em] font-semibold text-earth-indigo',
    'headline-md': 'font-serif text-headline-md tracking-[-0.01em] font-semibold text-earth-indigo',
    'headline-sm': 'font-sans text-headline-sm font-semibold text-earth-indigo',
    'body-lg': 'font-sans text-body-lg font-normal text-earth-indigo/90 leading-[1.55]',
    'body-md': 'font-sans text-body-md font-normal text-earth-indigo/80 leading-[1.5]',
    'body-sm': 'font-sans text-body-sm font-normal text-earth-indigo/70',
    'ui-medium': 'font-sans text-ui-medium font-semibold text-earth-indigo',
    'label-caps': 'font-sans text-label-caps uppercase tracking-[0.1em] font-bold text-earth-indigo/70',
    'metadata': 'font-sans text-metadata font-medium text-earth-indigo/60 tracking-[0.05em]',
  }[variant];

  return (
    <Component className={twMerge(clsx(variantStyles, className))} {...props}>
      {children}
    </Component>
  );
};
