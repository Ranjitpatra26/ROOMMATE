import { create } from 'zustand';

interface StayState {
  activeStayId: string | null;
  activeTab: 'overview' | 'agreement' | 'expenses' | 'safety';
  setActiveStay: (id: string | null) => void;
  setActiveTab: (tab: 'overview' | 'agreement' | 'expenses' | 'safety') => void;
}

export const useStayStore = create<StayState>((set) => ({
  activeStayId: null,
  activeTab: 'overview',
  setActiveStay: (activeStayId) => set({ activeStayId }),
  setActiveTab: (activeTab) => set({ activeTab }),
}));

interface UIState {
  mobileDockOpen: boolean;
  filterDrawerOpen: boolean;
  activeModal: string | null;
  setMobileDock: (open: boolean) => void;
  setFilterDrawer: (open: boolean) => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  mobileDockOpen: true,
  filterDrawerOpen: false,
  activeModal: null,
  setMobileDock: (mobileDockOpen) => set({ mobileDockOpen }),
  setFilterDrawer: (filterDrawerOpen) => set({ filterDrawerOpen }),
  openModal: (activeModal) => set({ activeModal }),
  closeModal: () => set({ activeModal: null }),
}));
