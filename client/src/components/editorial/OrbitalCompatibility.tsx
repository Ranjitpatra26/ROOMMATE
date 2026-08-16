import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Coffee, Moon, ShieldCheck, Zap } from 'lucide-react';

export interface OrbitalCompatibilityProps {
  className?: string;
}

export const OrbitalCompatibility: React.FC<OrbitalCompatibilityProps> = ({
  className = '',
}) => {
  return (
    <div
      className={`relative w-[440px] h-[440px] max-w-full aspect-square flex items-center justify-center select-none ${className}`}
    >
      {/* Ambient Background Glow */}
      <div className="absolute inset-4 rounded-full bg-radial-at-c from-vitality-coral/15 via-trust-teal/10 to-transparent blur-3xl pointer-events-none" />

      {/* SVG Connecting Resonance Constellation Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 440 440">
        <defs>
          <linearGradient id="orbitGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f05a5a" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#6db08c" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#dee2f4" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {/* Lines from exact center (220, 220) to the 4 satellite quadrants */}
        <line x1="220" y1="220" x2="80" y2="80" stroke="url(#orbitGlow)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="220" y1="220" x2="360" y2="80" stroke="url(#orbitGlow)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="220" y1="220" x2="80" y2="360" stroke="url(#orbitGlow)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="220" y1="220" x2="360" y2="360" stroke="url(#orbitGlow)" strokeWidth="1.5" strokeDasharray="4 4" />
      </svg>

      {/* Concentric Rotating Orbital Rings */}
      <div className="absolute w-[390px] h-[390px] border border-outline-variant/30 dark:border-white/10 rounded-full animate-[spin_80s_linear_infinite]" />
      <div className="absolute w-[280px] h-[280px] border border-dashed border-vitality-coral/30 rounded-full animate-[spin_55s_linear_infinite_reverse]" />
      <div className="absolute w-[170px] h-[170px] border border-outline-variant/40 dark:border-white/15 rounded-full animate-[spin_40s_linear_infinite]" />

      {/* ============================================================ */}
      {/* 1. CENTER PRIMARY USER ANCHOR (Ananya) */}
      {/* ============================================================ */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center"
        >
          <div className="relative group cursor-pointer">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-clay dark:border-earth-container bg-surface-container shadow-2xl ring-4 ring-vitality-coral/30">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTwHP-dedcvHuy1rko6qYkrmV_43Hl2to-1vH2SnFApVj2UEXDeSUeX4FvgXIQHRoEcY-aOfxeIkHlzdQMV1HiJXcdJ2CvOZxKi9CcoJsjXU9GR1HM0R4zdpv9tCAA3IIUHOhhoJ83PVw-njK-O8KGd4bPYUSBMtARJdTDO9sDF5F5UI25dy25hEN6nasZd2YYMKv2usKhBIcS7o9vzno75rGzkLGPC9Tn3L_gnbKiO4_4JbIWEMDZ8A"
                alt="Ananya Sharma"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Active Status Beacon */}
            <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-clay ring-2 ring-emerald-500/40 animate-pulse" />
          </div>

          {/* Center Name Badge */}
          <div className="mt-2 px-3.5 py-1 rounded-full bg-clay/95 dark:bg-earth-container/95 backdrop-blur-md border border-surface-dim shadow-xl flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-vitality-coral animate-ping" />
            <span className="font-serif text-xs font-bold text-earth-indigo">
              Ananya &middot; Indiranagar
            </span>
          </div>
        </motion.div>
      </div>

      {/* ============================================================ */}
      {/* 2. SATELLITE PROFILES IN 4 QUADRANTS */}
      {/* ============================================================ */}

      {/* Profile 1 (Top Left) - Rohan Patil */}
      <div className="absolute top-[8%] left-[8%] z-20">
        <motion.div
          animate={{ y: [0, -10, 0], x: [0, 4, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center group cursor-pointer"
        >
          <div className="relative">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-clay dark:border-earth-container shadow-xl ring-2 ring-vitality-coral/40 group-hover:scale-110 transition-transform bg-surface-container">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCK_9NnhlZkr6Pkn0lhOlguCm2SQeh6OMQXhu0IpHtite7Jkyg01pOI5ETUDoiA9qRorQhh07HrHK62hEG2nPDpODQhaWKN8MQ0ZlIpv4MGVZa62ojUIBYOS55qT6NN-mBOOVDMC3MUL8mgol6VTGmKT5WKKWJ2saeFSKqpTQOk98w9RkkYl7eldJmIT1F6xc8RHR3vdB1uzkpY7lnlIRpvEE8h64G6A-JxwQsX73invKkEaJ6lPkdtcw"
                alt="Rohan"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-vitality-coral text-white font-mono text-[9px] font-bold shadow-md">
              98%
            </span>
          </div>
          <span className="mt-1 font-sans text-[10px] font-bold text-earth-indigo bg-clay/95 dark:bg-earth-container/95 px-2 py-0.5 rounded-md border border-surface-dim shadow-sm backdrop-blur-sm whitespace-nowrap">
            Rohan (AI)
          </span>
        </motion.div>
      </div>

      {/* Profile 2 (Top Right) - Ishita Nair */}
      <div className="absolute top-[8%] right-[8%] z-20">
        <motion.div
          animate={{ y: [0, 9, 0], x: [0, -4, 0] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="flex flex-col items-center group cursor-pointer"
        >
          <div className="relative">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-clay dark:border-earth-container shadow-xl ring-2 ring-trust-teal/40 group-hover:scale-110 transition-transform bg-surface-container">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDa2JCqF8-uGxjzWrQNLbFq7aayFMyciJunutZhWilYq4pQIvYDUgd9gGDyp90HUgiedWGnwDuJ6TN-apEeDu0qqBhGQkbMFsw26k1xsuR26uKwG2jecFSVTGHGxX5K1Fptb87BYgY7kPfj1Hcg6r_Vaj_5hynyjzDDVTVTsa4vQoneGjIVYeJB2peMufDEDotc7Z_R1N-XtOpKEB1-6oI8JYK1gWbFbji08JqeGfa7gev1gdw9jqX_bw"
                alt="Ishita"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-trust-teal text-white font-mono text-[9px] font-bold shadow-md">
              96%
            </span>
          </div>
          <span className="mt-1 font-sans text-[10px] font-bold text-earth-indigo bg-clay/95 dark:bg-earth-container/95 px-2 py-0.5 rounded-md border border-surface-dim shadow-sm backdrop-blur-sm whitespace-nowrap">
            Ishita (Curator)
          </span>
        </motion.div>
      </div>

      {/* Profile 3 (Bottom Left) - Aarav Mehta */}
      <div className="absolute bottom-[8%] left-[8%] z-20">
        <motion.div
          animate={{ y: [0, 10, 0], x: [0, 5, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
          className="flex flex-col items-center group cursor-pointer"
        >
          <div className="relative">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-clay dark:border-earth-container shadow-xl ring-2 ring-vitality-coral/40 group-hover:scale-110 transition-transform bg-surface-container">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkrXIOQFr_z5E9eGhR9o5GdKIcRJItc5Va0e1s6Pvi2gJW9HstlN__2qqmol8Whb70aPTmU4TPWCvRGbOLjD7wwEDKCt9NMueejAZcpY_mEO-mVGei_3MiHaDq5qLMbEq_gHwvIm6BryawU0LrRMqY-zn1f7WInRW9Ktgdy5sP7qxlaFJIIM0_XJYflVqkUCxY7NYBnJkV6MHSa6RydvmAFN5TiOLhpZP7hGmsrkBOtAB1YJZSX8hYIg"
                alt="Aarav"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-vitality-coral text-white font-mono text-[9px] font-bold shadow-md">
              94%
            </span>
          </div>
          <span className="mt-1 font-sans text-[10px] font-bold text-earth-indigo bg-clay/95 dark:bg-earth-container/95 px-2 py-0.5 rounded-md border border-surface-dim shadow-sm backdrop-blur-sm whitespace-nowrap">
            Aarav (Bandra)
          </span>
        </motion.div>
      </div>

      {/* Profile 4 (Bottom Right) - Meera Iyer */}
      <div className="absolute bottom-[8%] right-[8%] z-20">
        <motion.div
          animate={{ y: [0, -9, 0], x: [0, -5, 0] }}
          transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut', delay: 1.3 }}
          className="flex flex-col items-center group cursor-pointer"
        >
          <div className="relative">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-clay dark:border-earth-container shadow-xl ring-2 ring-trust-teal/40 group-hover:scale-110 transition-transform bg-surface-container">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC64MbZWsNixcO8McDmNx9O0u22et38koHfzkR1L85nrNCbb5YIzzL6EMVp-HSbJhTQZQIgd_4WaL4w32CrGIgitEkcxxzRW-x-JQAf6rlgr-YzwwE8OYl8iut1Rz_pGMddRzECyh7vPq13cQSlOi5I8C-1wQqo8w9tl5PULqqKuweX89oMHAbseGsUMo0Lbj6JDZU5h4I5k0KmXmVqZMOGnpn_fd63AIUCd4gCyPkqW69Njzrwm3lCYA"
                alt="Meera"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-trust-teal text-white font-mono text-[9px] font-bold shadow-md">
              97%
            </span>
          </div>
          <span className="mt-1 font-sans text-[10px] font-bold text-earth-indigo bg-clay/95 dark:bg-earth-container/95 px-2 py-0.5 rounded-md border border-surface-dim shadow-sm backdrop-blur-sm whitespace-nowrap">
            Meera (Chennai)
          </span>
        </motion.div>
      </div>

      {/* ============================================================ */}
      {/* 3. FLOATING LIFESTYLE WIDGETS & MICRO-BADGES */}
      {/* ============================================================ */}

      {/* Floating Widget 1: Resonance Metric (Mid Left) */}
      <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 4.1, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-clay/95 dark:bg-earth-container/95 border border-vitality-coral/40 shadow-xl backdrop-blur-md whitespace-nowrap"
        >
          <Zap className="w-3.5 h-3.5 text-vitality-coral fill-vitality-coral/20 shrink-0" />
          <span className="font-sans text-[10px] font-bold text-earth-indigo">
            98% Chronotype
          </span>
        </motion.div>
      </div>

      {/* Floating Widget 2: Morning Rituals (Mid Right) */}
      <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-clay/95 dark:bg-earth-container/95 border border-trust-teal/40 shadow-xl backdrop-blur-md whitespace-nowrap"
        >
          <Coffee className="w-3.5 h-3.5 text-trust-teal shrink-0" />
          <span className="font-sans text-[10px] font-bold text-earth-indigo">
            Coffee Ritual
          </span>
        </motion.div>
      </div>

      {/* Floating Widget 3: Quiet Hours (Top Center) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-clay/95 dark:bg-earth-container/95 border border-surface-dim shadow-md backdrop-blur-md whitespace-nowrap"
        >
          <Moon className="w-3 h-3 text-indigo-400" />
          <span className="font-sans text-[10px] font-bold text-earth-indigo">
            10:30 PM Quiet Hours
          </span>
        </motion.div>
      </div>

      {/* Floating Widget 4: Trust Index (Bottom Center) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20">
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-clay/95 dark:bg-earth-container/95 border border-emerald-500/40 shadow-md backdrop-blur-md whitespace-nowrap"
        >
          <ShieldCheck className="w-3 h-3 text-emerald-500" />
          <span className="font-sans text-[10px] font-bold text-earth-indigo">
            Verified Ledger
          </span>
        </motion.div>
      </div>

      {/* Floating Micro-Icons */}
      <div className="absolute top-[30%] left-[20%] z-10">
        <motion.div
          animate={{ scale: [1, 1.25, 1], rotate: [0, 15, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-7 h-7 rounded-full bg-vitality-coral/15 border border-vitality-coral/30 flex items-center justify-center shadow-sm backdrop-blur-sm"
        >
          <Heart className="w-3.5 h-3.5 text-vitality-coral fill-vitality-coral" />
        </motion.div>
      </div>

      <div className="absolute top-[30%] right-[20%] z-10">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, -15, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="w-7 h-7 rounded-full bg-trust-teal/15 border border-trust-teal/30 flex items-center justify-center shadow-sm backdrop-blur-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-trust-teal" />
        </motion.div>
      </div>
    </div>
  );
};
