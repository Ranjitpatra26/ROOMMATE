import { io, Socket } from 'socket.io-client';

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL ||
  (import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '')
    : 'http://localhost:5000');

let socketInstance: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socketInstance) {
    const token = localStorage.getItem('roommate_jwt');
    socketInstance = io(SOCKET_URL, {
      autoConnect: true,
      withCredentials: true,
      auth: {
        token: token ? `Bearer ${token}` : undefined,
      },
      transports: ['websocket', 'polling'],
    });

    if (import.meta.env.DEV) {
      socketInstance.on('connect', () => {
        console.log('[ROOMMATE Realtime] Connected with id:', socketInstance?.id);
      });

      socketInstance.on('connect_error', (err) => {
        console.warn('[ROOMMATE Realtime] Connection error:', err.message);
      });
    }
  }
  return socketInstance;
};

export const updateSocketAuth = (token: string | null): void => {
  if (socketInstance) {
    socketInstance.auth = {
      token: token ? `Bearer ${token}` : undefined,
    };
    if (socketInstance.connected) {
      socketInstance.disconnect().connect();
    }
  }
};

export const disconnectSocket = (): void => {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
};
