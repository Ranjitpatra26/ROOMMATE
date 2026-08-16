import React, { useState } from 'react';
import {
  ShieldCheck,
  ChevronRight,
  Share2,
  Ban,
  Check,
  ExternalLink,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ConversationParticipant } from './types.js';

export interface SharedRoomContext {
  title: string;
  price: string;
  imageUrl: string;
  roomId?: string;
}

export interface ConversationContextPanelProps {
  participant: ConversationParticipant;
  roomContext?: SharedRoomContext;
  onOpenSplitExpense?: () => void;
  className?: string;
}

export const ConversationContextPanel: React.FC<ConversationContextPanelProps> = ({
  participant,
  roomContext,
  className = '',
}) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [blocked, setBlocked] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBlock = () => {
    setBlocked(!blocked);
  };

  return (
    <aside
      className={`w-[320px] xl:w-[360px] bg-clay dark:bg-surface-low border-l border-surface-dim h-full shrink-0 flex flex-col overflow-y-auto transition-colors ${className}`}
    >
      {/* Profile Header */}
      <div className="p-6 flex flex-col items-center border-b border-surface-dim text-center space-y-3 shrink-0">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-surface-dim relative shadow-md">
          <img
            src={participant.avatarUrl}
            alt={participant.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-serif text-base font-bold text-earth-indigo flex items-center justify-center gap-1.5">
            <span>{participant.name}</span>
            <ShieldCheck className="w-4 h-4 text-trust-teal" />
          </h3>
          <p className="font-sans text-xs text-secondary mt-0.5">{participant.role}</p>
        </div>
        <div className="flex flex-wrap gap-1.5 justify-center">
          {participant.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 bg-surface-low dark:bg-surface-container border border-surface-dim rounded-full font-sans text-[10px] font-bold text-earth-indigo uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Vibe Compatibility Analysis */}
      <div className="p-5 border-b border-surface-dim space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-sans text-[10px] font-bold text-secondary uppercase tracking-wider">
            Vibe Resonance
          </h4>
          <span className="font-sans text-[10px] font-bold text-vitality-coral">High Fit</span>
        </div>
        <div className="flex items-center gap-3 bg-surface-low dark:bg-surface-container p-3.5 rounded-2xl border border-surface-dim">
          <div className="w-12 h-12 rounded-full border-3 border-vitality-coral flex items-center justify-center shrink-0 bg-clay dark:bg-surface-low shadow-sm">
            <span className="font-serif text-xs font-bold text-vitality-coral">
              {participant.compatibilityScore}%
            </span>
          </div>
          <div className="space-y-0.5">
            <div className="font-sans text-xs font-bold text-earth-indigo">Circadian Harmony</div>
            <p className="font-sans text-[11px] text-secondary leading-relaxed">
              Shared early riser rhythm (6:30 AM) and low acoustic threshold after 10:30 PM.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate('/compatibility-lab')}
          className="w-full py-2 bg-clay dark:bg-surface-high border border-surface-dim hover:border-earth-indigo text-earth-indigo font-sans text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>Open Compatibility Lab</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>

      {/* Shared Room Discussion */}
      {roomContext && (
        <div className="p-5 border-b border-surface-dim space-y-2.5">
          <h4 className="font-sans text-[10px] font-bold text-secondary uppercase tracking-wider">
            Discussing Space
          </h4>
          <div
            onClick={() => navigate(`/rooms/${roomContext.roomId || 'the-indiranagar-studio'}`)}
            className="bg-surface-low dark:bg-surface-container border border-surface-dim rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:border-earth-indigo transition-all"
          >
            <div className="h-28 w-full bg-surface-dim relative overflow-hidden">
              <img
                src={roomContext.imageUrl}
                alt={roomContext.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-2.5 left-3 text-white">
                <span className="font-serif text-xs font-bold block line-clamp-1">
                  {roomContext.title}
                </span>
                <span className="font-sans text-[10px] text-emerald-400 font-bold">
                  {roomContext.price}
                </span>
              </div>
            </div>
            <div className="p-2.5 bg-clay dark:bg-surface-low flex justify-between items-center text-xs font-bold text-secondary">
              <span>View room details & photos</span>
              <ChevronRight className="w-4 h-4 text-secondary group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      )}

      {/* Trust & Living OS Actions */}
      <div className="p-5 mt-auto space-y-2">
        <button
          type="button"
          onClick={() => navigate(`/profile/${participant.id}`)}
          className="w-full flex items-center justify-between p-2.5 bg-surface-low dark:bg-surface-container border border-surface-dim rounded-xl hover:border-earth-indigo text-earth-indigo font-sans text-xs font-bold cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-trust-teal" />
            <span>View Verified Trust DNA</span>
          </div>
          <ChevronRight className="w-4 h-4 text-secondary" />
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="w-full flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-surface-low text-earth-indigo transition-colors font-sans text-xs font-bold cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-trust-teal" /> : <Share2 className="w-4 h-4" />}
          <span>{copied ? 'Link Copied to Clipboard' : 'Share Profile'}</span>
        </button>

        <button
          type="button"
          onClick={handleBlock}
          className="w-full flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 text-secondary hover:text-red-600 transition-colors font-sans text-xs font-bold cursor-pointer"
        >
          <Ban className="w-4 h-4" />
          <span>{blocked ? 'Unblock Resident' : 'Block Resident'}</span>
        </button>
      </div>
    </aside>
  );
};
