import React from 'react';
import { MapPin, Sun, Moon, X } from 'lucide-react';

export interface FilterBarProps {
  selectedLocation: string;
  onLocationChange: (loc: string) => void;
  selectedChronotype: string;
  onChronotypeChange: (chrono: string) => void;
  maxBudget: number;
  onBudgetChange: (budget: number) => void;
  selectedCity?: string;
  onCityChange?: (city: string) => void;
}

const INDIAN_METROS = [
  { id: 'all', label: 'All Metros' },
  { id: 'Bengaluru', label: 'Bengaluru' },
  { id: 'Mumbai', label: 'Mumbai' },
  { id: 'Pune', label: 'Pune' },
  { id: 'Delhi', label: 'Delhi NCR' },
  { id: 'Hyderabad', label: 'Hyderabad' },
  { id: 'Goa', label: 'Goa' },
  { id: 'Kolkata', label: 'Kolkata' },
  { id: 'Chennai', label: 'Chennai' },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedLocation,
  onLocationChange,
  selectedChronotype,
  onChronotypeChange,
  maxBudget,
  onBudgetChange,
  selectedCity = 'all',
  onCityChange = () => {},
}) => {
  return (
    <div className="w-full space-y-4">
      {/* City Chips Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {INDIAN_METROS.map((metro) => {
          const isSelected =
            selectedCity === metro.id ||
            (metro.id === 'all' && !selectedLocation && selectedCity === 'all') ||
            (selectedLocation.toLowerCase().includes(metro.id.toLowerCase()) && metro.id !== 'all');

          return (
            <button
              key={metro.id}
              type="button"
              onClick={() => {
                onCityChange(metro.id);
                if (metro.id === 'all') {
                  onLocationChange('');
                } else {
                  onLocationChange(metro.id);
                }
              }}
              className={`px-4 py-2 rounded-full font-sans text-xs font-bold whitespace-nowrap transition-all cursor-pointer shadow-sm ${
                isSelected
                  ? 'bg-vitality-coral text-white shadow-vitality-coral/30 scale-105'
                  : 'bg-clay dark:bg-surface-low text-secondary hover:text-earth-indigo border border-surface-dim hover:border-earth-indigo'
              }`}
            >
              {metro.label}
            </button>
          );
        })}
      </div>

      {/* Main Filter Controls Card */}
      <div className="w-full bg-clay dark:bg-surface-low border border-surface-dim p-4 rounded-2xl shadow-sm flex flex-wrap items-center justify-between gap-4 transition-colors">
        {/* Search Input */}
        <div className="flex items-center gap-2 flex-1 min-w-[220px] bg-surface-low dark:bg-surface-high px-4 py-2.5 rounded-xl border border-surface-dim">
          <MapPin className="w-4 h-4 text-vitality-coral shrink-0" />
          <input
            type="text"
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            placeholder="Search neighborhood (e.g., Indiranagar, Bandra, Baner, Hauz Khas)..."
            className="bg-transparent font-sans text-xs text-earth-indigo placeholder:text-secondary focus:outline-none w-full font-medium"
          />
          {selectedLocation && (
            <button
              type="button"
              onClick={() => onLocationChange('')}
              className="text-secondary hover:text-earth-indigo p-0.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Chronotype Pills */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onChronotypeChange('all')}
            className={`px-3.5 py-2 rounded-full font-sans text-xs font-bold transition-all cursor-pointer ${
              selectedChronotype === 'all'
                ? 'bg-earth-indigo text-clay border border-earth-indigo shadow-sm'
                : 'bg-surface-low dark:bg-surface-high text-secondary hover:text-earth-indigo border border-surface-dim hover:border-earth-indigo'
            }`}
          >
            All Rhythms
          </button>
          <button
            type="button"
            onClick={() => onChronotypeChange('early_bird')}
            className={`px-3.5 py-2 rounded-full font-sans text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedChronotype === 'early_bird'
                ? 'bg-earth-indigo text-clay border border-earth-indigo shadow-sm'
                : 'bg-surface-low dark:bg-surface-high text-secondary hover:text-earth-indigo border border-surface-dim hover:border-earth-indigo'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-vitality-coral" />
            <span>Early Birds</span>
          </button>
          <button
            type="button"
            onClick={() => onChronotypeChange('night_owl')}
            className={`px-3.5 py-2 rounded-full font-sans text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedChronotype === 'night_owl'
                ? 'bg-earth-indigo text-clay border border-earth-indigo shadow-sm'
                : 'bg-surface-low dark:bg-surface-high text-secondary hover:text-earth-indigo border border-surface-dim hover:border-earth-indigo'
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-secondary" />
            <span>Night Owls</span>
          </button>
        </div>

        {/* Budget Range Quick Selector */}
        <div className="flex items-center gap-2 bg-surface-low dark:bg-surface-high px-4 py-2.5 rounded-xl border border-surface-dim">
          <span className="font-serif font-bold text-trust-teal text-sm">₹</span>
          <span className="font-sans text-xs text-secondary font-medium">Budget:</span>
          <select
            value={maxBudget}
            onChange={(e) => onBudgetChange(Number(e.target.value))}
            className="bg-transparent font-sans text-xs font-bold text-earth-indigo focus:outline-none cursor-pointer"
          >
            <option value={15000} className="bg-clay dark:bg-surface-low text-earth-indigo">₹15,000 / mo</option>
            <option value={20000} className="bg-clay dark:bg-surface-low text-earth-indigo">₹20,000 / mo</option>
            <option value={25000} className="bg-clay dark:bg-surface-low text-earth-indigo">₹25,000 / mo</option>
            <option value={35000} className="bg-clay dark:bg-surface-low text-earth-indigo">₹35,000 / mo</option>
            <option value={50000} className="bg-clay dark:bg-surface-low text-earth-indigo">₹50,000 / mo</option>
          </select>
        </div>
      </div>
    </div>
  );
};
