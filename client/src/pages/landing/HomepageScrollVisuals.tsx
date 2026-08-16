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
// 1. 3D Scroll Plane for Featured Images (Cinematic Scroll-Linked Transforms)
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

  // Velocity-driven subtle dynamic tilt (reverses naturally with scroll direction)
  const velocityTilt = useTransform(
    smoothVelocity,
    [-2500, 0, 2500],
    [-2.5 * depthIntensity, 0, 2.5 * depthIntensity]
  );

  // Scroll Progress Transforms: Continuous 3D Plane depth
  const dirMultiplier = tiltDirection === 'left' ? 1 : -1;

  // Enters from scaled-down depth (0.86), reaches focus (1.0), exits elevated (1.05)
  const planeY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [90 * depthIntensity, 0, -90 * depthIntensity]
  );

  const planeRotateY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [7 * dirMultiplier * depthIntensity, 0, -6 * dirMultiplier * depthIntensity]
  );

  const planeRotateX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [-4 * depthIntensity, 0, 3.5 * depthIntensity]
  );

  const planeScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.88, 1, 1.04]
  );

  const planeOpacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    [0.15, 1, 1, 0.15]
  );

  // Floating Badge Parallax (Moves at a faster independent rate for authentic multiplane depth)
  const badgeY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [50 * depthIntensity, 0, -50 * depthIntensity]
  );

  const badgeScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.9, 1, 1.06]
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
}) => {
  const imgRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ['start end', 'end start'],
  });

  const innerY = useTransform(scrollYProgress, [0, 0.5, 1], [-35 * speed, 0, 35 * speed]);
  const innerScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1.06, 1.18]);

  if (shouldReduceMotion) {
    return <img src={src} alt={alt} className={className} />;
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
      ? [60, 0, -60]
      : columnIndex === 1
      ? [20, 0, -20]
      : [75, 0, -75];

  const rotateZ =
    columnIndex === 0
      ? [-2, 0, 1.5]
      : columnIndex === 1
      ? [0, 0, 0]
      : [2, 0, -1.5];

  const scaleOffset =
    columnIndex === 1
      ? [0.92, 1.04, 0.94]
      : [0.9, 1, 0.92];

  const opacityOffset = [0.2, 1, 1, 0.2];

  const y = useTransform(scrollYProgress, [0, 0.5, 1], yOffset);
  const rZ = useTransform(scrollYProgress, [0, 0.5, 1], rotateZ);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], scaleOffset);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], opacityOffset);

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
        opacity,
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
    [45 * multiplier * speed, 0, -45 * multiplier * speed]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0.3, 1, 1, 0.3]
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

  const scale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.96, 1, 1, 0.96]);
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0.75, 1, 1, 0.75]);

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
