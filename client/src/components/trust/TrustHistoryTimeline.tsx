import React from 'react';
import { ShieldCheck, Star, Home, Award } from 'lucide-react';

export interface TrustTimelineEvent {
  id: string;
  type: 'stay_completed' | 'identity_verified' | 'review_received' | 'milestone';
  title: string;
  date: string;
  rating?: number;
  badge: string;
  summary: string;
  cohabitants?: string[];
}

export interface TrustHistoryTimelineProps {
  events: TrustTimelineEvent[];
}

export const TrustHistoryTimeline: React.FC<TrustHistoryTimelineProps> = ({ events }) => {
  return (
    <div className="relative pl-6 md:pl-8 space-y-8 before:absolute before:left-3 md:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-surface-dim">
      {events.map((evt) => (
        <div key={evt.id} className="relative group">
          {/* Timeline Node Marker */}
          <div className="absolute -left-6 md:-left-8 top-1.5 w-6 h-6 rounded-full bg-clay border-2 border-trust-teal flex items-center justify-center text-trust-teal shadow-sm group-hover:scale-110 transition-transform">
            {evt.type === 'stay_completed' ? (
              <Home className="w-3 h-3" />
            ) : evt.type === 'identity_verified' ? (
              <ShieldCheck className="w-3 h-3" />
            ) : (
              <Award className="w-3 h-3" />
            )}
          </div>

          {/* Event Content Card */}
          <div className="bg-clay border border-surface-dim rounded-2xl p-6 shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
              <div>
                <span className="font-sans text-[10px] font-bold text-secondary uppercase tracking-wider">
                  {evt.date}
                </span>
                <h4 className="font-serif text-sm md:text-base font-bold text-earth-indigo">
                  {evt.title}
                </h4>
              </div>
              <div className="flex items-center gap-2">
                {evt.rating && (
                  <span className="flex items-center gap-1 font-sans text-xs font-bold text-earth-indigo bg-surface-low px-2.5 py-1 rounded-full border border-surface-dim shadow-xs">
                    <Star className="w-3.5 h-3.5 fill-vitality-coral text-vitality-coral" />
                    {evt.rating.toFixed(1)}
                  </span>
                )}
                <span className="px-3 py-1 bg-trust-teal/15 text-trust-teal rounded-full font-sans text-[10px] font-bold uppercase tracking-wider">
                  {evt.badge}
                </span>
              </div>
            </div>

            <p className="font-sans text-xs text-secondary leading-relaxed">
              {evt.summary}
            </p>

            {evt.cohabitants && evt.cohabitants.length > 0 && (
              <div className="pt-2 border-t border-surface-dim/50 flex flex-wrap gap-2 items-center">
                <span className="font-sans text-[10px] font-bold text-secondary uppercase">
                  Verified Cohabitants:
                </span>
                {evt.cohabitants.map((c) => (
                  <span
                    key={c}
                    className="font-sans text-[11px] font-semibold text-earth-indigo bg-white px-2 py-0.5 rounded-md border border-surface-dim"
                  >
                    {c}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
