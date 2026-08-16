import React from 'react';
import { Clock, Sunrise, Sun, Sunset, Moon, CheckCircle2 } from 'lucide-react';

export interface LivingItineraryProps {
  cityName: string;
  itinerary: {
    phase: string;
    time: string;
    title: string;
    activity: string;
    tag: string;
  }[];
}

export const LivingItinerary: React.FC<LivingItineraryProps> = ({
  cityName,
  itinerary,
}) => {
  const getPhaseIcon = (phase: string) => {
    switch (phase.toLowerCase()) {
      case 'morning':
        return <Sunrise className="w-5 h-5 text-amber-500" />;
      case 'afternoon':
        return <Sun className="w-5 h-5 text-vitality-coral" />;
      case 'evening':
        return <Sunset className="w-5 h-5 text-indigo-400" />;
      case 'night':
      default:
        return <Moon className="w-5 h-5 text-trust-teal" />;
    }
  };

  return (
    <div className="bg-clay dark:bg-surface-low border border-surface-dim rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-surface-dim pb-4">
        <div>
          <span className="font-sans text-[10px] font-bold text-vitality-coral uppercase tracking-widest block">
            Living Trial Blueprint • {cityName}
          </span>
          <h3 className="font-serif text-headline-md font-bold text-earth-indigo">
            A 24-Hour Reality Check: How You’d Actually Live Here
          </h3>
        </div>
        <p className="font-sans text-xs text-secondary max-w-sm">
          Move beyond tourist sightseeing. Experience real morning routines, remote work focus, and flatmate walk-throughs.
        </p>
      </div>

      {/* Itinerary Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {itinerary.map((item, index) => (
          <div
            key={index}
            className="p-5 bg-surface-low dark:bg-surface-container border border-surface-dim rounded-2xl flex flex-col justify-between space-y-4 hover:border-earth-indigo transition-colors group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-clay dark:bg-surface-high flex items-center justify-center shadow-sm border border-surface-dim">
                  {getPhaseIcon(item.phase)}
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-clay dark:bg-surface-high border border-surface-dim font-sans text-[10px] font-bold text-vitality-coral">
                  {item.tag}
                </span>
              </div>

              <div>
                <div className="font-sans text-[11px] font-bold text-secondary flex items-center gap-1.5 mb-1">
                  <Clock className="w-3 h-3 text-secondary" />
                  <span>{item.time}</span>
                </div>
                <h4 className="font-serif text-sm font-bold text-earth-indigo group-hover:text-vitality-coral transition-colors">
                  {item.title}
                </h4>
              </div>

              <p className="font-sans text-xs text-secondary leading-relaxed">
                {item.activity}
              </p>
            </div>

            <div className="pt-3 border-t border-surface-dim/60 flex items-center gap-1.5 text-[11px] font-sans font-bold text-trust-teal">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Phase {index + 1} Checklist</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
