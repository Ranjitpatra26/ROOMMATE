import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const isReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Register GSAP plugins safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  if (isReducedMotion()) {
    gsap.globalTimeline.timeScale(100);
  }
}

export { gsap, ScrollTrigger };
export default gsap;
