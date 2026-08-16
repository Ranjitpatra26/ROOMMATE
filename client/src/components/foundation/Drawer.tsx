import React, { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  position?: 'bottom' | 'right';
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  position = 'bottom',
}) => {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const isBottom = position === 'bottom';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-modal flex items-end justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.05 : 0.22 }}
            className="fixed inset-0 bg-earth-indigo/30 dark:bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Drawer Body */}
          <motion.div
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : isBottom
                ? { y: '100%' }
                : { x: '100%' }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : isBottom
                ? { y: 0 }
                : { x: 0 }
            }
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : isBottom
                ? { y: '100%' }
                : { x: '100%' }
            }
            transition={{ duration: shouldReduceMotion ? 0.05 : 0.32, ease: [0.19, 1, 0.22, 1] }}
            className={`relative z-10 w-full bg-clay text-earth-indigo border-t border-surface-dim p-6 sm:p-8 max-h-[85vh] overflow-y-auto ${
              isBottom ? 'rounded-t-3xl max-w-4xl' : 'h-full max-w-md ml-auto'
            }`}
          >
            {/* Mobile drag handle */}
            {isBottom && (
              <div className="w-12 h-1.5 bg-surface-dim rounded-full mx-auto mb-4" />
            )}

            <div className="flex items-center justify-between pb-3 mb-4 border-b border-surface-dim">
              {title && (
                <h3 className="font-serif text-headline-sm font-semibold text-earth-indigo">
                  {title}
                </h3>
              )}
              <button
                onClick={onClose}
                className="ml-auto p-1.5 rounded-full text-secondary hover:text-earth-indigo hover:bg-surface-low transition-colors cursor-pointer"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
