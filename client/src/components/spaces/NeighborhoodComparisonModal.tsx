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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="spatial-glass-card rounded-3xl p-6 max-w-lg w-full space-y-5 text-left font-sans animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#dcd9db] dark:border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                Area Comparison
              </span>
              <h3
                id="comparison-modal-title"
                className="font-serif text-xl font-bold text-[#1a1f2c] dark:text-[#fcf8fa] leading-tight"
              >
                {primaryNeighborhood.name} vs{' '}
                {secondaryNeighborhood ? secondaryNeighborhood.name : 'Select'}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#f6f2f4] dark:bg-white/10 hover:bg-[#dcd9db] dark:hover:bg-white/20 text-[#525763] dark:text-[#c5cbd8] hover:text-[#1a1f2c] dark:hover:text-[#fcf8fa] transition-colors cursor-pointer"
            aria-label="Close comparison modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Secondary Neighborhood Selector */}
        {secondaryCandidates.length > 1 && (
          <div className="space-y-1">
            <label
              htmlFor="compare-secondary-select"
              className="text-[10px] font-bold text-[#525763] dark:text-[#c5cbd8] uppercase tracking-wider block"
            >
              Compare with district:
            </label>
            <select
              id="compare-secondary-select"
              value={selectedSecondaryId}
              onChange={(e) => setSelectedSecondaryId(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#f6f2f4] dark:bg-[#262d3e] border border-[#dcd9db] dark:border-white/20 text-[#1a1f2c] dark:text-[#fcf8fa] text-xs font-bold focus:outline-none focus:border-vitality-coral cursor-pointer"
            >
              {secondaryCandidates.map((n) => (
                <option key={n.id} value={n.id} className="bg-[#fcf8fa] dark:bg-[#1e2433] text-[#1a1f2c] dark:text-[#fcf8fa]">
                  {n.name} ({n.city})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Side-by-Side Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          {/* Column 1: Primary */}
          <div className="p-3.5 rounded-2xl bg-[#f6f2f4] dark:bg-[#262d3e] border-2 border-vitality-coral/40 dark:border-vitality-coral/50 space-y-3">
            <div className="border-b border-[#dcd9db] dark:border-white/10 pb-2">
              <span className="text-[10px] font-bold text-vitality-coral uppercase tracking-wider block">
                Primary District
              </span>
              <h4 className="font-serif text-base font-bold text-[#1a1f2c] dark:text-[#fcf8fa] truncate">
                {primaryNeighborhood.name}
              </h4>
            </div>

            <div className="space-y-2">
              <div>
                <span className="text-[10px] font-semibold text-[#525763] dark:text-[#c5cbd8] block">
                  Typical Rent
                </span>
                <span className="font-bold text-[#1a1f2c] dark:text-[#fcf8fa] text-sm block">
                  {primaryIntel.roomStats.formattedRange}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-semibold text-[#525763] dark:text-[#c5cbd8] block">
                  Available Rooms
                </span>
                <span className="font-bold text-[#1a1f2c] dark:text-[#fcf8fa] block">
                  {primaryIntel.roomStats.totalRooms} spaces
                </span>
              </div>

              <div>
                <span className="text-[10px] font-semibold text-[#525763] dark:text-[#c5cbd8] block">
                  Cohabitants
                </span>
                <span className="font-bold text-[#1a1f2c] dark:text-[#fcf8fa] block">
                  {primaryIntel.peopleStats.totalPeople} ({primaryIntel.peopleStats.verifiedCount} verified)
                </span>
              </div>

              <div>
                <span className="text-[10px] font-semibold text-[#525763] dark:text-[#c5cbd8] block">
                  Walkability
                </span>
                <span className="font-bold text-amber-600 dark:text-amber-400 block">
                  {primaryNeighborhood.walkability}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-semibold text-[#525763] dark:text-[#c5cbd8] block">
                  Transit
                </span>
                <span className="font-bold text-purple-600 dark:text-purple-400 truncate block">
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
              className="w-full py-2.5 bg-vitality-coral hover:bg-vitality-coral/90 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all"
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Column 2: Secondary */}
          {secondaryNeighborhood && secondaryIntel && (
            <div className="p-3.5 rounded-2xl bg-[#f6f2f4] dark:bg-[#262d3e] border border-[#dcd9db] dark:border-white/10 space-y-3">
              <div className="border-b border-[#dcd9db] dark:border-white/10 pb-2">
                <span className="text-[10px] font-bold text-trust-teal uppercase tracking-wider block">
                  Compared District
                </span>
                <h4 className="font-serif text-base font-bold text-[#1a1f2c] dark:text-[#fcf8fa] truncate">
                  {secondaryNeighborhood.name}
                </h4>
              </div>

              <div className="space-y-2">
                <div>
                  <span className="text-[10px] font-semibold text-[#525763] dark:text-[#c5cbd8] block">
                    Typical Rent
                  </span>
                  <span className="font-bold text-[#1a1f2c] dark:text-[#fcf8fa] text-sm block">
                    {secondaryIntel.roomStats.formattedRange}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-semibold text-[#525763] dark:text-[#c5cbd8] block">
                    Available Rooms
                  </span>
                  <span className="font-bold text-[#1a1f2c] dark:text-[#fcf8fa] block">
                    {secondaryIntel.roomStats.totalRooms} spaces
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-semibold text-[#525763] dark:text-[#c5cbd8] block">
                    Cohabitants
                  </span>
                  <span className="font-bold text-[#1a1f2c] dark:text-[#fcf8fa] block">
                    {secondaryIntel.peopleStats.totalPeople} ({secondaryIntel.peopleStats.verifiedCount} verified)
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-semibold text-[#525763] dark:text-[#c5cbd8] block">
                    Walkability
                  </span>
                  <span className="font-bold text-amber-600 dark:text-amber-400 block">
                    {secondaryNeighborhood.walkability}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-semibold text-[#525763] dark:text-[#c5cbd8] block">
                    Transit
                  </span>
                  <span className="font-bold text-purple-600 dark:text-purple-400 truncate block">
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
                className="w-full py-2.5 bg-[#eae7e8] dark:bg-white/10 hover:bg-[#dcd9db] dark:hover:bg-white/20 border border-[#dcd9db] dark:border-white/20 text-[#1a1f2c] dark:text-[#fcf8fa] font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer hover:border-vitality-coral transition-all"
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
