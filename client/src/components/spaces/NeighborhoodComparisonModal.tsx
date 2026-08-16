import React, { useState } from 'react';
import {
  Scale,
  X,
  ArrowRight,
} from 'lucide-react';
import { NeighborhoodMapItem, RoomMapItem, PersonMapItem } from './types.js';
import { computeNeighborhoodIntelligence } from './neighborhoodIntelligence.js';

export interface NeighborhoodComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  primaryNeighborhood: NeighborhoodMapItem | null;
  allNeighborhoods: NeighborhoodMapItem[];
  rooms: RoomMapItem[];
  people: PersonMapItem[];
  onSelectNeighborhood: (neighborhood: NeighborhoodMapItem) => void;
}

export const NeighborhoodComparisonModal: React.FC<NeighborhoodComparisonModalProps> = ({
  isOpen,
  onClose,
  primaryNeighborhood,
  allNeighborhoods,
  rooms,
  people,
  onSelectNeighborhood,
}) => {
  if (!isOpen || !primaryNeighborhood) return null;

  // Filter available secondary neighborhoods in same city
  const secondaryCandidates = allNeighborhoods.filter(
    (n) => n.id !== primaryNeighborhood.id
  );

  const [selectedSecondaryId, setSelectedSecondaryId] = useState<string>(
    secondaryCandidates[0]?.id || ''
  );

  const secondaryNeighborhood =
    secondaryCandidates.find((n) => n.id === selectedSecondaryId) || secondaryCandidates[0];

  const primaryIntel = computeNeighborhoodIntelligence(primaryNeighborhood, rooms, people);
  const secondaryIntel = secondaryNeighborhood
    ? computeNeighborhoodIntelligence(secondaryNeighborhood, rooms, people)
    : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="comparison-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="bg-[#1e2433]/85 dark:bg-[#121620]/90 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 max-w-lg w-full space-y-5 text-left font-sans text-white shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/15 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                Area Comparison
              </span>
              <h3
                id="comparison-modal-title"
                className="font-serif text-xl font-bold text-white leading-tight"
              >
                {primaryNeighborhood.name} vs{' '}
                {secondaryNeighborhood ? secondaryNeighborhood.name : 'Select'}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors cursor-pointer"
            aria-label="Close comparison modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Secondary Neighborhood Selector */}
        {secondaryCandidates.length > 1 && (
          <div className="space-y-1.5">
            <label
              htmlFor="compare-secondary-select"
              className="text-[10px] font-bold text-slate-300 uppercase tracking-wider block"
            >
              Compare with district:
            </label>
            <select
              id="compare-secondary-select"
              value={selectedSecondaryId}
              onChange={(e) => setSelectedSecondaryId(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-bold focus:outline-none focus:border-vitality-coral cursor-pointer"
            >
              {secondaryCandidates.map((n) => (
                <option key={n.id} value={n.id} className="bg-[#1e2433] text-white">
                  {n.name} ({n.city})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Side-by-Side Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          {/* Column 1: Primary */}
          <div className="p-4 rounded-2xl bg-white/10 border-2 border-vitality-coral/60 space-y-3 backdrop-blur-md">
            <div className="border-b border-white/15 pb-2">
              <span className="text-[10px] font-bold text-vitality-coral uppercase tracking-wider block">
                Primary District
              </span>
              <h4 className="font-serif text-base font-bold text-white truncate">
                {primaryNeighborhood.name}
              </h4>
            </div>

            <div className="space-y-2">
              <div>
                <span className="text-[10px] font-semibold text-slate-300 block">
                  Typical Rent
                </span>
                <span className="font-bold text-white text-sm block">
                  {primaryIntel.roomStats.formattedRange}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-semibold text-slate-300 block">
                  Available Rooms
                </span>
                <span className="font-bold text-white block">
                  {primaryIntel.roomStats.totalRooms} spaces
                </span>
              </div>

              <div>
                <span className="text-[10px] font-semibold text-slate-300 block">
                  Cohabitants
                </span>
                <span className="font-bold text-white block">
                  {primaryIntel.peopleStats.totalPeople} ({primaryIntel.peopleStats.verifiedCount} verified)
                </span>
              </div>

              <div>
                <span className="text-[10px] font-semibold text-slate-300 block">
                  Walkability
                </span>
                <span className="font-bold text-amber-400 block">
                  {primaryNeighborhood.walkability}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-semibold text-slate-300 block">
                  Transit
                </span>
                <span className="font-bold text-purple-300 truncate block">
                  {primaryNeighborhood.transit}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onSelectNeighborhood(primaryNeighborhood);
                onClose();
              }}
              className="w-full py-2.5 bg-vitality-coral hover:bg-vitality-coral/90 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-vitality-coral/20 transition-all"
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Column 2: Secondary */}
          {secondaryNeighborhood && secondaryIntel && (
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-3 backdrop-blur-md">
              <div className="border-b border-white/15 pb-2">
                <span className="text-[10px] font-bold text-trust-teal uppercase tracking-wider block">
                  Compared District
                </span>
                <h4 className="font-serif text-base font-bold text-white truncate">
                  {secondaryNeighborhood.name}
                </h4>
              </div>

              <div className="space-y-2">
                <div>
                  <span className="text-[10px] font-semibold text-slate-300 block">
                    Typical Rent
                  </span>
                  <span className="font-bold text-white text-sm block">
                    {secondaryIntel.roomStats.formattedRange}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-semibold text-slate-300 block">
                    Available Rooms
                  </span>
                  <span className="font-bold text-white block">
                    {secondaryIntel.roomStats.totalRooms} spaces
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-semibold text-slate-300 block">
                    Cohabitants
                  </span>
                  <span className="font-bold text-white block">
                    {secondaryIntel.peopleStats.totalPeople} ({secondaryIntel.peopleStats.verifiedCount} verified)
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-semibold text-slate-300 block">
                    Walkability
                  </span>
                  <span className="font-bold text-amber-400 block">
                    {secondaryNeighborhood.walkability}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-semibold text-slate-300 block">
                    Transit
                  </span>
                  <span className="font-bold text-purple-300 truncate block">
                    {secondaryNeighborhood.transit}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onSelectNeighborhood(secondaryNeighborhood);
                  onClose();
                }}
                className="w-full py-2.5 bg-white/15 hover:bg-white/25 border border-white/20 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer hover:border-vitality-coral transition-all"
              >
                <span>Explore</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
