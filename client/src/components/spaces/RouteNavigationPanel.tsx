import React from 'react';
import {
  Navigation,
  Car,
  Footprints,
  Bike,
  X,
  ExternalLink,
  Loader2,
  Clock,
} from 'lucide-react';
import { ActiveRouteState, TransportMode } from './types.js';

export interface RouteNavigationPanelProps {
  routeState: ActiveRouteState;
  onModeChange: (mode: TransportMode) => void;
  onSelectRouteIndex: (index: number) => void;
  onClearRoute: () => void;
  onRetry: () => void;
}

export const RouteNavigationPanel: React.FC<RouteNavigationPanelProps> = ({
  routeState,
  onModeChange,
  onSelectRouteIndex,
  onClearRoute,
  onRetry,
}) => {
  const activeRoute = routeState.routes[routeState.selectedRouteIndex] || routeState.routes[0];

  const handleStartExternalNav = () => {
    const dest = routeState.destination;
    const destName = encodeURIComponent(routeState.destinationTitle);
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${dest[1]},${dest[0]}&destination_place_id=${destName}`;
    window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  const getDestinationIcon = () => {
    switch (routeState.destinationType) {
      case 'room':
        return '🏠';
      case 'destination':
        return '🏛️';
      case 'neighborhood':
        return '📍';
      default:
        return '🏁';
    }
  };

  return (
    <div className="spatial-glass-card rounded-3xl p-5 space-y-4 max-w-sm sm:max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-200 text-left pointer-events-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-surface-dim/40 dark:border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-2xl bg-vitality-coral text-white shadow-md shadow-vitality-coral/25">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <span className="font-sans text-[10px] font-bold text-vitality-coral uppercase tracking-wider block">
              Get There
            </span>
            <h3 className="font-serif text-base font-bold text-earth-indigo leading-tight">
              Route Navigation
            </h3>
          </div>
        </div>

        <button
          type="button"
          onClick={onClearRoute}
          className="p-1.5 rounded-full bg-surface-low dark:bg-white/10 hover:bg-surface-dim dark:hover:bg-white/20 text-secondary hover:text-earth-indigo transition-colors cursor-pointer"
          aria-label="Close navigation route"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Origin -> Destination Waypoint List */}
      <div className="p-3 rounded-2xl bg-surface-low/80 dark:bg-white/5 border border-surface-dim/40 dark:border-white/10 space-y-2 font-sans text-xs">
        {/* Origin */}
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-trust-teal ring-4 ring-trust-teal/20 shrink-0" />
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold text-secondary uppercase block">
              From
            </span>
            <span className="font-bold text-earth-indigo truncate block">
              {routeState.originName || 'Your Location'}
            </span>
          </div>
        </div>

        {/* Vertical connector line */}
        <div className="w-0.5 h-3 bg-surface-dim dark:bg-white/20 ml-1" />

        {/* Destination */}
        <div className="flex items-center gap-2.5">
          <span className="text-sm shrink-0">{getDestinationIcon()}</span>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold text-secondary uppercase block">
              To
            </span>
            <span className="font-bold text-earth-indigo truncate block">
              {routeState.destinationTitle}
            </span>
            {routeState.destinationSubtitle && (
              <span className="text-[10px] text-secondary truncate block">
                {routeState.destinationSubtitle}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Transport Mode Switcher */}
      <div className="grid grid-cols-3 gap-1.5 font-sans">
        {[
          { id: 'driving' as TransportMode, label: 'Drive', icon: <Car className="w-4 h-4" /> },
          { id: 'walking' as TransportMode, label: 'Walk', icon: <Footprints className="w-4 h-4" /> },
          { id: 'cycling' as TransportMode, label: 'Cycle', icon: <Bike className="w-4 h-4" /> },
        ].map((m) => {
          const isActive = routeState.activeMode === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onModeChange(m.id)}
              disabled={routeState.isLoading}
              className={`p-2.5 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer font-bold ${
                isActive
                  ? 'bg-vitality-coral text-white shadow-lg shadow-vitality-coral/25'
                  : 'bg-surface-low dark:bg-white/5 border border-surface-dim/40 dark:border-white/10 text-secondary hover:text-earth-indigo'
              }`}
            >
              {m.icon}
              <span className="text-[11px]">{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Route Calculation State */}
      {routeState.isLoading ? (
        <div className="p-4 rounded-2xl bg-surface-low/80 dark:bg-white/5 text-center font-sans space-y-1.5">
          <Loader2 className="w-5 h-5 animate-spin text-vitality-coral mx-auto" />
          <p className="text-xs font-bold text-earth-indigo">
            Calculating best route…
          </p>
        </div>
      ) : routeState.error ? (
        <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-sans space-y-2">
          <p className="font-bold">Couldn&apos;t calculate route</p>
          <button
            type="button"
            onClick={onRetry}
            className="underline font-bold cursor-pointer"
          >
            Try Again
          </button>
        </div>
      ) : activeRoute ? (
        <div className="space-y-3">
          {/* Main Duration & Distance Stats */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-low/80 dark:bg-white/5 border border-surface-dim/40 dark:border-white/10 font-sans">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block">
                Estimated Time
              </span>
              <div className="text-xl font-bold text-earth-indigo flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-vitality-coral" />
                <span>{activeRoute.durationFormatted}</span>
              </div>
            </div>

            <div className="text-right space-y-0.5">
              <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block">
                Distance
              </span>
              <div className="text-base font-bold text-earth-indigo">
                {activeRoute.distanceKm}
              </div>
            </div>
          </div>

          {/* Alternative Route Options (if available) */}
          {routeState.routes.length > 1 && (
            <div className="flex items-center gap-1.5 font-sans text-xs">
              {routeState.routes.map((r, idx) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => onSelectRouteIndex(idx)}
                  className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                    routeState.selectedRouteIndex === idx
                      ? 'bg-earth-indigo text-white shadow-sm'
                      : 'bg-surface-low dark:bg-white/5 text-secondary hover:text-earth-indigo'
                  }`}
                >
                  {r.label}: {r.durationFormatted}
                </button>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-1 font-sans">
            <button
              type="button"
              onClick={handleStartExternalNav}
              className="flex-1 py-3 px-4 rounded-full bg-vitality-coral text-white font-sans text-xs font-bold shadow-lg shadow-vitality-coral/30 hover:bg-vitality-coral/90 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Start Navigation</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={onClearRoute}
              className="py-3 px-4 rounded-full border border-surface-dim/50 dark:border-white/20 text-secondary hover:text-earth-indigo text-xs font-bold transition-colors cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
