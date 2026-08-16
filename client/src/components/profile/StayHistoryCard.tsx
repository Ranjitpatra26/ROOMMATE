import React from 'react';
import { MapPin, Star } from 'lucide-react';

export interface StayHistoryItem {
  id: string;
  location: string;
  duration: string;
  reviewQuote: string;
  reviewerName: string;
  reviewerRole: string;
  reviewerAvatar: string;
}

export const StayHistoryCard: React.FC<{ stay: StayHistoryItem }> = ({ stay }) => {
  return (
    <div className="min-w-[280px] md:min-w-[320px] bg-clay rounded-2xl p-6 border border-surface-dim shadow-sm flex flex-col justify-between space-y-4">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-1.5 text-secondary">
          <MapPin className="w-4 h-4 text-vitality-coral shrink-0" />
          <span className="font-sans text-xs font-semibold text-earth-indigo">
            {stay.location}
          </span>
        </div>
        <span className="font-sans text-label-caps text-secondary text-[10px]">
          {stay.duration}
        </span>
      </div>

      <p className="font-serif italic text-earth-indigo text-sm leading-relaxed">
        "{stay.reviewQuote}"
      </p>

      <div className="flex items-center gap-3 pt-3 border-t border-surface-dim">
        <div className="w-9 h-9 rounded-full overflow-hidden border border-surface-dim shrink-0">
          <img
            src={stay.reviewerAvatar}
            alt={stay.reviewerName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="font-sans text-xs font-bold text-earth-indigo">
            {stay.reviewerName}
          </div>
          <div className="font-sans text-[11px] text-secondary">{stay.reviewerRole}</div>
        </div>
        <div className="flex text-vitality-coral">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-vitality-coral text-vitality-coral" />
          ))}
        </div>
      </div>
    </div>
  );
};
