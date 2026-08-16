import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Map, Marker, AttributionControl, ErrorEvent } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useQuery } from '@tanstack/react-query';
import {
  Navigation,
  Compass,
  Plus,
  Minus,
  AlertTriangle,
  RefreshCw,
  Loader2,
  RotateCcw,
  MapPin,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.js';
import { discoverService, travelService } from '../../services/index.js';
import { useLiveLocation } from '../../context/LiveLocationContext.js';
import { INDIAN_DEMO_ROOMS, INDIAN_DEMO_PROFILES } from '../../data/indianDemoData.js';
import {
  MapFilterType,
  RoomMapItem,
  DestinationMapItem,
  PersonMapItem,
  LiveLocationItem,
  NeighborhoodMapItem,
  SearchResultItem,
  MapFilterOptions,
  ActiveRouteState,
  DirectionsRequest,
  TransportMode,
} from './types.js';
import { calculateRoute } from './routingService.js';
import { RouteNavigationPanel } from './RouteNavigationPanel.js';
import { RoomPreviewCard } from './RoomPreviewCard.js';
import { DestinationPreviewCard } from './DestinationPreviewCard.js';
import { PersonPreviewCard } from './PersonPreviewCard.js';
import { LivePreviewCard } from './LivePreviewCard.js';
import { NeighborhoodIntelligencePanel } from './NeighborhoodIntelligencePanel.js';
import { NeighborhoodComparisonModal } from './NeighborhoodComparisonModal.js';
import { computeNeighborhoodIntelligence } from './neighborhoodIntelligence.js';
import { SmartSearchBar } from './SmartSearchBar.js';
import { NearbyDrawer } from './NearbyDrawer.js';
import { MapFilterModal } from './MapFilterModal.js';
import { LivePermissionModal } from './LivePermissionModal.js';
import { PrivacyCenterModal } from './PrivacyCenterModal.js';
import { MapLegend } from './MapLegend.js';
import { LiveLocationControlPanel } from './LiveLocationControlPanel.js';
import { MapFilterBar } from './MapFilterBar.js';

export interface SpacesMapProps {
  selectedCity?: string;
  searchQuery?: string;
  className?: string;
  onCityChange?: (city: string) => void;
}

const CITY_COORDINATES: Record<string, { center: [number, number]; zoom: number }> = {
  bengaluru: { center: [77.5946, 12.9716], zoom: 12.5 },
  bangalore: { center: [77.5946, 12.9716], zoom: 12.5 },
  mumbai: { center: [72.8258, 19.0596], zoom: 12.5 },
  pune: { center: [73.7997, 18.5590], zoom: 12.5 },
  delhi: { center: [77.2090, 28.6139], zoom: 12.0 },
  'delhi ncr': { center: [77.2090, 28.6139], zoom: 12.0 },
  'new delhi': { center: [77.2090, 28.6139], zoom: 12.0 },
  ncr: { center: [77.2090, 28.6139], zoom: 12.0 },
  gurugram: { center: [77.0266, 28.4595], zoom: 12.0 },
  noida: { center: [77.3910, 28.5355], zoom: 12.0 },
  hyderabad: { center: [78.4867, 17.3850], zoom: 12.0 },
  chennai: { center: [80.2707, 13.0827], zoom: 12.0 },
  kolkata: { center: [88.3639, 22.5726], zoom: 12.0 },
  goa: { center: [73.8180, 15.4909], zoom: 12.0 },
};

// Curated Neighborhood Districts with real statistics
export const SPACES_NEIGHBORHOODS: NeighborhoodMapItem[] = [
  // --- Bengaluru ---
  {
    id: 'indiranagar',
    name: 'Indiranagar',
    city: 'Bengaluru',
    cityId: 'bengaluru',
    coordinates: [77.6410, 12.9780],
    roomsCount: 4,
    avgRent: '₹24,000 / mo',
    walkability: '94/100',
    transit: 'Metro Purple Line',
    vibe: 'Canopy Lanes & Artisan Cafes',
    description: 'Leafy streets with 100ft road culinary culture, co-working studios, and active young professionals.',
  },
  {
    id: 'koramangala',
    name: 'Koramangala',
    city: 'Bengaluru',
    cityId: 'bengaluru',
    coordinates: [77.6200, 12.9350],
    roomsCount: 3,
    avgRent: '₹22,500 / mo',
    walkability: '91/100',
    transit: 'Sony Signal Hub',
    vibe: 'Startup Hub & Nightlife',
    description: 'Vibrant startup density, rooftop cafes, boutique gyms, and high roommate compatibility.',
  },
  {
    id: 'domlur',
    name: 'Domlur',
    city: 'Bengaluru',
    cityId: 'bengaluru',
    coordinates: [77.6380, 12.9610],
    roomsCount: 2,
    avgRent: '₹21,000 / mo',
    walkability: '89/100',
    transit: 'EGL Tech Shuttle',
    vibe: 'Tech Parks & Quiet Enclaves',
    description: 'Prime proximity to Embassy Golf Links tech park with quiet residential pockets and tree-lined avenues.',
  },
  {
    id: 'hsr-layout',
    name: 'HSR Layout',
    city: 'Bengaluru',
    cityId: 'bengaluru',
    coordinates: [77.6430, 12.9120],
    roomsCount: 4,
    avgRent: '₹20,000 / mo',
    walkability: '90/100',
    transit: 'Outer Ring Road Link',
    vibe: 'Founders Colony & Parks',
    description: 'Wide planned sectors, tree canopies, fast startup founder communities, and modern apartments.',
  },
  {
    id: 'whitefield',
    name: 'Whitefield',
    city: 'Bengaluru',
    cityId: 'bengaluru',
    coordinates: [77.7500, 12.9698],
    roomsCount: 3,
    avgRent: '₹18,500 / mo',
    walkability: '86/100',
    transit: 'Metro Purple Line Ext',
    vibe: 'Tech Campus & Gated Enclaves',
    description: 'ITPL proximity, international communities, spacious luxury gated living, and metro connectivity.',
  },
  {
    id: 'jayanagar',
    name: 'Jayanagar',
    city: 'Bengaluru',
    cityId: 'bengaluru',
    coordinates: [77.5830, 12.9300],
    roomsCount: 2,
    avgRent: '₹19,500 / mo',
    walkability: '95/100',
    transit: 'Green Line Metro',
    vibe: 'Traditional Charm & Lush Parks',
    description: 'Serene South Bengaluru lifestyle, massive neighborhood parks, classic eateries, and high safety.',
  },
  {
    id: 'bellandur',
    name: 'Bellandur',
    city: 'Bengaluru',
    cityId: 'bengaluru',
    coordinates: [77.6780, 12.9300],
    roomsCount: 3,
    avgRent: '₹21,500 / mo',
    walkability: '85/100',
    transit: 'Ecospace Tech Link',
    vibe: 'Tech Corridor & High-Rises',
    description: 'Immediate walking distance to major global tech parks, modern lifestyle complexes, and active flatmates.',
  },
  {
    id: 'malleshwaram',
    name: 'Malleshwaram',
    city: 'Bengaluru',
    cityId: 'bengaluru',
    coordinates: [77.5700, 13.0050],
    roomsCount: 2,
    avgRent: '₹18,000 / mo',
    walkability: '93/100',
    transit: 'Sampige Road Metro',
    vibe: 'Heritage Culture & Tree Avenues',
    description: 'Classic heritage cafes, historic avenues, art sanctuaries, and calm residential tranquility.',
  },

  // --- Mumbai ---
  {
    id: 'bandra-west',
    name: 'Bandra West',
    city: 'Mumbai',
    cityId: 'mumbai',
    coordinates: [72.8300, 19.0600],
    roomsCount: 5,
    avgRent: '₹34,000 / mo',
    walkability: '96/100',
    transit: 'Bandra Terminus',
    vibe: 'Sea Promenade & Arts Scene',
    description: 'Colonial sea promenades, organic markets, heritage Portuguese lanes, and creative community.',
  },
  {
    id: 'khar-west',
    name: 'Khar West',
    city: 'Mumbai',
    cityId: 'mumbai',
    coordinates: [72.8350, 19.0700],
    roomsCount: 2,
    avgRent: '₹31,000 / mo',
    walkability: '92/100',
    transit: 'Linking Road Access',
    vibe: 'Cosmopolitan & Green',
    description: 'Peaceful residential neighborhood close to Bandra cafes, boutique fitness studios, and seaside breeze.',
  },
  {
    id: 'juhu',
    name: 'Juhu',
    city: 'Mumbai',
    cityId: 'mumbai',
    coordinates: [72.8270, 19.1075],
    roomsCount: 3,
    avgRent: '₹36,000 / mo',
    walkability: '91/100',
    transit: 'Juhu Tara Road',
    vibe: 'Beachfront & Film Studios',
    description: 'Iconic beach sunsets, quiet residential enclaves, boutique cafes, and vibrant creative community.',
  },
  {
    id: 'powai',
    name: 'Powai',
    city: 'Mumbai',
    cityId: 'mumbai',
    coordinates: [72.9050, 19.1170],
    roomsCount: 3,
    avgRent: '₹28,000 / mo',
    walkability: '88/100',
    transit: 'JVLR Corridor',
    vibe: 'Lakefront & Startup Hub',
    description: 'Modern Hiranandani architecture, lake promenade, startup founders, and global dining culture.',
  },

  // --- Pune ---
  {
    id: 'baner',
    name: 'Baner',
    city: 'Pune',
    cityId: 'pune',
    coordinates: [73.7900, 18.5600],
    roomsCount: 4,
    avgRent: '₹16,500 / mo',
    walkability: '88/100',
    transit: 'Hinjewadi Tech Shuttle',
    vibe: 'Green Foothills & Tech Hub',
    description: 'Modern high-rises looking out toward the biodiversity ridge. Clean air and vibrant co-working culture.',
  },
  {
    id: 'koregaon-park',
    name: 'Koregaon Park',
    city: 'Pune',
    cityId: 'pune',
    coordinates: [73.8950, 18.5360],
    roomsCount: 3,
    avgRent: '₹19,000 / mo',
    walkability: '95/100',
    transit: 'North Main Road',
    vibe: 'Boutique Living & Greenery',
    description: 'Famous tree canopies, organic bistros, art spaces, and high walkability living suites.',
  },
  {
    id: 'aundh',
    name: 'Aundh',
    city: 'Pune',
    cityId: 'pune',
    coordinates: [73.8050, 18.5580],
    roomsCount: 2,
    avgRent: '₹17,000 / mo',
    walkability: '91/100',
    transit: 'University Road Link',
    vibe: 'Leafy Suburbs & Cafes',
    description: 'Upscale residential lanes, shopping districts, botanical gardens, and calm student/tech vibe.',
  },

  // --- Delhi NCR ---
  {
    id: 'hauz-khas',
    name: 'Hauz Khas',
    city: 'Delhi NCR',
    cityId: 'delhi',
    coordinates: [77.2065, 28.5494],
    roomsCount: 3,
    avgRent: '₹22,000 / mo',
    walkability: '93/100',
    transit: 'Yellow Line Metro',
    vibe: 'Heritage Lakes & Design Hub',
    description: 'Historic monuments, deer park greenery, curated studios, and independent lifestyle.',
  },
  {
    id: 'saket',
    name: 'Saket',
    city: 'Delhi NCR',
    cityId: 'delhi',
    coordinates: [77.2150, 28.5245],
    roomsCount: 2,
    avgRent: '₹20,000 / mo',
    walkability: '90/100',
    transit: 'Saket Metro Station',
    vibe: 'Malls & Cultural Enclaves',
    description: 'Lush green avenues, shopping centers, art galleries, and premier South Delhi residential living.',
  },
  {
    id: 'cyber-city',
    name: 'Cyber City Gurugram',
    city: 'Delhi NCR',
    cityId: 'delhi',
    coordinates: [77.0880, 28.4950],
    roomsCount: 4,
    avgRent: '₹25,000 / mo',
    walkability: '87/100',
    transit: 'Rapid Metro Hub',
    vibe: 'Corporate Skyline & Nightlife',
    description: 'Futuristic glass towers, CyberHub fine dining, top MNC offices, and high-rise living.',
  },
];

// Privacy-safe neighborhood coordinate mapping
const NEIGHBORHOOD_COORDINATES: Record<string, [number, number]> = {
  // Bengaluru
  indiranagar: [77.6410, 12.9780],
  domlur: [77.6380, 12.9610],
  koramangala: [77.6200, 12.9350],
  'hsr layout': [77.6430, 12.9120],
  whitefield: [77.7500, 12.9698],
  bengaluru: [77.5946, 12.9716],

  // Mumbai
  'bandra west': [72.8300, 19.0600],
  bandra: [72.8300, 19.0600],
  'khar west': [72.8350, 19.0700],
  juhu: [72.8270, 19.1075],
  mumbai: [72.8258, 19.0596],

  // Pune
  baner: [73.7900, 18.5600],
  balewadi: [73.7740, 18.5760],
  'koregaon park': [73.8950, 18.5360],
  aundh: [73.8050, 18.5580],
  pune: [73.7997, 18.5590],

  // Delhi NCR
  'hauz khas': [77.2065, 28.5494],
  saket: [77.2150, 28.5245],
  delhi: [77.2090, 28.6139],

  // Chennai
  adyar: [80.2565, 13.0067],
  'besant nagar': [80.2660, 12.9980],
  chennai: [80.2707, 13.0827],
};

function getApproximateCoords(locationStr?: string, cityStr?: string): [number, number] {
  const full = `${locationStr || ''} ${cityStr || ''}`.toLowerCase();

  for (const [key, coords] of Object.entries(NEIGHBORHOOD_COORDINATES)) {
    if (full.includes(key)) {
      return coords;
    }
  }

  if (cityStr?.toLowerCase().includes('mumbai')) return NEIGHBORHOOD_COORDINATES.mumbai;
  if (cityStr?.toLowerCase().includes('pune')) return NEIGHBORHOOD_COORDINATES.pune;
  if (cityStr?.toLowerCase().includes('delhi')) return NEIGHBORHOOD_COORDINATES.delhi;
  return NEIGHBORHOOD_COORDINATES.bengaluru;
}

export const SpacesMap: React.FC<SpacesMapProps> = ({
  selectedCity = 'bengaluru',
  searchQuery = '',
  className = '',
  onCityChange,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const userMarkerRef = useRef<Marker | null>(null);
  const activeMarkersRef = useRef<Marker[]>([]);

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // Live Location & Privacy Context (Phase 4 & 5)
  const {
    myLiveLocation,
    activeLivePeers,
    isGhostMode,
    isPermissionModalOpen,
    isPrivacyCenterOpen,
    cancelPermissionModal,
    confirmStartSharing,
    closePrivacyCenter,
  } = useLiveLocation();

  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isPitch3D, setIsPitch3D] = useState(true);
  const [locatingUser, setLocatingUser] = useState(false);
  const [geoNotice, setGeoNotice] = useState<string | null>(null);
  const [styleEpoch, setStyleEpoch] = useState(0);

  // Active Map Filter Layer
  const [filter, setFilter] = useState<MapFilterType>('all');

  // Filter Modal State
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState<MapFilterOptions>({
    minBudget: 0,
    maxBudget: 50000,
    chronotypes: [],
    lifestyleTraits: [],
    availableNowOnly: false,
  });

  // Selected Entity for Previews
  const [selectedRoom, setSelectedRoom] = useState<RoomMapItem | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<PersonMapItem | null>(null);
  const [selectedLiveItem, setSelectedLiveItem] = useState<LiveLocationItem | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<DestinationMapItem | null>(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<NeighborhoodMapItem | null>(null);

  // Phase 7: Routes & Navigation State
  const [activeRouteState, setActiveRouteState] = useState<ActiveRouteState | null>(null);
  const [deviceLocation, setDeviceLocation] = useState<[number, number] | null>(() => {
    try {
      const stored = localStorage.getItem('roommate_live_location');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Phase 8: Neighborhood Intelligence & Comparison State
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [comparisonNeighborhood, setComparisonNeighborhood] = useState<NeighborhoodMapItem | null>(null);

  // Active City Selector State (preserves user's recent city across reloads)
  const [activeCity, setActiveCity] = useState<string>(() => {
    const stored = localStorage.getItem('roommate_last_city');
    return (selectedCity || stored || 'bengaluru').toLowerCase();
  });

  useEffect(() => {
    if (selectedCity && selectedCity.toLowerCase() !== activeCity) {
      const lower = selectedCity.toLowerCase();
      setActiveCity(lower);
      localStorage.setItem('roommate_last_city', lower);
    }
  }, [selectedCity, activeCity]);

  const handleSwitchCity = useCallback((cityKey: string) => {
    const lowerKey = cityKey.toLowerCase();
    setActiveCity(lowerKey);
    localStorage.setItem('roommate_last_city', lowerKey);
    onCityChange?.(lowerKey);

    const cfg = CITY_COORDINATES[lowerKey] || CITY_COORDINATES.bengaluru;
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: cfg.center,
        zoom: cfg.zoom,
        duration: 1500,
        essential: true,
      });
    }
  }, [onCityChange]);

  const apiKey = (import.meta.env.VITE_MAPTILER_API_KEY || '').trim();

  // 1. Fetch Real Database Rooms & Profiles
  const {
    data: discoverData,
    isLoading: isLoadingDiscover,
    isError: isDiscoverError,
    refetch: refetchDiscover,
  } = useQuery({
    queryKey: ['discover', 'featured'],
    queryFn: () => discoverService.getFeatured(),
    staleTime: 1000 * 60 * 5,
  });

  // 2. Fetch Real Database Destinations
  const {
    data: destinationsData,
    isLoading: isLoadingDestinations,
    isError: isDestinationsError,
    refetch: refetchDestinations,
  } = useQuery({
    queryKey: ['travel', 'destinations'],
    queryFn: () => travelService.getDestinations(),
    staleTime: 1000 * 60 * 5,
  });

  // Normalize Room Items with budget filter
  const validRooms: RoomMapItem[] = useMemo(() => {
    const rawRooms = discoverData?.data?.rooms || [];
    const roomsSource = rawRooms.length > 0 ? rawRooms : INDIAN_DEMO_ROOMS;
    const items: RoomMapItem[] = [];

    roomsSource.forEach((r: any) => {
      let coords = r.address?.coordinates;
      if (!coords || !Array.isArray(coords) || coords.length !== 2) {
        coords = getApproximateCoords(r.neighborhood || r.address?.city || '', r.city || r.address?.city || 'Bengaluru');
      }

      if (
        Array.isArray(coords) &&
        coords.length === 2 &&
        typeof coords[0] === 'number' &&
        typeof coords[1] === 'number' &&
        !isNaN(coords[0]) &&
        !isNaN(coords[1])
      ) {
        const rent = r.pricing?.monthlyRent || r.monthlyRent || 0;
        if (filterOptions.maxBudget && rent > filterOptions.maxBudget) {
          return;
        }

        items.push({
          id: r._id || r.id,
          title: r.title || 'Living Space',
          description: r.description || '',
          city: r.city || r.address?.city || 'Bengaluru',
          neighborhood: r.neighborhood || r.address?.street?.split(',')[0] || r.address?.city || 'Central',
          state: r.state || r.address?.state || 'India',
          coordinates: [coords[0], coords[1]],
          monthlyRent: rent,
          deposit: r.pricing?.deposit || r.deposit,
          status: r.status || (r.isAvailable !== false ? 'available' : 'occupied'),
          imageUrl: r.photos?.[0] || r.imageUrl,
          roommatesCount: r.roommates?.length || r.cohabitants?.length || 0,
        });
      }
    });

    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase();
    return items.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.city.toLowerCase().includes(q) ||
        r.neighborhood.toLowerCase().includes(q)
    );
  }, [discoverData, searchQuery, filterOptions.maxBudget]);

  // Normalize Real Database People (Discovery layer)
  const validPeople: PersonMapItem[] = useMemo(() => {
    const rawProfiles = discoverData?.data?.profiles || [];
    const profilesSource = rawProfiles.length > 0 ? rawProfiles : INDIAN_DEMO_PROFILES;
    const items: PersonMapItem[] = [];

    const coordCounts: Record<string, number> = {};

    profilesSource.forEach((p: any) => {
      // Filter by chronotype if active
      if (
        filterOptions.chronotypes.length > 0 &&
        p.lifestyleDNA?.chronotype &&
        !filterOptions.chronotypes.includes(p.lifestyleDNA.chronotype)
      ) {
        return;
      }

      const locStr = p.preferredLocations?.[0] || 'Indiranagar, Bengaluru';
      const city = locStr.split(',')[1]?.trim() || p.city || 'Bengaluru';
      const neighborhood = locStr.split(',')[0]?.trim() || p.neighborhood || 'Indiranagar';

      const baseCoords = getApproximateCoords(locStr, city);
      const coordKey = `${baseCoords[0].toFixed(3)},${baseCoords[1].toFixed(3)}`;
      const offsetIndex = coordCounts[coordKey] || 0;
      coordCounts[coordKey] = offsetIndex + 1;

      // Disperse people into residential enclaves around neighborhood center (~500m-900m) so they never collide with district center badge
      const angle = (offsetIndex * (2 * Math.PI)) / 5 + Math.PI / 4;
      const radius = 0.0055 + (offsetIndex % 3) * 0.0025;
      const finalLng = baseCoords[0] + radius * Math.cos(angle);
      const finalLat = baseCoords[1] + radius * Math.sin(angle);

      items.push({
        id: p._id || p.id,
        userId: p.userId || p._id,
        displayName: p.displayName || 'Roommate',
        headline: p.headline || 'Verified Roommate',
        avatarUrl:
          p.avatarUrl ||
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        bio: p.bio || '',
        neighborhood,
        city,
        coordinates: [finalLng, finalLat],
        budgetRange: p.budgetRange,
        lifestyleDNA: p.lifestyleDNA,
        visualTags: p.visualTags || ['Verified Resident'],
        compatibilityScore: 94,
        trustProfile: {
          reputationScore: 890,
          verificationTier: 'background_cleared',
          isIdVerified: true,
          isEmploymentVerified: true,
        },
      });
    });

    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase();
    return items.filter(
      (person) =>
        person.displayName.toLowerCase().includes(q) ||
        person.headline.toLowerCase().includes(q) ||
        person.city.toLowerCase().includes(q) ||
        person.neighborhood.toLowerCase().includes(q)
    );
  }, [discoverData, searchQuery, filterOptions.chronotypes]);

  // Combine Active Live Locations (Phase 4 & 5 Real-time)
  const validLiveItems: LiveLocationItem[] = useMemo(() => {
    const items: LiveLocationItem[] = [];

    // Current user live location (if active and not in Ghost Mode)
    if (myLiveLocation && !isGhostMode) {
      items.push(myLiveLocation);
    }

    // Active peers from socket (excluding any peer in Ghost Mode)
    activeLivePeers.forEach((peer) => {
      if (
        !peer.ghostMode &&
        Array.isArray(peer.approximateCoordinates) &&
        peer.approximateCoordinates.length === 2 &&
        !isNaN(peer.approximateCoordinates[0]) &&
        !isNaN(peer.approximateCoordinates[1])
      ) {
        items.push(peer);
      }
    });

    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.displayName.toLowerCase().includes(q) ||
        item.neighborhood?.toLowerCase().includes(q) ||
        item.city?.toLowerCase().includes(q)
    );
  }, [myLiveLocation, activeLivePeers, isGhostMode, searchQuery]);

  // Normalize Destination Items
  const validDestinations: DestinationMapItem[] = useMemo(() => {
    const rawDestinations = destinationsData?.data || [];
    const items: DestinationMapItem[] = [];

    rawDestinations.forEach((d: any) => {
      const cityLower = (d.city || '').toLowerCase();
      let matchedCoord: [number, number] = [77.5946, 12.9716];

      if (CITY_COORDINATES[cityLower]) {
        matchedCoord = CITY_COORDINATES[cityLower].center;
      } else if (cityLower.includes('delhi') || cityLower.includes('ncr') || cityLower.includes('gurgaon') || cityLower.includes('noida')) {
        matchedCoord = [77.2090, 28.6139];
      } else if (cityLower.includes('mumbai') || cityLower.includes('bombay')) {
        matchedCoord = [72.8258, 19.0596];
      } else if (cityLower.includes('pune')) {
        matchedCoord = [73.7997, 18.5590];
      } else if (cityLower.includes('hyderabad')) {
        matchedCoord = [78.4867, 17.3850];
      } else if (cityLower.includes('chennai') || cityLower.includes('madras')) {
        matchedCoord = [80.2707, 13.0827];
      } else if (cityLower.includes('kolkata') || cityLower.includes('calcutta')) {
        matchedCoord = [88.3639, 22.5726];
      } else if (cityLower.includes('bengaluru') || cityLower.includes('bangalore')) {
        matchedCoord = [77.5946, 12.9716];
      }

      items.push({
        id: d._id || d.id,
        city: d.city || 'Bengaluru',
        country: d.country || 'India',
        availableRoomsCount: d.activeRoomCount || 4,
        communityCount: d.communityMemberCount || 120,
        heroImageUrl:
          d.heroImage ||
          'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
        coordinates: matchedCoord,
      });
    });

    if (items.length === 0) {
      Object.entries(CITY_COORDINATES).forEach(([cityKey, config]) => {
        if (cityKey === 'bangalore' || cityKey === 'new delhi' || cityKey === 'ncr' || cityKey === 'delhi ncr') return;
        const capitalName = cityKey.charAt(0).toUpperCase() + cityKey.slice(1);
        items.push({
          id: `dest-${cityKey}`,
          city: capitalName,
          country: 'India',
          availableRoomsCount: cityKey === 'bengaluru' ? 4 : cityKey === 'mumbai' ? 5 : 3,
          communityCount: 140,
          heroImageUrl:
            'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
          coordinates: config.center,
        });
      });
    }

    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase();
    return items.filter((d) => d.city.toLowerCase().includes(q) || d.country.toLowerCase().includes(q));
  }, [destinationsData, searchQuery]);

  // Available Neighborhoods (shows all curated neighborhoods across cities)
  const currentCityNeighborhoods = useMemo(() => {
    if (!searchQuery.trim()) {
      return SPACES_NEIGHBORHOODS;
    }
    const q = searchQuery.toLowerCase();
    return SPACES_NEIGHBORHOODS.filter(
      (n) =>
        n.name.toLowerCase().includes(q) ||
        n.city.toLowerCase().includes(q) ||
        n.vibe.toLowerCase().includes(q) ||
        n.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Map Style Resolution
  const getMapStyle = useCallback(() => {
    if (apiKey) {
      return isDark
        ? `https://api.maptiler.com/maps/dataviz-dark/style.json?key=${apiKey}`
        : `https://api.maptiler.com/maps/streets-v2/style.json?key=${apiKey}`;
    }

    return {
      version: 8,
      name: isDark ? 'Fallback Dark' : 'Fallback Light',
      sources: {
        'osm-tiles': {
          type: 'raster',
          tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
          tileSize: 256,
          attribution: '&copy; OpenStreetMap contributors',
        },
      },
      layers: [
        {
          id: 'osm-tiles-layer',
          type: 'raster',
          source: 'osm-tiles',
          minzoom: 0,
          maxzoom: 19,
          paint: isDark ? { 'raster-opacity': 0.85, 'raster-brightness-max': 0.6 } : {},
        },
      ],
    };
  }, [apiKey, isDark]);

  // Route drawing and cleanup helpers
  const removeRouteFromMap = useCallback(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    try {
      if (map.getLayer('spaces-route-layer')) map.removeLayer('spaces-route-layer');
      if (map.getLayer('spaces-route-glow-layer')) map.removeLayer('spaces-route-glow-layer');
      if (map.getSource('spaces-route-source')) map.removeSource('spaces-route-source');
    } catch (err) {
      console.warn('Error removing route layer:', err);
    }
  }, []);

  const drawRouteOnMap = useCallback((coordinates: [number, number][]) => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    const geojsonData: any = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates,
      },
    };

    try {
      if (map.getSource('spaces-route-source')) {
        (map.getSource('spaces-route-source') as any).setData(geojsonData);
      } else {
        map.addSource('spaces-route-source', {
          type: 'geojson',
          data: geojsonData,
        });

        // Glowing outer route stroke
        map.addLayer({
          id: 'spaces-route-glow-layer',
          type: 'line',
          source: 'spaces-route-source',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#EB5E55',
            'line-width': 8,
            'line-opacity': 0.35,
          },
        });

        // Crisp inner route line
        map.addLayer({
          id: 'spaces-route-layer',
          type: 'line',
          source: 'spaces-route-source',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#EB5E55',
            'line-width': 4,
            'line-opacity': 0.95,
          },
        });
      }

      if (coordinates.length > 0) {
        let minLng = coordinates[0][0];
        let maxLng = coordinates[0][0];
        let minLat = coordinates[0][1];
        let maxLat = coordinates[0][1];

        coordinates.forEach(([lng, lat]) => {
          if (lng < minLng) minLng = lng;
          if (lng > maxLng) maxLng = lng;
          if (lat < minLat) minLat = lat;
          if (lat > maxLat) maxLat = lat;
        });

        map.fitBounds(
          [
            [minLng, minLat],
            [maxLng, maxLat],
          ],
          {
            padding: { top: 100, bottom: 260, left: 80, right: 80 },
            duration: 1200,
            essential: true,
          }
        );
      }
    } catch (err) {
      console.warn('Error drawing route on map:', err);
    }
  }, []);

  const handleClearRoute = useCallback(() => {
    removeRouteFromMap();
    setActiveRouteState(null);
  }, [removeRouteFromMap]);

  // Initialize MapLibre
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const storedCity = localStorage.getItem('roommate_last_city');
    const cityKey = (storedCity || selectedCity || activeCity || 'bengaluru').toLowerCase();
    const cityConfig = CITY_COORDINATES[cityKey] || CITY_COORDINATES.bengaluru;

    setMapError(null);

    const map = new Map({
      container: mapContainerRef.current,
      style: getMapStyle() as any,
      center: cityConfig.center,
      zoom: cityConfig.zoom,
      pitch: isPitch3D ? 45 : 0,
      bearing: -10,
      attributionControl: false,
    });

    map.addControl(
      new AttributionControl({
        compact: true,
        customAttribution: '© MapTiler © OpenStreetMap contributors',
      }),
      'bottom-right'
    );

    map.on('load', () => {
      setMapLoaded(true);
      map.resize();
    });

    map.on('error', (e: ErrorEvent) => {
      const msg = e.error?.message || 'Unknown map rendering error';
      if (
        msg.includes('Failed to fetch') ||
        msg.includes('403') ||
        msg.includes('401') ||
        msg.includes('Unauthorized')
      ) {
        setMapError('MapTiler tile access issue. Please verify VITE_MAPTILER_API_KEY in client/.env.');
      }
    });

    mapRef.current = map;

    const handleWindowResize = () => {
      if (mapRef.current) {
        mapRef.current.resize();
      }
    };
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
      activeMarkersRef.current.forEach((m) => m.remove());
      activeMarkersRef.current = [];
      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
        userMarkerRef.current = null;
      }
      map.remove();
      mapRef.current = null;
      setMapLoaded(false);
    };
  }, [styleEpoch]);

  // Handle Theme Change
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    try {
      mapRef.current.setStyle(getMapStyle() as any);
    } catch {
      setStyleEpoch((prev) => prev + 1);
    }
  }, [isDark, getMapStyle, mapLoaded]);

  // Fly to City on Selected City Change
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    const cityKey = selectedCity?.toLowerCase() || 'bengaluru';
    const config = CITY_COORDINATES[cityKey] || CITY_COORDINATES.bengaluru;

    handleClearRoute();

    mapRef.current.flyTo({
      center: config.center,
      zoom: config.zoom,
      pitch: isPitch3D ? 45 : 0,
      duration: 1500,
      essential: true,
    });
  }, [selectedCity, mapLoaded, isPitch3D, handleClearRoute]);

  // Render Markers Synchronized to Active Layers and Filters
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;

    // Clear previous markers
    activeMarkersRef.current.forEach((m) => m.remove());
    activeMarkersRef.current = [];

    const newMarkers: Marker[] = [];

    // 1. Render Room Markers (filter === 'all' | 'rooms' | 'nearby')
    if (filter === 'all' || filter === 'rooms' || filter === 'nearby') {
      validRooms.forEach((room) => {
        const el = document.createElement('div');
        el.className = 'roommate-room-marker group cursor-pointer';

        const rentFormatted = `₹${(room.monthlyRent / 1000).toFixed(0)}k`;
        el.innerHTML = `
          <div class="flex flex-col items-center transform transition-all duration-200 group-hover:scale-110 group-hover:-translate-y-1">
            <div class="relative p-2 rounded-2xl bg-white dark:bg-[#1e2433] border-2 border-vitality-coral shadow-2xl backdrop-blur-md group-hover:ring-4 group-hover:ring-vitality-coral/30 transition-all">
              <span class="text-xs">🏠</span>
              <div class="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full bg-vitality-coral text-white font-sans text-[9px] font-bold shadow-md">
                ${rentFormatted}
              </div>
            </div>
            <div class="w-1.5 h-1.5 rounded-full bg-vitality-coral mt-1 shadow-sm"></div>
          </div>
        `;

        el.addEventListener('click', (e) => {
          e.stopPropagation();
          setSelectedRoom(room);
          setSelectedPerson(null);
          setSelectedLiveItem(null);
          setSelectedDestination(null);
          setSelectedNeighborhood(null);
          if (mapRef.current) {
            mapRef.current.flyTo({
              center: room.coordinates,
              zoom: 14.5,
              pitch: 40,
              duration: 1200,
              essential: true,
            });
          }
        });

        const marker = new Marker({ element: el, anchor: 'bottom' })
          .setLngLat(room.coordinates)
          .addTo(mapRef.current!);

        newMarkers.push(marker);
      });
    }

    // 2. Render Verified People Discovery Markers (filter === 'all' | 'people' | 'nearby')
    if (filter === 'all' || filter === 'people' || filter === 'nearby') {
      validPeople.forEach((person) => {
        const el = document.createElement('div');
        el.className = 'roommate-person-marker group cursor-pointer relative';
        el.style.zIndex = '35';

        const firstName = person.displayName.split(' ')[0];
        el.innerHTML = `
          <div class="flex flex-col items-center transform transition-all duration-200 group-hover:scale-110 group-hover:-translate-y-1">
            <div class="relative p-0.5 rounded-full bg-white dark:bg-[#1e2433] border-2 border-trust-teal shadow-2xl backdrop-blur-md group-hover:ring-4 group-hover:ring-trust-teal/40 transition-all">
              <img
                src="${person.avatarUrl}"
                alt="${person.displayName}"
                class="w-10 h-10 rounded-full object-cover shadow-inner"
              />
              <div class="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-trust-teal border-2 border-white dark:border-[#1e2433] flex items-center justify-center text-[8px] text-white font-bold shadow-sm">✓</div>
            </div>
            <div class="px-2.5 py-0.5 bg-[#1a1f2c] text-[#fcf8fa] dark:bg-white dark:text-[#1a1f2c] rounded-full shadow-lg mt-1 font-sans text-[10px] font-extrabold backdrop-blur-md truncate max-w-[100px] border border-white/20 dark:border-black/20">
              ${firstName}
            </div>
          </div>
        `;

        el.addEventListener('click', (e) => {
          e.stopPropagation();
          setSelectedPerson(person);
          setSelectedRoom(null);
          setSelectedLiveItem(null);
          setSelectedDestination(null);
          setSelectedNeighborhood(null);
          if (mapRef.current) {
            mapRef.current.flyTo({
              center: person.coordinates,
              zoom: 14.0,
              pitch: 35,
              duration: 1200,
              essential: true,
            });
          }
        });

        const marker = new Marker({ element: el, anchor: 'bottom' })
          .setLngLat(person.coordinates)
          .addTo(mapRef.current!);

        newMarkers.push(marker);
      });
    }

    // 3. Render Real-Time Live Location Markers (filter === 'all' | 'live')
    if (filter === 'all' || filter === 'live') {
      validLiveItems.forEach((live) => {
        const el = document.createElement('div');
        el.className = 'roommate-live-marker group cursor-pointer';

        const firstName = live.displayName.split(' ')[0];
        el.innerHTML = `
          <div class="flex flex-col items-center transform transition-all duration-200 group-hover:scale-110 group-hover:-translate-y-1">
            <div class="relative p-0.5 rounded-full bg-white dark:bg-[#1e2433] border-2 border-vitality-coral shadow-2xl backdrop-blur-md ring-4 ring-vitality-coral/30">
              <span class="animate-ping absolute inset-0 rounded-full bg-vitality-coral opacity-40"></span>
              <div class="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-vitality-coral/10">
                ${
                  live.avatarUrl
                    ? `<img src="${live.avatarUrl}" alt="${live.displayName}" class="w-full h-full object-cover" />`
                    : `<span class="text-xs font-bold text-vitality-coral">📍</span>`
                }
              </div>
              <div class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-vitality-coral border border-white dark:border-[#1e2433] flex items-center justify-center">
                <div class="w-1 h-1 rounded-full bg-white animate-pulse"></div>
              </div>
            </div>
            <div class="px-2 py-0.5 bg-vitality-coral text-white rounded-full shadow-md mt-0.5 font-sans text-[9px] font-bold flex items-center gap-1 backdrop-blur-md">
              <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              <span>${live.isCurrentUser ? 'You' : firstName}</span>
            </div>
          </div>
        `;

        el.addEventListener('click', (e) => {
          e.stopPropagation();
          setSelectedLiveItem(live);
          setSelectedRoom(null);
          setSelectedPerson(null);
          setSelectedDestination(null);
          setSelectedNeighborhood(null);
          if (mapRef.current) {
            mapRef.current.flyTo({
              center: live.approximateCoordinates,
              zoom: 14.5,
              pitch: 40,
              duration: 1200,
              essential: true,
            });
          }
        });

        const marker = new Marker({ element: el, anchor: 'bottom' })
          .setLngLat(live.approximateCoordinates)
          .addTo(mapRef.current!);

        newMarkers.push(marker);
      });
    }

    // 4. Render Destination Markers (filter === 'all' | 'destinations')
    if (filter === 'all' || filter === 'destinations') {
      validDestinations.forEach((dest) => {
        const el = document.createElement('div');
        el.className = 'roommate-destination-marker group cursor-pointer';

        el.innerHTML = `
          <div class="flex flex-col items-center transform transition-all duration-200 group-hover:scale-110 group-hover:-translate-y-1">
            <div class="px-3 py-1.5 rounded-full bg-[#1a1f2c] text-[#fcf8fa] dark:bg-[#fcf8fa] dark:text-[#1a1f2c] shadow-2xl backdrop-blur-md font-sans text-xs font-bold flex items-center gap-1.5 border border-white/20">
              <span class="text-xs">🏛️</span>
              <span>${dest.city}</span>
              <span class="px-1.5 py-0.5 rounded-full bg-vitality-coral text-white text-[9px] font-bold">
                ${dest.availableRoomsCount}
              </span>
            </div>
            <div class="w-1 h-2 bg-[#1a1f2c] dark:bg-[#fcf8fa]"></div>
          </div>
        `;

        el.addEventListener('click', (e) => {
          e.stopPropagation();
          setSelectedDestination(dest);
          setSelectedRoom(null);
          setSelectedPerson(null);
          setSelectedLiveItem(null);
          setSelectedNeighborhood(null);
          if (mapRef.current) {
            mapRef.current.flyTo({
              center: dest.coordinates,
              zoom: 13.0,
              pitch: 30,
              duration: 1200,
              essential: true,
            });
          }
        });

        const marker = new Marker({ element: el, anchor: 'bottom' })
          .setLngLat(dest.coordinates)
          .addTo(mapRef.current!);

        newMarkers.push(marker);
      });
    }

    // 5. Render Neighborhood District Badges (filter === 'all' | 'nearby')
    if (filter === 'all' || filter === 'nearby') {
      currentCityNeighborhoods.forEach((n) => {
        const el = document.createElement('div');
        el.className = 'roommate-neighborhood-marker group cursor-pointer';
        el.innerHTML = `
          <div class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#1e2433] border-2 border-amber-500 shadow-2xl backdrop-blur-xl transform transition-all duration-200 group-hover:scale-110 group-hover:-translate-y-1 font-sans text-xs font-bold text-[#1a1f2c] dark:text-[#fcf8fa]">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
            <span class="font-bold text-[#1a1f2c] dark:text-[#fcf8fa]">${n.name}</span>
            <span class="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-300 font-extrabold text-[10px]">${n.roomsCount}</span>
          </div>
        `;

        el.addEventListener('click', (e) => {
          e.stopPropagation();
          setSelectedNeighborhood(n);
          setSelectedRoom(null);
          setSelectedPerson(null);
          setSelectedLiveItem(null);
          setSelectedDestination(null);
          if (mapRef.current) {
            mapRef.current.flyTo({
              center: n.coordinates,
              zoom: 13.8,
              pitch: 35,
              duration: 1200,
              essential: true,
            });
          }
        });

        const marker = new Marker({ element: el, anchor: 'center' })
          .setLngLat(n.coordinates)
          .addTo(mapRef.current!);

        newMarkers.push(marker);
      });
    }

    activeMarkersRef.current = newMarkers;
  }, [
    validRooms,
    validPeople,
    validLiveItems,
    validDestinations,
    currentCityNeighborhoods,
    filter,
    mapLoaded,
  ]);

  // Map Controls Handlers
  const handleZoomIn = () => {
    if (mapRef.current) mapRef.current.zoomIn({ duration: 300 });
  };

  const handleZoomOut = () => {
    if (mapRef.current) mapRef.current.zoomOut({ duration: 300 });
  };

  const handleResetNorth = () => {
    if (mapRef.current) {
      mapRef.current.resetNorthPitch({ duration: 600 });
      setIsPitch3D(false);
    }
  };

  const handleTogglePitch = () => {
    if (!mapRef.current) return;
    const nextPitch = isPitch3D ? 0 : 50;
    mapRef.current.easeTo({
      pitch: nextPitch,
      duration: 600,
    });
    setIsPitch3D(!isPitch3D);
  };

  // Reset / Recenter View: Priority -> Live Location (if active/available) -> otherwise Recent Active City
  const handleResetView = () => {
    if (!mapRef.current) return;

    // 1. If user has active live location from context, fly directly to live position
    if (myLiveLocation?.approximateCoordinates) {
      mapRef.current.flyTo({
        center: myLiveLocation.approximateCoordinates,
        zoom: 15.0,
        pitch: isPitch3D ? 45 : 0,
        bearing: 0,
        duration: 1500,
        essential: true,
      });
      return;
    }

    // 2. If device location is known in state or localStorage, fly to it
    if (deviceLocation) {
      mapRef.current.flyTo({
        center: deviceLocation,
        zoom: 15.0,
        pitch: isPitch3D ? 45 : 0,
        bearing: 0,
        duration: 1500,
        essential: true,
      });
      return;
    }

    // 3. If browser has geolocation permission, fetch device live coordinates
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords: [number, number] = [pos.coords.longitude, pos.coords.latitude];
          setDeviceLocation(coords);
          localStorage.setItem('roommate_live_location', JSON.stringify(coords));
          mapRef.current?.flyTo({
            center: coords,
            zoom: 15.0,
            pitch: isPitch3D ? 45 : 0,
            bearing: 0,
            duration: 1500,
            essential: true,
          });
        },
        () => {
          // Fallback: Recenter to the user's active/recent city (e.g. Mumbai)
          const storedCity = localStorage.getItem('roommate_last_city');
          const cityKey = (activeCity || storedCity || selectedCity || 'bengaluru').toLowerCase();
          const config = CITY_COORDINATES[cityKey] || CITY_COORDINATES.bengaluru;

          mapRef.current?.flyTo({
            center: config.center,
            zoom: config.zoom,
            pitch: isPitch3D ? 45 : 0,
            bearing: -10,
            duration: 1500,
            essential: true,
          });
        },
        { timeout: 3000, enableHighAccuracy: true }
      );
      return;
    }

    // 4. Default Fallback: Recenter to current active/recent city
    const storedCity = localStorage.getItem('roommate_last_city');
    const cityKey = (activeCity || storedCity || selectedCity || 'bengaluru').toLowerCase();
    const config = CITY_COORDINATES[cityKey] || CITY_COORDINATES.bengaluru;

    mapRef.current.flyTo({
      center: config.center,
      zoom: config.zoom,
      pitch: isPitch3D ? 45 : 0,
      bearing: -10,
      duration: 1500,
      essential: true,
    });

    setSelectedRoom(null);
    setSelectedPerson(null);
    setSelectedDestination(null);
    setSelectedNeighborhood(null);
    setSelectedLiveItem(null);
    handleClearRoute();
  };

  // -------------------------------------------------------------
  // PHASE 7: ROUTING & NAVIGATION ENGINE
  // -------------------------------------------------------------
  const handleRequestDirections = useCallback(
    async (req: DirectionsRequest) => {
      // Dismiss open cards so navigation has clean focus
      setSelectedRoom(null);
      setSelectedDestination(null);
      setSelectedNeighborhood(null);
      setSelectedPerson(null);
      setSelectedLiveItem(null);

      const cityKey = selectedCity?.toLowerCase() || 'bengaluru';
      const cityConfig = CITY_COORDINATES[cityKey] || CITY_COORDINATES.bengaluru;

      const originCoords: [number, number] = deviceLocation || [
        cityConfig.center[0] - 0.012,
        cityConfig.center[1] - 0.010,
      ];
      const originLabel = deviceLocation
        ? 'Your Location'
        : `${selectedCity ? selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1) : 'Bengaluru'} Station`;

      if (!deviceLocation && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const userLng = pos.coords.longitude;
            const userLat = pos.coords.latitude;
            setDeviceLocation([userLng, userLat]);
          },
          () => {},
          { timeout: 3000 }
        );
      }

      setActiveRouteState({
        origin: originCoords,
        originName: originLabel,
        destination: req.coordinates,
        destinationTitle: req.title,
        destinationSubtitle: req.subtitle,
        destinationType: req.type,
        activeMode: 'driving',
        routes: [],
        selectedRouteIndex: 0,
        isLoading: true,
        error: null,
      });

      try {
        const routes = await calculateRoute(originCoords, req.coordinates, 'driving');
        setActiveRouteState((prev) =>
          prev
            ? {
                ...prev,
                routes,
                selectedRouteIndex: 0,
                isLoading: false,
                error: null,
              }
            : null
        );

        if (routes.length > 0) {
          drawRouteOnMap(routes[0].coordinates);
        }
      } catch (err: any) {
        setActiveRouteState((prev) =>
          prev
            ? {
                ...prev,
                isLoading: false,
                error: err?.message || 'Route calculation failed',
              }
            : null
        );
      }
    },
    [selectedCity, deviceLocation, drawRouteOnMap]
  );

  const handleRouteModeChange = useCallback(
    async (mode: TransportMode) => {
      if (!activeRouteState) return;

      setActiveRouteState((prev) => (prev ? { ...prev, activeMode: mode, isLoading: true } : null));

      try {
        const routes = await calculateRoute(
          activeRouteState.origin,
          activeRouteState.destination,
          mode
        );
        setActiveRouteState((prev) =>
          prev
            ? {
                ...prev,
                routes,
                selectedRouteIndex: 0,
                isLoading: false,
              }
            : null
        );

        if (routes.length > 0) {
          drawRouteOnMap(routes[0].coordinates);
        }
      } catch (err: any) {
        setActiveRouteState((prev) =>
          prev
            ? {
                ...prev,
                isLoading: false,
                error: err?.message || 'Failed to update transport mode',
              }
            : null
        );
      }
    },
    [activeRouteState, drawRouteOnMap]
  );

  const handleSelectRouteIndex = useCallback(
    (index: number) => {
      if (!activeRouteState || !activeRouteState.routes[index]) return;
      setActiveRouteState((prev) => (prev ? { ...prev, selectedRouteIndex: index } : null));
      drawRouteOnMap(activeRouteState.routes[index].coordinates);
    },
    [activeRouteState, drawRouteOnMap]
  );

  // Near Me Control (local single-shot view with ◎ You marker)
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      setGeoNotice('Geolocation is not supported by your browser.');
      setTimeout(() => setGeoNotice(null), 4000);
      return;
    }

    setLocatingUser(true);
    setGeoNotice(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocatingUser(false);
        const { latitude, longitude } = position.coords;

        if (!mapRef.current) return;

        mapRef.current.flyTo({
          center: [longitude, latitude],
          zoom: 15,
          pitch: isPitch3D ? 45 : 0,
          duration: 2000,
          essential: true,
        });

        if (userMarkerRef.current) {
          userMarkerRef.current.setLngLat([longitude, latitude]);
        } else {
          const el = document.createElement('div');
          el.className = 'roommate-user-location-marker';
          el.innerHTML = `
            <div class="relative flex items-center justify-center">
              <div class="absolute w-8 h-8 rounded-full bg-vitality-coral/25 animate-ping"></div>
              <div class="absolute w-6 h-6 rounded-full bg-vitality-coral/40"></div>
              <div class="relative w-3.5 h-3.5 rounded-full bg-vitality-coral border-2 border-white shadow-md"></div>
            </div>
          `;

          const marker = new Marker({ element: el })
            .setLngLat([longitude, latitude])
            .addTo(mapRef.current);

          userMarkerRef.current = marker;
        }

        setGeoNotice('Device position acquired (Near Me view)');
        setTimeout(() => setGeoNotice(null), 4000);
      },
      (error) => {
        setLocatingUser(false);
        let msg = 'Unable to retrieve location.';
        if (error.code === error.PERMISSION_DENIED) {
          msg = 'Location access was denied. You can navigate the map manually.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = 'Location information is currently unavailable.';
        } else if (error.code === error.TIMEOUT) {
          msg = 'Location request timed out.';
        }
        setGeoNotice(msg);
        setTimeout(() => setGeoNotice(null), 5000);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000,
      }
    );
  };

  // Smart Search Result Selection
  const handleSelectSearchResult = (item: SearchResultItem) => {
    if (!mapRef.current) return;

    mapRef.current.flyTo({
      center: item.coordinates,
      zoom:
        item.type === 'destination' || item.type === 'city'
          ? 12.5
          : item.type === 'neighborhood'
          ? 13.8
          : 14.5,
      pitch: isPitch3D ? 40 : 0,
      duration: 1500,
      essential: true,
    });

    if (item.type === 'room' && item.data) {
      setSelectedRoom(item.data);
      setSelectedPerson(null);
      setSelectedDestination(null);
      setSelectedNeighborhood(null);
      setSelectedLiveItem(null);
    } else if (item.type === 'person' && item.data) {
      setSelectedPerson(item.data);
      setSelectedRoom(null);
      setSelectedDestination(null);
      setSelectedNeighborhood(null);
      setSelectedLiveItem(null);
    } else if (item.type === 'destination' && item.data) {
      setSelectedDestination(item.data);
      setSelectedRoom(null);
      setSelectedPerson(null);
      setSelectedNeighborhood(null);
      setSelectedLiveItem(null);
    } else if (item.type === 'neighborhood' && item.data) {
      setSelectedNeighborhood(item.data);
      setSelectedRoom(null);
      setSelectedPerson(null);
      setSelectedDestination(null);
      setSelectedLiveItem(null);
    }
  };

  const isDataLoading = isLoadingDiscover || isLoadingDestinations;
  const isDataError = isDiscoverError || isDestinationsError;
  const isFilterActive =
    (filterOptions.maxBudget || 0) < 50000 ||
    filterOptions.chronotypes.length > 0 ||
    filterOptions.lifestyleTraits.length > 0;

  return (
    <div className={`relative w-full h-full min-h-screen overflow-hidden ${className}`}>
      {/* MapLibre DOM Canvas */}
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" />

      {/* Upper-Left Editorial Hero Header in a Translucent Frosted Glass Card */}
      <div className="absolute top-36 sm:top-40 left-6 sm:left-8 z-30 pointer-events-none max-w-sm sm:max-w-md lg:max-w-lg select-none">
        <div className="bg-[#fcf8fa]/90 dark:bg-[#1e2433]/90 backdrop-blur-xl border border-[#dcd9db]/60 dark:border-white/20 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-2 pointer-events-auto transition-all">
          <div className="flex items-center gap-2 text-vitality-coral font-sans text-xs font-bold tracking-widest uppercase">
            <span className="w-5 h-[2px] bg-vitality-coral inline-block"></span>
            <span>Interactive Geographic Map</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-earth-indigo dark:text-white leading-tight">
            Spatial District <br />
            <span className="font-serif italic font-normal text-secondary dark:text-surface-dim">Geographic Vector Canvas</span>
          </h1>
          <p className="text-xs sm:text-sm text-secondary dark:text-surface-dim font-sans leading-relaxed pt-1">
            Explore neighborhoods, transport hubs, and curated roommate clusters across Bengaluru, Mumbai, and Pune.
          </p>
        </div>
      </div>

      {/* Top Map Layer Filter Bar & Filter Button (Fixed Centered) */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
        <MapFilterBar
          filter={filter}
          onFilterChange={(f) => {
            setFilter(f);
            setSelectedRoom(null);
            setSelectedPerson(null);
            setSelectedLiveItem(null);
            setSelectedDestination(null);
            setSelectedNeighborhood(null);
          }}
          roomCount={validRooms.length}
          peopleCount={validPeople.length}
          liveCount={validLiveItems.length}
          destinationCount={validDestinations.length}
          nearbyCount={currentCityNeighborhoods.length}
          onOpenFilterModal={() => setIsFilterModalOpen(true)}
          isFilterActive={isFilterActive}
        />
      </div>

      {/* Bottom-Left Controls: City Navigation Pills + Smart Search Bar + Map Legend */}
      <div className="absolute bottom-6 left-4 sm:bottom-8 sm:left-8 z-30 flex flex-col gap-2 pointer-events-auto">
        {/* Quick City Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none max-w-[calc(100vw-3rem)]">
          {[
            { id: 'bengaluru', name: 'Bengaluru' },
            { id: 'mumbai', name: 'Mumbai' },
            { id: 'pune', name: 'Pune' },
            { id: 'delhi', name: 'Delhi NCR' },
          ].map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => handleSwitchCity(c.id)}
              className={`px-3.5 py-1.5 rounded-full font-sans text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 backdrop-blur-xl border shrink-0 ${
                activeCity === c.id
                  ? 'bg-vitality-coral text-white border-vitality-coral shadow-lg'
                  : 'bg-[#fcf8fa]/90 dark:bg-[#1e2433]/90 text-earth-indigo dark:text-white border-[#dcd9db]/60 dark:border-white/20 shadow-md hover:border-vitality-coral'
              }`}
            >
              <MapPin className="w-3 h-3" />
              <span>{c.name}</span>
            </button>
          ))}
        </div>

        {/* Smart Search Bar + Map Legend */}
        <div className="flex items-center gap-2">
          <SmartSearchBar
            rooms={validRooms}
            people={validPeople}
            destinations={validDestinations}
            neighborhoods={SPACES_NEIGHBORHOODS}
            onSelectResult={handleSelectSearchResult}
            placeholder="Search neighborhoods, rooms, flatmates..."
          />
          <MapLegend />
        </div>
      </div>

      {/* Nearby Exploration Drawer (When filter === 'nearby') */}
      <NearbyDrawer
        isOpen={filter === 'nearby'}
        onClose={() => setFilter('all')}
        neighborhoods={SPACES_NEIGHBORHOODS}
        rooms={validRooms}
        people={validPeople}
        currentCity={selectedCity || 'bengaluru'}
        onSelectNeighborhood={(n) => {
          setSelectedNeighborhood(n);
          if (mapRef.current) {
            mapRef.current.flyTo({
              center: n.coordinates,
              zoom: 13.8,
              pitch: 35,
              duration: 1200,
              essential: true,
            });
          }
        }}
      />

      {/* Live Location Control Panel (Bottom-Right) */}
      <LiveLocationControlPanel />

      {/* Map Filter Modal */}
      <MapFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filterOptions}
        onApplyFilters={(newFilters) => setFilterOptions(newFilters)}
        onResetFilters={() =>
          setFilterOptions({
            minBudget: 0,
            maxBudget: 50000,
            chronotypes: [],
            lifestyleTraits: [],
            availableNowOnly: false,
          })
        }
      />

      {/* Explicit Consent Permission Modal */}
      <LivePermissionModal
        isOpen={isPermissionModalOpen}
        onCancel={cancelPermissionModal}
        onConfirm={confirmStartSharing}
      />

      {/* Spatial Privacy Center Modal */}
      <PrivacyCenterModal
        isOpen={isPrivacyCenterOpen}
        onClose={closePrivacyCenter}
      />

      {/* Contextual Preview Cards & Route Navigation Panel (Desktop & Mobile) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-8 md:translate-x-0 z-30 pointer-events-auto">
        {activeRouteState && (
          <RouteNavigationPanel
            routeState={activeRouteState}
            onModeChange={handleRouteModeChange}
            onSelectRouteIndex={handleSelectRouteIndex}
            onClearRoute={handleClearRoute}
            onRetry={() => {
              if (activeRouteState) {
                handleRequestDirections({
                  title: activeRouteState.destinationTitle,
                  subtitle: activeRouteState.destinationSubtitle,
                  coordinates: activeRouteState.destination,
                  type: activeRouteState.destinationType,
                });
              }
            }}
          />
        )}

        {!activeRouteState && selectedRoom && (
          <RoomPreviewCard
            room={selectedRoom}
            onClose={() => setSelectedRoom(null)}
            onDirections={(r) =>
              handleRequestDirections({
                title: r.title,
                subtitle: `${r.neighborhood}, ${r.city}`,
                coordinates: r.coordinates,
                type: 'room',
              })
            }
            onExploreNeighborhood={(nName) => {
              const found = SPACES_NEIGHBORHOODS.find(
                (n) =>
                  n.name.toLowerCase().includes(nName.toLowerCase()) ||
                  nName.toLowerCase().includes(n.name.toLowerCase())
              );
              if (found) {
                setSelectedNeighborhood(found);
                setSelectedRoom(null);
                if (mapRef.current) {
                  mapRef.current.flyTo({
                    center: found.coordinates,
                    zoom: 13.8,
                    duration: 1200,
                    essential: true,
                  });
                }
              }
            }}
          />
        )}

        {!activeRouteState && selectedPerson && (
          <PersonPreviewCard
            person={selectedPerson}
            onClose={() => setSelectedPerson(null)}
          />
        )}

        {!activeRouteState && selectedDestination && (
          <DestinationPreviewCard
            destination={selectedDestination}
            onClose={() => setSelectedDestination(null)}
            onDirections={(d) =>
              handleRequestDirections({
                title: d.city,
                subtitle: d.country,
                coordinates: d.coordinates,
                type: 'destination',
              })
            }
          />
        )}

        {!activeRouteState && selectedLiveItem && (
          <LivePreviewCard
            liveItem={selectedLiveItem}
            onClose={() => setSelectedLiveItem(null)}
          />
        )}

        {!activeRouteState && selectedNeighborhood && (
          <NeighborhoodIntelligencePanel
            intelligence={computeNeighborhoodIntelligence(
              selectedNeighborhood,
              validRooms,
              validPeople,
              { min: 18000, max: 35000 }
            )}
            onClose={() => setSelectedNeighborhood(null)}
            onFilterRooms={() => setFilter('rooms')}
            onFilterPeople={() => setFilter('people')}
            onDirections={(n) =>
              handleRequestDirections({
                title: n.name,
                subtitle: `${n.city} District`,
                coordinates: n.coordinates,
                type: 'neighborhood',
              })
            }
            onCompare={(n) => {
              setComparisonNeighborhood(n);
              setIsComparisonModalOpen(true);
            }}
          />
        )}
      </div>

      {/* Side-by-Side Neighborhood Comparison Modal */}
      <NeighborhoodComparisonModal
        isOpen={isComparisonModalOpen}
        onClose={() => setIsComparisonModalOpen(false)}
        primaryNeighborhood={comparisonNeighborhood || selectedNeighborhood}
        allNeighborhoods={SPACES_NEIGHBORHOODS}
        rooms={validRooms}
        people={validPeople}
        onSelectNeighborhood={(n) => {
          setSelectedNeighborhood(n);
          setSelectedRoom(null);
          setSelectedPerson(null);
          setSelectedDestination(null);
          if (mapRef.current) {
            mapRef.current.flyTo({
              center: n.coordinates,
              zoom: 13.8,
              duration: 1200,
              essential: true,
            });
          }
        }}
      />

      {/* Data Loading Status Pill (Positioned below Filter Bar to prevent overlap) */}
      {isDataLoading && (
        <div className="absolute top-34 left-1/2 -translate-x-1/2 z-20 bg-clay/90 dark:bg-earth-container/90 backdrop-blur-xl border border-surface-dim dark:border-white/20 text-earth-indigo px-3.5 py-1.5 rounded-full shadow-lg font-sans text-xs font-bold flex items-center gap-2">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-vitality-coral" />
          <span>Syncing cohabitants & spaces...</span>
        </div>
      )}

      {/* Data Error Notification (Positioned below Filter Bar to prevent overlap) */}
      {isDataError && (
        <div className="absolute top-34 left-1/2 -translate-x-1/2 z-20 bg-red-600/90 text-white px-4 py-2 rounded-full shadow-2xl font-sans text-xs font-bold flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>People & rooms couldn't be loaded.</span>
          <button
            type="button"
            onClick={() => {
              refetchDiscover();
              refetchDestinations();
            }}
            className="underline ml-2 flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Try Again</span>
          </button>
        </div>
      )}

      {/* Fallback Notice for Unconfigured MapTiler API Key */}
      {!apiKey && (
        <div className="absolute top-34 left-6 right-6 md:left-auto md:right-6 md:w-96 z-20 bg-amber-500/90 dark:bg-amber-600/95 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl border border-amber-400 font-sans text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold">
            <AlertTriangle className="w-4 h-4 text-white shrink-0" />
            <span>MapTiler API Key Not Configured</span>
          </div>
          <p className="text-[11px] leading-relaxed text-amber-50">
            Running in fallback mode. To enable full MapTiler vector tiles, add your key to:
          </p>
          <code className="block bg-black/30 p-2 rounded-lg text-[10px] font-mono text-amber-200 break-all">
            client/.env &rarr; VITE_MAPTILER_API_KEY=YOUR_KEY
          </code>
        </div>
      )}

      {/* Critical Map Error */}
      {mapError && (
        <div className="absolute top-34 left-6 right-6 md:left-auto md:right-6 md:w-96 z-20 bg-red-600/95 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl font-sans text-xs space-y-1">
          <div className="flex items-center gap-2 font-bold">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Map Tile Error</span>
          </div>
          <p className="text-[11px] leading-relaxed">{mapError}</p>
        </div>
      )}

      {/* Geolocation Toast Notification */}
      {geoNotice && (
        <div className="absolute top-34 left-1/2 -translate-x-1/2 z-30 bg-clay/95 dark:bg-earth-container/95 backdrop-blur-xl border border-surface-dim dark:border-white/20 text-earth-indigo px-4 py-2.5 rounded-full shadow-2xl font-sans text-xs font-bold flex items-center gap-2 transition-all">
          <span>{geoNotice}</span>
        </div>
      )}

      {/* Floating Map Controls (Top-Right) */}
      <div className="absolute top-20 right-6 z-20 flex flex-col gap-2 pointer-events-auto">
        {/* Near Me / Locate User Button */}
        <button
          type="button"
          onClick={handleLocateMe}
          disabled={locatingUser}
          className="p-3 bg-[#fcf8fa]/90 dark:bg-[#1e2433]/90 backdrop-blur-xl border border-[#dcd9db]/60 dark:border-white/20 text-earth-indigo dark:text-white rounded-2xl shadow-xl hover:border-vitality-coral hover:text-vitality-coral transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center"
          title="Near Me — Locate your device position"
          aria-label="Near Me"
        >
          {locatingUser ? (
            <Loader2 className="w-5 h-5 animate-spin text-vitality-coral" />
          ) : (
            <Navigation className="w-5 h-5" />
          )}
        </button>

        {/* Reset View Button */}
        <button
          type="button"
          onClick={handleResetView}
          className="p-3 bg-[#fcf8fa]/90 dark:bg-[#1e2433]/90 backdrop-blur-xl border border-[#dcd9db]/60 dark:border-white/20 text-earth-indigo dark:text-white rounded-2xl shadow-xl hover:border-vitality-coral hover:text-vitality-coral transition-all cursor-pointer flex items-center justify-center"
          title="Reset View — Return to default city perspective"
          aria-label="Reset View"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        {/* 3D / 2D Tilt Toggle */}
        <button
          type="button"
          onClick={handleTogglePitch}
          className={`p-3 backdrop-blur-xl border rounded-2xl shadow-xl transition-all cursor-pointer flex items-center justify-center font-sans text-xs font-bold ${
            isPitch3D
              ? 'bg-vitality-coral text-white border-vitality-coral shadow-lg'
              : 'bg-[#fcf8fa]/90 dark:bg-[#1e2433]/90 border-[#dcd9db]/60 dark:border-white/20 text-earth-indigo dark:text-white hover:border-vitality-coral'
          }`}
          title="Toggle 3D Perspective"
          aria-label="Toggle 3D Perspective"
        >
          3D
        </button>

        {/* Compass / Reset North */}
        <button
          type="button"
          onClick={handleResetNorth}
          className="p-3 bg-[#fcf8fa]/90 dark:bg-[#1e2433]/90 backdrop-blur-xl border border-[#dcd9db]/60 dark:border-white/20 text-earth-indigo dark:text-white rounded-2xl shadow-xl hover:border-vitality-coral hover:text-vitality-coral transition-all cursor-pointer flex items-center justify-center"
          title="Reset Bearing to North"
          aria-label="Reset Bearing to North"
        >
          <Compass className="w-5 h-5" />
        </button>

        {/* Zoom Controls */}
        <div className="flex flex-col rounded-2xl overflow-hidden border border-[#dcd9db]/60 dark:border-white/20 shadow-xl bg-[#fcf8fa]/90 dark:bg-[#1e2433]/90 backdrop-blur-xl">
          <button
            type="button"
            onClick={handleZoomIn}
            className="p-3 text-earth-indigo dark:text-white hover:bg-surface-dim dark:hover:bg-white/10 hover:text-vitality-coral transition-all cursor-pointer flex items-center justify-center"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <Plus className="w-5 h-5" />
          </button>
          <div className="h-[1px] bg-surface-dim/60 dark:bg-white/10 w-full" />
          <button
            type="button"
            onClick={handleZoomOut}
            className="p-3 text-earth-indigo dark:text-white hover:bg-surface-dim dark:hover:bg-white/10 hover:text-vitality-coral transition-all cursor-pointer flex items-center justify-center"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <Minus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
