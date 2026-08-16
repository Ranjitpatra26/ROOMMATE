import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { DemoDestinationItem } from '../../data/indianDemoData.js';

export interface DestinationCardProps {
  destination: DemoDestinationItem;
  onSelect: (destinationId: string) => void;
  isSelected?: boolean;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onSelect,
  isSelected = false,
}) => {
  return (
    <div
      onClick={() => onSelect(destination.id)}
      className={`group relative bg-clay dark:bg-surface-low rounded-3xl border transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-xl ${
        isSelected
          ? 'border-vitality-coral ring-2 ring-vitality-coral/30'
          : 'border-surface-dim hover:border-earth-indigo'
      }`}
    >
      {/* Top Image Banner */}
      <div className="h-52 w-full relative overflow-hidden bg-earth-indigo">
        <img
          src={destination.heroImageUrl}
          alt={destination.city}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 bg-black/60 backdrop-blur-md text-white rounded-full font-sans text-[10px] font-bold">
          <MapPin className="w-3 h-3 text-vitality-coral" />
          <span>{destination.state}</span>
        </div>

        <div className="absolute bottom-3.5 left-4 right-4 text-white">
          <span className="font-sans text-[10px] uppercase font-bold tracking-wider text-vitality-coral block mb-0.5">
            Living Destination
          </span>
          <h3 className="font-serif text-headline-sm font-bold leading-tight">
            {destination.city}
          </h3>
          <p className="font-sans text-xs text-white/80 line-clamp-1 mt-0.5">
            {destination.tagline}
          </p>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <p className="font-sans text-xs text-secondary leading-relaxed line-clamp-2">
            {destination.description}
          </p>

          {/* Neighborhood Badges */}
          <div>
            <span className="font-sans text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1.5">
              Popular Living Hubs
            </span>
            <div className="flex flex-wrap gap-1.5">
              {destination.neighborhoods.slice(0, 3).map((n) => (
                <span
                  key={n.id}
                  className="px-2.5 py-1 bg-surface-low dark:bg-surface-container border border-surface-dim rounded-full font-sans text-[10px] font-bold text-earth-indigo"
                >
                  {n.name}
                </span>
              ))}
              {destination.neighborhoods.length > 3 && (
                <span className="px-2 py-1 bg-surface-low border border-surface-dim rounded-full font-sans text-[10px] font-bold text-secondary">
                  +{destination.neighborhoods.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Card Footer with Rent and Stats */}
        <div className="pt-3 border-t border-surface-dim flex items-center justify-between font-sans text-xs">
          <div>
            <span className="text-[10px] text-secondary block">Estimated Living Rent</span>
            <span className="font-serif font-bold text-earth-indigo text-xs">
              {destination.livingCostRange}
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-bold text-vitality-coral group-hover:translate-x-1 transition-transform">
            <span>Explore City</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
