import React from 'react';
import { useSpatialStore } from '../../store/useSpatialStore';
import { Sofa, Sun, Moon, Users } from 'lucide-react';

export const LayerControlDock: React.FC = () => {
  const {
    furnitureVisible,
    toggleFurniture,
    lightingMode,
    setLightingMode,
    roommateNodesVisible,
    toggleRoommateNodes,
  } = useSpatialStore();

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-nav flex items-center gap-2 p-1.5 bg-clay/80 backdrop-blur-[20px] border border-earth-indigo/10 rounded-full shadow-lg">
      {/* Furniture Toggle */}
      <button
        onClick={toggleFurniture}
        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-label-caps font-bold transition-all ${
          furnitureVisible
            ? 'bg-earth-indigo text-clay shadow-sm'
            : 'text-earth-indigo/70 hover:text-earth-indigo hover:bg-earth-indigo/5'
        }`}
        title="Toggle Furniture Layer"
      >
        <Sofa className="w-3.5 h-3.5" />
        <span>Furniture</span>
      </button>

      {/* Lighting Mode Toggle */}
      <button
        onClick={() => setLightingMode(lightingMode === 'day' ? 'night' : 'day')}
        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-label-caps font-bold transition-all ${
          lightingMode === 'night'
            ? 'bg-earth-indigo text-clay shadow-sm'
            : 'text-earth-indigo/70 hover:text-earth-indigo hover:bg-earth-indigo/5'
        }`}
        title="Toggle Lighting Mode"
      >
        {lightingMode === 'day' ? (
          <>
            <Sun className="w-3.5 h-3.5 text-vitality-coral" />
            <span>Day</span>
          </>
        ) : (
          <>
            <Moon className="w-3.5 h-3.5 text-trust-light" />
            <span>Night</span>
          </>
        )}
      </button>

      {/* Roommate Nodes Toggle */}
      <button
        onClick={toggleRoommateNodes}
        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-label-caps font-bold transition-all ${
          roommateNodesVisible
            ? 'bg-earth-indigo text-clay shadow-sm'
            : 'text-earth-indigo/70 hover:text-earth-indigo hover:bg-earth-indigo/5'
        }`}
        title="Toggle Roommate Markers"
      >
        <Users className="w-3.5 h-3.5" />
        <span>Roommates</span>
      </button>
    </div>
  );
};
