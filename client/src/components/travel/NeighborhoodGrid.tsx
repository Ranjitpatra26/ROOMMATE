import React, { useState } from 'react';
import {
  MapPin,
  Train,
  Coffee,
  Users,
  Sparkles,
  Home,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DemoNeighborhoodItem } from '../../data/indianDemoData.js';

export interface NeighborhoodGridProps {
  neighborhoods: DemoNeighborhoodItem[];
  cityName: string;
}

export const NeighborhoodGrid: React.FC<NeighborhoodGridProps> = ({
  neighborhoods,
  cityName,
}) => {
  const navigate = useNavigate();
  const [activeTabId, setActiveTabId] = useState<string>(neighborhoods[0]?.id || '');

  const activeNeighborhood =
    neighborhoods.find((n) => n.id === activeTabId) || neighborhoods[0];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-surface-dim pb-4">
        <div>
          <span className="font-sans text-[10px] font-bold text-vitality-coral uppercase tracking-widest block">
            Spatial Neighborhoods • {cityName}
          </span>
          <h3 className="font-serif text-headline-md font-bold text-earth-indigo">
            Find the Neighborhood that Fits Your Rhythm
          </h3>
        </div>
        <p className="font-sans text-xs text-secondary max-w-sm">
          Each sector offers distinct acoustic baselines, commute corridors, and resident archetypes.
        </p>
      </div>

      {/* Neighborhood Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {neighborhoods.map((n) => {
          const isActive = n.id === activeTabId;
          return (
            <button
              key={n.id}
              type="button"
              onClick={() => setActiveTabId(n.id)}
              className={`px-4 py-2.5 rounded-2xl font-sans text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                isActive
                  ? 'bg-earth-indigo text-clay shadow-md'
                  : 'bg-clay dark:bg-surface-low border border-surface-dim text-secondary hover:text-earth-indigo'
              }`}
            >
              <MapPin className={`w-3.5 h-3.5 ${isActive ? 'text-vitality-coral' : 'text-secondary'}`} />
              <span>{n.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active Neighborhood Feature Card */}
      {activeNeighborhood && (
        <div className="bg-clay dark:bg-surface-low border border-surface-dim rounded-3xl p-6 sm:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all">
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-3 py-1 rounded-full bg-vitality-coral/15 text-vitality-coral font-sans text-[10px] font-bold uppercase tracking-wider">
                  {cityName} Sector
                </span>
                <span className="font-sans text-xs font-bold text-trust-teal">
                  Est. Rent {activeNeighborhood.rentRange}
                </span>
              </div>
              <h4 className="font-serif text-headline-sm font-bold text-earth-indigo">
                {activeNeighborhood.name}
              </h4>
              <p className="font-sans text-xs text-secondary font-medium mt-1">
                {activeNeighborhood.character}
              </p>
            </div>

            {/* Dimensional Insights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs">
              <div className="p-3.5 bg-surface-low dark:bg-surface-container rounded-2xl border border-surface-dim space-y-1">
                <div className="flex items-center gap-2 font-bold text-earth-indigo">
                  <Coffee className="w-4 h-4 text-vitality-coral shrink-0" />
                  <span>Lifestyle & Habits</span>
                </div>
                <p className="text-[11px] text-secondary leading-relaxed">
                  {activeNeighborhood.lifestyle}
                </p>
              </div>

              <div className="p-3.5 bg-surface-low dark:bg-surface-container rounded-2xl border border-surface-dim space-y-1">
                <div className="flex items-center gap-2 font-bold text-earth-indigo">
                  <Train className="w-4 h-4 text-trust-teal shrink-0" />
                  <span>Transit & Commute</span>
                </div>
                <p className="text-[11px] text-secondary leading-relaxed">
                  {activeNeighborhood.commute}
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-surface-low dark:bg-surface-container rounded-2xl border border-surface-dim flex items-start gap-3">
              <Users className="w-4 h-4 text-vitality-coral shrink-0 mt-0.5" />
              <div className="font-sans text-xs">
                <span className="font-bold text-earth-indigo block">Roommate Fit:</span>
                <span className="text-secondary text-[11px]">
                  {activeNeighborhood.roommateFit}
                </span>
              </div>
            </div>
          </div>

          {/* Right Action Callout */}
          <div className="lg:col-span-5 bg-surface-low dark:bg-surface-container border border-surface-dim rounded-2xl p-6 flex flex-col justify-between space-y-6">
            <div>
              <span className="font-sans text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">
                Living Opportunities
              </span>
              <h5 className="font-serif text-sm font-bold text-earth-indigo">
                Explore Available Spaces & Cohabitants in {activeNeighborhood.name}
              </h5>
              <p className="font-sans text-xs text-secondary mt-1 leading-relaxed">
                Connect with verified residents holding leases or discover newly listed room suites.
              </p>
            </div>

            <div className="space-y-2.5">
              {activeNeighborhood.roomId ? (
                <button
                  type="button"
                  onClick={() => navigate(`/rooms/${activeNeighborhood.roomId}`)}
                  className="w-full py-3.5 bg-vitality-coral hover:bg-vitality-coral/90 text-white font-sans text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
                >
                  <Home className="w-4 h-4" />
                  <span>View Curated Room in {activeNeighborhood.name}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate('/discover')}
                  className="w-full py-3.5 bg-vitality-coral hover:bg-vitality-coral/90 text-white font-sans text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
                >
                  <Home className="w-4 h-4" />
                  <span>Browse Rooms in {activeNeighborhood.name}</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => navigate('/compatibility-lab')}
                className="w-full py-3 bg-clay dark:bg-surface-low border border-surface-dim hover:border-earth-indigo text-earth-indigo font-sans text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-vitality-coral" />
                <span>Check Cohabitant Compatibility</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
