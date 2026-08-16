import React from 'react';
import {
  ShieldCheck,
  Ghost,
  Radio,
  Users,
  Sparkles,
  UserX,
  Lock,
  Pause,
  Play,
  Square,
  X,
} from 'lucide-react';
import { useLiveLocation, VisibilitySetting } from '../../context/LiveLocationContext.js';

export interface PrivacyCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyCenterModal: React.FC<PrivacyCenterModalProps> = ({ isOpen, onClose }) => {
  const {
    sharingStatus,
    visibility,
    isGhostMode,
    requestShareLocation,
    pauseSharing,
    resumeSharing,
    stopSharing,
    enableGhostMode,
    disableGhostMode,
    changeVisibility,
  } = useLiveLocation();

  if (!isOpen) return null;

  const visibilityOptions: { id: VisibilitySetting; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      id: 'roommates',
      label: 'My Roommates',
      desc: 'Only verified cohabitants and room connections',
      icon: <Users className="w-4 h-4 text-vitality-coral" />,
    },
    {
      id: 'matches',
      label: 'My Matches',
      desc: 'Approved lifestyle matches and verified roommates',
      icon: <Sparkles className="w-4 h-4 text-trust-teal" />,
    },
    {
      id: 'nobody',
      label: 'Nobody (Private)',
      desc: 'Keep live coordinates invisible to everyone',
      icon: <UserX className="w-4 h-4 text-secondary" />,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-clay dark:bg-earth-container border border-surface-dim dark:border-white/20 rounded-3xl p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200 text-left max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-surface-dim dark:border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-trust-teal/15 text-trust-teal flex items-center justify-center border border-trust-teal/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-earth-indigo dark:text-clay">
                Spatial Privacy Center
              </h2>
              <span className="font-sans text-[11px] text-secondary dark:text-surface-dim">
                User-controlled location, Ghost Mode & visibility
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-low dark:bg-white/10 flex items-center justify-center text-secondary dark:text-surface-dim hover:text-earth-indigo dark:hover:text-clay cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 1. Ghost Mode Card */}
        <div className={`p-4 rounded-2xl border transition-all ${
          isGhostMode
            ? 'bg-purple-500/10 border-purple-500/30'
            : 'bg-surface-low dark:bg-white/5 border-surface-dim dark:border-white/10'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                isGhostMode ? 'bg-purple-500 text-white shadow-md' : 'bg-surface-dim/40 text-secondary'
              }`}>
                <Ghost className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-sans text-xs font-bold text-earth-indigo dark:text-clay">
                    Ghost Mode
                  </span>
                  <span className={`px-2 py-0.5 rounded-full font-sans text-[9px] font-bold ${
                    isGhostMode
                      ? 'bg-purple-500 text-white'
                      : 'bg-surface-dim/50 text-secondary dark:text-surface-dim'
                  }`}>
                    {isGhostMode ? 'ACTIVE' : 'OFF'}
                  </span>
                </div>
                <p className="font-sans text-[11px] text-secondary dark:text-surface-dim mt-0.5 max-w-xs">
                  Conceal your live location while browsing rooms and people normally.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={isGhostMode ? disableGhostMode : enableGhostMode}
              className={`px-3.5 py-1.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                isGhostMode
                  ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-md'
                  : 'bg-surface-dim/50 dark:bg-white/10 hover:bg-surface-dim text-earth-indigo dark:text-clay'
              }`}
            >
              {isGhostMode ? 'Disable' : 'Enable'}
            </button>
          </div>
        </div>

        {/* 2. Live Location Sharing State */}
        <div className="p-4 bg-surface-low dark:bg-white/5 rounded-2xl border border-surface-dim dark:border-white/10 space-y-3 font-sans text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-vitality-coral" />
              <span className="font-bold text-earth-indigo dark:text-clay uppercase tracking-wider text-[11px]">
                Live Location Stream
              </span>
            </div>

            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
              sharingStatus === 'sharing'
                ? 'bg-vitality-coral text-white animate-pulse'
                : sharingStatus === 'paused'
                ? 'bg-amber-400 text-black'
                : 'bg-surface-dim/50 text-secondary dark:text-surface-dim'
            }`}>
              {sharingStatus === 'sharing'
                ? '● LIVE'
                : sharingStatus === 'paused'
                ? '⏸ PAUSED'
                : 'OFF'}
            </span>
          </div>

          <p className="text-[11px] text-secondary dark:text-surface-dim leading-relaxed">
            {isGhostMode
              ? 'Ghost Mode is concealing your location. Turn off Ghost Mode to resume sharing.'
              : sharingStatus === 'sharing'
              ? `Currently broadcasting approximate neighborhood centroid to ${visibility}.`
              : sharingStatus === 'paused'
              ? 'Broadcasting paused. Coordinates are frozen.'
              : 'Live location is turned off. Start sharing when ready.'}
          </p>

          {/* Action Row */}
          {!isGhostMode && (
            <div className="pt-1 flex gap-2">
              {sharingStatus === 'off' || sharingStatus === 'denied' || sharingStatus === 'unavailable' ? (
                <button
                  type="button"
                  onClick={requestShareLocation}
                  className="flex-1 py-2.5 bg-vitality-coral hover:bg-vitality-coral/90 text-white rounded-xl font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Radio className="w-3.5 h-3.5" />
                  <span>Start Sharing</span>
                </button>
              ) : (
                <>
                  {sharingStatus === 'sharing' ? (
                    <button
                      type="button"
                      onClick={pauseSharing}
                      className="flex-1 py-2 bg-surface-dim/40 dark:bg-white/10 hover:bg-surface-dim text-earth-indigo dark:text-clay rounded-xl font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Pause className="w-3.5 h-3.5" />
                      <span>Pause</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={resumeSharing}
                      className="flex-1 py-2 bg-trust-teal hover:bg-trust-teal/90 text-white rounded-xl font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Resume</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={stopSharing}
                    className="py-2 px-4 bg-red-600/90 hover:bg-red-700 text-white rounded-xl font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Square className="w-3 h-3" />
                    <span>Stop</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* 3. Location Visibility Selector */}
        <div className="space-y-2 font-sans text-xs">
          <label className="block font-bold text-secondary dark:text-surface-dim uppercase tracking-wider text-[10px]">
            Who can see my live location
          </label>

          <div className="space-y-1.5">
            {visibilityOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => changeVisibility(opt.id)}
                className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  visibility === opt.id
                    ? 'bg-vitality-coral/10 border-vitality-coral dark:border-vitality-coral text-earth-indigo dark:text-clay'
                    : 'bg-surface-low dark:bg-white/5 border-surface-dim dark:border-white/10 hover:border-surface-dim'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-surface-low dark:bg-white/10 flex items-center justify-center shrink-0">
                    {opt.icon}
                  </div>
                  <div>
                    <span className="font-bold block text-xs">{opt.label}</span>
                    <span className="text-[10px] text-secondary dark:text-surface-dim">
                      {opt.desc}
                    </span>
                  </div>
                </div>

                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  visibility === opt.id ? 'border-vitality-coral bg-vitality-coral' : 'border-surface-dim'
                }`}>
                  {visibility === opt.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 4. Privacy Precision & Zero Database Guarantee */}
        <div className="p-3 bg-trust-teal/10 rounded-2xl border border-trust-teal/20 space-y-1.5 font-sans text-[11px] text-trust-teal dark:text-trust-teal">
          <div className="flex items-center gap-1.5 font-bold">
            <Lock className="w-3.5 h-3.5 shrink-0" />
            <span>Zero Persistent GPS Architecture</span>
          </div>
          <p className="text-secondary dark:text-surface-dim text-[10px] leading-relaxed">
            Location precision is permanently bounded to ~110m neighborhood block resolution. Coordinates are ephemeral in RAM and never written to database tables.
          </p>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 bg-surface-low dark:bg-white/10 hover:bg-surface-dim text-earth-indigo dark:text-clay rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
        >
          Done
        </button>
      </div>
    </div>
  );
};
