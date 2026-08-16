import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, MapPin, ArrowRight, Compass, Users, Home, Navigation } from 'lucide-react';
import { DestinationMapItem } from './types.js';

export interface DestinationPreviewCardProps {
  destination: DestinationMapItem;
  onClose: () => void;
  onDirections?: (destination: DestinationMapItem) => void;
}

export const DestinationPreviewCard: React.FC<DestinationPreviewCardProps> = ({
  destination,
  onClose,
  onDirections,
}) => {
  const navigate = useNavigate();

  const handleExploreTravel = () => {
    navigate('/travel');
  };

  return (
    <>
      {/* Mobile Bottom Sheet */}
      <div className="md:hidden fixed inset-x-0 bottom-0 z-40 bg-white/60 dark:bg-black/60 backdrop-blur-2xl border-t border-white/40 dark:border-white/15 rounded-t-3xl p-5 shadow-2xl space-y-4 animate-in slide-in-from-bottom duration-300 pointer-events-auto text-left">
        <div className="flex justify-center -mt-2 pb-1">
          <div className="w-10 h-1 rounded-full bg-surface-dim dark:bg-white/20" />
        </div>

        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 font-sans text-[10px] font-bold text-vitality-coral uppercase tracking-wider mb-0.5">
              <Compass className="w-3 h-3 shrink-0" />
              <span>Living Destination • {destination.country}</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-earth-indigo dark:text-clay">
              {destination.city}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-low dark:bg-white/10 flex items-center justify-center text-secondary dark:text-surface-dim hover:text-earth-indigo cursor-pointer shrink-0"
            title="Close Preview"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {destination.heroImageUrl && (
          <div className="w-full h-28 rounded-2xl overflow-hidden relative shadow-inner bg-earth-indigo">
            <img
              src={destination.heroImageUrl}
              alt={destination.city}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 font-sans text-xs">
          <div className="p-3 bg-surface-low dark:bg-white/5 rounded-xl border border-surface-dim dark:border-white/10 flex items-center gap-2">
            <Home className="w-4 h-4 text-vitality-coral" />
            <div>
              <span className="font-bold text-earth-indigo dark:text-clay block">{destination.availableRoomsCount} Spaces</span>
              <span className="text-[10px] text-secondary dark:text-surface-dim">Available Now</span>
            </div>
          </div>
          <div className="p-3 bg-surface-low dark:bg-white/5 rounded-xl border border-surface-dim dark:border-white/10 flex items-center gap-2">
            <Users className="w-4 h-4 text-trust-teal" />
            <div>
              <span className="font-bold text-earth-indigo dark:text-clay block">{destination.communityCount}+ Cohabitants</span>
              <span className="text-[10px] text-secondary dark:text-surface-dim">Verified Network</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onDirections && (
            <button
              type="button"
              onClick={() => onDirections(destination)}
              className="py-3.5 px-4 bg-surface-low dark:bg-white/10 hover:bg-surface-dim dark:hover:bg-white/20 text-earth-indigo dark:text-clay font-sans text-xs font-bold rounded-xl border border-surface-dim dark:border-white/20 flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider transition-all"
            >
              <Navigation className="w-3.5 h-3.5 text-vitality-coral" />
              <span>Directions</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleExploreTravel}
            className="flex-1 py-3.5 bg-vitality-coral hover:bg-vitality-coral/90 text-white font-sans text-xs font-bold rounded-xl shadow-lg shadow-vitality-coral/30 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
          >
            <span>Explore Travel</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Desktop Floating Card */}
      <div className="hidden md:block absolute top-20 right-20 z-20 w-84 bg-white/60 dark:bg-black/60 backdrop-blur-2xl border border-white/40 dark:border-white/15 rounded-3xl p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200 pointer-events-auto text-left">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-vitality-coral/15 text-vitality-coral font-sans text-[10px] font-bold">
            <Compass className="w-3 h-3" />
            <span>Living Destination</span>
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

        {destination.heroImageUrl && (
          <div className="w-full h-36 rounded-2xl overflow-hidden relative shadow-inner bg-earth-indigo">
            <img
              src={destination.heroImageUrl}
              alt={destination.city}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-2.5 left-3 text-white font-sans text-xs font-bold flex items-center gap-1">
              <MapPin className="w-3 h-3 text-vitality-coral" />
              <span>{destination.city}, {destination.country}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2.5 font-sans text-xs">
          <div className="p-2.5 bg-surface-low dark:bg-white/5 rounded-xl border border-surface-dim dark:border-white/10 text-left">
            <span className="text-[10px] text-secondary dark:text-surface-dim block">Living Spaces</span>
            <span className="font-bold text-earth-indigo dark:text-clay">{destination.availableRoomsCount} Available</span>
          </div>
          <div className="p-2.5 bg-surface-low dark:bg-white/5 rounded-xl border border-surface-dim dark:border-white/10 text-left">
            <span className="text-[10px] text-secondary dark:text-surface-dim block">Community</span>
            <span className="font-bold text-earth-indigo dark:text-clay">{destination.communityCount}+ Verified</span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          {onDirections && (
            <button
              type="button"
              onClick={() => onDirections(destination)}
              className="px-3.5 py-3 bg-surface-low dark:bg-white/10 hover:bg-surface-dim dark:hover:bg-white/20 text-earth-indigo dark:text-clay font-sans text-xs font-bold rounded-xl border border-surface-dim dark:border-white/20 flex items-center justify-center gap-1.5 cursor-pointer transition-all hover:border-vitality-coral"
              title="Get directions to this city destination"
            >
              <Navigation className="w-3.5 h-3.5 text-vitality-coral" />
              <span>Directions</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleExploreTravel}
            className="flex-1 py-3 bg-vitality-coral hover:bg-vitality-coral/90 text-white font-sans text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider transition-all hover:scale-105"
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </>
  );
};
