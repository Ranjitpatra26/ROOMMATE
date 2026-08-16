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
    category: 'LIVING OS',
    label: 'Curated Co-living Space',
    location: 'Baner, Pune',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCizJ3f4c7EY30dIWEJ8ZA1N24Iu3EmeKUF7FJCMfBFTL2bxx4wUTi-snMIY-1nWssyvuITIJy9BTbVEQqY7MQfUk1-N8fpGTt3W3YU7G5KhlO6hlMcW5xqORptC5z1WZOrLo7yUpSBwc5Viov1TF3TNbLEOfxXDOYLf-R6__3Z6olBJNEuwvVszLLyYT9mZ7yKaD76MiIoaMLwx9Kt0b-KnYUizV5T4JncLYNX6EnwNL4Gs7Gl4PLDrQ',
  },
  {
    id: 6,
    color: '#476253',
    category: 'STUDY & CRAFT',
    label: 'Sunlit Library & Workspace',
    location: 'HSR Layout, Bengaluru',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGQ-ozjyyc6Eupf8aRCKD-Gfs143df1Ghb7uzTJ4SOClrK2QuZDJip7o5pj1ro4g_bFE27qxxvpHIPuRPR6bW6I41fOXfLGi3tWmDGwhZ_vAlQMpjaIKe2cIXm6FOa7wfsGRujM2d9uqvVOXgezykAM4MUyuGnel8eYZnfT0HFL4KvB7uNudvifiiImCYS4L8fPKO0C7VUnYfVukgLsDznY-OpMfhb0hbdnOjEvq5yWJo0f4v6nK4uNA',
  },
  {
    id: 7,
    color: '#f05a5a',
    category: 'OPEN AIR',
    label: 'Evening Terrace Gathering',
    location: 'Indiranagar, Bengaluru',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJfZh2AkHLiWeIMVRiVBEvrekrs7IqEWr1Py0aJiWvJUzogR0emd_5v9JVwH7_iaqfEm7F8OgNWv2FEuO5i3JX6NVx8mHfnRvL_MGzQUqiooVHoMBMTN-PvnWtN1YACurcrHKjKugPhuEO-Nti6CRMfZMO0zleQ9utZd-3NtXA1Y7jXz-z_6l_5Yo3BGT1bVcjTwUg73KD8Oggs-EtspKVWQgGvWnEvFl6ynyVewg0nCTxMHVYLFVcmQ',
  },
  {
    id: 8,
    color: '#476253',
    category: 'SERENE SUITE',
    label: 'Minimalist Master Bedroom',
    location: 'Koregaon Park, Pune',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2i8SWb4apq6U1es6wns7xbL7M0iATnV9B0tUPVJ8wkAcPPnSxWpkn7RkYeWkoEHQd0963RC1wXOpzAIpyr3-iHi_2rFrr0ee44glSA9C-3IMa8KVBFUuRkLkR7z5xDs39RTkQi5dodR4MExu9kttg4kfvaxAUCMKUutHCViobglnW4KmJvyEBm03D1AT5KE-6Vi3hF7cWFK6G_AwvFQE5R9fiVI_tgFyEztv6vxUoaqk8MaqskJEImQ',
  },
  {
    id: 9,
    color: '#f05a5a',
    category: 'COMMUNAL TABLE',
    label: 'Co-Living Dining & Discussion',
    location: 'Gachibowli, Hyderabad',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTwHP-dedcvHuy1rko6qYkrmV_43Hl2to-1vH2SnFApVj2UEXDeSUeX4FvgXIQHRoEcY-aOfxeIkHlzdQMV1HiJXcdJ2CvOZxKi9CcoJsjXU9GR1HM0R4zdpv9tCAA3IIUHOhhoJ83PVw-njK-O8KGd4bPYUSBMtARJdTDO9sDF5F5UI25dy25hEN6nasZd2YYMKv2usKhBIcS7o9vzno75rGzkLGPC9Tn3L_gnbKiO4_4JbIWEMDZ8A',
  },
  {
    id: 10,
    color: '#476253',
    category: 'ACOUSTIC CALM',
    label: 'Music Lounge & Reading Room',
    location: 'Powai, Mumbai',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDa2JCqF8-uGxjzWrQNLbFq7aayFMyciJunutZhWilYq4pQIvYDUgd9gGDyp90HUgiedWGnwDuJ6TN-apEeDu0qqBhGQkbMFsw26k1xsuR26uKwG2jecFSVTGHGxX5K1Fptb87BYgY7kPfj1Hcg6r_Vaj_5hynyjzDDVTVTsa4vQoneGjIVYeJB2peMufDEDotc7Z_R1N-XtOpKEB1-6oI8JYK1gWbFbji08JqeGfa7gev1gdw9jqX_bw',
  },
  {
    id: 11,
    color: '#f05a5a',
    category: 'MORNING SUN',
    label: 'Balcony Chai & Serenity',
    location: 'Whitefield, Bengaluru',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5Lpc9u2aZCtgjopQ0TRZVFPKFfQzIjgHuC1qf8fVSg5kxDC8EyodcC-Q1opMznw0iwCs2gvLXnaLMICStorMrCM_OPqpQH56tLukWLZ9xClheiDO9M2z1WswSW2v9fc-Yfe5zAt8-v1L1WteZqhzk07izp609Hdba77aehbabVs2weaGtmGac_1vVMybPM_v0QAE61sPkZhvP46AdIuDrTj1Xk6ItNKqBDKBNnJZW7XoybewuPEwrww',
  },
  {
    id: 12,
    color: '#476253',
    category: 'URBAN RETREAT',
    label: 'Boutique Studio Suite',
    location: 'Alwarpet, Chennai',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHvMpO73IsC2lGAlRr8a36w9vef0AdMCr2Vkf2wPGWyc-PNq19KyOn91r8y0f8Q-lzfITMOutCzx2-cPpPTEkbmlL8Y-dXkuvAXXgY5FuYEQ63pJp_Xt82aAhcLP0UNo9ec7CAZvZk50NrtBHMLs05I59ZmKQsCZyI6LxngpFa7S1yIG0lIVCS8jKrjs0n-iDl5yrvgm15aZVNTY5ofwt5EypTHeqanc-AMFnP_dB2iBbtnW1pHEI_uQ',
  },
];

export const ScrollHorizontalHero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [totalDistance, setTotalDistance] = useState(3000);

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
