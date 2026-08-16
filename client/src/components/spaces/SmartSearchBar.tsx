import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Search,
  X,
  MapPin,
  Home,
  Users,
  Compass,
  Loader2,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import {
  SearchResultItem,
  RoomMapItem,
  PersonMapItem,
  DestinationMapItem,
  NeighborhoodMapItem,
} from './types.js';

export interface SmartSearchBarProps {
  rooms: RoomMapItem[];
  people: PersonMapItem[];
  destinations: DestinationMapItem[];
  neighborhoods: NeighborhoodMapItem[];
  onSelectResult: (result: SearchResultItem) => void;
  className?: string;
  placeholder?: string;
  initialQuery?: string;
}

const POPULAR_AREAS = [
  { name: 'Indiranagar', city: 'Bengaluru', coords: [77.6410, 12.9780] as [number, number] },
  { name: 'Bandra West', city: 'Mumbai', coords: [72.8300, 19.0600] as [number, number] },
  { name: 'Baner', city: 'Pune', coords: [73.7900, 18.5600] as [number, number] },
  { name: 'Koramangala', city: 'Bengaluru', coords: [77.6200, 12.9350] as [number, number] },
];

export const SmartSearchBar: React.FC<SmartSearchBarProps> = ({
  rooms,
  people,
  destinations,
  neighborhoods,
  onSelectResult,
  className = '',
  placeholder = 'Search neighborhoods, rooms, destinations...',
  initialQuery = '',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [isOpen, setIsOpen] = useState(false);
  const [isGeocodingLoading, setIsGeocodingLoading] = useState(false);
  const [externalResults, setExternalResults] = useState<SearchResultItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const apiKey = (import.meta.env.VITE_MAPTILER_API_KEY || '').trim();

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Filter local database entities
  const localResults = useMemo<SearchResultItem[]>(() => {
    if (!query.trim() || query.length < 2) return [];
    const q = query.toLowerCase().trim();
    const results: SearchResultItem[] = [];

    // 1. Match Neighborhoods
    neighborhoods.forEach((n) => {
      if (
        n.name.toLowerCase().includes(q) ||
        n.city.toLowerCase().includes(q) ||
        n.description.toLowerCase().includes(q)
      ) {
        results.push({
          id: `neighborhood-${n.id}`,
          type: 'neighborhood',
          title: n.name,
          subtitle: `${n.city} · ${n.roomsCount} rooms · avg ${n.avgRent}`,
          city: n.city,
          coordinates: n.coordinates,
          data: n,
        });
      }
    });

    // 2. Match Database Rooms
    rooms.forEach((r) => {
      if (
        r.title.toLowerCase().includes(q) ||
        r.neighborhood.toLowerCase().includes(q) ||
        r.city.toLowerCase().includes(q)
      ) {
        results.push({
          id: `room-${r.id}`,
          type: 'room',
          title: r.title,
          subtitle: `₹${r.monthlyRent.toLocaleString('en-IN')}/mo · ${r.neighborhood}, ${r.city}`,
          city: r.city,
          coordinates: r.coordinates,
          data: r,
        });
      }
    });

    // 3. Match Verified People Discovery
    people.forEach((p) => {
      if (
        p.displayName.toLowerCase().includes(q) ||
        p.headline.toLowerCase().includes(q) ||
        p.neighborhood.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q)
      ) {
        results.push({
          id: `person-${p.id}`,
          type: 'person',
          title: p.displayName,
          subtitle: `${p.headline} · ${p.neighborhood}, ${p.city}`,
          city: p.city,
          coordinates: p.coordinates,
          data: p,
        });
      }
    });

    // 4. Match Destinations
    destinations.forEach((d) => {
      if (d.city.toLowerCase().includes(q) || d.country.toLowerCase().includes(q)) {
        results.push({
          id: `destination-${d.id}`,
          type: 'destination',
          title: d.city,
          subtitle: `${d.availableRoomsCount} spaces · ${d.country}`,
          city: d.city,
          coordinates: d.coordinates,
          data: d,
        });
      }
    });

    return results;
  }, [query, rooms, people, destinations, neighborhoods]);

  // MapTiler Geocoding fallback for Indian geographic locations
  useEffect(() => {
    if (!apiKey || query.trim().length < 3) {
      setExternalResults([]);
      setIsGeocodingLoading(false);
      return;
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(async () => {
      try {
        setIsGeocodingLoading(true);
        const endpoint = `https://api.maptiler.com/geocoding/${encodeURIComponent(
          query
        )}.json?key=${apiKey}&country=in&limit=3`;
        const res = await fetch(endpoint);
        if (!res.ok) {
          setIsGeocodingLoading(false);
          return;
        }

        const data = await res.json();
        if (data && Array.isArray(data.features)) {
          const geocoded: SearchResultItem[] = data.features.map((f: any) => ({
            id: `geo-${f.id || Math.random()}`,
            type: 'place',
            title: f.text || f.place_name?.split(',')[0] || query,
            subtitle: f.place_name || 'Geographic Location, India',
            coordinates: f.center as [number, number],
          }));
          setExternalResults(geocoded);
        }
      } catch (err) {
        // Silently catch geocoding errors to maintain flawless offline/fallback UX
        setExternalResults([]);
      } finally {
        setIsGeocodingLoading(false);
      }
    }, 280);

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [query, apiKey]);

  // Combined Results (prioritizing local database items)
  const allResults = useMemo(() => {
    const combined = [...localResults];
    // Append external geocoding if not already present
    externalResults.forEach((ext) => {
      const exists = combined.some(
        (c) => c.title.toLowerCase() === ext.title.toLowerCase()
      );
      if (!exists) combined.push(ext);
    });
    return combined.slice(0, 8);
  }, [localResults, externalResults]);

  const handleSelect = (item: SearchResultItem) => {
    setQuery(item.title);
    setIsOpen(false);
    onSelectResult(item);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < allResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : allResults.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < allResults.length) {
        handleSelect(allResults[selectedIndex]);
      } else if (allResults.length > 0) {
        handleSelect(allResults[0]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const getTypeIcon = (type: SearchResultItem['type']) => {
    switch (type) {
      case 'neighborhood':
        return <MapPin className="w-3.5 h-3.5 text-vitality-coral" />;
      case 'room':
        return <Home className="w-3.5 h-3.5 text-trust-teal" />;
      case 'person':
        return <Users className="w-3.5 h-3.5 text-amber-500" />;
      case 'destination':
      case 'city':
        return <Compass className="w-3.5 h-3.5 text-purple-500" />;
      case 'place':
      default:
        return <MapPin className="w-3.5 h-3.5 text-secondary dark:text-surface-dim" />;
    }
  };

  const getTypeBadge = (type: SearchResultItem['type']) => {
    switch (type) {
      case 'neighborhood':
        return '📍 Neighborhood';
      case 'room':
        return '🏠 Room';
      case 'person':
        return '👤 Roommate';
      case 'destination':
        return '🏛️ City Hub';
      case 'place':
      default:
        return '🔍 Map Place';
    }
  };

  return (
    <div ref={containerRef} className={`relative pointer-events-auto ${className}`}>
      {/* Search Input Bar */}
      <div className="flex items-center gap-2.5 bg-white/45 dark:bg-black/45 backdrop-blur-xl px-3.5 py-2.5 rounded-full border border-white/40 dark:border-white/15 shadow-md transition-all focus-within:ring-2 focus-within:ring-vitality-coral/40 focus-within:border-vitality-coral">
        <div className="text-vitality-coral flex items-center justify-center">
          {isGeocodingLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-vitality-coral" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="bg-transparent border-none font-sans text-xs sm:text-sm text-[#0f172a] dark:text-white placeholder-secondary/70 dark:placeholder-slate-400 w-44 sm:w-72 md:w-84 focus:outline-none"
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            className="text-secondary dark:text-surface-dim hover:text-earth-indigo dark:hover:text-white transition-colors p-0.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown Panel (Opens upward from bottom search bar) */}
      {isOpen && (
        <div className="absolute bottom-full mb-2 left-0 w-[calc(100vw-3rem)] sm:w-[360px] md:w-[400px] max-w-[calc(100vw-2rem)] bg-white/60 dark:bg-black/60 backdrop-blur-2xl border border-white/40 dark:border-white/15 rounded-3xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
          {query.trim().length >= 2 ? (
            <div>
              {/* Header */}
              <div className="px-4 py-2 border-b border-surface-dim dark:border-white/10 flex items-center justify-between">
                <span className="font-sans text-[10px] font-bold text-secondary uppercase tracking-wider">
                  {allResults.length > 0
                    ? `Found ${allResults.length} matches`
                    : isGeocodingLoading
                    ? 'Searching places...'
                    : 'Search Results'}
                </span>
                {allResults.length > 0 && (
                  <span className="text-[10px] text-secondary font-mono">
                    ↑↓ navigate · ↵ select
                  </span>
                )}
              </div>

              {/* Results List */}
              {allResults.length > 0 ? (
                <div className="max-h-72 overflow-y-auto py-1 divide-y divide-surface-dim/30 dark:divide-white/5">
                  {allResults.map((item, idx) => {
                    const isSelected = selectedIndex === idx;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full text-left px-4 py-2.5 flex items-start gap-3 transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-vitality-coral/10 dark:bg-vitality-coral/20'
                            : 'hover:bg-surface-low/80 dark:hover:bg-white/5'
                        }`}
                      >
                        <div className="mt-0.5 p-1.5 rounded-xl bg-surface-low dark:bg-white/10 flex items-center justify-center shrink-0">
                          {getTypeIcon(item.type)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-sans text-xs font-bold text-earth-indigo truncate">
                              {item.title}
                            </span>
                            <span className="font-sans text-[9px] px-2 py-0.5 rounded-full bg-surface-low dark:bg-white/10 text-secondary font-bold shrink-0">
                              {getTypeBadge(item.type)}
                            </span>
                          </div>
                          <p className="font-sans text-[11px] text-secondary truncate mt-0.5">
                            {item.subtitle}
                          </p>
                        </div>

                        {isSelected && (
                          <ArrowRight className="w-3.5 h-3.5 text-vitality-coral shrink-0 mt-1" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="p-6 text-center space-y-2 font-sans">
                  <div className="w-8 h-8 rounded-full bg-surface-low dark:bg-white/10 mx-auto flex items-center justify-center text-secondary">
                    <Search className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-bold text-earth-indigo">
                    No results found for &ldquo;{query}&rdquo;
                  </p>
                  <p className="text-[11px] text-secondary">
                    Try searching for &lsquo;Indiranagar&rsquo;, &lsquo;Bandra&rsquo;, or &lsquo;Pune&rsquo;.
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Recent / Popular Suggestions when query is empty or short */
            <div className="p-3.5 space-y-2.5 font-sans">
              <div className="flex items-center gap-1.5 text-secondary text-[10px] font-bold uppercase tracking-wider px-1">
                <TrendingUp className="w-3.5 h-3.5 text-vitality-coral" />
                <span>Popular Neighborhoods</span>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                {POPULAR_AREAS.map((area) => (
                  <button
                    key={area.name}
                    type="button"
                    onClick={() =>
                      handleSelect({
                        id: `popular-${area.name.toLowerCase()}`,
                        type: 'neighborhood',
                        title: area.name,
                        subtitle: `${area.city} · Curated district`,
                        city: area.city,
                        coordinates: area.coords,
                      })
                    }
                    className="text-left p-2.5 rounded-2xl bg-surface-low/80 dark:bg-white/5 hover:bg-vitality-coral/15 transition-all flex items-center gap-2 cursor-pointer group"
                  >
                    <div className="w-6 h-6 rounded-lg bg-vitality-coral/10 group-hover:bg-vitality-coral text-vitality-coral group-hover:text-white flex items-center justify-center text-xs transition-colors shrink-0">
                      📍
                    </div>
                    <div className="min-w-0">
                      <div className="font-sans text-xs font-bold text-earth-indigo truncate">
                        {area.name}
                      </div>
                      <div className="text-[10px] text-secondary truncate">
                        {area.city}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
