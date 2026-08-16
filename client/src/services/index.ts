import apiClient from './api.js';
import { 
  User, 
  Profile, 
  LifestyleDNA, 
  Room, 
  Match, 
  CompatibilityResult, 
  Conversation, 
  Message, 
  TrustProfile, 
  Review, 
  LivingAgreement, 
  Expense, 
  Destination, 
  ApiResponse 
} from '../types/index.js';

export const authService = {
  login: async (credentials: { email: string; password: string }): Promise<ApiResponse<{ token: string; user: User }>> => {
    const res = await apiClient.post('/auth/login', credentials);
    return res.data;
  },
  register: async (payload: { email: string; password: string; name?: string }): Promise<ApiResponse<{ token: string; user: User }>> => {
    const res = await apiClient.post('/auth/register', payload);
    return res.data;
  },
  getMe: async (): Promise<ApiResponse<User>> => {
    const res = await apiClient.get('/auth/me');
    return res.data;
  },
};

export const profileService = {
  getProfile: async (id: string): Promise<ApiResponse<Profile>> => {
    const res = await apiClient.get(`/profiles/${id}`);
    return res.data;
  },
  updateProfile: async (payload: Partial<Profile>): Promise<ApiResponse<Profile>> => {
    const res = await apiClient.patch('/profiles/me', payload);
    return res.data;
  },
  updateDNA: async (dna: LifestyleDNA): Promise<ApiResponse<Profile>> => {
    const res = await apiClient.put('/profiles/me/dna', dna);
    return res.data;
  },
  saveOnboardingChapter1: async (payload: Partial<Profile>): Promise<ApiResponse<Profile>> => {
    const res = await apiClient.post('/profiles/onboarding/chapter-1', payload);
    return res.data;
  },
  saveOnboardingChapter2: async (dna: LifestyleDNA): Promise<ApiResponse<Profile>> => {
    const res = await apiClient.put('/profiles/onboarding/chapter-2', dna);
    return res.data;
  }
};

export const discoverService = {
  getFeatured: async (): Promise<ApiResponse<{ rooms: Room[]; profiles: Profile[] }>> => {
    const res = await apiClient.get('/discover/featured');
    return res.data;
  },
  queryDiscover: async (filters: Record<string, unknown>): Promise<ApiResponse<{ rooms: Room[]; profiles: Profile[] }>> => {
    const res = await apiClient.get('/discover', { params: filters });
    return res.data;
  },
};

export const matchService = {
  calculateCompatibility: async (targetUserId: string): Promise<ApiResponse<CompatibilityResult>> => {
    const res = await apiClient.post('/compatibility/calculate', { targetUserId });
    return res.data;
  },
  getMatches: async (): Promise<ApiResponse<Match[]>> => {
    const res = await apiClient.get('/matches');
    return res.data;
  },
  getMatchDetail: async (id: string): Promise<ApiResponse<Match>> => {
    const res = await apiClient.get(`/matches/${id}`);
    return res.data;
  },
  acceptMatch: async (id: string): Promise<ApiResponse<Match>> => {
    const res = await apiClient.patch(`/matches/${id}/accept`);
    return res.data;
  },
};

export const spatialService = {
  getDistricts: async (): Promise<ApiResponse<{ id: string; name: string; coordinates: [number, number]; roomCount: number }[]>> => {
    const res = await apiClient.get('/spatial/districts');
    return res.data;
  },
  getRoomDetail: async (id: string): Promise<ApiResponse<Room>> => {
    const res = await apiClient.get(`/rooms/${id}`);
    return res.data;
  },
  getRoomSpatialModel: async (id: string): Promise<ApiResponse<Room['spatialModel']>> => {
    const res = await apiClient.get(`/rooms/${id}/spatial`);
    return res.data;
  },
};

export const conversationService = {
  getConversations: async (): Promise<ApiResponse<Conversation[]>> => {
    const res = await apiClient.get('/conversations');
    return res.data;
  },
  getMessages: async (conversationId: string): Promise<ApiResponse<Message[]>> => {
    const res = await apiClient.get(`/conversations/${conversationId}/messages`);
    return res.data;
  },
  sendMessage: async (conversationId: string, content: string): Promise<ApiResponse<Message>> => {
    const res = await apiClient.post(`/conversations/${conversationId}/messages`, { content });
    return res.data;
  },
};

export const trustService = {
  getTrustProfile: async (userId: string): Promise<ApiResponse<TrustProfile>> => {
    const res = await apiClient.get(`/trust/${userId}`);
    return res.data;
  },
  getTrustHistory: async (userId: string): Promise<ApiResponse<{ id: string; title: string; period: string; verified: boolean }[]>> => {
    const res = await apiClient.get(`/trust/${userId}/history`);
    return res.data;
  },
  getReviews: async (stayId: string): Promise<ApiResponse<Review[]>> => {
    const res = await apiClient.get('/reviews', { params: { stayId } });
    return res.data;
  },
};

export const livingService = {
  getActiveStay: async (): Promise<ApiResponse<{ room: Room; agreement: LivingAgreement; roommates: Profile[] }>> => {
    const res = await apiClient.get('/living-os/stay');
    return res.data;
  },
  getAgreement: async (id: string): Promise<ApiResponse<LivingAgreement>> => {
    const res = await apiClient.get(`/agreements/${id}`);
    return res.data;
  },
  signAgreement: async (id: string): Promise<ApiResponse<LivingAgreement>> => {
    const res = await apiClient.patch(`/agreements/${id}/sign`);
    return res.data;
  },
  pingEmergency: async (payload: { roomId: string; note: string }): Promise<ApiResponse<{ success: boolean; dispatchedAt: string }>> => {
    const res = await apiClient.post('/safety/ping', payload);
    return res.data;
  },
};

export const expenseService = {
  getExpenses: async (roomId: string): Promise<ApiResponse<Expense[]>> => {
    const res = await apiClient.get('/expenses', { params: { roomId } });
    return res.data;
  },
  createExpense: async (payload: Omit<Expense, 'id' | 'createdAt'>): Promise<ApiResponse<Expense>> => {
    const res = await apiClient.post('/expenses', payload);
    return res.data;
  },
  settleSplit: async (expenseId: string): Promise<ApiResponse<Expense>> => {
    const res = await apiClient.patch(`/expenses/${expenseId}/settle`);
    return res.data;
  },
};

export const travelService = {
  getDestinations: async (): Promise<ApiResponse<Destination[]>> => {
    const res = await apiClient.get('/travel/destinations');
    return res.data;
  },
  getStays: async (filters: { city?: string; dateRange?: string }): Promise<ApiResponse<Room[]>> => {
    const res = await apiClient.get('/travel/stays', { params: filters });
    return res.data;
  },
};

export * from './socket.js';
