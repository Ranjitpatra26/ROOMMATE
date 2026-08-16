import React, { useState } from 'react';
import {
  SlidersHorizontal,
  X,
  RotateCcw,
  Check,
  Sun,
  Moon,
} from 'lucide-react';
import { MapFilterOptions } from './types.js';

export interface MapFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: MapFilterOptions;
  onApplyFilters: (newFilters: MapFilterOptions) => void;
  onResetFilters: () => void;
}

export const MapFilterModal: React.FC<MapFilterModalProps> = ({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters,
}) => {
  const [maxBudget, setMaxBudget] = useState(filters.maxBudget || 50000);
  const [selectedChronotypes, setSelectedChronotypes] = useState<string[]>(
    filters.chronotypes || []
  );
  const [selectedTraits, setSelectedTraits] = useState<string[]>(
    filters.lifestyleTraits || []
  );
  const [availableNowOnly, setAvailableNowOnly] = useState<boolean>(
    filters.availableNowOnly || false
  );

  if (!isOpen) return null;

  const handleToggleChronotype = (type: string) => {
    setSelectedChronotypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleToggleTrait = (trait: string) => {
    setSelectedTraits((prev) =>
      prev.includes(trait) ? prev.filter((t) => t !== trait) : [...prev, trait]
    );
  };

  const handleApply = () => {
    onApplyFilters({
      minBudget: 0,
      maxBudget,
      chronotypes: selectedChronotypes,
      lifestyleTraits: selectedTraits,
      availableNowOnly,
    });
    onClose();
  };

  const handleReset = () => {
    setMaxBudget(50000);
    setSelectedChronotypes([]);
    setSelectedTraits([]);
    setAvailableNowOnly(false);
    onResetFilters();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#1e2433]/85 dark:bg-[#121620]/90 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 max-w-md w-full space-y-6 text-white text-left shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/15 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-vitality-coral/20 text-vitality-coral border border-vitality-coral/30">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white">Spatial Filters</h3>
              <p className="font-sans text-xs text-slate-300">
                Filter rooms & roommate compatibility
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors cursor-pointer"
            aria-label="Close filters"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Budget Range */}
        <div className="space-y-3">
          <div className="flex items-center justify-between font-sans">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Maximum Monthly Rent
            </span>
            <span className="text-sm font-bold text-vitality-coral">
              ₹{maxBudget >= 60000 ? '60,000+' : maxBudget.toLocaleString('en-IN')} / mo
            </span>
          </div>

          <input
            type="range"
            min="10000"
            max="60000"
            step="2000"
            value={maxBudget}
            onChange={(e) => setMaxBudget(Number(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-vitality-coral"
          />
          <div className="flex justify-between font-sans text-[10px] text-slate-400">
            <span>₹10,000</span>
            <span>₹30,000</span>
            <span>₹60,000+</span>
          </div>
        </div>

        {/* Lifestyle DNA & Chronotype */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block font-sans">
            Lifestyle Rhythm
          </span>
          <div className="grid grid-cols-2 gap-2 font-sans text-xs">
            {[
              { id: 'Early Bird', icon: <Sun className="w-3.5 h-3.5 text-amber-400" /> },
              { id: 'Night Owl', icon: <Moon className="w-3.5 h-3.5 text-purple-300" /> },
            ].map((item) => {
              const isSelected = selectedChronotypes.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleToggleChronotype(item.id)}
                  className={`p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-vitality-coral/25 border-vitality-coral text-white font-bold shadow-md shadow-vitality-coral/20'
                      : 'bg-white/10 hover:bg-white/15 border-white/10 text-slate-200 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.id}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-vitality-coral" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Social Energy */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block font-sans">
            Community Energy
          </span>
          <div className="grid grid-cols-2 gap-2 font-sans text-xs">
            {['Social & Extrovert', 'Quiet & Focused'].map((trait) => {
              const isSelected = selectedTraits.includes(trait);
              return (
                <button
                  key={trait}
                  type="button"
                  onClick={() => handleToggleTrait(trait)}
                  className={`p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-trust-teal/25 border-trust-teal text-white font-bold shadow-md shadow-trust-teal/20'
                      : 'bg-white/10 hover:bg-white/15 border-white/10 text-slate-200 hover:text-white'
                  }`}
                >
                  <span>{trait}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-trust-teal" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2 font-sans">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={handleApply}
            className="flex-1 py-3 px-6 rounded-full bg-vitality-coral text-white font-sans text-xs font-bold shadow-xl shadow-vitality-coral/30 hover:bg-vitality-coral/90 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Apply Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
};
