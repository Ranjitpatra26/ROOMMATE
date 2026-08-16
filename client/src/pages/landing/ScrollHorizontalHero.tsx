import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { MapPin } from 'lucide-react';

const ITEMS = [
  {
    id: 1,
    color: '#f05a5a',
    category: 'SOCIAL RHYTHM',
    label: 'Shared Culinary Morning',
    location: 'Indiranagar, Bengaluru',
    image: '/images/editorial/roommate_cooking_kitchen_1786824811146.jpg',
  },
  {
    id: 2,
    color: '#476253',
    category: 'FOCUS & FLOW',
    label: 'Living Room Co-working',
    location: 'Koramangala, Bengaluru',
    image: '/images/editorial/roommate_coworking_living_1786824857462.jpg',
  },
  {
    id: 3,
    color: '#f05a5a',
    category: 'PRIVATE SANCTUARY',
    label: 'Architectural Sunlit Suite',
    location: 'Bandra West, Mumbai',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCU9qF-fRppSg_q_fHfIvpbWCQztObHtKg4yVaXXXeo9oB1qPQzUOhyZIf1uLDnnEx-9EVOuVUWDtqt1Mewgv9HEJJQLSc2f7c_9N9ysGvebCQrk9RNuUFpF8RsDbV1fxablWYKIoi68jnTcmUCVZr8IwKYqe7rQvgjiyO8MZo5kYxQ22cneNF-zn7i8zqMFb-M9UyU_059zcCzriaF642s21ynSvKxj7_02LmJQv7dMjY3kFUSffi0dg',
  },
  {
    id: 4,
    color: '#476253',
    category: 'HARMONY & HABIT',
    label: 'Filter Coffee & Conversation',
    location: 'Jubilee Hills, Hyderabad',
    image: '/images/editorial/roommate_coffee_conversation_1786825497081.jpg',
  },
  {
    id: 5,
    color: '#f05a5a',
    category: 'LIVING OS',
    label: 'Curated Co-living Space',
    location: 'Baner, Pune',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCizJ3f4c7EY30dIWEJ8ZA1N24Iu3EmeKUF7FJCMfBFTL2bxx4wUTi-snMIY-1nWssyvuITIJy9BTbVEQqY7MQfUk1-N8fpGTt3W3YU7G5KhlO6hlMcW5xqORptC5z1WZOrLo7yUpSBwc5Viov1TF3TNbLEOfxXDOYLf-R6__3Z6olBJNEuwvVszLLyYT9mZ7yKaD76MiIoaMLwx9Kt0b-KnYUizV5T4JncLYNX6EnwNL4Gs7Gl4PLDrQ',
  },
];

export const ScrollHorizontalHero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [totalDistance, setTotalDistance] = useState(0);

  // Measure actual rendered gallery width and viewport width
  useEffect(() => {
    const measureDistance = () => {
      if (galleryRef.current && containerRef.current) {
        const galleryWidth = galleryRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const distance = Math.max(0, galleryWidth - viewportWidth);
        setTotalDistance(distance);
      }
    };

    measureDistance();
    const timer = setTimeout(measureDistance, 300);

    const ro = new ResizeObserver(measureDistance);
    if (galleryRef.current) ro.observe(galleryRef.current);
    window.addEventListener('resize', measureDistance);

    return () => {
      clearTimeout(timer);
      ro.disconnect();
      window.removeEventListener('resize', measureDistance);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -totalDistance]);

  return (
    <section
      ref={containerRef}
      style={{ height: `calc(100vh + ${totalDistance}px)` }}
      className="relative w-full"
    >
      {/* 100vh Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        {/* Section Label */}
        <div className="w-full px-6 md:px-16 max-w-7xl mx-auto mb-4 md:mb-6 shrink-0 z-10">
          <span className="font-sans text-label-caps text-vitality-coral uppercase tracking-widest block font-bold text-xs md:text-sm">
            Curated Cohabitations &middot; Living Visual DNA
          </span>
        </div>

        {/* Horizontal Track Area */}
        <div className="w-full overflow-hidden flex items-center">
          {shouldReduceMotion ? (
            <div
              ref={galleryRef}
              className="flex gap-6 md:gap-8 px-6 md:px-16 overflow-x-auto w-full py-4 shrink-0"
            >
              {ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="shrink-0 w-[300px] sm:w-[380px] md:w-[460px] h-[400px] sm:h-[480px] md:h-[540px] max-h-[68vh] rounded-2xl relative overflow-hidden shadow-2xl border border-surface-dim/40 bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 z-10 text-white space-y-1.5">
                    <span
                      className="font-mono text-xs tracking-wider uppercase block font-bold"
                      style={{ color: item.color }}
                    >
                      0{item.id} &middot; {item.category}
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
                      {item.label}
                    </h2>
                    <div className="flex items-center gap-1.5 text-white/75 font-sans text-xs md:text-sm pt-1">
                      <MapPin className="w-3.5 h-3.5 text-vitality-coral shrink-0" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              ref={galleryRef}
              style={{ x }}
              className="flex gap-6 md:gap-8 px-6 md:px-16 will-change-transform shrink-0"
            >
              {ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="shrink-0 w-[300px] sm:w-[380px] md:w-[460px] h-[400px] sm:h-[480px] md:h-[540px] max-h-[68vh] rounded-2xl relative overflow-hidden shadow-2xl border border-surface-dim/40 bg-cover bg-center group transition-transform duration-500 hover:scale-[1.02]"
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  {/* Bottom Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                  {/* Corner Accent Glow */}
                  <div
                    className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity"
                    style={{
                      background: `radial-gradient(circle at top right, ${item.color}, transparent 70%)`,
                    }}
                  />

                  {/* Card Content */}
                  <div className="absolute bottom-6 left-6 right-6 z-10 text-white space-y-1.5">
                    <span
                      className="font-mono text-xs tracking-wider uppercase block font-bold"
                      style={{ color: item.color }}
                    >
                      0{item.id} &middot; {item.category}
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
                      {item.label}
                    </h2>
                    <div className="flex items-center gap-1.5 text-white/75 font-sans text-xs md:text-sm pt-1">
                      <MapPin className="w-3.5 h-3.5 text-vitality-coral shrink-0" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
