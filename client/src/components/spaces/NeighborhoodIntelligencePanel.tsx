import React, { useState } from 'react';
import {
  MapPin,
  Home,
  Users,
  Footprints,
  Train,
  X,
  Navigation,
  CheckCircle2,
  AlertCircle,
  Scale,
  Sparkles,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { NeighborhoodIntelligence, NeighborhoodMapItem } from './types.js';
import { formatINR } from '../../utils/localization.js';

export interface NeighborhoodIntelligencePanelProps {
  intelligence: NeighborhoodIntelligence;
  onClose: () => void;
  onFilterRooms?: (neighborhoodName: string) => void;
  onFilterPeople?: (neighborhoodName: string) => void;
  onDirections?: (neighborhood: NeighborhoodMapItem) => void;
  onCompare?: (neighborhood: NeighborhoodMapItem) => void;
}

export const NeighborhoodIntelligencePanel: React.FC<NeighborhoodIntelligencePanelProps> = ({
  intelligence,
  onClose,
  onFilterRooms,
  onFilterPeople,
  onDirections,
  onCompare,
}) => {
  const [activeTab, setActiveTab] = useState<'market' | 'community'>('market');
  const { neighborhood, roomStats, peopleStats, budgetFit, relevanceReasons } = intelligence;

  return (
    <div className="spatial-glass-card rounded-3xl p-5 space-y-4 max-w-sm sm:max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-200 text-left pointer-events-auto">
      {/* Header with Title and Close */}
      <div className="flex items-start justify-between gap-3 border-b border-surface-dim/40 dark:border-white/10 pb-3">
        <div>
          <div className="flex items-center gap-1.5 text-vitality-coral font-sans text-[10px] font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>{neighborhood.city} District Intelligence</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#0f172a] leading-tight mt-0.5">
            {neighborhood.name}
          </h3>
          <p className="font-sans text-xs text-[#334155] mt-0.5 font-semibold">
            {neighborhood.vibe || 'Curated Living District'}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-full bg-surface-low dark:bg-white/10 hover:bg-surface-dim dark:hover:bg-white/20 text-[#334155] hover:text-[#0f172a] transition-colors cursor-pointer"
          aria-label="Close neighborhood intelligence"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-2xl bg-surface-low dark:bg-black/5 border border-surface-dim/50 dark:border-black/10 font-sans text-xs">
        <button
          type="button"
          onClick={() => setActiveTab('market')}
          className={`flex-1 py-2 px-3 rounded-xl font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'market'
              ? 'bg-[#0f172a] text-white shadow-md'
              : 'text-[#334155] hover:text-[#0f172a] hover:bg-black/5'
          }`}
        >
          <Home className={`w-3.5 h-3.5 ${activeTab === 'market' ? 'text-vitality-coral' : 'text-[#334155]'}`} />
          <span>Market & Budget</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('community')}
          className={`flex-1 py-2 px-3 rounded-xl font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'community'
              ? 'bg-[#0f172a] text-white shadow-md'
              : 'text-[#334155] hover:text-[#0f172a] hover:bg-black/5'
          }`}
        >
          <Users className={`w-3.5 h-3.5 ${activeTab === 'community' ? 'text-emerald-400' : 'text-[#334155]'}`} />
          <span>Community DNA</span>
        </button>
      </div>

      {/* Tab 1: Market & Budget */}
      {activeTab === 'market' && (
        <div className="space-y-3 animate-in fade-in duration-150">
          {/* Room Market Analytics */}
          <div className="p-3 rounded-2xl bg-surface-low/80 dark:bg-black/5 border border-surface-dim/40 dark:border-black/10 space-y-2 font-sans">
            <div className="flex items-center justify-between text-xs font-bold text-[#0f172a]">
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-vitality-coral" />
                <span>Room Market Pricing</span>
              </span>
              <span className="text-[10px] text-[#475569] font-medium">
                {roomStats.totalRooms} spaces listed
              </span>
            </div>

            {roomStats.hasData ? (
              <div className="grid grid-cols-3 gap-2 text-center pt-1 border-t border-surface-dim/40 dark:border-black/10">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-[#475569] uppercase font-bold block">
                    Lowest
                  </span>
                  <span className="text-xs font-extrabold text-[#0f172a]">
                    {formatINR(roomStats.minRent)}
                  </span>
                </div>
                <div className="space-y-0.5 bg-vitality-coral/10 border border-vitality-coral/20 rounded-xl py-1">
                  <span className="text-[10px] text-vitality-coral font-bold uppercase block">
                    Average
                  </span>
                  <span className="text-sm font-extrabold text-vitality-coral">
                    {formatINR(roomStats.avgRent)}
                  </span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-[#475569] uppercase font-bold block">
                    Highest
                  </span>
                  <span className="text-xs font-extrabold text-[#0f172a]">
                    {formatINR(roomStats.maxRent)}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#475569]">
                No active listings yet in this district.
              </p>
            )}
          </div>

          {/* Budget Fit Banner */}
          <div
            className={`p-3 rounded-2xl border font-sans text-xs flex items-start gap-2.5 ${
              budgetFit.status === 'excellent'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : budgetFit.status === 'above_budget'
                ? 'bg-amber-50 border-amber-300 text-amber-950'
                : 'bg-surface-low border-surface-dim text-[#334155]'
            }`}
          >
            {budgetFit.status === 'excellent' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div className="space-y-0.5">
              <span className="font-bold block text-[#0f172a]">
                {budgetFit.message}
              </span>
              {budgetFit.userBudgetRange && (
                <span className="text-[10px] text-[#475569] block font-medium">
                  Based on target budget of {budgetFit.userBudgetRange} / month
                </span>
              )}
            </div>
          </div>

          {/* Transit & Walkability Badges */}
          <div className="grid grid-cols-2 gap-2 font-sans text-xs">
            <div className="p-2.5 rounded-2xl bg-surface-low/80 dark:bg-black/5 border border-surface-dim/40 dark:border-black/10 space-y-0.5">
              <div className="flex items-center gap-1 text-[10px] font-bold text-amber-600 uppercase">
                <Footprints className="w-3 h-3" />
                <span>Walkability</span>
              </div>
              <span className="font-bold text-[#0f172a] block">
                {neighborhood.walkability || 'Pedestrian friendly'}
              </span>
            </div>

            <div className="p-2.5 rounded-2xl bg-surface-low/80 dark:bg-black/5 border border-surface-dim/40 dark:border-black/10 space-y-0.5">
              <div className="flex items-center gap-1 text-[10px] font-bold text-purple-600 uppercase">
                <Train className="w-3 h-3" />
                <span>Transit</span>
              </div>
              <span className="font-bold text-[#0f172a] block truncate">
                {neighborhood.transit || 'Connected Hub'}
              </span>
            </div>
          </div>

          {/* Why This Area Fits You */}
          {relevanceReasons.length > 0 && (
            <div className="space-y-1.5 font-sans">
              <span className="text-[10px] font-bold text-[#475569] uppercase tracking-wider block">
                Why this area fits you
              </span>
              <ul className="space-y-1 text-xs text-[#0f172a] font-semibold">
                {relevanceReasons.map((reason, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Community DNA */}
      {activeTab === 'community' && (
        <div className="space-y-3 animate-in fade-in duration-150">
          {/* Cohabitant Stats */}
          <div className="grid grid-cols-2 gap-2 font-sans">
            <div className="p-3 rounded-2xl bg-surface-low/80 dark:bg-black/5 border border-surface-dim/40 dark:border-black/10 space-y-0.5">
              <span className="text-[10px] font-bold text-[#475569] uppercase block">
                Cohabitants
              </span>
              <div className="text-lg font-bold text-[#0f172a]">
                {peopleStats.totalPeople} Profiles
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-surface-low/80 dark:bg-black/5 border border-surface-dim/40 dark:border-black/10 space-y-0.5">
              <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 uppercase">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified Trust</span>
              </div>
              <div className="text-lg font-bold text-emerald-700">
                {peopleStats.verifiedCount} Verified
              </div>
            </div>
          </div>

          {/* Lifestyle DNA Distribution */}
          <div className="p-3 rounded-2xl bg-surface-low/80 dark:bg-black/5 border border-surface-dim/40 dark:border-black/10 space-y-2 font-sans">
            <div className="flex items-center justify-between text-xs font-bold text-[#0f172a]">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-vitality-coral" />
                <span>Lifestyle DNA Representation</span>
              </span>
            </div>

            {peopleStats.topLifestyles.length > 0 ? (
              <div className="space-y-2 pt-1">
                {peopleStats.topLifestyles.map((trait, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#0f172a]">
                      <span>{trait.label}</span>
                      <span className="text-[#334155]">
                        {trait.percentage}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-surface-dim dark:bg-black/10 overflow-hidden">
                      <div
                        className="h-full bg-vitality-coral rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, Math.max(15, trait.percentage))}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#475569]">
                Not enough lifestyle DNA data for this district yet.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons Row */}
      <div className="grid grid-cols-4 gap-1.5 pt-1 font-sans">
        {onFilterRooms && (
          <button
            type="button"
            onClick={() => onFilterRooms(neighborhood.name)}
            className="py-2.5 px-2 rounded-2xl bg-vitality-coral text-white text-xs font-bold shadow-lg shadow-vitality-coral/25 hover:bg-vitality-coral/90 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer"
            title="Filter rooms in this area"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="text-[10px]">Rooms</span>
          </button>
        )}

        {onFilterPeople && (
          <button
            type="button"
            onClick={() => onFilterPeople(neighborhood.name)}
            className="py-2.5 px-2 rounded-2xl bg-white/90 hover:bg-white text-[#0f172a] text-xs font-bold border border-surface-dim/80 shadow-sm hover:border-emerald-600 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer"
            title="Explore flatmates in this area"
          >
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[10px]">People</span>
          </button>
        )}

        {onDirections && (
          <button
            type="button"
            onClick={() => onDirections(neighborhood)}
            className="py-2.5 px-2 rounded-2xl bg-white/90 hover:bg-white text-[#0f172a] text-xs font-bold border border-surface-dim/80 shadow-sm hover:border-vitality-coral transition-all flex flex-col items-center justify-center gap-1 cursor-pointer"
            title="Get Directions to this district"
          >
            <Navigation className="w-3.5 h-3.5 text-vitality-coral" />
            <span className="text-[10px]">Directions</span>
          </button>
        )}

        {onCompare && (
          <button
            type="button"
            onClick={() => onCompare(neighborhood)}
            className="py-2.5 px-2 rounded-2xl bg-white/90 hover:bg-white text-[#0f172a] text-xs font-bold border border-surface-dim/80 shadow-sm hover:border-[#0f172a] transition-all flex flex-col items-center justify-center gap-1 cursor-pointer"
            title="Compare with another district"
          >
            <Scale className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-[10px]">Compare</span>
          </button>
        )}
      </div>
    </div>
  );
};
