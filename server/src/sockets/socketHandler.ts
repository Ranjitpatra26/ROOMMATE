import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { ENV } from '../config/env.js';
import { verifyToken } from '../utils/jwt.js';
import { LiveLocationService } from '../services/liveLocationService.js';

let ioInstance: SocketIOServer | null = null;

const allowedOrigins = [
  ENV.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:5200',
  'http://localhost:5201',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5200',
  'http://127.0.0.1:5201',
].filter(Boolean);

export const initSockets = (httpServer: HttpServer): SocketIOServer => {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (
          allowedOrigins.includes(origin) ||
          (ENV.NODE_ENV === 'development' && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin))
        ) {
          return callback(null, true);
        }
        return callback(new Error(`Origin ${origin} not allowed by Socket.io CORS`));
      },
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
      credentials: true,
    },
  });

  // Socket Authentication Middleware
  io.use((socket: Socket, next) => {
    try {
      const authHeader = socket.handshake.auth?.token || socket.handshake.headers?.authorization;
      if (authHeader) {
        const token = authHeader.replace(/^Bearer\s+/i, '');
        const payload = verifyToken(token);
        socket.data.user = payload;
      }
    } catch {
      // Allow connection in unauthenticated/guest state, but socket.data.user will remain undefined
    }
    next();
  });

  io.on('connection', (socket: Socket) => {
    // 1. Messaging Room Subscriptions
    socket.on('join_conversation', (conversationId: string) => {
      socket.join(`conv_${conversationId}`);
    });

    socket.on('leave_conversation', (conversationId: string) => {
      socket.leave(`conv_${conversationId}`);
    });

    // 2. Messaging Realtime Events
    socket.on('typing:start', (data: { conversationId: string; userId: string; userName: string }) => {
      socket.to(`conv_${data.conversationId}`).emit('typing:start', data);
    });

    socket.on('typing:stop', (data: { conversationId: string; userId: string }) => {
      socket.to(`conv_${data.conversationId}`).emit('typing:stop', data);
    });

    socket.on('message:send', (data: { conversationId: string; message: any }) => {
      io.to(`conv_${data.conversationId}`).emit('message:new', data.message);
    });

    socket.on('conversation:read', (data: { conversationId: string; userId: string }) => {
      socket.to(`conv_${data.conversationId}`).emit('conversation:read', data);
    });

    // 3. Living OS & Household Subscriptions
    socket.on('join_stay', (stayId: string) => {
      socket.join(`stay_${stayId}`);
    });

    socket.on('expense:new', (data: { stayId: string; expense: any }) => {
      socket.to(`stay_${data.stayId}`).emit('expense:new', data.expense);
    });

    socket.on('responsibility:completed', (data: { stayId: string; taskId: string; completedBy: string }) => {
      io.to(`stay_${data.stayId}`).emit('responsibility:completed', data);
    });

    socket.on('agreement:updated', (data: { stayId: string; version: string }) => {
      io.to(`stay_${data.stayId}`).emit('agreement:updated', data);
    });

    // ========================================================================
    // 4. SPATIAL REAL-TIME LIVE LOCATION (PHASE 4)
    // ========================================================================

    // Subscribe to Spatial Live Stream
    socket.on('location:subscribe', () => {
      socket.join('spatial_live');
      const requesterId = socket.data.user?.userId;
      const activeList = LiveLocationService.getActiveLocations(requesterId);
      socket.emit('location:active:list', activeList);
    });

    socket.on('location:unsubscribe', () => {
      socket.leave('spatial_live');
    });

    // Start Sharing Live Location (Opt-in)
    socket.on(
      'location:start',
      (data: {
        userId?: string;
        displayName: string;
        avatarUrl?: string;
        neighborhood?: string;
        city?: string;
        coordinates: [number, number];
        accuracyRadius?: number;
        visibility?: 'roommates' | 'matches' | 'nobody';
      }) => {
        // Enforce verified identity from JWT token or payload in demo/development
        const effectiveUserId = socket.data.user?.userId || data.userId || `user-${socket.id.slice(0, 6)}`;

        const record = LiveLocationService.startSharing(effectiveUserId, socket.id, {
          displayName: data.displayName,
          avatarUrl: data.avatarUrl,
          neighborhood: data.neighborhood,
          city: data.city,
          coordinates: data.coordinates,
          accuracyRadius: data.accuracyRadius,
          visibility: data.visibility,
        });

        if (record) {
          socket.join('spatial_live');
          io.to('spatial_live').emit('location:broadcast', record);
          socket.emit('location:status', { success: true, record });
        } else {
          socket.emit('location:status', { success: false, message: 'Invalid coordinates provided' });
        }
      }
    );

    // Update GPS Coordinates
    socket.on('location:update', (data: { coordinates: [number, number]; accuracyRadius?: number }) => {
      const effectiveUserId = socket.data.user?.userId || `user-${socket.id.slice(0, 6)}`;
      const updated = LiveLocationService.updateLocation(effectiveUserId, data.coordinates, data.accuracyRadius);

      if (updated) {
        io.to('spatial_live').emit('location:broadcast', updated);
      }
    });

    // Pause Sharing
    socket.on('location:pause', () => {
      const effectiveUserId = socket.data.user?.userId || `user-${socket.id.slice(0, 6)}`;
      const paused = LiveLocationService.pauseSharing(effectiveUserId);
      if (paused) {
        io.to('spatial_live').emit('location:broadcast', paused);
        socket.emit('location:status', { success: true, record: paused });
      }
    });

    // Resume Sharing
    socket.on('location:resume', () => {
      const effectiveUserId = socket.data.user?.userId || `user-${socket.id.slice(0, 6)}`;
      const resumed = LiveLocationService.resumeSharing(effectiveUserId);
      if (resumed) {
        io.to('spatial_live').emit('location:broadcast', resumed);
        socket.emit('location:status', { success: true, record: resumed });
      }
    });

    // Stop Sharing
    socket.on('location:stop', () => {
      const effectiveUserId = socket.data.user?.userId || `user-${socket.id.slice(0, 6)}`;
      LiveLocationService.stopSharing(effectiveUserId);
      io.to('spatial_live').emit('location:removed', { userId: effectiveUserId });
      socket.emit('location:status', { success: true, status: 'off' });
    });

    // Ghost Mode: Enable (Server-side suppression + active marker purge)
    socket.on('location:ghost:enable', () => {
      const effectiveUserId = socket.data.user?.userId || `user-${socket.id.slice(0, 6)}`;
      const result = LiveLocationService.enableGhostMode(effectiveUserId);
      io.to('spatial_live').emit('location:removed', { userId: result.userId });
      socket.emit('location:ghost:status', { success: true, ghostMode: true });
    });

    // Ghost Mode: Disable (Leaves location OFF until explicit sharing opt-in)
    socket.on('location:ghost:disable', () => {
      const effectiveUserId = socket.data.user?.userId || `user-${socket.id.slice(0, 6)}`;
      LiveLocationService.disableGhostMode(effectiveUserId);
      socket.emit('location:ghost:status', { success: true, ghostMode: false });
    });

    // Update Visibility Settings
    socket.on(
      'location:visibility:update',
      (data: { visibility: 'roommates' | 'matches' | 'nobody' }) => {
        const effectiveUserId = socket.data.user?.userId || `user-${socket.id.slice(0, 6)}`;
        if (data && ['roommates', 'matches', 'nobody'].includes(data.visibility)) {
          const updatedState = LiveLocationService.updateVisibility(effectiveUserId, data.visibility);
          socket.emit('location:privacy:status', { success: true, privacy: updatedState });
        }
      }
    );

    // Get Privacy State
    socket.on('location:privacy:get', () => {
      const effectiveUserId = socket.data.user?.userId || `user-${socket.id.slice(0, 6)}`;
      const privacy = LiveLocationService.getUserPrivacy(effectiveUserId);
      socket.emit('location:privacy:status', { success: true, privacy });
    });

    // 5. Disconnect Cleanup
    socket.on('disconnect', () => {
      const removedUserId = LiveLocationService.handleSocketDisconnect(socket.id);
      if (removedUserId) {
        io.to('spatial_live').emit('location:removed', { userId: removedUserId });
      }
    });
  });

  ioInstance = io;
  return io;
};

export const getIO = (): SocketIOServer => {
  if (!ioInstance) {
    throw new Error('Socket.io has not been initialized.');
  }
  return ioInstance;
};
