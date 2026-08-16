import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { MapPin } from 'lucide-react';

const ITEMS = [
  {
    id: 1,
    color: '#f05a5a',
    category: 'PRIVATE SUITE',
    label: 'Sunlit Master Bedroom',
    location: 'Indiranagar, Bengaluru',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCU9qF-fRppSg_q_fHfIvpbWCQztObHtKg4yVaXXXeo9oB1qPQzUOhyZIf1uLDnnEx-9EVOuVUWDtqt1Mewgv9HEJJQLSc2f7c_9N9ysGvebCQrk9RNuUFpF8RsDbV1fxablWYKIoi68jnTcmUCVZr8IwKYqe7rQvgjiyO8MZo5kYxQ22cneNF-zn7i8zqMFb-M9UyU_059zcCzriaF642s21ynSvKxj7_02LmJQv7dMjY3kFUSffi0dg',
  },
  {
    id: 2,
    color: '#476253',
    category: 'WORK & FOCUS',
    label: 'Teak Study & Workspace',
    location: 'Koramangala, Bengaluru',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0ZyjxDjRQuQZHNkpfNglORcqnfU8Ka1u6AT7THzvX-MKZrhyurNd8JMBcrDTQL8NWFu1MT_xR_CxSS-HhFSvxMuwFw50QHbPsnpHEBGJGIuzHVyENdJvbXue--YmTiuUVii_iTT2Egjeng4WJnPiHXhgmf6SKl9r8OwP1_8tFCo8b-bmEFf4dIRggWJaEZGYb3IpwnhD9R8lTDKMVUN-qRnAR8VC-2J9pR9skoAQNIcqFQJ5xvkPY-A',
  },
  {
    id: 3,
    color: '#f05a5a',
    category: 'OUTDOOR LIVING',
    label: 'Private Rain-Tree Balcony',
    location: 'Bandra West, Mumbai',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEWrgUNcRr6nebRXtPIO7abqFux49UUUAf66KOSsOl5mVkYNETBXTiw6QlCfbFRfTotsPvyasktRwzMrgX0B_nIObb7a3VTaoQalieqgFd_kqqyy5Ts97sYEKclvpJF9RHSuDqr4I_9ZNr5dolPXBQbOozBYZM9OyWdM1dmDB8S6igPiKPLH1JRVqKAgMCndxEEsZOTcWYeB9LnKsQqchwfK70j85fh3pcUD5S95U3JxgNfypN9EmqBw',
  },
  {
    id: 4,
    color: '#476253',
    category: 'HERITAGE SUITE',
    label: 'High-Ceiling Living Lounge',
    location: 'Jubilee Hills, Hyderabad',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcPyLH-KHdtS72x-hr5aPCs6xyEcUEmITkP5TRXSn-oG2C8akFaJT_vZDf8BEjVan9T-esm9GYSrfOoNY26kY-TxpKGLGgPdTzGHR-g1ye90LLaOerp0adDCc-LDyfOLVdi2QsZey0oN9H6JqEegvVB_k7GX5IESd5ysRopJZSU68x_vfwS04XnUzlAajbCHf8NeAncqqm2_lYRBRJ2kf8oL3bYkgQu2sOAiOVvQYhw1bzIqYF-ufI7w',
  },
  {
    id: 5,
    color: '#f05a5a',
    category: 'MINIMALIST LIVING',
    label: 'Sun-Drenched Garden Flat',
    location: 'Baner, Pune',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJfZh2AkHLiWeIMVRiVBEvrekrs7IqEWr1Py0aJiWvJUzogR0emd_5v9JVwH7_iaqfEm7F8OgNWv2FEuO5i3JX6NVx8mHfnRvL_MGzQUqiooVHoMBMTN-PvnWtN1YACurcrHKjKugPhuEO-Nti6CRMfZMO0zleQ9utZd-3NtXA1Y7jXz-z_6l_5Yo3BGT1bVcjTwUg73KD8Oggs-EtspKVWQgGvWnEvFl6ynyVewg0nCTxMHVYLFVcmQ',
  },
  {
    id: 6,
    color: '#476253',
    category: 'ACOUSTIC CALM',
    label: 'Botanical Canopy Suite',
    location: 'HSR Layout, Bengaluru',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5Lpc9u2aZCtgjopQ0TRZVFPKFfQzIjgHuC1qf8fVSg5kxDC8EyodcC-Q1opMznw0iwCs2gvLXnaLMICStorMrCM_OPqpQH56tLukWLZ9xClheiDO9M2z1WswSW2v9fc-Yfe5zAt8-v1L1WteZqhzk07izp609Hdba77aehbabVs2weaGtmGac_1vVMybPM_v0QAE61sPkZhvP46AdIuDrTj1Xk6ItNKqBDKBNnJZW7XoybewuPEwrww',
  },
  {
    id: 7,
    color: '#f05a5a',
    category: 'ARTISAN STUDIO',
    label: 'Colonial Architecture Flat',
    location: 'Alwarpet, Chennai',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHvMpO73IsC2lGAlRr8a36w9vef0AdMCr2Vkf2wPGWyc-PNq19KyOn91r8y0f8Q-lzfITMOutCzx2-cPpPTEkbmlL8Y-dXkuvAXXgY5FuYEQ63pJp_Xt82aAhcLP0UNo9ec7CAZvZk50NrtBHMLs05I59ZmKQsCZyI6LxngpFa7S1yIG0lIVCS8jKrjs0n-iDl5yrvgm15aZVNTY5ofwt5EypTHeqanc-AMFnP_dB2iBbtnW1pHEI_uQ',
  },
  {
    id: 8,
    color: '#476253',
    category: 'SANCTUARY',
    label: 'Minimalist Master Bedroom',
    location: 'Koregaon Park, Pune',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2i8SWb4apq6U1es6wns7xbL7M0iATnV9B0tUPVJ8wkAcPPnSxWpkn7RkYeWkoEHQd0963RC1wXOpzAIpyr3-iHi_2rFrr0ee44glSA9C-3IMa8KVBFUuRkLkR7z5xDs39RTkQi5dodR4MExu9kttg4kfvaxAUCMKUutHCViobglnW4KmJvyEBm03D1AT5KE-6Vi3hF7cWFK6G_AwvFQE5R9fiVI_tgFyEztv6vxUoaqk8MaqskJEImQ',
  },
  {
    id: 9,
    color: '#f05a5a',
    category: 'COMMUNAL TABLE',
    label: 'Co-Living Dining & Kitchen',
    location: 'Gachibowli, Hyderabad',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTwHP-dedcvHuy1rko6qYkrmV_43Hl2to-1vH2SnFApVj2UEXDeSUeX4FvgXIQHRoEcY-aOfxeIkHlzdQMV1HiJXcdJ2CvOZxKi9CcoJsjXU9GR1HM0R4zdpv9tCAA3IIUHOhhoJ83PVw-njK-O8KGd4bPYUSBMtARJdTDO9sDF5F5UI25dy25hEN6nasZd2YYMKv2usKhBIcS7o9vzno75rGzkLGPC9Tn3L_gnbKiO4_4JbIWEMDZ8A',
  },
  {
    id: 10,
    color: '#476253',
    category: 'WORK RETREAT',
    label: 'Sunlit Reading Room & Desk',
    location: 'Powai, Mumbai',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDa2JCqF8-uGxjzWrQNLbFq7aayFMyciJunutZhWilYq4pQIvYDUgd9gGDyp90HUgiedWGnwDuJ6TN-apEeDu0qqBhGQkbMFsw26k1xsuR26uKwG2jecFSVTGHGxX5K1Fptb87BYgY7kPfj1Hcg6r_Vaj_5hynyjzDDVTVTsa4vQoneGjIVYeJB2peMufDEDotc7Z_R1N-XtOpKEB1-6oI8JYK1gWbFbji08JqeGfa7gev1gdw9jqX_bw',
  },
  {
    id: 11,
    color: '#f05a5a',
    category: 'EXPANSIVE SUITE',
    label: 'Penthouse Loft & Terrace',
    location: 'Hauz Khas, Delhi',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEWrgUNcRr6nebRXtPIO7abqFux49UUUAf66KOSsOl5mVkYNETBXTiw6QlCfbFRfTotsPvyasktRwzMrgX0B_nIObb7a3VTaoQalieqgFd_kqqyy5Ts97sYEKclvpJF9RHSuDqr4I_9ZNr5dolPXBQbOozBYZM9OyWdM1dmDB8S6igPiKPLH1JRVqKAgMCndxEEsZOTcWYeB9LnKsQqchwfK70j85fh3pcUD5S95U3JxgNfypN9EmqBw',
  },
  {
    id: 12,
    color: '#476253',
    category: 'MODULAR HABITAT',
    label: 'Scandinavian Living Space',
    location: 'Whitefield, Bengaluru',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCK_9NnhlZkr6Pkn0lhOlguCm2SQeh6OMQXhu0IpHtite7Jkyg01pOI5ETUDoiA9qRorQhh07HrHK62hEG2nPDpODQhaWKN8MQ0ZlIpv4MGVZa62ojUIBYOS55qT6NN-mBOOVDMC3MUL8mgol6VTGmKT5WKKWJ2saeFSKqpTQOk98w9RkkYl7eldJmIT1F6xc8RHR3vdB1uzkpY7lnlIRpvEE8h64G6A-JxwQsX73invKkEaJ6lPkdtcw',
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
