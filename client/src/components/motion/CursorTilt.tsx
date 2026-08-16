import React, { useRef, useState, useEffect } from 'react';

export interface CursorTiltProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxTilt?: number; // max degrees (default: 5)
  perspective?: number; // px (default: 1000)
}

export const CursorTilt: React.FC<CursorTiltProps> = ({
  children,
  maxTilt = 5,
  perspective = 1000,
  className,
  style,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('rotateX(0deg) rotateY(0deg)');
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTransform(`rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`);
  };

  const handleMouseLeave = () => {
    setTransform('rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
        ...style,
      }}
      className={className}
      {...props}
    >
      <div
        style={{
          transform,
          transition: 'transform 0.15s cubic-bezier(0.19, 1, 0.22, 1)',
        }}
      >
        {children}
      </div>
    </div>
  );
};
