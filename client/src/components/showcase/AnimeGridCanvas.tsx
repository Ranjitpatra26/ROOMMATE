import React, { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

interface AnimeGridCanvasProps {
  className?: string;
}

export const AnimeGridCanvas: React.FC<AnimeGridCanvasProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInteracting = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const gridCols = 16;
    const gridRows = 10;
    const totalDots = gridCols * gridRows;

    // Clear previous elements
    container.innerHTML = '';

    // Create dot elements with coordinates
    const dots: HTMLDivElement[] = [];
    for (let i = 0; i < totalDots; i++) {
      const col = i % gridCols;
      const row = Math.floor(i / gridCols);

      const dot = document.createElement('div');
      dot.className =
        'w-2 h-2 rounded-full bg-vitality-coral/40 dark:bg-vitality-coral/50 transition-colors will-change-transform';
      dot.dataset.col = col.toString();
      dot.dataset.row = row.toString();
      container.appendChild(dot);
      dots.push(dot);
    }

    // Initial Ripple Wave with anime.js
    const triggerWave = (fromIndex: number) => {
      animate(dots, {
        scale: [
          { value: 0.25, duration: 150 },
          { value: 1.6, duration: 350 },
          { value: 1, duration: 400 },
        ],
        opacity: [
          { value: 0.2, duration: 150 },
          { value: 0.9, duration: 350 },
          { value: 0.45, duration: 400 },
        ],
        delay: stagger(45, {
          grid: [gridCols, gridRows],
          from: fromIndex,
        }),
      });
    };

    // Trigger initial center ripple
    triggerWave(Math.floor(totalDots / 2));

    // Handle Cursor Move Over Grid
    const handleMouseMove = (e: MouseEvent) => {
      if (isInteracting.current) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

      const col = Math.floor((x / rect.width) * gridCols);
      const row = Math.floor((y / rect.height) * gridRows);
      const targetIndex = row * gridCols + col;

      if (targetIndex >= 0 && targetIndex < totalDots) {
        isInteracting.current = true;
        animate(dots, {
          scale: [
            { value: 1.5, duration: 200 },
            { value: 1, duration: 350 },
          ],
          opacity: [
            { value: 0.85, duration: 200 },
            { value: 0.4, duration: 350 },
          ],
          delay: stagger(30, {
            grid: [gridCols, gridRows],
            from: targetIndex,
          }),
          onComplete: () => {
            isInteracting.current = false;
          },
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`grid grid-cols-16 gap-3 sm:gap-4 p-4 place-items-center opacity-60 pointer-events-none select-none ${className}`}
      style={{ gridTemplateColumns: 'repeat(16, minmax(0, 1fr))' }}
    />
  );
};
