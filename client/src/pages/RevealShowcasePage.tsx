import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Sparkles, Key, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimeGridCanvas } from '../components/showcase/AnimeGridCanvas.js';
import { InteractiveDNASimulator } from '../components/showcase/InteractiveDNASimulator.js';
import { InteractiveLoftParallax } from '../components/showcase/InteractiveLoftParallax.js';

export const RevealShowcasePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-clay dark:bg-[#0c0f17] text-earth-indigo dark:text-white selection:bg-vitality-coral/20 relative overflow-x-hidden font-sans transition-colors duration-300">
      {/* ============================================================ */}
      {/* 1. TOP EDITORIAL NAVIGATION BAR */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-clay/80 dark:bg-[#0c0f17]/80 border-b border-surface-dim/70 dark:border-white/10 px-6 sm:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <span className="font-serif text-headline-md font-bold tracking-tight text-earth-indigo dark:text-white group-hover:text-vitality-coral transition-colors">
              ROOMMATE
            </span>
            <span className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-vitality-coral px-2 py-0.5 rounded-full border border-vitality-coral/30 bg-vitality-coral/10 hidden sm:inline-block">
              REVEAL
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8 text-xs font-sans text-secondary dark:text-earth-fixed/70 uppercase tracking-widest font-semibold">
            <a href="#dna" className="hover:text-earth-indigo dark:hover:text-white transition-colors">
              Compatibility DNA
            </a>
            <a href="#spaces" className="hover:text-earth-indigo dark:hover:text-white transition-colors">
              Sanctuaries
            </a>
            <a href="#trust" className="hover:text-earth-indigo dark:hover:text-white transition-colors">
              Trust Protocol
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="px-5 py-2.5 rounded-full bg-earth-indigo text-white dark:bg-vitality-coral dark:text-white font-sans text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 group cursor-pointer"
            >
              <span>Sign In / Register</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. HERO SECTION WITH ANIME.JS INTERACTIVE RIPPLE MATRIX */}
      {/* ============================================================ */}
      <section className="relative pt-12 pb-24 sm:pt-20 sm:pb-32 px-6 sm:px-12 flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-radial-at-t from-vitality-coral/15 via-trust-teal/10 to-transparent blur-3xl pointer-events-none" />

        {/* Anime.js Interactive Coordinate Grid Ripple Canvas */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 dark:opacity-50">
          <AnimeGridCanvas className="w-full max-w-4xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-label-caps text-vitality-coral font-bold tracking-[0.25em] text-xs uppercase inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-vitality-coral/10 border border-vitality-coral/25">
              <Sparkles className="w-3.5 h-3.5" />
              The Living OS &bull; 2026 Edition
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-display-md sm:text-display-lg md:text-[4.5rem] font-bold text-earth-indigo dark:text-white leading-[1.08] tracking-tight drop-shadow-sm"
          >
            Where human connection meets physical space.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-body-lg sm:text-headline-xs text-secondary dark:text-earth-fixed/80 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Move beyond transactional apartment classifieds to identity-driven roommate compatibility, calibrated chronotypes, and verified living history.
          </motion.p>

          {/* Magnetic CTA Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-earth-indigo text-white dark:bg-vitality-coral dark:text-white font-sans text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-all duration-200 group cursor-pointer"
            >
              <span>Access Your Spaces</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>

            <a
              href="#dna"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/70 dark:bg-white/5 border border-surface-dim dark:border-white/10 text-earth-indigo dark:text-white font-sans text-sm font-semibold tracking-wider hover:border-vitality-coral/50 transition-colors"
            >
              Test Compatibility Engine &darr;
            </a>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. SHOWCASE SECTION: COMPATIBILITY DNA SIMULATOR */}
      {/* ============================================================ */}
      <section id="dna" className="py-20 px-6 sm:px-12 relative border-t border-surface-dim/60 dark:border-white/5 bg-surface-low/30 dark:bg-[#0e111a]/40">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-label-caps text-vitality-coral font-bold tracking-[0.2em] text-xs uppercase">
              Synergy Architecture
            </span>
            <h2 className="font-serif text-headline-lg sm:text-display-xs font-bold text-earth-indigo dark:text-white">
              Lifestyle DNA & Chronotype Synchronization
            </h2>
            <p className="font-sans text-body-md text-secondary dark:text-earth-fixed/70">
              Interactive matching that looks at quiet hours, work rhythms, cleanliness standards, and social energy.
            </p>
          </div>

          <InteractiveDNASimulator />
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. SHOWCASE SECTION: CURATED ARCHITECTURAL SANCTUARIES */}
      {/* ============================================================ */}
      <section id="spaces" className="py-24 px-6 sm:px-12 relative">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl space-y-3">
              <span className="text-label-caps text-trust-teal font-bold tracking-[0.2em] text-xs uppercase">
                Curated Spaces
              </span>
              <h2 className="font-serif text-headline-lg sm:text-display-xs font-bold text-earth-indigo dark:text-white">
                Art-Directed Living in India&apos;s Creative Hubs
              </h2>
              <p className="font-sans text-body-md text-secondary dark:text-earth-fixed/70">
                Penthouses, sunlit lofts, and architecturally restored studios designed for high-trust living.
              </p>
            </div>

            <Link
              to="/login"
              className="inline-flex items-center gap-2 font-sans text-xs font-bold text-vitality-coral uppercase tracking-widest hover:underline"
            >
              <span>Explore All 500+ Sanctuaries</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <InteractiveLoftParallax />
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. TRUST PROTOCOL PILLARS */}
      {/* ============================================================ */}
      <section id="trust" className="py-20 px-6 sm:px-12 border-t border-surface-dim/60 dark:border-white/5 bg-surface-low/40 dark:bg-[#0e111a]/50">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-label-caps text-vitality-coral font-bold tracking-[0.2em] text-xs uppercase">
              Zero Friction
            </span>
            <h2 className="font-serif text-headline-lg font-bold text-earth-indigo dark:text-white">
              The Verified Resident Protocol
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white/70 dark:bg-[#151923]/80 border border-surface-dim/70 dark:border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-vitality-coral/10 text-vitality-coral flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-headline-sm font-bold text-earth-indigo dark:text-white">
                Verified Resident History
              </h3>
              <p className="font-sans text-body-sm text-secondary dark:text-earth-fixed/70 leading-relaxed">
                Every resident profile is verified via government KYC, employment credentials, and previous housemate trust reviews.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white/70 dark:bg-[#151923]/80 border border-surface-dim/70 dark:border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-trust-teal/10 text-trust-teal flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-headline-sm font-bold text-earth-indigo dark:text-white">
                Harmonic Chronotype Matching
              </h3>
              <p className="font-sans text-body-sm text-secondary dark:text-earth-fixed/70 leading-relaxed">
                Algorithmic alignment of sleep schedules, quiet hours, and daily rituals to eliminate shared apartment friction.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white/70 dark:bg-[#151923]/80 border border-surface-dim/70 dark:border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-earth-indigo/10 dark:bg-white/10 text-earth-indigo dark:text-white flex items-center justify-center">
                <Key className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-headline-sm font-bold text-earth-indigo dark:text-white">
                Digital Living Agreement
              </h3>
              <p className="font-sans text-body-sm text-secondary dark:text-earth-fixed/70 leading-relaxed">
                Clear co-living pacts covering rent division, guest policies, utilities, and deposit protection backed by cryptographic ledgers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. BOTTOM GRAND FINALE CTA */}
      {/* ============================================================ */}
      <section className="py-24 px-6 sm:px-12 relative">
        <div className="max-w-5xl mx-auto rounded-3xl p-10 sm:p-16 bg-earth-indigo text-white relative overflow-hidden text-center space-y-6 shadow-2xl">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-vitality-coral/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-trust-teal/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <span className="text-label-caps text-vitality-coral font-bold tracking-[0.25em] text-xs uppercase">
              Begin Your Chapter
            </span>
            <h2 className="font-serif text-display-xs sm:text-display-sm font-bold text-white leading-tight">
              Curate your living experience with verified roommates.
            </h2>
            <p className="font-sans text-body-md text-white/80 leading-relaxed">
              Join thousands of architects, founders, engineers, and creators living harmoniously across Bengaluru, Mumbai, and Delhi-NCR.
            </p>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/login"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-vitality-coral text-white font-sans text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-all duration-200 group cursor-pointer"
              >
                <span>Sign In / Create Account</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. FOOTER */}
      {/* ============================================================ */}
      <footer className="py-8 px-6 sm:px-12 border-t border-surface-dim/60 dark:border-white/10 text-metadata text-secondary dark:text-earth-fixed/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-serif font-bold text-sm text-earth-indigo dark:text-white">
              ROOMMATE
            </span>
            <span>&bull;</span>
            <span>Art Directed Living OS</span>
          </div>

          <div>
            <span>&copy; 2026 ROOMMATE. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RevealShowcasePage;
