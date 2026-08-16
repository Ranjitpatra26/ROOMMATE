import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  MapPin,
  ShieldCheck,
  MessageSquare,
  User,
  Radio,
  Clock,
  Lock,
} from 'lucide-react';
import { LiveLocationItem } from './types.js';

export interface LivePreviewCardProps {
  liveItem: LiveLocationItem;
  onClose: () => void;
}

export const LivePreviewCard: React.FC<LivePreviewCardProps> = ({ liveItem, onClose }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/profile/${liveItem.userId}`);
  };

  const handleMessage = () => {
    navigate(`/messages/conv-${liveItem.userId}`);
  };

  const isCurrentUser = liveItem.isCurrentUser;

  return (
    <>
      {/* Mobile Bottom Sheet */}
      <div className="md:hidden fixed inset-x-0 bottom-0 z-40 bg-[#fcf8fa]/95 dark:bg-[#1e2433]/95 backdrop-blur-2xl border-t border-[#dcd9db]/60 dark:border-white/20 rounded-t-3xl p-5 shadow-2xl space-y-4 animate-in slide-in-from-bottom duration-300 pointer-events-auto text-left">
        <div className="flex justify-center -mt-2 pb-1">
          <div className="w-10 h-1 rounded-full bg-surface-dim dark:bg-white/20" />
        </div>

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-vitality-coral/10 border-2 border-vitality-coral flex items-center justify-center overflow-hidden shadow-md">
                {liveItem.avatarUrl ? (
                  <img
                    src={liveItem.avatarUrl}
                    alt={liveItem.displayName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Radio className="w-6 h-6 text-vitality-coral animate-pulse" />
                )}
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vitality-coral opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-vitality-coral border-2 border-white dark:border-earth-container"></span>
              </span>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1 text-[10px] font-bold text-vitality-coral uppercase tracking-wider mb-0.5">
                <Radio className="w-3 h-3 animate-pulse" />
                <span>Live Location Active</span>
              </div>
              <h3 className="font-serif text-base font-bold text-earth-indigo dark:text-clay truncate">
                {liveItem.displayName}
              </h3>
              <p className="font-sans text-xs text-secondary dark:text-surface-dim truncate">
                {liveItem.neighborhood || 'Approximate area'}, {liveItem.city || 'Bengaluru'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-low dark:bg-white/10 flex items-center justify-center text-secondary dark:text-surface-dim hover:text-earth-indigo cursor-pointer shrink-0"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Privacy & Freshness Strip */}
        <div className="p-3 bg-surface-low dark:bg-white/5 rounded-2xl border border-surface-dim dark:border-white/10 space-y-1.5 font-sans text-xs">
          <div className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1 text-trust-teal font-bold">
              <Lock className="w-3.5 h-3.5" />
              <span>~110m Neighborhood Precision</span>
            </div>
            <div className="flex items-center gap-1 text-secondary dark:text-surface-dim">
              <Clock className="w-3 h-3" />
              <span>Live stream</span>
            </div>
          </div>
          <p className="text-[10px] text-secondary dark:text-surface-dim">
            Exact apartment numbers and private residences are never exposed.
          </p>
        </div>

        {!isCurrentUser && (
          <div className="grid grid-cols-2 gap-2.5 font-sans text-xs font-bold pt-1">
            <button
              type="button"
              onClick={handleViewProfile}
              className="py-3 bg-surface-low dark:bg-white/10 hover:bg-surface-dim dark:hover:bg-white/20 text-earth-indigo dark:text-clay border border-surface-dim dark:border-white/20 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
            >
              <User className="w-3.5 h-3.5" />
              <span>View Profile</span>
            </button>

            <button
              type="button"
              onClick={handleMessage}
              className="py-3 bg-vitality-coral hover:bg-vitality-coral/90 text-white rounded-xl shadow-lg shadow-vitality-coral/30 flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Message</span>
            </button>
          </div>
        )}
      </div>

      {/* Desktop Floating Card */}
      <div className="hidden md:block absolute top-20 right-20 z-20 w-84 bg-[#fcf8fa]/95 dark:bg-[#1e2433]/95 backdrop-blur-2xl border border-[#dcd9db]/60 dark:border-white/20 rounded-3xl p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200 pointer-events-auto text-left">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-vitality-coral/15 text-vitality-coral font-sans text-[10px] font-bold border border-vitality-coral/30">
            <Radio className="w-3 h-3 animate-pulse" />
            <span>{isCurrentUser ? 'Your Live Location' : 'Live Cohabitant'}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-surface-low dark:bg-white/10 flex items-center justify-center text-secondary dark:text-surface-dim hover:text-earth-indigo cursor-pointer transition-colors"
            title="Close Preview"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Profile Header */}
        <div className="flex gap-3.5 items-center">
          <div className="relative shrink-0">
            <div className="w-14 h-14 rounded-full bg-vitality-coral/10 border-2 border-vitality-coral flex items-center justify-center overflow-hidden shadow-md">
              {liveItem.avatarUrl ? (
                <img
                  src={liveItem.avatarUrl}
                  alt={liveItem.displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Radio className="w-6 h-6 text-vitality-coral animate-pulse" />
              )}
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vitality-coral opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-vitality-coral border-2 border-white dark:border-earth-container"></span>
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="font-serif text-base font-bold text-earth-indigo dark:text-clay truncate">
              {liveItem.displayName}
            </h4>
            <div className="flex items-center gap-1 text-[11px] text-vitality-coral font-sans font-bold mt-0.5">
              <MapPin className="w-3 h-3 shrink-0" />
              <span className="truncate">{liveItem.neighborhood || 'Approximate area'}, {liveItem.city || 'Bengaluru'}</span>
            </div>
          </div>
        </div>

        {/* Privacy Safeguards Info */}
        <div className="p-3 bg-surface-low dark:bg-white/5 rounded-2xl border border-surface-dim dark:border-white/10 space-y-2 font-sans text-xs">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-secondary dark:text-surface-dim">Audience:</span>
            <span className="font-bold text-earth-indigo dark:text-clay flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-trust-teal" />
              {liveItem.visibility === 'matches' ? 'My Matches' : 'My Roommates'}
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-secondary dark:text-surface-dim">Precision:</span>
            <span className="font-bold text-trust-teal">~110m Approximate</span>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-secondary dark:text-surface-dim">Status:</span>
            <span className="text-vitality-coral font-bold flex items-center gap-1">
              <Radio className="w-3 h-3 animate-pulse" />
              Live stream
            </span>
          </div>
        </div>

        {/* Action CTAs */}
        {!isCurrentUser && (
          <div className="pt-2 border-t border-surface-dim/60 dark:border-white/10 flex items-center gap-2 font-sans text-xs font-bold">
            <button
              type="button"
              onClick={handleViewProfile}
              className="flex-1 py-2.5 bg-surface-low dark:bg-white/10 hover:bg-surface-dim dark:hover:bg-white/20 text-earth-indigo dark:text-clay border border-surface-dim dark:border-white/20 rounded-xl flex items-center justify-center gap-1 cursor-pointer uppercase tracking-wider transition-all"
            >
              <span>View Profile</span>
            </button>

            <button
              type="button"
              onClick={handleMessage}
              className="flex-1 py-2.5 bg-vitality-coral hover:bg-vitality-coral/90 text-white rounded-xl shadow-md flex items-center justify-center gap-1 cursor-pointer uppercase tracking-wider transition-all hover:scale-105"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Message</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};
