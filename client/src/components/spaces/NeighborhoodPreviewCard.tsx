import React from 'react';
import {
  MapPin,
  Home,
  Users,
  Footprints,
  Train,
  X,
  Navigation,
} from 'lucide-react';
import { NeighborhoodMapItem } from './types.js';

export interface NeighborhoodPreviewCardProps {
  neighborhood: NeighborhoodMapItem;
  onClose: () => void;
  onFilterRooms?: (neighborhoodName: string) => void;
  onFilterPeople?: (neighborhoodName: string) => void;
  onDirections?: (neighborhood: NeighborhoodMapItem) => void;
}

export const NeighborhoodPreviewCard: React.FC<NeighborhoodPreviewCardProps> = ({
  neighborhood,
  onClose,
  onFilterRooms,
  onFilterPeople,
  onDirections,
}) => {
  return (
    <div className="bg-clay/95 dark:bg-earth-container/95 backdrop-blur-2xl border border-surface-dim dark:border-white/20 rounded-3xl p-5 shadow-2xl space-y-4 max-w-sm sm:max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-200 text-left pointer-events-auto">
      {/* Header with Close */}
      <div className="flex items-start justify-between gap-3 border-b border-surface-dim/40 dark:border-white/10 pb-3">
        <div>
          <div className="flex items-center gap-1.5 text-vitality-coral font-sans text-[10px] font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>{neighborhood.city} District</span>
          </div>
          <h3 className="font-serif text-xl font-bold text-earth-indigo leading-tight mt-0.5">
            {neighborhood.name}
          </h3>
          <p className="font-sans text-xs text-secondary mt-0.5 font-medium">
            {neighborhood.vibe || 'Curated Living District'}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-full bg-surface-low dark:bg-white/10 hover:bg-surface-dim dark:hover:bg-white/20 text-secondary hover:text-earth-indigo transition-colors cursor-pointer"
          aria-label="Close neighborhood details"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Description */}
      <p className="font-sans text-xs text-secondary leading-relaxed">
        {neighborhood.description}
      </p>

      {/* Real Data Metrics Grid */}
      <div className="grid grid-cols-2 gap-2 font-sans">
        {/* Available Rooms */}
        <div className="p-3 rounded-2xl bg-surface-low/80 dark:bg-white/5 border border-surface-dim/40 dark:border-white/10 space-y-0.5">
          <div className="flex items-center gap-1.5 text-secondary text-[10px] font-bold uppercase tracking-wider">
            <Home className="w-3.5 h-3.5 text-vitality-coral" />
            <span>Available Rooms</span>
          </div>
          <div className="text-base font-bold text-earth-indigo">
            {neighborhood.roomsCount} spaces
          </div>
          <div className="text-[10px] text-secondary">
            avg {neighborhood.avgRent}
          </div>
        </div>

        {/* Compatible Flatmates */}
        <div className="p-3 rounded-2xl bg-surface-low/80 dark:bg-white/5 border border-surface-dim/40 dark:border-white/10 space-y-0.5">
          <div className="flex items-center gap-1.5 text-secondary text-[10px] font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-trust-teal" />
            <span>Roommates</span>
          </div>
          <div className="text-base font-bold text-earth-indigo">
            Verified Profiles
          </div>
          <div className="text-[10px] text-secondary">
            Active community
          </div>
        </div>

        {/* Walkability */}
        <div className="p-3 rounded-2xl bg-surface-low/80 dark:bg-white/5 border border-surface-dim/40 dark:border-white/10 space-y-0.5">
          <div className="flex items-center gap-1.5 text-secondary text-[10px] font-bold uppercase tracking-wider">
            <Footprints className="w-3.5 h-3.5 text-amber-500" />
            <span>Walkability</span>
          </div>
          <div className="text-base font-bold text-earth-indigo">
            {neighborhood.walkability}
          </div>
          <div className="text-[10px] text-secondary">
            Pedestrian friendly
          </div>
        </div>

        {/* Transit */}
        <div className="p-3 rounded-2xl bg-surface-low/80 dark:bg-white/5 border border-surface-dim/40 dark:border-white/10 space-y-0.5">
          <div className="flex items-center gap-1.5 text-secondary text-[10px] font-bold uppercase tracking-wider">
            <Train className="w-3.5 h-3.5 text-purple-500" />
            <span>Transit Hub</span>
          </div>
          <div className="text-xs font-bold text-earth-indigo truncate">
            {neighborhood.transit}
          </div>
          <div className="text-[10px] text-secondary">
            Direct connections
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1 font-sans">
        {onFilterRooms && (
          <button
            type="button"
            onClick={() => onFilterRooms(neighborhood.name)}
            className="flex-1 py-2.5 px-3 rounded-full bg-vitality-coral text-white text-xs font-bold shadow-lg shadow-vitality-coral/25 hover:bg-vitality-coral/90 transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Rooms</span>
          </button>
        )}

        {onFilterPeople && (
          <button
            type="button"
            onClick={() => onFilterPeople(neighborhood.name)}
            className="flex-1 py-2.5 px-3 rounded-full bg-surface-low dark:bg-white/10 text-earth-indigo text-xs font-bold border border-surface-dim dark:border-white/20 hover:border-vitality-coral transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Flatmates</span>
          </button>
        )}

        {onDirections && (
          <button
            type="button"
            onClick={() => onDirections(neighborhood)}
            className="py-2.5 px-3.5 rounded-full bg-surface-low dark:bg-white/10 text-earth-indigo text-xs font-bold border border-surface-dim dark:border-white/20 hover:border-vitality-coral transition-all flex items-center justify-center gap-1 cursor-pointer"
            title="Get Directions"
            aria-label="Directions"
          >
            <Navigation className="w-3.5 h-3.5 text-vitality-coral" />
          </button>
        )}
      </div>
    </div>
  );
};
