import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { MapPin } from 'lucide-react';

const ITEMS = [
  {
    id: 1,
    color: '#f05a5a',
    category: 'CULINARY RHYTHM',
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
    category: 'OUTDOOR LIVING',
    label: 'Private Rain-Tree Balcony',
    location: 'Baner, Pune',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEWrgUNcRr6nebRXtPIO7abqFux49UUUAf66KOSsOl5mVkYNETBXTiw6QlCfbFRfTotsPvyasktRwzMrgX0B_nIObb7a3VTaoQalieqgFd_kqqyy5Ts97sYEKclvpJF9RHSuDqr4I_9ZNr5dolPXBQbOozBYZM9OyWdM1dmDB8S6igPiKPLH1JRVqKAgMCndxEEsZOTcWYeB9LnKsQqchwfK70j85fh3pcUD5S95U3JxgNfypN9EmqBw',
  },
  {
    id: 6,
    color: '#476253',
    category: 'HERITAGE SUITE',
    label: 'Heritage Master Living Lounge',
    location: 'Koregaon Park, Pune',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcPyLH-KHdtS72x-hr5aPCs6xyEcUEmITkP5TRXSn-oG2C8akFaJT_vZDf8BEjVan9T-esm9GYSrfOoNY26kY-TxpKGLGgPdTzGHR-g1ye90LLaOerp0adDCc-LDyfOLVdi2QsZey0oN9H6JqEegvVB_k7GX5IESd5ysRopJZSU68x_vfwS04XnUzlAajbCHf8NeAncqqm2_lYRBRJ2kf8oL3bYkgQu2sOAiOVvQYhw1bzIqYF-ufI7w',
  },
];

export const ScrollHorizontalHero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [totalDistance, setTotalDistance] = useState(1800);

  // Measure actual rendered scrollWidth of the gallery minus window innerWidth
  useEffect(() => {
    const measure = () => {
      if (galleryRef.current) {
        const scrollW = galleryRef.current.scrollWidth;
        const viewW = window.innerWidth;
        const dist = Math.max(0, scrollW - viewW + 96);
        setTotalDistance(dist);
      }
    };

    measure();
    const timer1 = setTimeout(measure, 100);
    const timer2 = setTimeout(measure, 500);

    const ro = new ResizeObserver(measure);
    if (galleryRef.current) ro.observe(galleryRef.current);
    window.addEventListener('resize', measure);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Dynamic functional transform that always uses the latest measured totalDistance
  const x = useTransform(scrollYProgress, (progress) => -progress * totalDistance);

  return (
    <section
      ref={containerRef}
      style={{ height: `calc(100vh + ${totalDistance}px)` }}
      className="relative w-full overflow-visible"
    >
      {/* 100vh Sticky Viewport with Perfect Centering */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden z-10 pt-8 pb-4">
        {/* Section Tagline */}
        <div className="w-full px-6 md:px-12 max-w-7xl mx-auto mb-3 md:mb-5 shrink-0">
          <span className="font-sans text-label-caps text-vitality-coral uppercase tracking-widest block font-bold text-xs md:text-sm">
            Curated Cohabitations &middot; Living Visual DNA
          </span>
        </div>

        {/* Horizontal Flex Gallery */}
        <div className="w-full overflow-hidden flex items-center">
          {shouldReduceMotion ? (
            <div
              ref={galleryRef}
              className="flex gap-6 md:gap-8 px-6 md:px-12 overflow-x-auto w-full py-4 shrink-0"
            >
              {ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="shrink-0 w-[300px] sm:w-[380px] md:w-[440px] h-[400px] sm:h-[480px] md:h-[540px] max-h-[68vh] rounded-2xl relative overflow-hidden shadow-2xl border border-surface-dim/40 bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 z-10 text-white space-y-1.5">
                    <span
                      className="font-mono text-xs tracking-wider uppercase block font-bold"
                      style={{ color: item.color }}
                    >
                      {item.id < 10 ? `0${item.id}` : item.id} &middot; {item.category}
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
              className="flex gap-6 md:gap-8 px-6 md:px-12 will-change-transform shrink-0 w-max"
            >
              {ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="shrink-0 w-[300px] sm:w-[380px] md:w-[440px] h-[400px] sm:h-[480px] md:h-[540px] max-h-[68vh] rounded-2xl relative overflow-hidden shadow-2xl border border-surface-dim/40 bg-cover bg-center group transition-transform duration-500 hover:scale-[1.02]"
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
                      {item.id < 10 ? `0${item.id}` : item.id} &middot; {item.category}
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
