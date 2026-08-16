import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import {
  Sparkles,
  Briefcase,
  MapPin,
  Sun,
  Moon,
  Volume2,
  Coffee,
  CheckCircle,
} from 'lucide-react';
import { Profile } from '../../types/index.js';

export interface DiscoveryCardProps {
  profile: Profile;
  compatibilityScore?: number;
  onConnect?: () => void;
}

export const DiscoveryCard: React.FC<DiscoveryCardProps> = ({
  profile,
  compatibilityScore = 98,
}) => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const profileTarget = `/profile/${profile.id || profile.userId || 'ananya-sharma'}`;

  const isEarlyBird = profile.lifestyleDNA?.chronotype === 'early_bird';

  return (
    <motion.div
      onClick={() => navigate(profileTarget)}
      whileHover={shouldReduceMotion ? undefined : { y: -5 }}
      transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
      className="relative w-full max-w-[420px] md:max-w-[480px] h-[590px] md:h-[660px] flex items-center justify-center select-none group cursor-pointer"
    >
      {/* Background Connection Number Watermark */}
      <div className="absolute -top-8 -right-4 pointer-events-none opacity-20 select-none z-0">
        <span className="font-serif text-[110px] md:text-[150px] text-vitality-coral leading-none font-bold">
          {compatibilityScore}%
        </span>
      </div>

      {/* Central Portrait Container */}
      <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-surface-dim/40 bg-earth-container z-10 transition-shadow duration-500 group-hover:shadow-[0_20px_50px_rgba(240,90,90,0.15)]">
        <img
          src={profile.avatarUrl}
          alt={profile.displayName}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />

        {/* Cinematic Dark Scrim Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-10 pointer-events-none" />

        {/* Top Floating Match Badge */}
        <div className="absolute top-5 right-5 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-white shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-vitality-coral animate-pulse" />
          <span className="font-sans text-xs font-bold tracking-wider">{compatibilityScore}% Match</span>
        </div>

        {/* Top Verified Shield Pill */}
        <div className="absolute top-5 left-5 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-white shadow-md">
          <CheckCircle className="w-3.5 h-3.5 text-trust-teal" />
          <span className="font-sans text-[11px] font-semibold">Aadhaar Verified</span>
        </div>

        {/* Content Container (Bottom Overlay) */}
        <div className="absolute bottom-6 left-6 right-6 z-20 space-y-3.5">
          <div className="space-y-1.5">
            <h2 className="font-serif text-headline-lg-mobile md:text-headline-md font-bold text-white tracking-tight drop-shadow-md">
              {profile.displayName}
            </h2>
            <div className="flex items-center gap-2 text-white/90 font-sans text-xs md:text-sm font-medium">
              <Briefcase className="w-3.5 h-3.5 text-vitality-coral shrink-0" />
              <span className="truncate">{profile.headline}</span>
            </div>
            {profile.preferredLocations?.[0] && (
              <div className="flex items-center justify-between text-white/80 font-sans text-xs pt-0.5">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-trust-teal shrink-0" />
                  <span className="truncate max-w-[180px]">{profile.preferredLocations[0]}</span>
                </div>
                {profile.budgetRange && (
                  <span className="font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20 text-[11px]">
                    ₹{(profile.budgetRange.min / 1000).toFixed(0)}k–₹{(profile.budgetRange.max / 1000).toFixed(0)}k/mo
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Lifestyle Signal Pills */}
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-sans px-3 py-1 rounded-full border border-white/20 font-semibold flex items-center gap-1.5 shadow-sm">
              {isEarlyBird ? (
                <Sun className="w-3.5 h-3.5 text-vitality-coral" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-secondary" />
              )}
              <span>{isEarlyBird ? 'Early Riser' : 'Night Owl'}</span>
            </span>
            <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-sans px-3 py-1 rounded-full border border-white/20 font-semibold flex items-center gap-1.5 shadow-sm">
              <Volume2 className="w-3.5 h-3.5 text-vitality-coral" />
              <span>Quiet Hours</span>
            </span>
            <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-sans px-3 py-1 rounded-full border border-white/20 font-semibold flex items-center gap-1.5 shadow-sm">
              <Coffee className="w-3.5 h-3.5 text-trust-teal" />
              <span>Filter Coffee</span>
            </span>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/compatibility-lab`);
              }}
              className="flex-1 py-3 bg-vitality-coral hover:bg-vitality-coral/90 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-vitality-coral/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Analyze Fit</span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigate(profileTarget);
              }}
              className="py-3 px-4 bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-md font-bold text-xs uppercase tracking-wider rounded-xl active:scale-[0.98] transition-all cursor-pointer shadow-sm"
            >
              Trust Profile
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
