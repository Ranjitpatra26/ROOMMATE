import { create } from 'zustand';

interface SpatialState {
  activeRoomId: string | null;
  furnitureVisible: boolean;
  lightingMode: 'day' | 'night';
  roommateNodesVisible: boolean;
  activeDistrictId: string | null;
  cameraPreset: 'perspective' | 'top' | 'isometric';
  setRoom: (roomId: string | null) => void;
  toggleFurniture: () => void;
  setLightingMode: (mode: 'day' | 'night') => void;
  toggleRoommateNodes: () => void;
  setDistrict: (districtId: string | null) => void;
  setCameraPreset: (preset: 'perspective' | 'top' | 'isometric') => void;
}

export const useSpatialStore = create<SpatialState>((set) => ({
  activeRoomId: null,
  furnitureVisible: true,
  lightingMode: 'day',
  roommateNodesVisible: true,
  activeDistrictId: null,
  cameraPreset: 'perspective',
  setRoom: (activeRoomId) => set({ activeRoomId }),
  toggleFurniture: () => set((state) => ({ furnitureVisible: !state.furnitureVisible })),
  setLightingMode: (lightingMode) => set({ lightingMode }),
  toggleRoommateNodes: () => set((state) => ({ roommateNodesVisible: !state.roommateNodesVisible })),
  setDistrict: (activeDistrictId) => set({ activeDistrictId }),
  setCameraPreset: (cameraPreset) => set({ cameraPreset }),
}));
