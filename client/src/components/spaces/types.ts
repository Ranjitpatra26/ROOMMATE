export type MapFilterType = 'all' | 'rooms' | 'people' | 'live' | 'destinations' | 'nearby';

export interface RoomMapItem {
  id: string;
  title: string;
  description: string;
  city: string;
  neighborhood: string;
  state: string;
  coordinates: [number, number]; // [longitude, latitude]
  monthlyRent: number;
  deposit?: number;
  status: string;
  imageUrl?: string;
  roommatesCount: number;
}

export interface DestinationMapItem {
  id: string;
  city: string;
  country: string;
  availableRoomsCount: number;
  communityCount: number;
  heroImageUrl: string;
  coordinates: [number, number]; // [longitude, latitude]
}

export interface PersonMapItem {
  id: string;
  userId: string;
  displayName: string;
  headline: string;
  avatarUrl: string;
  bio: string;
  neighborhood: string;
  city: string;
  coordinates: [number, number]; // [longitude, latitude]
  budgetRange?: {
    min: number;
    max: number;
    currency: string;
  };
  lifestyleDNA?: {
    chronotype: string;
    cleanlinessLevel: number;
    socialEnergy: number;
    workStyle: string;
    guestPolicy: string;
    petTolerance?: string[];
    smokingTolerance?: boolean;
  };
  visualTags?: string[];
  compatibilityScore?: number;
  connectionInsights?: string[];
  trustProfile?: {
    reputationScore: number;
    verificationTier: string;
    isIdVerified: boolean;
    isEmploymentVerified: boolean;
    employer?: string;
  };
}

export interface LiveLocationItem {
  userId: string;
  displayName: string;
  avatarUrl?: string;
  neighborhood?: string;
  city?: string;
  approximateCoordinates: [number, number]; // [longitude, latitude]
  accuracyRadius?: number;
  visibility: 'roommates' | 'matches' | 'nobody';
  status: 'sharing' | 'paused';
  ghostMode?: boolean;
  lastUpdated: number; // timestamp
  isStale?: boolean;
  isCurrentUser?: boolean;
}

export interface UserPrivacyState {
  userId: string;
  ghostMode: boolean;
  visibility: 'roommates' | 'matches' | 'nobody';
}

export interface NeighborhoodMapItem {
  id: string;
  name: string;
  city: string;
  cityId: string;
  coordinates: [number, number]; // [longitude, latitude]
  roomsCount: number;
  avgRent: string;
  walkability: string;
  transit: string;
  vibe: string;
  description: string;
  imageUrl?: string;
}

export interface SearchResultItem {
  id: string;
  type: 'neighborhood' | 'room' | 'person' | 'destination' | 'city' | 'place';
  title: string;
  subtitle: string;
  city?: string;
  coordinates: [number, number]; // [longitude, latitude]
  data?: RoomMapItem | PersonMapItem | DestinationMapItem | NeighborhoodMapItem | any;
}

export interface MapFilterOptions {
  minBudget: number;
  maxBudget: number;
  chronotypes: string[];
  lifestyleTraits: string[];
  availableNowOnly: boolean;
}

// Phase 7: Routes & Navigation Types
export type TransportMode = 'walking' | 'driving' | 'cycling';

export interface RouteOption {
  id: string;
  mode: TransportMode;
  label: string; // 'Recommended' | 'Alternative'
  distanceMeters: number;
  distanceKm: string;
  durationSeconds: number;
  durationFormatted: string;
  coordinates: [number, number][]; // GeoJSON LineString coordinates [[lng, lat], ...]
}

export interface ActiveRouteState {
  origin: [number, number];
  originName: string;
  destination: [number, number];
  destinationTitle: string;
  destinationSubtitle?: string;
  destinationType: 'room' | 'destination' | 'neighborhood' | 'place';
  activeMode: TransportMode;
  routes: RouteOption[];
  selectedRouteIndex: number;
  isLoading: boolean;
  error?: string | null;
}

export interface DirectionsRequest {
  title: string;
  subtitle?: string;
  coordinates: [number, number];
  type: 'room' | 'destination' | 'neighborhood' | 'place';
}

// Phase 8: Neighborhood Intelligence & Area Insights Types
export interface LifestyleSignal {
  label: string;
  count: number;
  percentage: number;
  icon?: string;
}

export interface NeighborhoodIntelligence {
  neighborhood: NeighborhoodMapItem;
  roomStats: {
    totalRooms: number;
    minRent: number;
    avgRent: number;
    maxRent: number;
    formattedRange: string;
    hasData: boolean;
  };
  peopleStats: {
    totalPeople: number;
    verifiedCount: number;
    topLifestyles: LifestyleSignal[];
    hasData: boolean;
  };
  budgetFit: {
    status: 'excellent' | 'moderate' | 'above_budget' | 'no_budget';
    message: string;
    matchingRoomsCount: number;
    userBudgetRange?: string;
  };
  relevanceReasons: string[];
  commute?: {
    targetName: string;
    drivingDuration: string;
    walkingDuration: string;
    distanceKm: string;
  };
}
