import React from 'react';

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'full';
  as?: React.ElementType;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  size = 'lg',
  as: Component = 'div',
}) => {
  const sizeStyles = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-[1440px]',
    full: 'max-w-full',
  };

  return (
    <Component
      className={`w-full mx-auto px-margin-mobile md:px-gutter ${sizeStyles[size]} ${className}`}
    >
      {children}
    </Component>
  );
};
