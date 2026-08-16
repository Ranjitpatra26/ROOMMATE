import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  useReducedMotion,
} from 'motion/react';

// ============================================================================
// 1. 3D Scroll Plane for Featured Images (Reference: 3D Planes Velocity Scroll)
// ============================================================================
export interface Scroll3DPlaneProps {
  children: React.ReactNode;
  className?: string;
  depthIntensity?: number; // default 1
  tiltDirection?: 'left' | 'right';
  badgeOverlay?: React.ReactNode;
}

export const Scroll3DPlane: React.FC<Scroll3DPlaneProps> = ({
  children,
  className = '',
  depthIntensity = 1,
  tiltDirection = 'left',
  badgeOverlay,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 45, stiffness: 280 });

  // Velocity-driven subtle dynamic tilt (reverses with scroll direction)
  const velocityTilt = useTransform(
    smoothVelocity,
    [-2500, 0, 2500],
    [-2.5 * depthIntensity, 0, 2.5 * depthIntensity]
  );

  // Scroll Progress Transforms: Continuous 3D Plane depth
  const dirMultiplier = tiltDirection === 'left' ? 1 : -1;

  const planeY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [70 * depthIntensity, 0, -70 * depthIntensity]
  );

  const planeRotateY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [5 * dirMultiplier * depthIntensity, 0, -4 * dirMultiplier * depthIntensity]
  );

  const planeRotateX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [-3 * depthIntensity, 0, 2.5 * depthIntensity]
  );

  const planeScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.94, 1, 1.02]
  );

  const planeOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.75, 1, 1, 0.75]
  );

  // Floating Badge Parallax (Moves at a faster independent rate for authentic multiplane depth)
  const badgeY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [40 * depthIntensity, 0, -40 * depthIntensity]
  );

  const badgeScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.94, 1, 1.04]
  );

  if (shouldReduceMotion) {
    return (
      <div ref={containerRef} className={`relative ${className}`}>
        {children}
        {badgeOverlay}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative [perspective:1200px] [transform-style:preserve-3d] ${className}`}
    >
      <motion.div
        style={{
          y: planeY,
          rotateY: planeRotateY,
          rotateX: planeRotateX,
          rotateZ: velocityTilt,
          scale: planeScale,
          opacity: planeOpacity,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full h-full will-change-transform"
      >
        {children}
      </motion.div>

      {badgeOverlay && (
        <motion.div
          style={{
            y: badgeY,
            scale: badgeScale,
            transformStyle: 'preserve-3d',
          }}
          className="absolute z-20 pointer-events-auto will-change-transform"
        >
          {badgeOverlay}
        </motion.div>
      )}
    </div>
  );
};

// ============================================================================
// 2. Parallax Image Inner Zoom (Counter-parallax inside clipped viewport)
// ============================================================================
export interface ParallaxImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
}

export const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  className = '',
  speed = 1,
  ...props
}) => {
  const imgRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ['start end', 'end start'],
  });

  const innerY = useTransform(scrollYProgress, [0, 0.5, 1], [-25 * speed, 0, 25 * speed]);
  const innerScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.14, 1.05, 1.14]);

  if (shouldReduceMotion) {
    return <img src={src} alt={alt} className={className} {...props} />;
  }

  return (
    <div ref={imgRef} className="w-full h-full overflow-hidden relative">
      <motion.img
        src={src}
        alt={alt}
        style={{
          y: innerY,
          scale: innerScale,
        }}
        className={`w-full h-full object-cover will-change-transform ${className}`}
        {...props}
      />
    </div>
  );
};

// ============================================================================
// 3. Staggered Multi-Plane Card (For Lifestyle Architecture 3-pillar section)
// ============================================================================
export interface StaggeredPillarPlaneProps {
  children: React.ReactNode;
  columnIndex: number; // 0, 1, or 2
  className?: string;
}

export const StaggeredPillarPlane: React.FC<StaggeredPillarPlaneProps> = ({
  children,
  columnIndex,
  className = '',
}) => {
  const pillarRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: pillarRef,
    offset: ['start end', 'end start'],
  });

  // Staggered Y parallax offsets: Center pillar sits slightly recessed, outer pillars elevate
  const yOffset =
    columnIndex === 0
      ? [-45, 0, 45]
      : columnIndex === 1
      ? [-15, 0, 15]
      : [-55, 0, 55];

  const rotateZ =
    columnIndex === 0
      ? [-1.5, 0, 1]
      : columnIndex === 1
      ? [0, 0, 0]
      : [1.5, 0, -1];

  const scaleOffset =
    columnIndex === 1
      ? [0.96, 1.03, 0.98]
      : [0.94, 1, 0.96];

  const y = useTransform(scrollYProgress, [0, 0.5, 1], yOffset);
  const rZ = useTransform(scrollYProgress, [0, 0.5, 1], rotateZ);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], scaleOffset);

  if (shouldReduceMotion) {
    return <div ref={pillarRef} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={pillarRef}
      style={{
        y,
        rotateZ: rZ,
        scale,
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// 4. Scroll-Linked Text Parallax Column
// ============================================================================
export interface ScrollTextColumnProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down';
  speed?: number;
}

export const ScrollTextColumn: React.FC<ScrollTextColumnProps> = ({
  children,
  className = '',
  direction = 'up',
  speed = 1,
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ['start end', 'end start'],
  });

  const multiplier = direction === 'up' ? 1 : -1;
  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [35 * multiplier * speed, 0, -35 * multiplier * speed]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.7, 1, 1, 0.7]
  );

  if (shouldReduceMotion) {
    return <div ref={textRef} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={textRef}
      style={{
        y,
        opacity,
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// 5. Cinematic Section Flow Wrapper
// ============================================================================
export interface CinematicSectionProps {
  children: React.ReactNode;
  className?: string;
}

export const CinematicSection: React.FC<CinematicSectionProps> = ({
  children,
  className = '',
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.97, 1, 1, 0.97]);
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.82, 1, 1, 0.82]);

  if (shouldReduceMotion) {
    return <section ref={sectionRef} className={className}>{children}</section>;
  }

  return (
    <motion.section
      ref={sectionRef}
      style={{
        scale,
        opacity,
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.section>
  );
};
