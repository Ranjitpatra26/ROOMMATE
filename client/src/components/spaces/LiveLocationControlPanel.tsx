import React, { useState } from 'react';
import {
  Radio,
  Pause,
  Play,
  Square,
  Users,
  Sparkles,
  ChevronDown,
  ShieldCheck,
  AlertCircle,
  Minimize2,
  Maximize2,
  Ghost,
  Lock,
} from 'lucide-react';
import { useLiveLocation, VisibilitySetting } from '../../context/LiveLocationContext.js';

export const LiveLocationControlPanel: React.FC = () => {
  const {
    sharingStatus,
    visibility,
    isGhostMode,
    myLiveLocation,
    lastError,
    requestShareLocation,
    pauseSharing,
    resumeSharing,
    stopSharing,
    enableGhostMode,
    disableGhostMode,
    changeVisibility,
    openPrivacyCenter,
  } = useLiveLocation();

  // On small screens (< 768px), default to collapsed pill to keep map interactive
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });
  const [isVisibilityOpen, setIsVisibilityOpen] = useState(false);

  const visibilityOptions: { id: VisibilitySetting; label: string; icon: React.ReactNode }[] = [
    { id: 'roommates', label: 'My Roommates', icon: <Users className="w-3.5 h-3.5" /> },
    { id: 'matches', label: 'My Matches', icon: <Sparkles className="w-3.5 h-3.5" /> },
  ];

  const currentVisOption = visibilityOptions.find((o) => o.id === visibility) || visibilityOptions[0];

  // Collapsed Pill View (Compact for mobile and minimized desktop)
  if (isCollapsed) {
    return (
      <div className="absolute bottom-6 right-4 md:bottom-8 md:right-8 z-20 pointer-events-auto text-left">
        <button
          type="button"
          onClick={() => setIsCollapsed(false)}
          className="px-3.5 py-2 bg-white/80 dark:bg-[#1a1f2c]/80 backdrop-blur-xl border border-white/60 dark:border-white/15 rounded-full shadow-2xl flex items-center gap-2 font-sans text-xs font-bold text-[#0f172a] dark:text-white hover:border-vitality-coral transition-all cursor-pointer"
          aria-label="Expand live location panel"
        >
          {isGhostMode ? (
            <span className="flex items-center gap-1.5 text-purple-500">
              <Ghost className="w-3.5 h-3.5" />
              <span>Ghost Mode</span>
            </span>
          ) : sharingStatus === 'sharing' ? (
            <span className="flex items-center gap-1.5 text-vitality-coral">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vitality-coral opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-vitality-coral"></span>
              </span>
              <span>Live Active</span>
            </span>
          ) : sharingStatus === 'paused' ? (
            <span className="flex items-center gap-1.5 text-amber-500">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Paused</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-secondary dark:text-surface-dim">
              <Radio className="w-3.5 h-3.5 text-vitality-coral" />
              <span>Live Location</span>
            </span>
          )}
          <Maximize2 className="w-3 h-3 text-secondary dark:text-surface-dim ml-0.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="absolute bottom-6 right-4 md:bottom-8 md:right-8 z-20 w-[calc(100vw-2rem)] max-w-xs sm:max-w-sm md:w-80 bg-white/85 dark:bg-[#1a1f2c]/85 backdrop-blur-2xl border border-white/60 dark:border-white/15 rounded-3xl p-4 shadow-2xl space-y-3 animate-in fade-in zoom-in-95 duration-200 pointer-events-auto text-left">
      {/* Header with Status Indicator, Privacy Center CTA & Collapse */}
      <div className="flex items-center justify-between border-b border-surface-dim/40 dark:border-white/10 pb-2.5">
        <div className="flex items-center gap-2">
          {isGhostMode ? (
            <div className="flex items-center gap-1 text-purple-500 font-bold text-[11px] uppercase tracking-wider">
              <Ghost className="w-3.5 h-3.5" />
              <span>Ghost Mode</span>
            </div>
          ) : sharingStatus === 'sharing' ? (
            <div className="flex items-center gap-1.5 text-vitality-coral font-bold text-[11px] uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vitality-coral opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-vitality-coral"></span>
              </span>
              <span>Live Active</span>
            </div>
          ) : sharingStatus === 'paused' ? (
            <div className="flex items-center gap-1.5 text-amber-500 font-bold text-[11px] uppercase tracking-wider">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Location Paused</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-secondary font-bold text-[11px] uppercase tracking-wider">
              <div className="w-2 h-2 rounded-full bg-surface-dim dark:bg-white/30" />
              <span>Live Location</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={openPrivacyCenter}
            className="px-2 py-1 bg-surface-low dark:bg-white/10 hover:bg-surface-dim dark:hover:bg-white/20 rounded-lg text-secondary hover:text-earth-indigo font-sans text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
            title="Open Privacy Center"
          >
            <ShieldCheck className="w-3 h-3 text-trust-teal" />
            <span>Privacy</span>
          </button>

          <button
            type="button"
            onClick={() => setIsCollapsed(true)}
            className="w-6 h-6 rounded-full bg-surface-low dark:bg-white/10 flex items-center justify-center text-secondary hover:text-earth-indigo cursor-pointer transition-colors"
            title="Minimize Panel"
            aria-label="Minimize Panel"
          >
            <Minimize2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Ghost Mode Active Banner */}
      {isGhostMode && (
        <div className="p-2.5 bg-purple-500/10 border border-purple-500/30 rounded-2xl space-y-2 font-sans text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-[11px]">
              <Ghost className="w-4 h-4 shrink-0" />
              <span>Your live location is hidden</span>
            </div>
          </div>
          <p className="text-[10px] text-secondary leading-relaxed">
            Ghost Mode suppresses all live GPS streams. You can continue exploring rooms and people normally.
          </p>
          <button
            type="button"
            onClick={disableGhostMode}
            className="w-full py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold uppercase tracking-wider text-[10px] transition-all cursor-pointer"
          >
            Disable Ghost Mode
          </button>
        </div>
      )}

      {/* Error Notice */}
      {lastError && (
        <div className="p-2 bg-red-500/10 border border-red-500/30 rounded-xl text-red-600 dark:text-red-400 font-sans text-xs flex items-start gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <span className="leading-tight text-[11px]">{lastError}</span>
        </div>
      )}

      {/* Controls when OFF / NOT SHARING (and not in Ghost Mode) */}
      {!isGhostMode && sharingStatus !== 'sharing' && sharingStatus !== 'paused' && (
        <div className="space-y-2.5">
          <p className="font-sans text-xs text-secondary leading-relaxed">
            Broadcast approximate neighborhood coordinates to verified connections.
          </p>

          {/* Visibility Dropdown */}
          <div className="relative">
            <label className="block font-sans text-[10px] font-bold text-secondary uppercase mb-1">
              Who can see you
            </label>
            <button
              type="button"
              onClick={() => setIsVisibilityOpen(!isVisibilityOpen)}
              className="w-full px-3 py-1.5 bg-surface-low dark:bg-white/5 border border-surface-dim dark:border-white/10 rounded-xl flex items-center justify-between font-sans text-xs font-bold text-earth-indigo cursor-pointer"
            >
              <div className="flex items-center gap-2">
                {currentVisOption.icon}
                <span>{currentVisOption.label}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-secondary" />
            </button>

            {isVisibilityOpen && (
              <div className="absolute top-full mt-1 inset-x-0 bg-clay dark:bg-earth-container border border-surface-dim dark:border-white/20 rounded-2xl shadow-xl p-1 z-30 space-y-1">
                {visibilityOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      changeVisibility(opt.id);
                      setIsVisibilityOpen(false);
                    }}
                    className={`w-full px-3 py-1.5 rounded-xl flex items-center gap-2 font-sans text-xs font-bold transition-all cursor-pointer ${
                      visibility === opt.id
                        ? 'bg-vitality-coral text-white'
                        : 'text-earth-indigo hover:bg-surface-low dark:hover:bg-white/10'
                    }`}
                  >
                    {opt.icon}
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Actions: Share Live Location + Quick Ghost Mode Toggle */}
          <div className="space-y-1.5 pt-1 font-sans text-xs font-bold">
            <button
              type="button"
              onClick={requestShareLocation}
              className="w-full py-2.5 bg-vitality-coral hover:bg-vitality-coral/90 text-white rounded-xl shadow-lg shadow-vitality-coral/30 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider transition-all hover:scale-[1.02]"
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Share Live Location</span>
            </button>

            <button
              type="button"
              onClick={enableGhostMode}
              className="w-full py-2 bg-surface-low dark:bg-white/10 hover:bg-surface-dim dark:hover:bg-white/20 text-earth-indigo border border-surface-dim dark:border-white/20 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider text-[10px] transition-all"
            >
              <Ghost className="w-3.5 h-3.5 text-purple-500" />
              <span>Enable Ghost Mode</span>
            </button>
          </div>
        </div>
      )}

      {/* Controls when ACTIVE (SHARING or PAUSED) */}
      {!isGhostMode && (sharingStatus === 'sharing' || sharingStatus === 'paused') && (
        <div className="space-y-2.5">
          <div className="p-2.5 bg-surface-low dark:bg-white/5 rounded-2xl border border-surface-dim dark:border-white/10 space-y-1 font-sans text-xs">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-secondary">Audience:</span>
              <span className="font-bold text-earth-indigo flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-trust-teal" />
                {currentVisOption.label}
              </span>
            </div>

            <div className="flex justify-between items-center text-[11px]">
              <span className="text-secondary">Area:</span>
              <span className="font-bold text-earth-indigo">
                {myLiveLocation?.neighborhood || 'Indiranagar'}
              </span>
            </div>

            <div className="flex justify-between items-center text-[11px] pt-0.5">
              <span className="text-secondary">Precision:</span>
              <span className="text-trust-teal font-bold flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>~110m (Zero DB GPS)</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 font-sans text-xs font-bold">
            {sharingStatus === 'sharing' ? (
              <button
                type="button"
                onClick={pauseSharing}
                className="py-2 bg-surface-low dark:bg-white/10 hover:bg-surface-dim dark:hover:bg-white/20 text-earth-indigo border border-surface-dim dark:border-white/20 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider transition-all"
              >
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={resumeSharing}
                className="py-2 bg-trust-teal hover:bg-trust-teal/90 text-white rounded-xl flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider transition-all"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Resume</span>
              </button>
            )}

            <button
              type="button"
              onClick={stopSharing}
              className="py-2 bg-red-600/90 hover:bg-red-700 text-white rounded-xl flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider transition-all"
            >
              <Square className="w-3 h-3" />
              <span>Stop</span>
            </button>
          </div>

          {/* Quick Ghost Mode while sharing */}
          <button
            type="button"
            onClick={enableGhostMode}
            className="w-full py-1.5 bg-purple-500/15 hover:bg-purple-500/25 text-purple-600 dark:text-purple-400 border border-purple-500/30 rounded-xl font-sans text-[10px] font-bold flex items-center justify-center gap-1.5 uppercase tracking-wider transition-all cursor-pointer"
          >
            <Ghost className="w-3.5 h-3.5" />
            <span>Switch to Ghost Mode</span>
          </button>
        </div>
      )}
    </div>
  );
};
