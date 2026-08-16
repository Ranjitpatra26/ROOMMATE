import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { getSocket } from '../services/socket.js';
import { LiveLocationItem, UserPrivacyState } from '../components/spaces/types.js';

export type SharingStatus =
  | 'off'
  | 'requesting'
  | 'sharing'
  | 'paused'
  | 'denied'
  | 'unavailable'
  | 'error';

export type VisibilitySetting = 'roommates' | 'matches' | 'nobody';

interface LiveLocationContextType {
  sharingStatus: SharingStatus;
  visibility: VisibilitySetting;
  isGhostMode: boolean;
  myLiveLocation: LiveLocationItem | null;
  activeLivePeers: LiveLocationItem[];
  isPermissionModalOpen: boolean;
  isPrivacyCenterOpen: boolean;
  lastError: string | null;
  requestShareLocation: () => void;
  confirmStartSharing: () => void;
  cancelPermissionModal: () => void;
  pauseSharing: () => void;
  resumeSharing: () => void;
  stopSharing: () => void;
  enableGhostMode: () => void;
  disableGhostMode: () => void;
  changeVisibility: (visibility: VisibilitySetting) => void;
  openPrivacyCenter: () => void;
  closePrivacyCenter: () => void;
  togglePrivacyCenter: () => void;
}

const LiveLocationContext = createContext<LiveLocationContextType | undefined>(undefined);

// Privacy-safe coordinate quantization (3 decimal places ~110m resolution)
const roundToPrivacyPrecision = (val: number): number => {
  return Math.round(val * 1000) / 1000;
};

export const LiveLocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sharingStatus, setSharingStatus] = useState<SharingStatus>('off');
  const [visibility, setVisibility] = useState<VisibilitySetting>('roommates');
  const [isGhostMode, setIsGhostMode] = useState(false);
  const [myLiveLocation, setMyLiveLocation] = useState<LiveLocationItem | null>(null);
  const [activeLivePeers, setActiveLivePeers] = useState<LiveLocationItem[]>([]);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [isPrivacyCenterOpen, setIsPrivacyCenterOpen] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);

  const watchIdRef = useRef<number | null>(null);
  const socketRef = useRef<any>(null);

  // Subscribe to socket events for live location & privacy
  useEffect(() => {
    const socket = getSocket();
    socketRef.current = socket;

    socket.emit('location:subscribe');
    socket.emit('location:privacy:get');

    socket.on('location:active:list', (list: LiveLocationItem[]) => {
      setActiveLivePeers(list || []);
    });

    socket.on('location:broadcast', (record: LiveLocationItem) => {
      setActiveLivePeers((prev) => {
        const filtered = prev.filter((item) => item.userId !== record.userId);
        return [...filtered, record];
      });
    });

    socket.on('location:removed', (data: { userId: string }) => {
      setActiveLivePeers((prev) => prev.filter((item) => item.userId !== data.userId));
    });

    socket.on('location:ghost:status', (data: { success: boolean; ghostMode: boolean }) => {
      if (data?.success) {
        setIsGhostMode(data.ghostMode);
      }
    });

    socket.on('location:privacy:status', (data: { success: boolean; privacy: UserPrivacyState }) => {
      if (data?.success && data?.privacy) {
        setIsGhostMode(data.privacy.ghostMode);
        setVisibility(data.privacy.visibility);
      }
    });

    return () => {
      socket.off('location:active:list');
      socket.off('location:broadcast');
      socket.off('location:removed');
      socket.off('location:ghost:status');
      socket.off('location:privacy:status');
      socket.emit('location:unsubscribe');
    };
  }, []);

  // Request share location (opens confirmation modal)
  const requestShareLocation = useCallback(() => {
    if (isGhostMode) {
      setLastError('Ghost Mode is active. Disable Ghost Mode to share live location.');
      setIsPrivacyCenterOpen(true);
      return;
    }
    setIsPermissionModalOpen(true);
    setLastError(null);
  }, [isGhostMode]);

  const cancelPermissionModal = useCallback(() => {
    setIsPermissionModalOpen(false);
  }, []);

  // Stop sharing cleanup
  const stopSharing = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    if (socketRef.current) {
      socketRef.current.emit('location:stop');
    }

    setSharingStatus('off');
    setMyLiveLocation(null);
    setLastError(null);
  }, []);

  // Enable Ghost Mode (Phase 5)
  const enableGhostMode = useCallback(() => {
    // 1. Immediately kill browser geolocation watcher
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    // 2. Notify server to suppress & purge active live location
    if (socketRef.current) {
      socketRef.current.emit('location:ghost:enable');
    }

    setIsGhostMode(true);
    setSharingStatus('off');
    setMyLiveLocation(null);
    setLastError(null);
  }, []);

  // Disable Ghost Mode (Phase 5)
  const disableGhostMode = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.emit('location:ghost:disable');
    }

    setIsGhostMode(false);
    // Note: Do NOT automatically start sharing; location remains OFF
    setSharingStatus('off');
    setLastError(null);
  }, []);

  // User confirmed in dialog -> now trigger browser geolocation
  const confirmStartSharing = useCallback(() => {
    setIsPermissionModalOpen(false);

    if (isGhostMode) {
      setLastError('Cannot start sharing while Ghost Mode is active.');
      return;
    }

    if (!navigator.geolocation) {
      setSharingStatus('unavailable');
      setLastError('Browser geolocation is not supported by your device.');
      return;
    }

    setSharingStatus('requesting');
    setLastError(null);

    try {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          const safeLng = roundToPrivacyPrecision(longitude);
          const safeLat = roundToPrivacyPrecision(latitude);

          const myRecord: LiveLocationItem = {
            userId: 'current-user',
            displayName: 'You (Live Location)',
            neighborhood: 'Indiranagar',
            city: 'Bengaluru',
            approximateCoordinates: [safeLng, safeLat],
            accuracyRadius: Math.max(accuracy, 150),
            visibility,
            status: 'sharing',
            ghostMode: false,
            lastUpdated: Date.now(),
            isCurrentUser: true,
          };

          setMyLiveLocation(myRecord);
          setSharingStatus('sharing');

          if (socketRef.current) {
            socketRef.current.emit('location:start', {
              displayName: 'You',
              neighborhood: 'Current Area',
              city: 'Bengaluru',
              coordinates: [safeLng, safeLat],
              accuracyRadius: myRecord.accuracyRadius,
              visibility,
            });
          }
        },
        (err) => {
          if (err.code === err.PERMISSION_DENIED) {
            setSharingStatus('denied');
            setLastError('Location access was denied. Enable browser permission to share live location.');
          } else if (err.code === err.POSITION_UNAVAILABLE) {
            setSharingStatus('unavailable');
            setLastError('Location coordinates unavailable.');
          } else {
            setSharingStatus('error');
            setLastError('Location request timed out.');
          }
          stopSharing();
        },
        {
          enableHighAccuracy: true,
          timeout: 12000,
          maximumAge: 10000,
        }
      );

      watchIdRef.current = watchId;
    } catch (err: any) {
      setSharingStatus('error');
      setLastError(err?.message || 'Failed to start geolocation watcher.');
    }
  }, [visibility, isGhostMode, stopSharing]);

  // Pause sharing
  const pauseSharing = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.emit('location:pause');
    }
    setSharingStatus('paused');
    setMyLiveLocation((prev) => (prev ? { ...prev, status: 'paused', lastUpdated: Date.now() } : null));
  }, []);

  // Resume sharing
  const resumeSharing = useCallback(() => {
    if (isGhostMode) {
      setLastError('Disable Ghost Mode before resuming live sharing.');
      return;
    }
    if (socketRef.current) {
      socketRef.current.emit('location:resume');
    }
    setSharingStatus('sharing');
    setMyLiveLocation((prev) => (prev ? { ...prev, status: 'sharing', lastUpdated: Date.now() } : null));
  }, [isGhostMode]);

  // Change visibility setting
  const changeVisibility = useCallback((newVis: VisibilitySetting) => {
    setVisibility(newVis);
    if (socketRef.current) {
      socketRef.current.emit('location:visibility:update', { visibility: newVis });
    }
    setMyLiveLocation((prev) => (prev ? { ...prev, visibility: newVis } : null));
  }, []);

  const openPrivacyCenter = useCallback(() => setIsPrivacyCenterOpen(true), []);
  const closePrivacyCenter = useCallback(() => setIsPrivacyCenterOpen(false), []);
  const togglePrivacyCenter = useCallback(() => setIsPrivacyCenterOpen((prev) => !prev), []);

  // Auto-cleanup on unmount / navigation away from spatial
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  return (
    <LiveLocationContext.Provider
      value={{
        sharingStatus,
        visibility,
        isGhostMode,
        myLiveLocation,
        activeLivePeers,
        isPermissionModalOpen,
        isPrivacyCenterOpen,
        lastError,
        requestShareLocation,
        confirmStartSharing,
        cancelPermissionModal,
        pauseSharing,
        resumeSharing,
        stopSharing,
        enableGhostMode,
        disableGhostMode,
        changeVisibility,
        openPrivacyCenter,
        closePrivacyCenter,
        togglePrivacyCenter,
      }}
    >
      {children}
    </LiveLocationContext.Provider>
  );
};

export const useLiveLocation = (): LiveLocationContextType => {
  const context = useContext(LiveLocationContext);
  if (!context) {
    throw new Error('useLiveLocation must be used within a LiveLocationProvider');
  }
  return context;
};
