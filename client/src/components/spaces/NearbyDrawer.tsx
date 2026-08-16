import React from 'react';
import {
  MapPin,
  Compass,
  ArrowRight,
  X,
  Footprints,
} from 'lucide-react';
import { NeighborhoodMapItem, RoomMapItem, PersonMapItem } from './types.js';

export interface NearbyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  neighborhoods: NeighborhoodMapItem[];
  rooms: RoomMapItem[];
  people: PersonMapItem[];
  currentCity: string;
  onSelectNeighborhood: (neighborhood: NeighborhoodMapItem) => void;
}

export const NearbyDrawer: React.FC<NearbyDrawerProps> = ({
  isOpen,
  onClose,
  neighborhoods,
  rooms,
  people,
  currentCity,
  onSelectNeighborhood,
}) => {
  if (!isOpen) return null;

  const cityNeighborhoods = neighborhoods.filter(
    (n) => n.city.toLowerCase() === currentCity.toLowerCase()
  );

  return (
    <div className="absolute top-24 left-6 md:left-8 z-50 max-w-sm sm:max-w-md w-full bg-[#fcf8fa]/95 dark:bg-[#1e2433]/95 backdrop-blur-2xl border border-[#dcd9db]/60 dark:border-white/20 rounded-3xl p-5 shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-4 duration-200 pointer-events-auto text-left">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-surface-dim/40 dark:border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-vitality-coral/15 text-vitality-coral">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-[#0f172a]">
              Nearby Exploration
            </h3>
            <p className="font-sans text-[11px] text-[#475569] font-medium">
              Curated living hubs in {currentCity.charAt(0).toUpperCase() + currentCity.slice(1)}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-full bg-surface-low dark:bg-white/10 hover:bg-surface-dim dark:hover:bg-white/20 text-[#334155] hover:text-[#0f172a] transition-colors cursor-pointer"
          aria-label="Close nearby drawer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Summary Stat Pills */}
      <div className="grid grid-cols-3 gap-2 font-sans text-center">
        <div className="p-2.5 rounded-2xl bg-surface-low/80 dark:bg-black/5 border border-surface-dim/40 dark:border-black/10">
          <div className="text-sm font-extrabold text-[#0f172a]">
            {rooms.length}
          </div>
          <div className="text-[10px] text-[#475569] uppercase font-bold tracking-wider">
            Rooms
          </div>
        </div>

        <div className="p-2.5 rounded-2xl bg-surface-low/80 dark:bg-black/5 border border-surface-dim/40 dark:border-black/10">
          <div className="text-sm font-extrabold text-[#0f172a]">
            {people.length}
          </div>
          <div className="text-[10px] text-[#475569] uppercase font-bold tracking-wider">
            Roommates
          </div>
        </div>

        <div className="p-2.5 rounded-2xl bg-surface-low/80 dark:bg-black/5 border border-surface-dim/40 dark:border-black/10">
          <div className="text-sm font-extrabold text-[#0f172a]">
            {cityNeighborhoods.length}
          </div>
          <div className="text-[10px] text-[#475569] uppercase font-bold tracking-wider">
            Districts
          </div>
        </div>
      </div>

      {/* Neighborhood District Cards */}
      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
        {cityNeighborhoods.map((neighborhood) => (
          <button
            key={neighborhood.id}
            type="button"
            onClick={() => onSelectNeighborhood(neighborhood)}
            className="w-full text-left p-3.5 rounded-2xl bg-surface-low/80 dark:bg-black/5 hover:bg-vitality-coral/10 dark:hover:bg-vitality-coral/15 border border-surface-dim/40 dark:border-black/10 hover:border-vitality-coral/40 transition-all flex items-start justify-between gap-3 group cursor-pointer"
          >
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-1.5 font-sans text-xs font-bold text-[#0f172a]">
                <MapPin className="w-3.5 h-3.5 text-vitality-coral shrink-0" />
                <span className="truncate">{neighborhood.name}</span>
              </div>
              <p className="font-sans text-[11px] text-[#475569] truncate">
                {neighborhood.vibe || neighborhood.description}
              </p>
              <div className="flex items-center gap-3 font-sans text-[10px] text-[#334155] pt-0.5 font-medium">
                <span className="font-bold text-[#0f172a]">
                  {neighborhood.roomsCount} rooms
                </span>
                <span>•</span>
                <span>avg {neighborhood.avgRent}</span>
                <span>•</span>
                <span className="flex items-center gap-0.5 font-semibold text-[#0f172a]">
                  <Footprints className="w-2.5 h-2.5 text-amber-600" />
                  {neighborhood.walkability}
                </span>
              </div>
            </div>

            <div className="w-7 h-7 rounded-full bg-surface-low dark:bg-white/10 group-hover:bg-vitality-coral group-hover:text-white flex items-center justify-center text-[#334155] transition-colors shrink-0 mt-1">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
