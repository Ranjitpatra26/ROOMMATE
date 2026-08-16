import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { MapPin } from 'lucide-react';

const ITEMS = [
  {
    id: 1,
    color: '#f05a5a',
    category: 'SOCIAL RHYTHM',
    label: 'Shared Morning',
    location: 'Indiranagar, Bengaluru',
    image: '/images/editorial/roommate_cooking_kitchen_1786824811146.jpg',
  },
  {
    id: 2,
    color: '#476253',
    category: 'FOCUS & FLOW',
    label: 'Living Co-working',
    location: 'Koramangala, Bengaluru',
    image: '/images/editorial/roommate_coworking_living_1786824857462.jpg',
  },
  {
    id: 3,
    color: '#ff6e6e',
    category: 'SANCTUARY',
    label: 'Sunlit Suite',
    location: 'Bandra West, Mumbai',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCU9qF-fRppSg_q_fHfIvpbWCQztObHtKg4yVaXXXeo9oB1qPQzUOhyZIf1uLDnnEx-9EVOuVUWDtqt1Mewgv9HEJJQLSc2f7c_9N9ysGvebCQrk9RNuUFpF8RsDbV1fxablWYKIoi68jnTcmUCVZr8IwKYqe7rQvgjiyO8MZo5kYxQ22cneNF-zn7i8zqMFb-M9UyU_059zcCzriaF642s21ynSvKxj7_02LmJQv7dMjY3kFUSffi0dg',
  },
  {
    id: 4,
    color: '#476253',
    category: 'HARMONY',
    label: 'Coffee & Talks',
    location: 'Jubilee Hills, Hyderabad',
    image: '/images/editorial/roommate_coffee_conversation_1786825497081.jpg',
  },
  {
    id: 5,
    color: '#f05a5a',
    category: 'LIVING OS',
    label: 'Curated Habitat',
    location: 'Baner, Pune',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCizJ3f4c7EY30dIWEJ8ZA1N24Iu3EmeKUF7FJCMfBFTL2bxx4wUTi-snMIY-1nWssyvuITIJy9BTbVEQqY7MQfUk1-N8fpGTt3W3YU7G5KhlO6hlMcW5xqORptC5z1WZOrLo7yUpSBwc5Viov1TF3TNbLEOfxXDOYLf-R6__3Z6olBJNEuwvVszLLyYT9mZ7yKaD76MiIoaMLwx9Kt0b-KnYUizV5T4JncLYNX6EnwNL4Gs7Gl4PLDrQ',
  },
];

export const ScrollHorizontalHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [dimensions, setDimensions] = useState({
    windowWidth: typeof window !== 'undefined' ? window.innerWidth : 1200,
    windowHeight: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = dimensions.windowWidth < 640;
  const isTablet = dimensions.windowWidth < 1024;

  // Cinematic card proportions: wide enough so only 1 card is centered with next peeking
  const cardWidth = isMobile ? 300 : isTablet ? 380 : 460;
  const cardHeight = isMobile ? 420 : isTablet ? 500 : 580;
  const gap = isMobile ? 20 : isTablet ? 32 : 44;

  // Move from Card 1 centered in viewport to Card 5 centered in viewport
  const totalDistance = (ITEMS.length - 1) * (cardWidth + gap);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -totalDistance]);

  // Center the first card in the viewport horizontally
  const startPadding = (dimensions.windowWidth - cardWidth) / 2;

  return (
    <div
      ref={containerRef}
      style={{ height: `calc(100vh + ${totalDistance}px)` }}
      className="relative w-full overflow-visible"
    >
      {/* 100vh Sticky Viewport - Perfectly Centered, Fills the Screen */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden z-10">
        {/* Section Headline */}
        <div className="w-full px-6 md:px-16 max-w-7xl mx-auto mb-4 md:mb-6 shrink-0">
          <span className="font-sans text-label-caps text-vitality-coral uppercase tracking-widest block font-bold text-xs md:text-sm">
            Curated Cohabitations &middot; Living Visual DNA
          </span>
        </div>

        {/* Gallery Motion Track */}
        <div className="w-full overflow-hidden flex items-center">
          {shouldReduceMotion ? (
            <div
              className="flex overflow-x-auto w-full py-4"
              style={{
                paddingLeft: `${startPadding}px`,
                paddingRight: `${startPadding}px`,
                gap: `${gap}px`,
              }}
            >
              {ITEMS.map((item) => (
                <div
                  key={item.id}
                  style={{
                    width: `${cardWidth}px`,
                    height: `${cardHeight}px`,
                    backgroundImage: `url(${item.image})`,
                  }}
                  className="shrink-0 rounded-2xl relative overflow-hidden shadow-2xl border border-surface-dim/40 bg-cover bg-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 z-10 text-white space-y-2">
                    <span
                      className="font-mono text-xs tracking-widest uppercase block font-bold"
                      style={{ color: item.color }}
                    >
                      0{item.id} &middot; {item.category}
                    </span>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold leading-tight">
                      {item.label}
                    </h2>
                    <div className="flex items-center gap-2 text-white/80 font-sans text-sm pt-1">
                      <MapPin className="w-4 h-4 text-vitality-coral shrink-0" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              style={{
                x,
                paddingLeft: `${startPadding}px`,
                paddingRight: `${startPadding}px`,
                gap: `${gap}px`,
              }}
              className="flex will-change-transform shrink-0"
            >
              {ITEMS.map((item) => (
                <div
                  key={item.id}
                  style={{
                    width: `${cardWidth}px`,
                    height: `${cardHeight}px`,
                    backgroundImage: `url(${item.image})`,
                  }}
                  className="shrink-0 rounded-2xl relative overflow-hidden shadow-2xl border border-surface-dim/40 bg-cover bg-center group transition-transform duration-500 hover:scale-[1.02]"
                >
                  {/* Bottom Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                  {/* Corner Accent Glow */}
                  <div
                    className="absolute top-0 right-0 w-40 h-40 pointer-events-none opacity-25 group-hover:opacity-50 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at top right, ${item.color}, transparent 70%)`,
                    }}
                  />

                  {/* Card Content */}
                  <div className="absolute bottom-8 left-8 right-8 z-10 text-white space-y-2">
                    <span
                      className="font-mono text-xs tracking-widest uppercase block font-bold"
                      style={{ color: item.color }}
                    >
                      0{item.id} &middot; {item.category}
                    </span>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold leading-tight">
                      {item.label}
                    </h2>
                    <div className="flex items-center gap-2 text-white/80 font-sans text-sm pt-1">
                      <MapPin className="w-4 h-4 text-vitality-coral shrink-0" />
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
