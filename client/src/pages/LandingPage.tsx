import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'motion/react';
import {
  ArrowDown,
  ArrowRight,
  MapPin,
  CheckCircle,
  Moon,
  Volume2,
  Users,
} from 'lucide-react';
import { HeroScene, OrbitalCompatibility, MatchEquation, TrustPillars } from '../components/editorial/index.js';
import { Button, Container } from '../components/foundation/index.js';
import { CursorTilt, ScrollReveal } from '../components/motion/index.js';
import {
  Scroll3DPlane,
  ParallaxImage,
  StaggeredPillarPlane,
  ScrollTextColumn,
  CinematicSection,
} from './landing/HomepageScrollVisuals.js';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Track Mouse for WebGL 3D Hero Scene
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Hero Masthead Scroll Parallax Transforms
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroCanvasY = useTransform(heroScrollProgress, [0, 1], [0, 160]);
  const heroCanvasScale = useTransform(heroScrollProgress, [0, 1], [1, 1.15]);
  const heroCanvasOpacity = useTransform(heroScrollProgress, [0, 0.8, 1], [0.65, 0.35, 0.1]);

  const heroContentY = useTransform(heroScrollProgress, [0, 0.8], [0, -50]);
  const heroContentScale = useTransform(heroScrollProgress, [0, 0.8], [1, 0.96]);
  const heroContentOpacity = useTransform(heroScrollProgress, [0, 0.75, 1], [1, 0.8, 0.2]);

  const scrollIndicatorOpacity = useTransform(heroScrollProgress, [0, 0.15], [0.7, 0]);

  return (
    <div className="bg-clay text-earth-indigo min-h-screen selection:bg-vitality-coral selection:text-white overflow-x-hidden transition-colors duration-200">
      {/* 1. Hero Masthead with 3D Canvas & Scroll-Driven Parallax */}
      <header
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center items-center pt-24 px-6 overflow-hidden"
      >
        {/* Subtle WebGL R3F Scene with Depth Zoom on Scroll */}
        <motion.div
          style={{
            y: shouldReduceMotion ? 0 : heroCanvasY,
            scale: shouldReduceMotion ? 1 : heroCanvasScale,
            opacity: shouldReduceMotion ? 0.65 : heroCanvasOpacity,
          }}
          className="absolute inset-0 w-full h-full pointer-events-none z-0 will-change-transform"
        >
          <Canvas
            camera={{ position: [0, 0, 8], fov: 45 }}
            gl={{ alpha: true, antialias: true }}
            dpr={[1, 2]}
          >
            <HeroScene mouseX={mousePos.x} mouseY={mousePos.y} />
          </Canvas>
        </motion.div>

        {/* Ambient Radial Contrast Scrim behind Hero Text */}
        <div className="absolute inset-0 bg-radial-at-c from-clay/80 via-clay/40 to-transparent pointer-events-none z-[1]" />

        {/* Hero Content with Perspective Depth Elevation */}
        <motion.div
          style={{
            y: shouldReduceMotion ? 0 : heroContentY,
            scale: shouldReduceMotion ? 1 : heroContentScale,
            opacity: shouldReduceMotion ? 1 : heroContentOpacity,
          }}
          className="relative z-10 text-center max-w-4xl mx-auto space-y-6 will-change-transform"
        >
          <ScrollReveal direction="up" delay={0.1}>
            <span className="font-sans text-label-caps text-secondary uppercase tracking-widest block mb-2">
              Art Directed Living OS
            </span>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <h1 className="font-serif text-headline-lg-mobile md:text-display-hero text-earth-indigo leading-tight tracking-tight font-bold">
              Who you live with changes how you live.
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <p className="font-sans text-body-lg text-secondary max-w-2xl mx-auto leading-relaxed">
              A new paradigm in shared living, designed for connection, compatibility, and peace of mind.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/onboarding/chapter-1')}
                className="px-8 py-4 shadow-lg shadow-earth-indigo/15 cursor-pointer"
              >
                ENTER VISUAL DNA
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => navigate('/login')}
                className="text-earth-indigo font-semibold cursor-pointer"
              >
                Sign In
              </Button>
            </div>
          </ScrollReveal>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity: shouldReduceMotion ? 0.7 : scrollIndicatorOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center animate-bounce"
        >
          <span className="font-sans text-label-caps text-secondary mb-1">SCROLL</span>
          <ArrowDown className="w-4 h-4 text-secondary" />
        </motion.div>
      </header>

      {/* 2. Narrative Section (5 / 7 Asymmetric 3D Scroll Plane Composition) */}
      <CinematicSection className="py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-surface-dim/40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 space-y-6">
            <ScrollTextColumn speed={1.1} direction="up">
              <ScrollReveal direction="left">
                <span className="font-sans text-label-caps text-vitality-coral uppercase tracking-widest block font-bold">
                  The Living OS Manifesto
                </span>
                <h2 className="font-serif text-headline-lg-mobile md:text-headline-lg text-earth-indigo leading-tight font-bold">
                  People + Spaces + Connections.
                </h2>
                <p className="font-sans text-body-lg text-secondary leading-relaxed">
                  We move beyond transactional real estate. ROOMMATE is about the subtle art of cohabitation. It's about finding the right energy, the right rhythm, and the right environment to thrive.
                </p>
                <div className="pt-2">
                  <Link
                    to="/onboarding/chapter-1"
                    className="inline-flex items-center font-sans text-ui-medium font-semibold text-earth-indigo border-b-2 border-earth-indigo pb-1 hover:text-vitality-coral hover:border-vitality-coral transition-colors gap-2 cursor-pointer"
                  >
                    <span>Explore the philosophy</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </ScrollReveal>
            </ScrollTextColumn>
          </div>

          <div className="md:col-span-7">
            <ScrollReveal direction="right">
              <Scroll3DPlane
                depthIntensity={1.15}
                tiltDirection="left"
                className="w-full"
              >
                <CursorTilt maxTilt={4}>
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-surface-dim/50 bg-earth-indigo">
                    <ParallaxImage
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCizJ3f4c7EY30dIWEJ8ZA1N24Iu3EmeKUF7FJCMfBFTL2bxx4wUTi-snMIY-1nWssyvuITIJy9BTbVEQqY7MQfUk1-N8fpGTt3W3YU7G5KhlO6hlMcW5xqORptC5z1WZOrLo7yUpSBwc5Viov1TF3TNbLEOfxXDOYLf-R6__3Z6olBJNEuwvVszLLyYT9mZ7yKaD76MiIoaMLwx9Kt0b-KnYUizV5T4JncLYNX6EnwNL4Gs7Gl4PLDrQ"
                      alt="Two young professionals in a sunlit shared apartment"
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                </CursorTilt>
              </Scroll3DPlane>
            </ScrollReveal>
          </div>
        </div>
      </CinematicSection>

      {/* 3. Lifestyle Architecture Section (Multi-Plane Staggered Parallax) */}
      <CinematicSection className="py-28 bg-surface-low px-6 md:px-12 border-y border-surface-dim/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <ScrollReveal direction="up">
              <span className="font-sans text-label-caps text-secondary uppercase tracking-widest block">
                Habitat Calibration
              </span>
              <h2 className="font-serif text-headline-lg-mobile md:text-headline-lg text-earth-indigo font-bold">
                The Architecture of Daily Life
              </h2>
              <p className="font-sans text-body-lg text-secondary max-w-2xl mx-auto leading-relaxed">
                It's the small things that dictate harmony. We analyze the invisible variables that make a house a home.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Horizontal Connective Line */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-surface-dim z-0" />

            <StaggeredPillarPlane columnIndex={0}>
              <ScrollReveal direction="up" delay={0.1}>
                <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                  <div className="w-24 h-24 rounded-full bg-clay flex items-center justify-center shadow-sm border border-surface-dim text-vitality-coral hover:scale-105 transition-transform">
                    <Moon className="w-9 h-9" />
                  </div>
                  <h3 className="font-serif text-headline-sm font-semibold text-earth-indigo">
                    Sleep Rhythm
                  </h3>
                  <p className="font-sans text-body-md text-secondary max-w-xs">
                    Aligning night owls and early birds for uninterrupted rest and morning peace.
                  </p>
                </div>
              </ScrollReveal>
            </StaggeredPillarPlane>

            <StaggeredPillarPlane columnIndex={1}>
              <ScrollReveal direction="up" delay={0.2}>
                <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                  <div className="w-24 h-24 rounded-full bg-clay flex items-center justify-center shadow-sm border border-surface-dim text-earth-indigo hover:scale-105 transition-transform">
                    <Volume2 className="w-9 h-9" />
                  </div>
                  <h3 className="font-serif text-headline-sm font-semibold text-earth-indigo">
                    Noise Tolerance
                  </h3>
                  <p className="font-sans text-body-md text-secondary max-w-xs">
                    From absolute silence to background chatter, finding your auditory match.
                  </p>
                </div>
              </ScrollReveal>
            </StaggeredPillarPlane>

            <StaggeredPillarPlane columnIndex={2}>
              <ScrollReveal direction="up" delay={0.3}>
                <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                  <div className="w-24 h-24 rounded-full bg-clay flex items-center justify-center shadow-sm border border-surface-dim text-trust-teal hover:scale-105 transition-transform">
                    <Users className="w-9 h-9" />
                  </div>
                  <h3 className="font-serif text-headline-sm font-semibold text-earth-indigo">
                    Social Energy
                  </h3>
                  <p className="font-sans text-body-md text-secondary max-w-xs">
                    Balancing open-door hospitality with the need for personal sanctuary.
                  </p>
                </div>
              </ScrollReveal>
            </StaggeredPillarPlane>
          </div>
        </div>
      </CinematicSection>

      {/* 4. Compatibility Section (Orbital 3D Visualization) */}
      <CinematicSection className="py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 flex justify-center">
            <ScrollReveal direction="left">
              <Scroll3DPlane
                depthIntensity={1.1}
                tiltDirection="right"
                className="w-full flex justify-center"
              >
                <CursorTilt maxTilt={6}>
                  <OrbitalCompatibility />
                </CursorTilt>
              </Scroll3DPlane>
            </ScrollReveal>
          </div>

          <div className="order-1 md:order-2 space-y-6">
            <ScrollTextColumn speed={1.1} direction="up">
              <ScrollReveal direction="right">
                <span className="font-sans text-label-caps text-vitality-coral uppercase tracking-widest block">
                  The Algorithm of Living
                </span>
                <h2 className="font-serif text-headline-lg-mobile md:text-headline-lg text-earth-indigo leading-tight font-bold">
                  Not just a match.<br />A life that fits.
                </h2>
                <p className="font-sans text-body-lg text-secondary leading-relaxed">
                  Our Visual DNA matching goes beyond basic preferences. We map your lifestyle blueprint against potential roommates to find intersecting orbits of compatibility.
                </p>
                <ul className="space-y-4 pt-2">
                  {[
                    'Comprehensive Lifestyle & Chronotype Assessment',
                    'Value & Cleanliness Standard Alignment Scoring',
                    'Conflict Resolution & Guest Preference Profiling',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 font-sans text-body-md text-earth-indigo">
                      <CheckCircle className="w-5 h-5 text-trust-teal shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </ScrollTextColumn>
          </div>
        </div>
      </CinematicSection>

      {/* 5. Trust & Verified Stay (Authoritative Deep Indigo Surface with Glow Parallax) */}
      <CinematicSection className="py-28 bg-[#1a1f2c] dark:bg-[#10141d] text-white px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-vitality-coral/15 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-6">
          <ScrollReveal direction="up">
            <span className="font-sans text-label-caps text-vitality-coral uppercase tracking-widest block font-bold">
              Integrity by Design
            </span>
            <h2 className="font-serif text-headline-lg-mobile md:text-headline-lg text-white font-bold">
              Peace of mind, built in.
            </h2>
            <p className="font-sans text-body-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Trust isn't assumed; it's verified. Our rigorous vetting and reputation system ensures that your sanctuary remains secure, respectful, and exactly as promised.
            </p>
          </ScrollReveal>

          <div className="pt-10">
            <ScrollReveal direction="up" delay={0.2}>
              <TrustPillars />
            </ScrollReveal>
          </div>
        </div>
      </CinematicSection>

      {/* 6. Spaces & Curated Living (3D Image Plane & Floating Badge Parallax) */}
      <CinematicSection className="py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4 space-y-6">
            <ScrollTextColumn speed={1.1} direction="up">
              <ScrollReveal direction="left">
                <span className="font-sans text-label-caps text-secondary uppercase tracking-widest block">
                  Architectural Spaces
                </span>
                <h2 className="font-serif text-headline-lg-mobile md:text-headline-lg text-earth-indigo leading-tight font-bold">
                  Spaces designed for living.
                </h2>
                <p className="font-sans text-body-lg text-secondary leading-relaxed">
                  Curated environments that balance private retreat with communal elegance. Find your spot in the city's best neighborhoods.
                </p>
                <div className="space-y-3 pt-2">
                  <button
                    type="button"
                    onClick={() => navigate('/rooms/the-indiranagar-studio')}
                    className="w-full p-4 rounded-xl bg-surface-low border border-surface-dim hover:border-earth-indigo flex items-center justify-between text-left transition-all group cursor-pointer"
                  >
                    <div>
                      <div className="font-sans text-ui-medium font-semibold text-earth-indigo group-hover:text-vitality-coral transition-colors">Indiranagar, Bengaluru</div>
                      <div className="font-sans text-xs text-secondary">4 Available Suites</div>
                    </div>
                    <MapPin className="w-5 h-5 text-vitality-coral group-hover:scale-110 transition-transform" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/rooms/the-bandra-heritage-duplex')}
                    className="w-full p-4 rounded-xl bg-surface-low border border-surface-dim hover:border-earth-indigo flex items-center justify-between text-left transition-all group cursor-pointer"
                  >
                    <div>
                      <div className="font-sans text-ui-medium font-semibold text-earth-indigo group-hover:text-vitality-coral transition-colors">Bandra West, Mumbai</div>
                      <div className="font-sans text-xs text-secondary">2 Available Suites</div>
                    </div>
                    <MapPin className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </ScrollReveal>
            </ScrollTextColumn>
          </div>

          <div className="lg:col-span-8">
            <ScrollReveal direction="right">
              <Scroll3DPlane
                depthIntensity={1.2}
                tiltDirection="right"
                className="w-full"
                badgeOverlay={
                  <div className="bottom-6 right-6 bg-clay/90 dark:bg-earth-container/90 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 border border-surface-dim text-earth-indigo font-sans text-ui-medium font-semibold">
                    <MapPin className="w-4 h-4 text-vitality-coral" />
                    <span>Indiranagar, Bengaluru</span>
                  </div>
                }
              >
                <CursorTilt maxTilt={4}>
                  <div
                    onClick={() => navigate('/rooms/the-indiranagar-studio')}
                    className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-surface-dim cursor-pointer group bg-earth-indigo"
                  >
                    <ParallaxImage
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCU9qF-fRppSg_q_fHfIvpbWCQztObHtKg4yVaXXXeo9oB1qPQzUOhyZIf1uLDnnEx-9EVOuVUWDtqt1Mewgv9HEJJQLSc2f7c_9N9ysGvebCQrk9RNuUFpF8RsDbV1fxablWYKIoi68jnTcmUCVZr8IwKYqe7rQvgjiyO8MZo5kYxQ22cneNF-zn7i8zqMFb-M9UyU_059zcCzriaF642s21ynSvKxj7_02LmJQv7dMjY3kFUSffi0dg"
                      alt="Premium modern bedroom in a shared apartment"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                </CursorTilt>
              </Scroll3DPlane>
            </ScrollReveal>
          </div>
        </div>
      </CinematicSection>

      {/* 7. Match Reveal Equation (Kinetic Resonance Section) */}
      <CinematicSection className="py-28 bg-surface-low text-center px-6 border-t border-surface-dim/40">
        <Container size="md">
          <ScrollReveal direction="up">
            <span className="font-sans text-label-caps text-vitality-coral uppercase tracking-widest block mb-2">
              Resonance Metric
            </span>
            <h2 className="font-serif text-headline-lg-mobile md:text-headline-lg text-earth-indigo font-bold mb-6">
              The perfect equation.
            </h2>
            <MatchEquation />
            <p className="font-sans text-body-lg text-secondary max-w-xl mx-auto leading-relaxed">
              When lifestyle, habits, and shared values align seamlessly.
            </p>
          </ScrollReveal>
        </Container>
      </CinematicSection>

      {/* 8. Final Call to Action */}
      <CinematicSection className="py-32 px-6 text-center relative overflow-hidden bg-clay">
        <div className="max-w-3xl mx-auto relative z-10 space-y-8">
          <ScrollReveal direction="up">
            <h2 className="font-serif text-headline-lg-mobile md:text-headline-lg text-earth-indigo font-bold leading-tight">
              Find someone you can actually live with.
            </h2>
            <p className="font-sans text-body-lg text-secondary max-w-lg mx-auto">
              Complete your lifestyle calibration in under 3 minutes and discover verified rooms and compatible roommates.
            </p>
            <div className="pt-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/onboarding/chapter-1')}
                className="px-10 py-5 text-base shadow-xl shadow-earth-indigo/20 cursor-pointer"
              >
                START YOUR PROFILE
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </CinematicSection>

      {/* 9. Editorial Footer */}
      <footer className="bg-earth-indigo text-clay py-16 px-6 md:px-12 border-t border-white/10 text-center">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="font-serif text-headline-md font-bold tracking-tight text-clay">
            ROOMMATE
          </div>
          <div className="flex flex-wrap justify-center gap-8 font-sans text-body-md text-surface-dim text-sm">
            <Link to="/stay/safety" className="hover:text-vitality-coral transition-colors">PRIVACY</Link>
            <Link to="/stay/agreement/builder" className="hover:text-vitality-coral transition-colors">GOVERNANCE</Link>
            <Link to="/discover" className="hover:text-vitality-coral transition-colors">DISCOVER</Link>
            <Link to="/spatial" className="hover:text-vitality-coral transition-colors">SPATIAL</Link>
          </div>
          <p className="font-sans text-xs text-surface-dim/60 tracking-wider">
            &copy; 2026 ROOMMATE. REDEFINING THE ART OF SHARED LIVING. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
};
