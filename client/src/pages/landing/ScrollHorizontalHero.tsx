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
  const itemWidth = isMobile ? 280 : 400;
  const gap = isMobile ? 15 : 30;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Exactly matching Motion.dev scroll distance: from 1st item centered to last item centered
  const totalDistance = (ITEMS.length - 1) * (itemWidth + gap);
  const x = useTransform(scrollYProgress, [0, 1], [0, -totalDistance]);

  return (
    <div className="w-full relative overflow-visible">
      <div ref={containerRef} className="scroll-container-300">
        <div className="sticky-wrapper-centered">
          {shouldReduceMotion ? (
            <div className="flex gap-4 overflow-x-auto w-full py-6">
              {ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="gallery-item-card"
                  style={
                    {
                      '--item-color': item.color,
                      '--item-image': `url(${item.image})`,
                    } as React.CSSProperties
                  }
                >
                  <div className="item-content-box">
                    <span className="item-number-badge" style={{ color: item.color }}>
                      0{item.id} &middot; {item.category}
                    </span>
                    <h2 className="font-serif">{item.label}</h2>
                    <div className="flex items-center gap-1 text-white/70 font-sans text-xs pt-1">
                      <MapPin className="w-3.5 h-3.5 text-vitality-coral shrink-0" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div className="gallery-track" style={{ x }}>
              {ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="gallery-item-card"
                  style={
                    {
                      '--item-color': item.color,
                      '--item-image': `url(${item.image})`,
                    } as React.CSSProperties
                  }
                >
                  <div className="item-content-box">
                    <span className="item-number-badge" style={{ color: item.color }}>
                      0{item.id} &middot; {item.category}
                    </span>
                    <h2 className="font-serif">{item.label}</h2>
                    <div className="flex items-center gap-1.5 text-white/75 font-sans text-xs pt-1">
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

      <style>{`
        .scroll-container-300 {
          height: 300vh;
          position: relative;
        }

        .sticky-wrapper-centered {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          overflow: visible;
        }

        .gallery-track {
          display: flex;
          gap: 30px;
          will-change: transform;
        }

        .gallery-item-card {
          flex-shrink: 0;
          width: 400px;
          height: 500px;
          border-radius: 16px;
          position: relative;
          overflow: hidden;
          background-image: var(--item-image);
          background-size: cover;
          background-position: center;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          transition: transform 0.4s ease;
        }

        .gallery-item-card:hover {
          transform: translateY(-4px) scale(1.01);
        }

        .gallery-item-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 40%,
            rgba(15, 18, 28, 0.5) 65%,
            rgba(15, 18, 28, 0.95) 100%
          );
        }

        .item-content-box {
          position: absolute;
          bottom: 30px;
          left: 30px;
          right: 30px;
          z-index: 1;
        }

        .item-number-badge {
          font-size: 13px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-weight: 700;
          letter-spacing: 0.08em;
          display: block;
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        .gallery-item-card h2 {
          font-size: 26px;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          line-height: 1.25;
        }

        @media (max-width: 640px) {
          .sticky-wrapper-centered {
            width: 280px;
          }

          .gallery-track {
            gap: 15px;
          }

          .gallery-item-card {
            width: 280px;
            height: 380px;
          }

          .gallery-item-card h2 {
            font-size: 20px;
          }

          .item-content-box {
            bottom: 20px;
            left: 20px;
            right: 20px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gallery-track {
            transform: none !important;
          }
          .scroll-container-300 {
            height: auto;
          }
          .sticky-wrapper-centered {
            position: relative;
            height: auto;
            width: 100%;
            overflow-x: auto;
            padding: 40px 0;
          }
        }
      `}</style>
    </div>
  );
};
