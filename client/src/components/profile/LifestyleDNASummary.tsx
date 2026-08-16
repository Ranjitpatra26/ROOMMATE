import React from 'react';
import { Sun, Sparkles, Volume2, Users } from 'lucide-react';
import { LifestyleDNA } from '../../types/index.js';

export const LifestyleDNASummary: React.FC<{ dna?: LifestyleDNA }> = ({ dna }) => {
  const chronotype = dna?.chronotype === 'early_bird' ? 'Early Riser (5AM–9PM)' : dna?.chronotype === 'night_owl' ? 'Night Owl (11AM–2AM+)' : 'Balanced Flexible (8AM–11PM)';
  const cleanliness = dna?.cleanlinessLevel === 5 ? 'Meticulous Daily' : dna?.cleanlinessLevel === 2 ? 'Relaxed & Lived-in' : 'Generally Tidy';
  const social = `${(dna?.socialEnergy || 3) * 20}% Communal`;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-clay p-4 rounded-xl border border-surface-dim space-y-1.5">
        <div className="flex items-center gap-2 text-vitality-coral">
          <Sun className="w-4 h-4" />
          <span className="font-sans text-label-caps text-secondary text-[10px] uppercase font-bold">
            Circadian
          </span>
        </div>
        <div className="font-sans text-xs font-bold text-earth-indigo">{chronotype}</div>
      </div>

      <div className="bg-clay p-4 rounded-xl border border-surface-dim space-y-1.5">
        <div className="flex items-center gap-2 text-vitality-coral">
          <Sparkles className="w-4 h-4" />
          <span className="font-sans text-label-caps text-secondary text-[10px] uppercase font-bold">
            Cleanliness
          </span>
        </div>
        <div className="font-sans text-xs font-bold text-earth-indigo">{cleanliness}</div>
      </div>

      <div className="bg-clay p-4 rounded-xl border border-surface-dim space-y-1.5">
        <div className="flex items-center gap-2 text-trust-teal">
          <Volume2 className="w-4 h-4" />
          <span className="font-sans text-label-caps text-secondary text-[10px] uppercase font-bold">
            Acoustic
          </span>
        </div>
        <div className="font-sans text-xs font-bold text-earth-indigo">Low Ambient Focus</div>
      </div>

      <div className="bg-clay p-4 rounded-xl border border-surface-dim space-y-1.5">
        <div className="flex items-center gap-2 text-earth-indigo">
          <Users className="w-4 h-4" />
          <span className="font-sans text-label-caps text-secondary text-[10px] uppercase font-bold">
            Social Energy
          </span>
        </div>
        <div className="font-sans text-xs font-bold text-earth-indigo">{social}</div>
      </div>
    </div>
  );
};
