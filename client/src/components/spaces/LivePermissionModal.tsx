import React from 'react';
import { ShieldCheck, MapPin, Radio, Lock, Ghost, Users } from 'lucide-react';
import { useLiveLocation } from '../../context/LiveLocationContext.js';

export interface LivePermissionModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const LivePermissionModal: React.FC<LivePermissionModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
}) => {
  const { visibility } = useLiveLocation();

  if (!isOpen) return null;

  const visibilityLabel =
    visibility === 'roommates'
      ? 'My Roommates'
      : visibility === 'matches'
      ? 'My Matches'
      : 'Only You (Private)';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md spatial-glass-card rounded-3xl p-6 space-y-4 animate-in zoom-in-95 duration-200 text-left">
        {/* Header Icon & Security Badge */}
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-vitality-coral/15 text-vitality-coral flex items-center justify-center border border-vitality-coral/30">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-trust-teal/15 text-trust-teal rounded-full font-sans text-xs font-bold border border-trust-teal/30">
            <Lock className="w-3.5 h-3.5" />
            <span>Zero DB Persistence</span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5">
          <h3 className="font-serif text-xl font-bold text-earth-indigo dark:text-clay">
            Share Live Location
          </h3>
          <p className="font-sans text-xs text-secondary dark:text-surface-dim leading-relaxed">
            Your approximate neighborhood location will be broadcast in real-time to your approved connections.
          </p>
        </div>

        {/* Audience Preview */}
        <div className="p-3 bg-surface-low dark:bg-white/5 rounded-2xl border border-surface-dim dark:border-white/10 flex items-center justify-between font-sans text-xs">
          <span className="text-secondary dark:text-surface-dim">Visible to:</span>
          <span className="font-bold text-earth-indigo dark:text-clay flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-vitality-coral" />
            <span>{visibilityLabel}</span>
          </span>
        </div>

        {/* Privacy Safeguards Details */}
        <div className="p-3.5 bg-surface-low dark:bg-white/5 rounded-2xl border border-surface-dim dark:border-white/10 space-y-2.5 font-sans text-xs">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-trust-teal shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-earth-indigo dark:text-clay block">
                Approximate Area Only (~110m resolution)
              </span>
              <span className="text-[11px] text-secondary dark:text-surface-dim">
                Exact home, building gates, and private door numbers are never broadcast or shared.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Ghost className="w-4 h-4 text-secondary dark:text-surface-dim shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-earth-indigo dark:text-clay block">
                Full Ghost Mode Control
              </span>
              <span className="text-[11px] text-secondary dark:text-surface-dim">
                You can activate Ghost Mode or Stop Sharing at any time from the Privacy Center.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-vitality-coral shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-earth-indigo dark:text-clay block">
                Ephemeral In-Memory Stream
              </span>
              <span className="text-[11px] text-secondary dark:text-surface-dim">
                Coordinates are stored in temporary RAM only and purged upon stop or disconnect.
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2 font-sans text-xs font-bold">
          <button
            type="button"
            onClick={onCancel}
            className="py-3 bg-surface-low dark:bg-white/10 hover:bg-surface-dim dark:hover:bg-white/20 text-earth-indigo dark:text-clay border border-surface-dim dark:border-white/20 rounded-xl cursor-pointer uppercase tracking-wider transition-all"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="py-3 bg-vitality-coral hover:bg-vitality-coral/90 text-white rounded-xl shadow-lg shadow-vitality-coral/30 cursor-pointer uppercase tracking-wider transition-all hover:scale-105"
          >
            Start Sharing
          </button>
        </div>
      </div>
    </div>
  );
};
