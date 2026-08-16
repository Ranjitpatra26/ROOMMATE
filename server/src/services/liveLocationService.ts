/**
 * In-Memory Ephemeral Live Location Service
 * Phase 4 & Phase 5: Privacy-First, Real-Time Location & Ghost Mode Architecture
 *
 * CRITICAL PRIVACY ARCHITECTURE:
 * 1. Coordinates are NEVER written to MongoDB or any persistent database.
 * 2. Exact GPS coordinates are truncated/quantized to neighborhood level (~110m resolution).
 * 3. Ghost Mode is strictly enforced on the server-side (rejects & suppresses broadcasts).
 * 4. Inactive/stale locations automatically expire and prune after 3 minutes.
 * 5. Rate-limited to max 1 update per 3 seconds per client.
 */

export interface ActiveLiveLocation {
  userId: string;
  socketId: string;
  displayName: string;
  avatarUrl?: string;
  neighborhood?: string;
  city?: string;
  approximateCoordinates: [number, number]; // [longitude, latitude]
  accuracyRadius?: number;
  visibility: 'roommates' | 'matches' | 'nobody';
  status: 'sharing' | 'paused';
  ghostMode?: boolean;
  lastUpdated: number; // Unix epoch ms
  isStale?: boolean;
}

export interface UserPrivacyState {
  userId: string;
  ghostMode: boolean;
  visibility: 'roommates' | 'matches' | 'nobody';
}

// In-memory ephemeral map: userId -> ActiveLiveLocation
const activeLocations = new Map<string, ActiveLiveLocation>();

// In-memory privacy state map: userId -> UserPrivacyState
const userPrivacyStateMap = new Map<string, UserPrivacyState>();

// In-memory rate limiting map: userId -> lastUpdateMs
const lastUpdateMap = new Map<string, number>();

// Configuration parameters
export const LOCATION_CONFIG = {
  PRIVACY_PRECISION_DECIMALS: 3, // ~110m resolution (safe neighborhood block)
  RATE_LIMIT_MIN_INTERVAL_MS: 3000, // 3 seconds between GPS broadcasts
  STALE_TIMEOUT_MS: 120000, // 2 minutes until marked stale
  PRUNE_TIMEOUT_MS: 180000, // 3 minutes until completely removed
};

/**
 * Truncate coordinate to privacy-safe precision
 */
export const roundToPrivacyPrecision = (val: number): number => {
  const factor = Math.pow(10, LOCATION_CONFIG.PRIVACY_PRECISION_DECIMALS);
  return Math.round(val * factor) / factor;
};

/**
 * Validate coordinates
 */
export const validateCoordinates = (coords: any): coords is [number, number] => {
  if (!Array.isArray(coords) || coords.length !== 2) return false;
  const [lng, lat] = coords;
  if (typeof lng !== 'number' || typeof lat !== 'number') return false;
  if (isNaN(lng) || isNaN(lat) || !isFinite(lng) || !isFinite(lat)) return false;
  if (lat < -90 || lat > 90) return false;
  if (lng < -180 || lng > 180) return false;
  return true;
};

/**
 * Check rate limit (max 1 update per 3s)
 */
export const isRateLimited = (userId: string): boolean => {
  const now = Date.now();
  const lastTime = lastUpdateMap.get(userId) || 0;
  if (now - lastTime < LOCATION_CONFIG.RATE_LIMIT_MIN_INTERVAL_MS) {
    return true;
  }
  lastUpdateMap.set(userId, now);
  return false;
};

export const LiveLocationService = {
  /**
   * Retrieve or initialize user privacy state
   */
  getUserPrivacy(userId: string): UserPrivacyState {
    const existing = userPrivacyStateMap.get(userId);
    if (existing) return existing;

    const defaultState: UserPrivacyState = {
      userId,
      ghostMode: false,
      visibility: 'roommates',
    };
    userPrivacyStateMap.set(userId, defaultState);
    return defaultState;
  },

  /**
   * Enable Ghost Mode on the server (conceals user location and purges active broadcast)
   */
  enableGhostMode(userId: string): { success: boolean; userId: string } {
    const state = this.getUserPrivacy(userId);
    state.ghostMode = true;
    userPrivacyStateMap.set(userId, state);

    // Immediately remove from active live broadcast memory
    activeLocations.delete(userId);
    lastUpdateMap.delete(userId);

    return { success: true, userId };
  },

  /**
   * Disable Ghost Mode on the server (location remains OFF until user explicitly starts sharing)
   */
  disableGhostMode(userId: string): { success: boolean; userId: string } {
    const state = this.getUserPrivacy(userId);
    state.ghostMode = false;
    userPrivacyStateMap.set(userId, state);

    return { success: true, userId };
  },

  /**
   * Update visibility setting
   */
  updateVisibility(
    userId: string,
    visibility: 'roommates' | 'matches' | 'nobody'
  ): UserPrivacyState {
    const state = this.getUserPrivacy(userId);
    state.visibility = visibility;
    userPrivacyStateMap.set(userId, state);

    const active = activeLocations.get(userId);
    if (active) {
      active.visibility = visibility;
      activeLocations.set(userId, active);
    }

    return state;
  },

  /**
   * Start live location sharing for a verified user
   */
  startSharing(
    userId: string,
    socketId: string,
    payload: {
      displayName: string;
      avatarUrl?: string;
      neighborhood?: string;
      city?: string;
      coordinates: [number, number];
      accuracyRadius?: number;
      visibility?: 'roommates' | 'matches' | 'nobody';
    }
  ): ActiveLiveLocation | null {
    // Check if Ghost Mode is active on the server
    const privacy = this.getUserPrivacy(userId);
    if (privacy.ghostMode) {
      // Server suppresses live sharing if Ghost Mode is enabled
      return null;
    }

    if (!validateCoordinates(payload.coordinates)) {
      return null;
    }

    const safeCoords: [number, number] = [
      roundToPrivacyPrecision(payload.coordinates[0]),
      roundToPrivacyPrecision(payload.coordinates[1]),
    ];

    const visibilitySetting = payload.visibility || privacy.visibility || 'roommates';
    privacy.visibility = visibilitySetting;
    userPrivacyStateMap.set(userId, privacy);

    const locationRecord: ActiveLiveLocation = {
      userId,
      socketId,
      displayName: payload.displayName || 'Cohabitant',
      avatarUrl: payload.avatarUrl,
      neighborhood: payload.neighborhood || 'Neighborhood',
      city: payload.city || 'Bengaluru',
      approximateCoordinates: safeCoords,
      accuracyRadius: payload.accuracyRadius || 150,
      visibility: visibilitySetting,
      status: 'sharing',
      ghostMode: false,
      lastUpdated: Date.now(),
      isStale: false,
    };

    activeLocations.set(userId, locationRecord);
    lastUpdateMap.set(userId, Date.now());
    return locationRecord;
  },

  /**
   * Update active location (server-side rejects if in Ghost Mode)
   */
  updateLocation(
    userId: string,
    coordinates: [number, number],
    accuracyRadius?: number
  ): ActiveLiveLocation | null {
    const privacy = this.getUserPrivacy(userId);
    if (privacy.ghostMode) {
      // Server-side enforcement: block GPS updates when in Ghost Mode
      return null;
    }

    const existing = activeLocations.get(userId);
    if (!existing) return null;

    if (!validateCoordinates(coordinates)) {
      return null;
    }

    if (isRateLimited(userId)) {
      return existing; // Throttled, return last known valid state
    }

    const safeCoords: [number, number] = [
      roundToPrivacyPrecision(coordinates[0]),
      roundToPrivacyPrecision(coordinates[1]),
    ];

    existing.approximateCoordinates = safeCoords;
    if (accuracyRadius) existing.accuracyRadius = accuracyRadius;
    existing.lastUpdated = Date.now();
    existing.isStale = false;
    existing.status = 'sharing';

    activeLocations.set(userId, existing);
    return existing;
  },

  /**
   * Pause location sharing
   */
  pauseSharing(userId: string): ActiveLiveLocation | null {
    const existing = activeLocations.get(userId);
    if (!existing) return null;
    existing.status = 'paused';
    existing.lastUpdated = Date.now();
    activeLocations.set(userId, existing);
    return existing;
  },

  /**
   * Resume location sharing
   */
  resumeSharing(userId: string): ActiveLiveLocation | null {
    const privacy = this.getUserPrivacy(userId);
    if (privacy.ghostMode) {
      return null;
    }

    const existing = activeLocations.get(userId);
    if (!existing) return null;
    existing.status = 'sharing';
    existing.lastUpdated = Date.now();
    activeLocations.set(userId, existing);
    return existing;
  },

  /**
   * Stop sharing and immediately remove active state
   */
  stopSharing(userId: string): boolean {
    lastUpdateMap.delete(userId);
    return activeLocations.delete(userId);
  },

  /**
   * Get all active locations authorized for recipient
   */
  getActiveLocations(requesterUserId?: string): ActiveLiveLocation[] {
    const now = Date.now();
    const result: ActiveLiveLocation[] = [];

    for (const [userId, loc] of activeLocations.entries()) {
      // Check if user is in Ghost Mode
      const privacy = userPrivacyStateMap.get(userId);
      if (privacy?.ghostMode) {
        continue;
      }

      // Expiration check
      const age = now - loc.lastUpdated;
      if (age > LOCATION_CONFIG.PRUNE_TIMEOUT_MS) {
        activeLocations.delete(userId);
        continue;
      }

      // Mark stale if needed
      loc.isStale = age > LOCATION_CONFIG.STALE_TIMEOUT_MS;

      // Visibility filter (private if nobody)
      if (loc.visibility === 'nobody' && loc.userId !== requesterUserId) {
        continue;
      }

      result.push(loc);
    }

    return result;
  },

  /**
   * Cleanup on socket disconnect
   */
  handleSocketDisconnect(socketId: string): string | null {
    for (const [userId, loc] of activeLocations.entries()) {
      if (loc.socketId === socketId) {
        activeLocations.delete(userId);
        lastUpdateMap.delete(userId);
        return userId;
      }
    }
    return null;
  },

  /**
   * Prune expired locations and return removed user IDs
   */
  pruneExpired(): string[] {
    const now = Date.now();
    const removed: string[] = [];

    for (const [userId, loc] of activeLocations.entries()) {
      if (now - loc.lastUpdated > LOCATION_CONFIG.PRUNE_TIMEOUT_MS) {
        activeLocations.delete(userId);
        lastUpdateMap.delete(userId);
        removed.push(userId);
      }
    }

    return removed;
  },

  /**
   * Clear all (for testing)
   */
  _resetAllForTests(): void {
    activeLocations.clear();
    userPrivacyStateMap.clear();
    lastUpdateMap.clear();
  },
};

// Periodic background cleanup interval (every 30 seconds)
setInterval(() => {
  LiveLocationService.pruneExpired();
}, 30000);
