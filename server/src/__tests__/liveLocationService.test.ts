import { describe, it, expect, beforeEach } from 'vitest';
import {
  LiveLocationService,
  validateCoordinates,
  roundToPrivacyPrecision,
  isRateLimited,
} from '../services/liveLocationService.js';

describe('Spatial Phase 4 & 5: Live Location, Privacy Center & Ghost Mode Service', () => {
  beforeEach(() => {
    LiveLocationService._resetAllForTests();
  });

  describe('1. Privacy Precision Layer', () => {
    it('truncates exact GPS coordinates to privacy-safe neighborhood precision (3 decimal places)', () => {
      const exactLat = 12.9784321;
      const exactLng = 77.6408765;

      const safeLat = roundToPrivacyPrecision(exactLat);
      const safeLng = roundToPrivacyPrecision(exactLng);

      expect(safeLat).toBe(12.978);
      expect(safeLng).toBe(77.641);
    });
  });

  describe('2. Coordinate Validation', () => {
    it('accepts valid coordinates [lng, lat]', () => {
      expect(validateCoordinates([77.5946, 12.9716])).toBe(true);
      expect(validateCoordinates([-73.9851, 40.7488])).toBe(true);
    });

    it('rejects invalid inputs, NaN, Infinity, and out-of-range latitude/longitude', () => {
      expect(validateCoordinates(null)).toBe(false);
      expect(validateCoordinates([NaN, 12.9])).toBe(false);
      expect(validateCoordinates([77.5, Infinity])).toBe(false);
      expect(validateCoordinates([77.5])).toBe(false);
      expect(validateCoordinates([200, 12.9])).toBe(false); // Lng > 180
      expect(validateCoordinates([77.5, 95])).toBe(false); // Lat > 90
    });
  });

  describe('3. Location Sharing Lifecycle', () => {
    it('starts live sharing with privacy-safe coordinates', () => {
      const record = LiveLocationService.startSharing('test-user-1', 'socket-abc-1', {
        displayName: 'Elena Rostova',
        neighborhood: 'Indiranagar',
        city: 'Bengaluru',
        coordinates: [77.641234, 12.978987],
        visibility: 'roommates',
      });

      expect(record).not.toBeNull();
      expect(record?.userId).toBe('test-user-1');
      expect(record?.status).toBe('sharing');
      expect(record?.approximateCoordinates).toEqual([77.641, 12.979]);

      const active = LiveLocationService.getActiveLocations();
      expect(active.some((l) => l.userId === 'test-user-1')).toBe(true);
    });

    it('pauses and resumes sharing', () => {
      LiveLocationService.startSharing('test-user-1', 'socket-abc-1', {
        displayName: 'Elena',
        coordinates: [77.641, 12.978],
      });

      const paused = LiveLocationService.pauseSharing('test-user-1');
      expect(paused?.status).toBe('paused');

      const resumed = LiveLocationService.resumeSharing('test-user-1');
      expect(resumed?.status).toBe('sharing');
    });

    it('stops sharing and immediately prunes from active state', () => {
      LiveLocationService.startSharing('test-user-1', 'socket-abc-1', {
        displayName: 'Elena',
        coordinates: [77.641, 12.978],
      });

      const stopped = LiveLocationService.stopSharing('test-user-1');
      expect(stopped).toBe(true);

      const active = LiveLocationService.getActiveLocations();
      expect(active.some((l) => l.userId === 'test-user-1')).toBe(false);
    });
  });

  describe('4. Ghost Mode Server-Side Enforcement (Phase 5)', () => {
    it('enabling Ghost Mode purges active location immediately and sets ghostMode true', () => {
      LiveLocationService.startSharing('test-user-1', 'socket-abc-1', {
        displayName: 'Elena',
        coordinates: [77.641, 12.978],
      });

      expect(LiveLocationService.getActiveLocations().length).toBe(1);

      const result = LiveLocationService.enableGhostMode('test-user-1');
      expect(result.success).toBe(true);
      expect(result.userId).toBe('test-user-1');

      // Must be immediately purged from active locations
      const active = LiveLocationService.getActiveLocations();
      expect(active.some((l) => l.userId === 'test-user-1')).toBe(false);

      const privacy = LiveLocationService.getUserPrivacy('test-user-1');
      expect(privacy.ghostMode).toBe(true);
    });

    it('server rejects startSharing and updateLocation when Ghost Mode is active', () => {
      LiveLocationService.enableGhostMode('test-user-ghost');

      // Attempt startSharing while ghostMode is ON
      const startResult = LiveLocationService.startSharing('test-user-ghost', 'socket-ghost', {
        displayName: 'Ghost User',
        coordinates: [77.641, 12.978],
      });
      expect(startResult).toBeNull();

      // Attempt updateLocation while ghostMode is ON
      const updateResult = LiveLocationService.updateLocation('test-user-ghost', [77.642, 12.979]);
      expect(updateResult).toBeNull();
    });

    it('disabling Ghost Mode leaves sharing status off until explicit opt-in', () => {
      LiveLocationService.enableGhostMode('test-user-1');
      const disableResult = LiveLocationService.disableGhostMode('test-user-1');

      expect(disableResult.success).toBe(true);
      const privacy = LiveLocationService.getUserPrivacy('test-user-1');
      expect(privacy.ghostMode).toBe(false);

      // Active locations must remain empty (no silent tracking)
      expect(LiveLocationService.getActiveLocations().length).toBe(0);
    });
  });

  describe('5. Visibility Authorization Rules (Phase 5)', () => {
    it('nobody visibility is only visible to the user themselves and hidden from others', () => {
      LiveLocationService.startSharing('private-user', 'socket-priv-1', {
        displayName: 'Private User',
        coordinates: [77.641, 12.978],
        visibility: 'nobody',
      });

      // Other user queries active locations
      const viewersList = LiveLocationService.getActiveLocations('other-user-id');
      expect(viewersList.some((l) => l.userId === 'private-user')).toBe(false);

      // Same user queries active locations
      const ownList = LiveLocationService.getActiveLocations('private-user');
      expect(ownList.some((l) => l.userId === 'private-user')).toBe(true);
    });

    it('updates visibility dynamically', () => {
      LiveLocationService.startSharing('test-user-1', 'socket-abc-1', {
        displayName: 'Elena',
        coordinates: [77.641, 12.978],
        visibility: 'roommates',
      });

      const updatedPrivacy = LiveLocationService.updateVisibility('test-user-1', 'matches');
      expect(updatedPrivacy.visibility).toBe('matches');

      const loc = LiveLocationService.getActiveLocations().find((l) => l.userId === 'test-user-1');
      expect(loc?.visibility).toBe('matches');
    });
  });

  describe('6. Socket Disconnect Pruning', () => {
    it('automatically cleans up user location when socket disconnects', () => {
      LiveLocationService.startSharing('test-user-2', 'socket-xyz-99', {
        displayName: 'Rohan',
        coordinates: [73.79, 18.56],
      });

      const disconnectedUserId = LiveLocationService.handleSocketDisconnect('socket-xyz-99');
      expect(disconnectedUserId).toBe('test-user-2');

      const active = LiveLocationService.getActiveLocations();
      expect(active.some((l) => l.userId === 'test-user-2')).toBe(false);
    });
  });
});
