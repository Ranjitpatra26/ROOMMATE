import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const items = [
  {
    id: 1,
    color: '#f05a5a',
    label: 'Shared Morning',
    image: '/images/editorial/roommate_cooking_kitchen_1786824811146.jpg',
  },
  {
    id: 2,
    color: '#476253',
    label: 'Living Co-working',
    image: '/images/editorial/roommate_coworking_living_1786824857462.jpg',
  },
  {
    id: 3,
    color: '#ff6e6e',
    label: 'Sunlit Suite',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCU9qF-fRppSg_q_fHfIvpbWCQztObHtKg4yVaXXXeo9oB1qPQzUOhyZIf1uLDnnEx-9EVOuVUWDtqt1Mewgv9HEJJQLSc2f7c_9N9ysGvebCQrk9RNuUFpF8RsDbV1fxablWYKIoi68jnTcmUCVZr8IwKYqe7rQvgjiyO8MZo5kYxQ22cneNF-zn7i8zqMFb-M9UyU_059zcCzriaF642s21ynSvKxj7_02LmJQv7dMjY3kFUSffi0dg',
  },
  {
    id: 4,
    color: '#476253',
    label: 'Coffee & Talks',
    image: '/images/editorial/roommate_coffee_conversation_1786825497081.jpg',
  },
  {
    id: 5,
    color: '#f05a5a',
    label: 'Curated Habitat',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCizJ3f4c7EY30dIWEJ8ZA1N24Iu3EmeKUF7FJCMfBFTL2bxx4wUTi-snMIY-1nWssyvuITIJy9BTbVEQqY7MQfUk1-N8fpGTt3W3YU7G5KhlO6hlMcW5xqORptC5z1WZOrLo7yUpSBwc5Viov1TF3TNbLEOfxXDOYLf-R6__3Z6olBJNEuwvVszLLyYT9mZ7yKaD76MiIoaMLwx9Kt0b-KnYUizV5T4JncLYNX6EnwNL4Gs7Gl4PLDrQ',
  },
];

const ITEM_WIDTH = 400;
const GAP = 30;

export const ScrollHorizontalHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Move from first item centered to last item centered
  const totalDistance = (items.length - 1) * (ITEM_WIDTH + GAP);
  const x = useTransform(scrollYProgress, [0, 1], [0, -totalDistance]);

  return (
    <div id="roommate-horizontal-scroll" className="w-full relative overflow-visible">
      <div ref={containerRef} className="motion-scroll-container">
        <div className="motion-sticky-wrapper">
          <motion.div className="motion-gallery" style={{ x }}>
            {items.map((item) => (
              <div
                key={item.id}
                className="motion-gallery-item"
                style={
                  {
                    '--item-color': item.color,
                    '--item-image': `url(${item.image})`,
                  } as React.CSSProperties
                }
              >
                <div className="motion-item-content">
                  <span className="motion-item-number">0{item.id}</span>
                  <h2>{item.label}</h2>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        .motion-scroll-container {
          height: 300vh;
          position: relative;
        }

        .motion-sticky-wrapper {
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

        .motion-gallery {
          display: flex;
          gap: 30px;
          will-change: transform;
        }

        .motion-gallery-item {
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
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);
        }

        .motion-gallery-item::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(15, 18, 28, 0.4) 70%,
            var(--item-color)
          );
          mix-blend-mode: multiply;
        }

        .motion-item-content {
          position: absolute;
          bottom: 30px;
          left: 30px;
          z-index: 1;
        }

        .motion-item-number {
          font-size: 14px;
          color: var(--item-color);
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          display: block;
          margin-bottom: 8px;
          font-weight: 700;
        }

        .motion-gallery-item h2 {
          font-size: 28px;
          font-weight: 600;
          color: #ffffff;
          margin: 0;
          font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
        }

        @media (max-width: 600px) {
          .motion-sticky-wrapper {
            width: 280px;
          }

          .motion-gallery {
            gap: 15px;
          }

          .motion-gallery-item {
            width: 280px;
            height: 350px;
          }

          .motion-gallery-item h2 {
            font-size: 22px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .motion-gallery {
            transform: none !important;
          }
          .motion-scroll-container {
            height: auto;
          }
          .motion-sticky-wrapper {
            position: relative;
            height: auto;
            width: 100%;
            overflow-x: auto;
            padding: 50px 0;
          }
        }
      `}</style>
    </div>
  );
};
