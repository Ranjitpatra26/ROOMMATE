import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';

export const AuthLayout: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Very restrained parallax (max 6px)
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 12;
      const y = (e.clientY / innerHeight - 0.5) * 12;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [shouldReduceMotion]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-clay text-earth-indigo selection:bg-vitality-coral/20">
      {/* ============================================================ */}
      {/* LEFT EDITORIAL COLUMN (Desktop & Tablet) */}
      {/* ============================================================ */}
      <div className="hidden md:flex flex-col justify-between w-1/2 lg:w-[48%] xl:w-[45%] p-10 lg:p-16 xl:p-20 bg-[#121620] text-[#fcf8fa] relative overflow-hidden shrink-0 select-none">
        {/* Ambient Photographic Background Layer with Parallax */}
        <motion.div
          animate={shouldReduceMotion ? {} : { x: mouseOffset.x, y: mouseOffset.y }}
          transition={{ type: 'spring', damping: 40, stiffness: 90 }}
          className="absolute -inset-8 pointer-events-none z-0 overflow-hidden"
        >
          <img
            src="/images/editorial/roommate_hero_cover.jpg"
            alt="Roommate Penthouse Loft"
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity scale-105"
          />
          {/* Subtle Gradient & Atmospheric Scrims */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121620] via-[#121620]/75 to-[#121620]/90" />
          <div className="absolute inset-0 bg-radial-at-tl from-vitality-coral/15 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-radial-at-br from-trust-teal/10 via-transparent to-transparent" />
        </motion.div>

        {/* Top: ROOMMATE Brand Logo */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="z-10"
        >
          <Link to="/" className="inline-block group cursor-pointer">
            <span className="font-serif text-headline-md font-bold tracking-tight text-white group-hover:text-vitality-coral transition-colors">
              ROOMMATE
            </span>
          </Link>
        </motion.div>

        {/* Center: Editorial Manifesto Messaging */}
        <div className="z-10 max-w-md my-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-label-caps text-vitality-coral font-bold tracking-[0.2em] uppercase text-xs inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-vitality-coral animate-pulse" />
              The Living OS
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-headline-lg lg:text-display-sm font-normal leading-[1.12] text-white tracking-tight drop-shadow-sm"
          >
            Where human connection meets physical space.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-body-md text-white/80 leading-relaxed font-normal"
          >
            Move beyond transactional apartment listings to identity-driven roommate compatibility and verified living history.
          </motion.p>
        </div>

        {/* Bottom: Subtle Social Proof & Trust Assurance */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="z-10 space-y-4 pt-6 border-t border-white/10"
        >
          {/* Verified Resident Community Avatars */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2 overflow-hidden shrink-0">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTwHP-dedcvHuy1rko6qYkrmV_43Hl2to-1vH2SnFApVj2UEXDeSUeX4FvgXIQHRoEcY-aOfxeIkHlzdQMV1HiJXcdJ2CvOZxKi9CcoJsjXU9GR1HM0R4zdpv9tCAA3IIUHOhhoJ83PVw-njK-O8KGd4bPYUSBMtARJdTDO9sDF5F5UI25dy25hEN6nasZd2YYMKv2usKhBIcS7o9vzno75rGzkLGPC9Tn3L_gnbKiO4_4JbIWEMDZ8A"
                alt="Verified Resident Ananya"
                className="inline-block w-7 h-7 rounded-full ring-2 ring-[#121620] object-cover"
              />
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCK_9NnhlZkr6Pkn0lhOlguCm2SQeh6OMQXhu0IpHtite7Jkyg01pOI5ETUDoiA9qRorQhh07HrHK62hEG2nPDpODQhaWKN8MQ0ZlIpv4MGVZa62ojUIBYOS55qT6NN-mBOOVDMC3MUL8mgol6VTGmKT5WKKWJ2saeFSKqpTQOk98w9RkkYl7eldJmIT1F6xc8RHR3vdB1uzkpY7lnlIRpvEE8h64G6A-JxwQsX73invKkEaJ6lPkdtcw"
                alt="Verified Resident Rohan"
                className="inline-block w-7 h-7 rounded-full ring-2 ring-[#121620] object-cover"
              />
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDa2JCqF8-uGxjzWrQNLbFq7aayFMyciJunutZhWilYq4pQIvYDUgd9gGDyp90HUgiedWGnwDuJ6TN-apEeDu0qqBhGQkbMFsw26k1xsuR26uKwG2jecFSVTGHGxX5K1Fptb87BYgY7kPfj1Hcg6r_Vaj_5hynyjzDDVTVTsa4vQoneGjIVYeJB2peMufDEDotc7Z_R1N-XtOpKEB1-6oI8JYK1gWbFbji08JqeGfa7gev1gdw9jqX_bw"
                alt="Verified Resident Ishita"
                className="inline-block w-7 h-7 rounded-full ring-2 ring-[#121620] object-cover"
              />
            </div>
            <span className="font-sans text-xs text-white/75 font-medium">
              Trusted by verified residents across Bengaluru, Mumbai & Delhi-NCR
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-metadata text-white/50">
            <ShieldCheck className="w-3.5 h-3.5 text-trust-teal shrink-0" />
            <span>Protected by Roommate Trust Protocol</span>
          </div>
        </motion.div>
      </div>

      {/* ============================================================ */}
      {/* RIGHT AUTHENTICATION FORM COLUMN */}
      {/* ============================================================ */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16 relative bg-clay dark:bg-earth-container transition-colors duration-200 overflow-y-auto">
        {/* Subtle Warm Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-radial-at-tr from-vitality-coral/10 via-trust-teal/5 to-transparent pointer-events-none blur-3xl" />

        {/* Mobile Header with ROOMMATE Branding */}
        <div className="md:hidden flex items-center justify-between pb-6 border-b border-surface-dim mb-6">
          <Link to="/" className="cursor-pointer">
            <span className="font-serif text-headline-sm font-bold text-earth-indigo">
              ROOMMATE
            </span>
          </Link>
          <span className="text-label-caps text-vitality-coral font-bold tracking-[0.15em] text-[10px]">
            The Living OS
          </span>
        </div>

        {/* Center Main Framed Stage Container */}
        <div className="w-full max-w-md mx-auto my-auto py-4 sm:py-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl p-7 sm:p-9 bg-white/75 dark:bg-[#161a25]/85 backdrop-blur-2xl border border-white/80 dark:border-white/10 shadow-2xl shadow-earth-indigo/5 dark:shadow-black/50 ring-1 ring-black/5 dark:ring-white/5"
          >
            {/* Subtle Top-Right Ambient Micro-Aura */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-vitality-coral/15 rounded-full blur-2xl pointer-events-none" />
            <Outlet />
          </motion.div>
        </div>

        {/* Bottom Copyright Notice */}
        <div className="text-center text-metadata text-secondary py-3 z-10">
          <span>&copy; 2026 ROOMMATE Living OS</span>
        </div>
      </div>
    </div>
  );
};
