import React from 'react';
import { MapPin, Sun, Moon, Sparkles, X, RotateCcw } from 'lucide-react';

export interface FilterBarProps {
  selectedLocation: string;
  onLocationChange: (loc: string) => void;
  selectedChronotype: string;
  onChronotypeChange: (chrono: string) => void;
  maxBudget: number;
  onBudgetChange: (budget: number) => void;
  selectedCity?: string;
  onCityChange?: (city: string) => void;
  onResetFilters?: () => void;
  activeFilterCount?: number;
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
  onResetFilters,
  activeFilterCount = 0,
}) => {
  return (
    <div className="w-full space-y-4">
      {/* City Chips Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {INDIAN_METROS.map((metro) => {
          const isSelected = selectedCity.toLowerCase() === metro.id.toLowerCase();

          return (
            <button
              key={metro.id}
              type="button"
              onClick={() => onCityChange(metro.id)}
              className={`px-4 py-2 rounded-full font-sans text-xs font-bold whitespace-nowrap transition-all cursor-pointer shadow-sm ${
                isSelected
                  ? 'bg-vitality-coral text-white shadow-vitality-coral/30 scale-105 ring-2 ring-vitality-coral/20'
                  : 'bg-clay dark:bg-surface-low text-secondary hover:text-earth-indigo border border-surface-dim hover:border-earth-indigo'
              }`}
            >
              {metro.label}
            </button>
          );
        })}

        {activeFilterCount > 0 && onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-sans text-xs font-bold bg-vitality-coral/10 text-vitality-coral hover:bg-vitality-coral hover:text-white transition-all cursor-pointer shrink-0 ml-auto border border-vitality-coral/20"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset ({activeFilterCount})</span>
          </button>
        )}
      </div>

      {/* Main Filter Controls Card */}
      <div className="w-full bg-clay dark:bg-surface-low border border-surface-dim p-4 rounded-2xl shadow-sm flex flex-wrap items-center justify-between gap-4 transition-colors">
        {/* Search Input */}
        <div className="flex items-center gap-2 flex-1 min-w-[240px] bg-surface-low dark:bg-surface-high px-4 py-2.5 rounded-xl border border-surface-dim focus-within:border-vitality-coral transition-colors">
          <MapPin className="w-4 h-4 text-vitality-coral shrink-0" />
          <input
            type="text"
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            placeholder="Search neighborhood, name, profession, or lifestyle..."
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
        <div className="flex items-center gap-2 flex-wrap">
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
          <button
            type="button"
            onClick={() => onChronotypeChange('balanced')}
            className={`px-3.5 py-2 rounded-full font-sans text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedChronotype === 'balanced'
                ? 'bg-earth-indigo text-clay border border-earth-indigo shadow-sm'
                : 'bg-surface-low dark:bg-surface-high text-secondary hover:text-earth-indigo border border-surface-dim hover:border-earth-indigo'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-trust-teal" />
            <span>Flexible / Balanced</span>
          </button>
        </div>

        {/* Budget Range Quick Selector */}
        <div className="flex items-center gap-2 bg-surface-low dark:bg-surface-high px-4 py-2.5 rounded-xl border border-surface-dim">
          <span className="font-serif font-bold text-trust-teal text-sm">₹</span>
          <span className="font-sans text-xs text-secondary font-medium">Max Budget:</span>
          <select
            value={maxBudget}
            onChange={(e) => onBudgetChange(Number(e.target.value))}
            className="bg-transparent font-sans text-xs font-bold text-earth-indigo focus:outline-none cursor-pointer"
          >
            <option value={100000} className="bg-clay dark:bg-surface-low text-earth-indigo">All Budgets (₹100k+)</option>
            <option value={50000} className="bg-clay dark:bg-surface-low text-earth-indigo">Up to ₹50,000 / mo</option>
            <option value={35000} className="bg-clay dark:bg-surface-low text-earth-indigo">Up to ₹35,000 / mo</option>
            <option value={25000} className="bg-clay dark:bg-surface-low text-earth-indigo">Up to ₹25,000 / mo</option>
            <option value={20000} className="bg-clay dark:bg-surface-low text-earth-indigo">Up to ₹20,000 / mo</option>
            <option value={15000} className="bg-clay dark:bg-surface-low text-earth-indigo">Up to ₹15,000 / mo</option>
          </select>
        </div>
      </div>
    </div>
  );
};
