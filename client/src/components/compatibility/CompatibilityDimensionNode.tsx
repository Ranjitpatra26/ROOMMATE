import React, { useState } from 'react';

export interface DimensionNodeData {
  id: string;
  title: string;
  icon: React.ReactNode;
  explanation: string;
  alignment: 'strong' | 'moderate' | 'friction';
  positionStyle: string;
}

export const CompatibilityDimensionNode: React.FC<{
  node: DimensionNodeData;
  isActive: boolean;
  onSelect: () => void;
}> = ({ node, isActive, onSelect }) => {
  const [hovered, setHovered] = useState(false);

  const isVisible = isActive || hovered;
  const isRightSide = node.positionStyle.includes('right');
  const isBottomSide = node.positionStyle.includes('bottom');

  return (
    <div
      className={`absolute ${node.positionStyle} z-20 transition-all duration-300 select-none`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onSelect}
    >
      <div className="flex items-center gap-3 cursor-pointer group">
        <div
          className={`w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center border transition-all duration-300 shadow-md ${
            isVisible
              ? 'bg-vitality-coral text-white border-vitality-coral scale-110 shadow-vitality-coral/40'
              : 'bg-clay dark:bg-surface-high text-earth-indigo dark:text-clay border-surface-dim dark:border-white/20 group-hover:border-vitality-coral group-hover:text-vitality-coral'
          }`}
        >
          {node.icon}
        </div>
        <span
          className={`font-sans text-ui-medium font-bold transition-colors duration-200 ${
            isVisible
              ? 'text-vitality-coral'
              : 'text-earth-indigo dark:text-clay group-hover:text-vitality-coral'
          }`}
        >
          {node.title}
        </span>
      </div>

      {/* Floating Explanation Bubble - Direction Aware */}
      {isVisible && (
        <div
          className={`absolute ${isBottomSide ? 'bottom-14' : 'top-14'} ${
            isRightSide ? 'right-0' : 'left-0'
          } w-72 md:w-80 p-4 bg-clay/95 dark:bg-surface-low/95 backdrop-blur-xl border border-surface-dim rounded-2xl shadow-2xl z-30 space-y-2 animate-fade-in pointer-events-none text-earth-indigo transition-all`}
        >
          <div className="flex items-center justify-between">
            <span className="font-sans text-label-caps text-vitality-coral font-bold text-[10px]">
              {node.alignment === 'strong' ? 'HIGH HARMONY' : 'COMPLEMENTARY'}
            </span>
          </div>
          <p className="font-sans text-xs text-secondary dark:text-surface-dim font-medium leading-relaxed">
            {node.explanation}
          </p>
        </div>
      )}
    </div>
  );
};
