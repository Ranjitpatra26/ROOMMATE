import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export const queryKeys = {
  auth: {
    me: ['auth', 'me'] as const,
  },
  profiles: {
    detail: (userId: string) => ['profiles', 'detail', userId] as const,
  },
  discover: {
    featured: ['discover', 'featured'] as const,
    list: (filters: Record<string, unknown>) => ['discover', 'list', filters] as const,
  },
  matches: {
    list: ['matches', 'list'] as const,
    detail: (matchId: string) => ['matches', 'detail', matchId] as const,
  },
  rooms: {
    detail: (roomId: string) => ['rooms', 'detail', roomId] as const,
    spatial: (roomId: string) => ['rooms', 'spatial', roomId] as const,
  },
  conversations: {
    list: ['conversations', 'list'] as const,
    messages: (id: string) => ['conversations', 'messages', id] as const,
  },
  trust: {
    profile: (userId: string) => ['trust', 'profile', userId] as const,
    history: (userId: string) => ['trust', 'history', userId] as const,
  },
  living: {
    activeStay: ['living', 'activeStay'] as const,
    agreement: (id: string) => ['living', 'agreement', id] as const,
    expenses: (roomId: string) => ['living', 'expenses', roomId] as const,
  },
  travel: {
    destinations: ['travel', 'destinations'] as const,
    stays: (filters: Record<string, unknown>) => ['travel', 'stays', filters] as const,
  },
};
