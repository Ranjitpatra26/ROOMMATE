import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, MapPin, ArrowRight, ShieldCheck, Home, Navigation, Compass } from 'lucide-react';
import { RoomMapItem } from './types.js';
import { formatINR } from '../../utils/localization.js';

export interface RoomPreviewCardProps {
  room: RoomMapItem;
  onClose: () => void;
  onDirections?: (room: RoomMapItem) => void;
  onExploreNeighborhood?: (neighborhoodName: string) => void;
}

export const RoomPreviewCard: React.FC<RoomPreviewCardProps> = ({
  room,
  onClose,
  onDirections,
  onExploreNeighborhood,
}) => {
  const navigate = useNavigate();

  const handleViewRoom = () => {
    navigate(`/rooms/${room.id}`);
  };

  return (
    <>
      {/* Mobile Bottom Sheet (390px - 768px) */}
      <div className="md:hidden fixed inset-x-0 bottom-0 z-40 spatial-glass-card rounded-t-3xl p-5 space-y-4 animate-in slide-in-from-bottom duration-300 pointer-events-auto">
        {/* Dismiss drag handle */}
        <div className="flex justify-center -mt-2 pb-1">
          <div className="w-10 h-1 rounded-full bg-black/10 dark:bg-white/20" />
        </div>

        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <button
              type="button"
              onClick={() => onExploreNeighborhood && onExploreNeighborhood(room.neighborhood)}
              className="flex items-center gap-1.5 font-sans text-[10px] font-bold text-vitality-coral uppercase tracking-wider mb-0.5 hover:underline cursor-pointer"
            >
              <MapPin className="w-3 h-3 shrink-0" />
              <span className="truncate">{room.neighborhood}, {room.city}</span>
            </button>
            <h3 className="font-serif text-base font-bold text-earth-indigo dark:text-white truncate">
              {room.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-secondary dark:text-surface-dim hover:text-earth-indigo dark:hover:text-white cursor-pointer transition-colors"
            title="Close Preview"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Thumbnail & Meta */}
        <div className="flex gap-3.5 items-center">
          {room.imageUrl ? (
            <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-earth-indigo">
              <img
                src={room.imageUrl}
                alt={room.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-surface-low dark:bg-white/10 flex items-center justify-center shrink-0">
              <Home className="w-6 h-6 text-secondary" />
            </div>
          )}

          <div className="flex-1 min-w-0 space-y-1 text-left font-sans">
            <div className="font-serif text-sm font-bold text-earth-indigo dark:text-clay">
              {formatINR(room.monthlyRent)} <span className="text-[10px] font-normal text-secondary dark:text-surface-dim">/ month</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-trust-teal">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Available for Co-Living</span>
            </div>
            <p className="text-[11px] text-secondary dark:text-surface-dim line-clamp-2 leading-snug">
              {room.description}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {onDirections && (
            <button
              type="button"
              onClick={() => onDirections(room)}
              className="py-3.5 px-4 bg-surface-low dark:bg-white/10 hover:bg-surface-dim dark:hover:bg-white/20 text-earth-indigo dark:text-clay font-sans text-xs font-bold rounded-xl border border-surface-dim dark:border-white/20 flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider transition-all"
            >
              <Navigation className="w-3.5 h-3.5 text-vitality-coral" />
              <span>Directions</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleViewRoom}
            className="flex-1 py-3.5 bg-vitality-coral hover:bg-vitality-coral/90 text-white font-sans text-xs font-bold rounded-xl shadow-lg shadow-vitality-coral/30 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider transition-all"
          >
            <span>View Room</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Desktop Floating Preview Card (>= 768px) */}
      <div className="hidden md:block absolute top-20 right-20 z-20 w-84 spatial-glass-card rounded-3xl p-5 space-y-4 animate-in fade-in zoom-in-95 duration-200 pointer-events-auto text-left">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-vitality-coral/15 text-vitality-coral font-sans text-[10px] font-bold">
            <Home className="w-3 h-3" />
            <span>Available Room</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-surface-low dark:bg-white/10 flex items-center justify-center text-secondary dark:text-surface-dim hover:text-earth-indigo cursor-pointer transition-colors"
            title="Close Preview"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {room.imageUrl && (
          <div className="w-full h-36 rounded-2xl overflow-hidden relative shadow-inner bg-earth-indigo">
            <img
              src={room.imageUrl}
              alt={room.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <button
              type="button"
              onClick={() => onExploreNeighborhood && onExploreNeighborhood(room.neighborhood)}
              className="absolute bottom-2.5 left-3 text-white font-sans text-[10px] font-bold flex items-center gap-1 bg-black/40 hover:bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-md transition-colors cursor-pointer"
            >
              <Compass className="w-3 h-3 text-vitality-coral" />
              <span>Explore {room.neighborhood}</span>
            </button>
          </div>
        )}

        <div className="space-y-1">
          <h4 className="font-serif text-sm font-bold text-earth-indigo dark:text-clay leading-snug">
            {room.title}
          </h4>
          <p className="font-sans text-xs text-secondary dark:text-surface-dim line-clamp-2 leading-relaxed">
            {room.description}
          </p>
        </div>

        <div className="pt-3 border-t border-surface-dim/60 dark:border-white/10 flex items-center justify-between font-sans">
          <div>
            <span className="text-[10px] text-secondary dark:text-surface-dim block">Monthly Rent</span>
            <span className="font-serif text-sm font-bold text-earth-indigo dark:text-clay">
              {formatINR(room.monthlyRent)} <span className="text-[10px] font-normal text-secondary">/ mo</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {onDirections && (
              <button
                type="button"
                onClick={() => onDirections(room)}
                className="px-3 py-2 bg-surface-low dark:bg-white/10 hover:bg-surface-dim dark:hover:bg-white/20 text-earth-indigo dark:text-clay font-sans text-xs font-bold rounded-xl border border-surface-dim dark:border-white/20 flex items-center gap-1 cursor-pointer transition-all hover:border-vitality-coral"
                title="Get Directions to this room"
              >
                <Navigation className="w-3.5 h-3.5 text-vitality-coral" />
                <span>Directions</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleViewRoom}
              className="px-3.5 py-2 bg-vitality-coral hover:bg-vitality-coral/90 text-white font-sans text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer uppercase tracking-wider transition-all hover:scale-105"
            >
              <span>View</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
