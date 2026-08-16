import React from 'react';
import { Home, Users, Compass, Layers, Radio, SlidersHorizontal } from 'lucide-react';
import { MapFilterType } from './types.js';

export interface MapFilterBarProps {
  filter: MapFilterType;
  onFilterChange: (filter: MapFilterType) => void;
  roomCount?: number;
  peopleCount?: number;
  liveCount?: number;
  destinationCount?: number;
  nearbyCount?: number;
  onOpenFilterModal?: () => void;
  isFilterActive?: boolean;
}

export const MapFilterBar: React.FC<MapFilterBarProps> = ({
  filter,
  onFilterChange,
  roomCount = 0,
  peopleCount = 0,
  liveCount = 0,
  destinationCount = 0,
  nearbyCount = 0,
  onOpenFilterModal,
  isFilterActive = false,
}) => {
  const safeRoomCount = Number.isFinite(roomCount) ? roomCount : 0;
  const safePeopleCount = Number.isFinite(peopleCount) ? peopleCount : 0;
  const safeLiveCount = Number.isFinite(liveCount) ? liveCount : 0;
  const safeDestCount = Number.isFinite(destinationCount) ? destinationCount : 0;
  const safeNearbyCount = Number.isFinite(nearbyCount) ? nearbyCount : 0;

  const options: { id: MapFilterType; label: string; icon: React.ReactNode; count: number }[] = [
    {
      id: 'all',
      label: 'All Layers',
      icon: <Layers className="w-3.5 h-3.5" />,
      count: safeRoomCount + safePeopleCount + safeLiveCount + safeDestCount,
    },
    {
      id: 'nearby',
      label: 'Nearby',
      icon: <Compass className="w-3.5 h-3.5 text-amber-500" />,
      count: safeNearbyCount,
    },
    {
      id: 'rooms',
      label: 'Rooms',
      icon: <Home className="w-3.5 h-3.5 text-vitality-coral" />,
      count: safeRoomCount,
    },
    {
      id: 'people',
      label: 'People',
      icon: <Users className="w-3.5 h-3.5 text-trust-teal" />,
      count: safePeopleCount,
    },
    {
      id: 'live',
      label: 'Live',
      icon: <Radio className="w-3.5 h-3.5 animate-pulse text-vitality-coral" />,
      count: safeLiveCount,
    },
    {
      id: 'destinations',
      label: 'Destinations',
      icon: <Compass className="w-3.5 h-3.5 text-purple-500" />,
      count: safeDestCount,
    },
  ];

  return (
    <div className="flex items-center gap-1.5 p-1 bg-white/45 dark:bg-black/45 backdrop-blur-xl border border-white/40 dark:border-white/15 rounded-full shadow-lg pointer-events-auto max-w-[calc(100vw-2rem)] overflow-x-auto whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {options.map((opt) => {
        const isActive = filter === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onFilterChange(opt.id)}
            className={`px-3 py-1.5 rounded-full font-sans text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              isActive
                ? 'bg-earth-indigo dark:bg-vitality-coral text-white shadow-md'
                : 'text-secondary hover:text-earth-indigo hover:bg-surface-low dark:hover:bg-white/10'
            }`}
          >
            <span>{opt.icon}</span>
            <span>{opt.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                isActive
                  ? 'bg-vitality-coral dark:bg-white/20 text-white'
                  : 'bg-surface-low dark:bg-white/10 text-secondary'
              }`}
            >
              {opt.count}
            </span>
          </button>
        );
      })}

      {/* Filter Modal Trigger */}
      {onOpenFilterModal && (
        <button
          type="button"
          onClick={onOpenFilterModal}
          className={`ml-0.5 px-3 py-1.5 rounded-full font-sans text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
            isFilterActive
              ? 'bg-vitality-coral text-white shadow-md'
              : 'text-secondary hover:text-earth-indigo hover:bg-surface-low dark:hover:bg-white/10'
          }`}
          title="Filter Rooms & People"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Filters</span>
          {isFilterActive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
        </button>
      )}
    </div>
  );
};
