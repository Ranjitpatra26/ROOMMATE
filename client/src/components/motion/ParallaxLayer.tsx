import React, { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';

export interface ParallaxLayerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  speed?: number; // e.g. -0.2 for slower, 0.2 for faster
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  speed = 0.15,
  className,
  ...props
}) => {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: () => speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={elRef} className={className} {...props}>
      {children}
    </div>
  );
};
