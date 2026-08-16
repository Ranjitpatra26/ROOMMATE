import { create } from 'zustand';
import { User } from '../types';
import { updateSocketAuth, disconnectSocket } from '../services/socket.js';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('roommate_jwt'),
  isAuthenticated: !!localStorage.getItem('roommate_jwt'),
  setAuth: (user, token) => {
    localStorage.setItem('roommate_jwt', token);
    updateSocketAuth(token);
    set({ user, token, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('roommate_jwt');
    disconnectSocket();
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
