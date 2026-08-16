import React from 'react';
import { MapPin, Search } from 'lucide-react';
import { Button } from '../../foundation/index.js';

export interface TravelSearchDeskProps {
  destination: string;
  onDestinationChange: (val: string) => void;
  durationMonths: number;
  onDurationChange: (val: number) => void;
  budgetRange: string;
  onBudgetChange: (val: string) => void;
  onSearch: () => void;
}

export const TravelSearchDesk: React.FC<TravelSearchDeskProps> = ({
  destination,
  onDestinationChange,
  durationMonths,
  onDurationChange,
  budgetRange,
  onBudgetChange,
  onSearch,
}) => {
  return (
    <div className="bg-clay/90 backdrop-blur-xl border border-surface-dim/50 rounded-2xl p-6 md:p-8 shadow-xl max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
      {/* Destination Input */}
      <div className="relative group">
        <label className="font-sans text-xs font-bold text-secondary absolute -top-2.5 left-3 bg-clay px-1.5 uppercase tracking-wider">
          Destination
        </label>
        <div className="flex items-center border border-surface-dim rounded-xl px-4 py-3 bg-surface-low focus-within:border-earth-indigo transition-all">
          <MapPin className="w-4 h-4 text-vitality-coral mr-2.5 shrink-0" />
          <input
            type="text"
            value={destination}
            onChange={(e) => onDestinationChange(e.target.value)}
            placeholder="Goa, Jaipur, Pondicherry..."
            className="w-full bg-transparent font-sans text-xs font-bold text-earth-indigo placeholder-secondary focus:outline-none"
          />
        </div>
      </div>

      {/* Duration / Timeline Input */}
      <div className="relative group">
        <label className="font-sans text-xs font-bold text-secondary absolute -top-2.5 left-3 bg-clay px-1.5 uppercase tracking-wider">
          Duration
        </label>
        <div className="flex items-center justify-between border border-surface-dim rounded-xl px-4 py-3 bg-surface-low focus-within:border-earth-indigo transition-all">
          <span className="font-sans text-xs font-bold text-earth-indigo">15 Sep</span>
          <div className="flex-1 mx-3 relative flex items-center justify-center">
            <div className="w-full h-0.5 bg-surface-dim" />
            <button
              type="button"
              onClick={() => onDurationChange(durationMonths === 2 ? 3 : 2)}
              className="absolute bg-clay px-2 py-0.5 font-sans text-[10px] font-bold text-vitality-coral rounded-full border border-vitality-coral/40 cursor-pointer"
            >
              {durationMonths} MONTHS
            </button>
          </div>
          <span className="font-sans text-xs font-bold text-earth-indigo">15 Nov</span>
        </div>
      </div>

      {/* Monthly Budget Input */}
      <div className="relative group flex items-center gap-2">
        <div className="flex-1 relative">
          <label className="font-sans text-xs font-bold text-secondary absolute -top-2.5 left-3 bg-clay px-1.5 uppercase tracking-wider">
            Monthly Budget
          </label>
          <div className="flex items-center border border-surface-dim rounded-xl px-4 py-3 bg-surface-low focus-within:border-earth-indigo transition-all">
            <span className="font-serif font-bold text-trust-teal text-sm mr-2 shrink-0">₹</span>
            <input
              type="text"
              value={budgetRange}
              onChange={(e) => onBudgetChange(e.target.value)}
              placeholder="₹25,000 - ₹45,000"
              className="w-full bg-transparent font-sans text-xs font-bold text-earth-indigo placeholder-secondary focus:outline-none"
            />
          </div>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={onSearch}
          className="h-[46px] px-5 bg-earth-indigo text-clay hover:bg-vitality-coral transition-colors rounded-xl font-bold"
        >
          <Search className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
