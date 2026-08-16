import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.45,
  yOffset = 20,
  direction = 'up',
}) => {
  const shouldReduceMotion = useReducedMotion();

  let initialX = 0;
  let initialY = 0;

  if (!shouldReduceMotion) {
    if (direction === 'up') initialY = yOffset;
    if (direction === 'down') initialY = -yOffset;
    if (direction === 'left') initialX = yOffset;
    if (direction === 'right') initialX = -yOffset;
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: initialX,
        y: initialY,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: shouldReduceMotion ? 0.05 : duration,
          delay: shouldReduceMotion ? 0 : delay,
          ease: [0.19, 1, 0.22, 1],
        },
      }}
      viewport={{ once: true, amount: 0.15 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
