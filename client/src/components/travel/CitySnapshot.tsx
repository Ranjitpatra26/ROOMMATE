import React from 'react';
import { Train, Coffee, IndianRupee, ShieldCheck } from 'lucide-react';
import { DemoDestinationItem } from '../../data/indianDemoData.js';

export interface CitySnapshotProps {
  destination: DemoDestinationItem;
}

export const CitySnapshot: React.FC<CitySnapshotProps> = ({ destination }) => {
  return (
    <div className="bg-clay dark:bg-surface-low border border-surface-dim rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-dim pb-4">
        <div>
          <span className="font-sans text-[10px] font-bold text-vitality-coral uppercase tracking-widest block">
            City Snapshot • {destination.state}
          </span>
          <h3 className="font-serif text-headline-sm font-bold text-earth-indigo">
            Living Infrastructure & Ecosystem
          </h3>
        </div>
        <div className="flex items-center gap-2 font-sans text-xs font-bold text-trust-teal bg-trust-teal/10 px-3 py-1 rounded-full border border-trust-teal/30">
          <ShieldCheck className="w-4 h-4" />
          <span>{destination.verifiedResidentsCount} Verified Flatmates</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cost of Living Index */}
        <div className="p-4 bg-surface-low dark:bg-surface-container rounded-2xl border border-surface-dim space-y-2">
          <div className="flex items-center gap-2 text-earth-indigo font-bold font-sans text-xs">
            <div className="w-7 h-7 rounded-lg bg-vitality-coral/15 text-vitality-coral flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
            <span>Estimated Rent Bracket</span>
          </div>
          <p className="font-serif text-headline-sm font-bold text-earth-indigo">
            {destination.livingCostRange}
          </p>
          <span className="text-[11px] text-secondary block font-sans">
            Private bedroom with shared common areas in prime sectors.
          </span>
        </div>

        {/* Transit & Mobility */}
        <div className="p-4 bg-surface-low dark:bg-surface-container rounded-2xl border border-surface-dim space-y-2">
          <div className="flex items-center gap-2 text-earth-indigo font-bold font-sans text-xs">
            <div className="w-7 h-7 rounded-lg bg-trust-teal/15 text-trust-teal flex items-center justify-center">
              <Train className="w-4 h-4" />
            </div>
            <span>Transit & Commute</span>
          </div>
          <p className="font-sans text-xs font-bold text-earth-indigo leading-snug">
            {destination.transitInfo}
          </p>
          <span className="text-[11px] text-secondary block font-sans">
            Seamless last-mile connectivity to core tech and creative corridors.
          </span>
        </div>

        {/* Café & Remote Work Culture */}
        <div className="p-4 bg-surface-low dark:bg-surface-container rounded-2xl border border-surface-dim space-y-2">
          <div className="flex items-center gap-2 text-earth-indigo font-bold font-sans text-xs">
            <div className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-600 flex items-center justify-center">
              <Coffee className="w-4 h-4" />
            </div>
            <span>Work & Daily Rhythm</span>
          </div>
          <p className="font-sans text-xs font-bold text-earth-indigo leading-snug">
            {destination.workCulture}
          </p>
          <span className="text-[11px] text-secondary block font-sans">
            High density of focus spaces and morning active communities.
          </span>
        </div>
      </div>

      {/* Vibe Tags */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-surface-dim/50">
        <span className="font-sans text-[10px] font-bold text-secondary uppercase tracking-wider mr-2">
          Cultural Harmonies:
        </span>
        {destination.vibeTags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full bg-clay dark:bg-surface-high border border-surface-dim font-sans text-xs font-bold text-earth-indigo"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
