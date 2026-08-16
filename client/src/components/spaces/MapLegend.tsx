import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp, Ghost } from 'lucide-react';

export const MapLegend: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative pointer-events-auto text-left hidden sm:block ${className}`}>
      {isOpen ? (
        <div className="absolute bottom-full mb-2 left-0 bg-white/60 dark:bg-black/60 backdrop-blur-2xl border border-white/40 dark:border-white/15 rounded-3xl p-3.5 shadow-2xl space-y-2.5 w-64 animate-in fade-in zoom-in-95 duration-200 z-40">
          <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-2">
            <span className="font-sans text-[11px] font-bold text-[#0f172a] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-vitality-coral" />
              <span>Map Legend</span>
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-secondary dark:text-surface-dim hover:text-earth-indigo dark:hover:text-white cursor-pointer p-0.5"
              aria-label="Close legend"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1.5 font-sans text-xs">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-lg bg-vitality-coral/15 text-vitality-coral flex items-center justify-center text-[10px] font-bold shrink-0">
                🏠
              </span>
              <div>
                <span className="font-bold text-[#0f172a] dark:text-white block text-[11px]">
                  Verified Rooms
                </span>
                <span className="text-[9px] text-secondary dark:text-surface-dim block">
                  Curated living spaces & rent
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-lg bg-trust-teal/15 text-trust-teal flex items-center justify-center text-[10px] font-bold shrink-0">
                👤
              </span>
              <div>
                <span className="font-bold text-[#0f172a] dark:text-white block text-[11px]">
                  People Discovery
                </span>
                <span className="text-[9px] text-secondary dark:text-surface-dim block">
                  Preferred profile district
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-lg bg-vitality-coral/20 text-vitality-coral flex items-center justify-center text-[10px] font-bold shrink-0">
                <span className="w-2 h-2 rounded-full bg-vitality-coral animate-ping" />
              </span>
              <div>
                <span className="font-bold text-[#0f172a] dark:text-white block text-[11px]">
                  Live Location (~110m)
                </span>
                <span className="text-[9px] text-secondary dark:text-surface-dim block">
                  Active live stream
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-lg bg-purple-500/15 text-purple-500 flex items-center justify-center text-[10px] font-bold shrink-0">
                <Ghost className="w-3 h-3 text-purple-500" />
              </span>
              <div>
                <span className="font-bold text-[#0f172a] dark:text-white block text-[11px]">
                  Ghost Mode
                </span>
                <span className="text-[9px] text-secondary dark:text-surface-dim block">
                  Location concealed
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="px-3.5 py-2.5 bg-white/45 dark:bg-black/45 backdrop-blur-xl border border-white/40 dark:border-white/15 rounded-full shadow-md font-sans text-xs font-bold text-[#0f172a] dark:text-white hover:border-vitality-coral flex items-center gap-1.5 transition-all cursor-pointer"
          title="Open Map Legend"
          aria-label="Map Legend"
        >
          <Info className="w-3.5 h-3.5 text-vitality-coral" />
          <span className="hidden md:inline">Legend</span>
          <ChevronUp className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};
