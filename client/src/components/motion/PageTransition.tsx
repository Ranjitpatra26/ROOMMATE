import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children, className }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: shouldReduceMotion ? 0 : 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: shouldReduceMotion ? 0.05 : 0.35,
          ease: [0.19, 1, 0.22, 1],
        },
      }}
      exit={{
        opacity: 0,
        y: shouldReduceMotion ? 0 : -8,
        transition: {
          duration: shouldReduceMotion ? 0.05 : 0.2,
          ease: [0.19, 1, 0.22, 1],
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
