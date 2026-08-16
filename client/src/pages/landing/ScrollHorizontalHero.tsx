import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { MapPin } from 'lucide-react';

const ITEMS = [
  {
    id: 1,
    number: '01',
    category: 'SOCIAL RHYTHM',
    label: 'Shared Culinary Morning',
    location: 'Indiranagar, Bengaluru',
    color: '#f05a5a',
    image: '/images/editorial/roommate_cooking_kitchen_1786824811146.jpg',
  },
  {
    id: 2,
    number: '02',
    category: 'FOCUS & FLOW',
    label: 'Living Room Co-working',
    location: 'Koramangala, Bengaluru',
    color: '#476253',
    image: '/images/editorial/roommate_coworking_living_1786824857462.jpg',
  },
  {
    id: 3,
    number: '03',
    category: 'PRIVATE SANCTUARY',
    label: 'Architectural Sunlit Suite',
    location: 'Bandra West, Mumbai',
    color: '#f05a5a',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCU9qF-fRppSg_q_fHfIvpbWCQztObHtKg4yVaXXXeo9oB1qPQzUOhyZIf1uLDnnEx-9EVOuVUWDtqt1Mewgv9HEJJQLSc2f7c_9N9ysGvebCQrk9RNuUFpF8RsDbV1fxablWYKIoi68jnTcmUCVZr8IwKYqe7rQvgjiyO8MZo5kYxQ22cneNF-zn7i8zqMFb-M9UyU_059zcCzriaF642s21ynSvKxj7_02LmJQv7dMjY3kFUSffi0dg',
  },
  {
    id: 4,
    number: '04',
    category: 'HARMONY & HABIT',
    label: 'Filter Coffee & Conversation',
    location: 'Jubilee Hills, Hyderabad',
    color: '#476253',
    image: '/images/editorial/roommate_coffee_conversation_1786825497081.jpg',
  },
  {
    id: 5,
    number: '05',
    category: 'LIVING OS',
    label: 'Curated Co-living Space',
    location: 'Baner, Pune',
    color: '#f05a5a',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCizJ3f4c7EY30dIWEJ8ZA1N24Iu3EmeKUF7FJCMfBFTL2bxx4wUTi-snMIY-1nWssyvuITIJy9BTbVEQqY7MQfUk1-N8fpGTt3W3YU7G5KhlO6hlMcW5xqORptC5z1WZOrLo7yUpSBwc5Viov1TF3TNbLEOfxXDOYLf-R6__3Z6olBJNEuwvVszLLyYT9mZ7yKaD76MiIoaMLwx9Kt0b-KnYUizV5T4JncLYNX6EnwNL4Gs7Gl4PLDrQ',
  },
];

export const ScrollHorizontalHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const itemWidth = isMobile ? 280 : 380;
  const gap = isMobile ? 16 : 32;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate start center offset and total scroll distance
  const startOffset = Math.max(24, (windowWidth - itemWidth) / 2);
  const totalDistance = (ITEMS.length - 1) * (itemWidth + gap);
  const x = useTransform(scrollYProgress, [0, 1], [startOffset, startOffset - totalDistance]);

  return (
    <div ref={containerRef} className="relative h-[260vh] md:h-[300vh]">
      {/* Sticky Fullscreen Gallery Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        {/* Subtle section label */}
        <div className="px-6 md:px-12 max-w-7xl mx-auto w-full mb-6 z-10">
          <span className="font-sans text-label-caps text-vitality-coral uppercase tracking-widest block font-bold">
            Curated Cohabitations &middot; Living Visual DNA
          </span>
        </div>

        {/* Horizontal Slider Track */}
        <div className="w-full flex items-center justify-start overflow-visible">
          {shouldReduceMotion ? (
            <div className="flex gap-6 px-6 overflow-x-auto w-full py-8">
              {ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-[280px] md:w-[380px] h-[380px] md:h-[500px] rounded-2xl relative overflow-hidden shadow-2xl border border-surface-dim/40 bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to bottom, transparent 35%, rgba(15, 18, 28, 0.4) 65%, rgba(15, 18, 28, 0.92) 100%)`,
                    }}
                  />
                  <div className="absolute bottom-6 left-6 right-6 z-10 text-white space-y-1">
                    <span
                      className="font-mono text-xs tracking-widest uppercase block font-semibold"
                      style={{ color: item.color }}
                    >
                      {item.number} / {item.category}
                    </span>
                    <h2 className="font-serif text-xl md:text-2xl font-bold leading-snug">
                      {item.label}
                    </h2>
                    <div className="flex items-center gap-1 text-white/70 font-sans text-xs pt-1">
                      <MapPin className="w-3.5 h-3.5 text-vitality-coral shrink-0" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              style={{ x }}
              className="flex gap-4 sm:gap-8 will-change-transform"
            >
              {ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-[280px] sm:w-[380px] h-[380px] sm:h-[500px] rounded-2xl relative overflow-hidden shadow-2xl border border-surface-dim/40 bg-cover bg-center group transition-transform duration-500 hover:scale-[1.02]"
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  {/* Cinematic Gradient Scrim */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to bottom, transparent 30%, rgba(15, 18, 28, 0.4) 60%, rgba(15, 18, 28, 0.94) 100%)`,
                    }}
                  />

                  {/* Accent Highlight Corner */}
                  <div
                    className="absolute top-0 right-0 w-28 h-28 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity"
                    style={{
                      background: `radial-gradient(circle at top right, ${item.color}, transparent 70%)`,
                    }}
                  />

                  {/* Item Content Card */}
                  <div className="absolute bottom-6 left-6 right-6 z-10 text-white space-y-1.5">
                    <span
                      className="font-mono text-xs tracking-widest uppercase block font-bold"
                      style={{ color: item.color }}
                    >
                      {item.number} / {item.category}
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold leading-tight">
                      {item.label}
                    </h2>
                    <div className="flex items-center gap-1.5 text-white/75 font-sans text-xs pt-0.5">
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
    </div>
  );
};
