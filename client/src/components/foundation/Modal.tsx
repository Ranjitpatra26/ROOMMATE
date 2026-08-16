import React, { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'md',
}) => {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const maxWidthClass = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-3xl',
    xl: 'max-w-5xl',
  }[maxWidth];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-modal flex items-center justify-center p-4 sm:p-6">
          {/* Glassmorphic Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.05 : 0.22, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 bg-earth-indigo/40 dark:bg-black/60 backdrop-blur-[20px]"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{
              opacity: 0,
              scale: shouldReduceMotion ? 1 : 0.97,
              y: shouldReduceMotion ? 0 : 8,
            }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: shouldReduceMotion ? 1 : 0.97,
              y: shouldReduceMotion ? 0 : 8,
            }}
            transition={{ duration: shouldReduceMotion ? 0.05 : 0.28, ease: [0.19, 1, 0.22, 1] }}
            className={`relative w-full ${maxWidthClass} bg-clay text-earth-indigo rounded-2xl border border-surface-dim shadow-2xl p-6 sm:p-8 z-10`}
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-surface-dim">
              {title && (
                <h3 className="font-serif text-headline-sm font-semibold text-earth-indigo">
                  {title}
                </h3>
              )}
              <button
                onClick={onClose}
                className="ml-auto p-1.5 rounded-full text-secondary hover:text-earth-indigo hover:bg-surface-low transition-colors cursor-pointer"
                aria-label="Close modal"
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
