import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  MapPin,
  Sparkles,
  ShieldCheck,
  MessageSquare,
  User,
  ArrowRight,
  Sun,
  Moon,
  Send,
  Check,
  Heart,
} from 'lucide-react';
import { PersonMapItem } from './types.js';

export interface PersonPreviewCardProps {
  person: PersonMapItem;
  onClose: () => void;
}

export const PersonPreviewCard: React.FC<PersonPreviewCardProps> = ({ person, onClose }) => {
  const navigate = useNavigate();
  const [quickMessage, setQuickMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleViewProfile = () => {
    navigate(`/profile/${person.userId || person.id}`);
  };

  const handleMessage = () => {
    navigate(`/messages/conv-${person.userId || person.id}`);
  };

  const handleSendQuickMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickMessage.trim()) return;
    setIsSent(true);
    setTimeout(() => {
      navigate(`/messages/conv-${person.userId || person.id}`);
    }, 800);
  };

  const isEarlyBird = person.lifestyleDNA?.chronotype === 'early_bird';
  const firstName = person.displayName.split(' ')[0];

  const quickPrompts = [
    `👋 Hi ${firstName}! Looking for a roommate?`,
    `✨ Loved your profile in ${person.neighborhood || 'Bengaluru'}!`,
    `☕ Would love to connect about co-living.`,
  ];

  return (
    <>
      {/* Mobile Bottom Sheet (390px - 768px) */}
      <div className="md:hidden fixed inset-x-0 bottom-0 z-40 bg-white/90 dark:bg-[#181d29]/95 backdrop-blur-2xl border-t border-white/60 dark:border-white/15 rounded-t-3xl p-5 space-y-4 animate-in slide-in-from-bottom duration-300 pointer-events-auto text-left font-sans max-h-[85vh] overflow-y-auto shadow-2xl">
        {/* Dismiss drag handle */}
        <div className="flex justify-center -mt-2 pb-1">
          <div className="w-10 h-1 rounded-full bg-black/15 dark:bg-white/20" />
        </div>

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={person.avatarUrl}
                alt={person.displayName}
                className="w-14 h-14 rounded-full object-cover border-2 border-vitality-coral shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-trust-teal text-white flex items-center justify-center border-2 border-white dark:border-[#181d29] text-[10px]">
                <ShieldCheck className="w-3 h-3" />
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1 text-[10px] font-bold text-vitality-coral uppercase tracking-wider mb-0.5">
                <MapPin className="w-3 h-3 shrink-0" />
                <span className="truncate">{person.neighborhood}, {person.city}</span>
              </div>
              <h3 className="font-serif text-base font-bold text-earth-indigo dark:text-white truncate">
                {person.displayName}
              </h3>
              <p className="text-xs text-secondary dark:text-surface-dim truncate">
                {person.headline}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 flex items-center justify-center text-secondary dark:text-surface-dim hover:text-earth-indigo dark:hover:text-white cursor-pointer shrink-0 border border-black/5 dark:border-white/10 transition-colors"
            title="Close Profile"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Compatibility & Trust Badge Strip */}
        <div className="flex items-center justify-between p-3 bg-black/[0.03] dark:bg-white/5 rounded-2xl border border-black/[0.06] dark:border-white/10 text-xs">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-vitality-coral/15 text-vitality-coral border border-vitality-coral/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-earth-indigo dark:text-white block">
                {person.compatibilityScore ? `${person.compatibilityScore}% Living Match` : '94% Match'}
              </span>
              <span className="text-[10px] text-secondary dark:text-surface-dim">
                {isEarlyBird ? 'Early Bird • Clean Rituals' : 'Night Owl • Focus Hours'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-bold text-trust-teal bg-trust-teal/15 dark:bg-trust-teal/20 px-2.5 py-1 rounded-full border border-trust-teal/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified</span>
          </div>
        </div>

        {/* Quick Message Box */}
        <form onSubmit={handleSendQuickMessage} className="space-y-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setQuickMessage(prompt)}
                className="shrink-0 px-2.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/10 hover:bg-vitality-coral hover:text-white text-[10px] font-bold text-earth-indigo dark:text-white transition-all cursor-pointer border border-black/[0.06] dark:border-white/10"
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className="relative flex items-center">
            <input
              type="text"
              value={quickMessage}
              onChange={(e) => setQuickMessage(e.target.value)}
              placeholder={`Send message to ${firstName}…`}
              className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-white/70 dark:bg-black/20 border border-black/10 dark:border-white/20 text-earth-indigo dark:text-white text-xs placeholder:text-secondary dark:placeholder:text-slate-400 focus:outline-none focus:border-vitality-coral"
            />
            <button
              type="submit"
              disabled={!quickMessage.trim() || isSent}
              className="absolute right-1.5 p-2 rounded-lg bg-vitality-coral text-white hover:bg-vitality-coral/90 disabled:opacity-40 transition-all cursor-pointer shadow-md"
            >
              {isSent ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
            </button>
          </div>
        </form>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5 text-xs font-bold pt-1">
          <button
            type="button"
            onClick={handleViewProfile}
            className="py-3 bg-black/[0.05] dark:bg-white/10 hover:bg-black/[0.08] dark:hover:bg-white/20 text-earth-indigo dark:text-white border border-black/10 dark:border-white/20 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider transition-all"
          >
            <User className="w-3.5 h-3.5" />
            <span>View Profile</span>
          </button>

          <button
            type="button"
            onClick={handleMessage}
            className="py-3 bg-vitality-coral hover:bg-vitality-coral/90 text-white rounded-xl shadow-lg shadow-vitality-coral/30 flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Open Chat</span>
          </button>
        </div>
      </div>

      {/* Desktop Floating Preview Card (>= 768px) */}
      <div className="hidden md:block fixed top-24 right-8 z-40 w-92 bg-white/85 dark:bg-[#181d29]/85 backdrop-blur-2xl border border-white/60 dark:border-white/15 rounded-3xl p-5 space-y-4 animate-in fade-in zoom-in-95 duration-200 pointer-events-auto text-left font-sans shadow-2xl">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-trust-teal/15 dark:bg-trust-teal/20 text-trust-teal text-[10px] font-bold border border-trust-teal/30">
            <ShieldCheck className="w-3 h-3" />
            <span>Verified Cohabitant</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 flex items-center justify-center text-secondary dark:text-surface-dim hover:text-earth-indigo dark:hover:text-white cursor-pointer transition-colors border border-black/5 dark:border-white/10"
            title="Close Preview"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Profile Header */}
        <div className="flex gap-3.5 items-center">
          <div className="relative shrink-0">
            <img
              src={person.avatarUrl}
              alt={person.displayName}
              className="w-14 h-14 rounded-full object-cover border-2 border-vitality-coral shadow-md"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-vitality-coral text-white flex items-center justify-center border-2 border-white dark:border-[#181d29] text-[8px]">
              {isEarlyBird ? <Sun className="w-2.5 h-2.5" /> : <Moon className="w-2.5 h-2.5" />}
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="font-serif text-base font-bold text-earth-indigo dark:text-white truncate">
              {person.displayName}
            </h4>
            <p className="text-xs text-secondary dark:text-surface-dim truncate">
              {person.headline}
            </p>
            <div className="flex items-center gap-1 text-[11px] text-vitality-coral font-bold mt-0.5">
              <MapPin className="w-3 h-3 shrink-0" />
              <span className="truncate">{person.neighborhood}, {person.city}</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs text-secondary dark:text-surface-dim line-clamp-2 leading-relaxed">
          {person.bio}
        </p>

        {/* Compatibility & Trust Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 bg-black/[0.03] dark:bg-white/5 rounded-xl border border-black/[0.06] dark:border-white/10">
            <div className="flex items-center gap-1 text-vitality-coral font-bold text-[11px]">
              <Sparkles className="w-3 h-3" />
              <span>{person.compatibilityScore ? `${person.compatibilityScore}% Sync` : '94% Sync'}</span>
            </div>
            <span className="text-[10px] text-secondary dark:text-surface-dim block mt-0.5 font-medium">
              Lifestyle Harmony
            </span>
          </div>

          <div className="p-2.5 bg-black/[0.03] dark:bg-white/5 rounded-xl border border-black/[0.06] dark:border-white/10">
            <div className="flex items-center gap-1 text-trust-teal font-bold text-[11px]">
              <ShieldCheck className="w-3 h-3" />
              <span>Score {person.trustProfile?.reputationScore || 890}</span>
            </div>
            <span className="text-[10px] text-secondary dark:text-surface-dim block mt-0.5 font-medium">
              Tier 1 Cleared
            </span>
          </div>
        </div>

        {/* Visual Tags */}
        {person.visualTags && (
          <div className="flex flex-wrap gap-1.5">
            {person.visualTags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 bg-black/[0.04] dark:bg-white/10 border border-black/[0.06] dark:border-white/10 rounded-full text-[10px] font-bold text-earth-indigo dark:text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Quick Message Input Box on Desktop */}
        <form onSubmit={handleSendQuickMessage} className="space-y-2 pt-1 border-t border-black/[0.06] dark:border-white/10">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
            {quickPrompts.slice(0, 2).map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setQuickMessage(prompt)}
                className="shrink-0 px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/10 hover:bg-vitality-coral hover:text-white text-[9px] font-bold text-earth-indigo dark:text-white transition-all cursor-pointer truncate max-w-[170px] border border-black/[0.06] dark:border-white/10"
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className="relative flex items-center">
            <input
              type="text"
              value={quickMessage}
              onChange={(e) => setQuickMessage(e.target.value)}
              placeholder={`Message ${firstName} directly…`}
              className="w-full pl-3 pr-9 py-2 rounded-xl bg-white/70 dark:bg-black/20 border border-black/10 dark:border-white/20 text-earth-indigo dark:text-white text-xs placeholder:text-secondary dark:placeholder:text-slate-400 focus:outline-none focus:border-vitality-coral"
            />
            <button
              type="submit"
              disabled={!quickMessage.trim() || isSent}
              className="absolute right-1 p-1.5 rounded-lg bg-vitality-coral text-white hover:bg-vitality-coral/90 disabled:opacity-40 transition-all cursor-pointer shadow-md"
              title="Send Message"
            >
              {isSent ? <Check className="w-3 h-3" /> : <Send className="w-3 h-3" />}
            </button>
          </div>
        </form>

        {/* Actions */}
        <div className="pt-2 border-t border-black/[0.06] dark:border-white/10 flex items-center gap-2 text-xs font-bold">
          <button
            type="button"
            onClick={handleViewProfile}
            className="flex-1 py-2.5 bg-black/[0.05] dark:bg-white/10 hover:bg-black/[0.08] dark:hover:bg-white/20 text-earth-indigo dark:text-white border border-black/10 dark:border-white/20 rounded-xl flex items-center justify-center gap-1 cursor-pointer uppercase tracking-wider transition-all"
          >
            <span>Profile</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          <button
            type="button"
            onClick={() => setIsConnected(!isConnected)}
            className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
              isConnected
                ? 'bg-trust-teal text-white border-trust-teal shadow-md'
                : 'bg-black/[0.04] dark:bg-white/10 border-black/10 dark:border-white/20 text-earth-indigo dark:text-white hover:border-trust-teal hover:text-trust-teal'
            }`}
            title="Send Connect Match"
          >
            <Heart className={`w-3.5 h-3.5 ${isConnected ? 'fill-white' : ''}`} />
            <span>{isConnected ? 'Matched' : 'Connect'}</span>
          </button>

          <button
            type="button"
            onClick={handleMessage}
            className="flex-1 py-2.5 bg-vitality-coral hover:bg-vitality-coral/90 text-white rounded-xl shadow-lg shadow-vitality-coral/30 flex items-center justify-center gap-1 cursor-pointer uppercase tracking-wider transition-all hover:scale-105"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat</span>
          </button>
        </div>
      </div>
    </>
  );
};
