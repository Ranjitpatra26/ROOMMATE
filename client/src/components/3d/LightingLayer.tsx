import React from 'react';
import { useSpatialStore } from '../../store/useSpatialStore';

export const LightingLayer: React.FC = () => {
  const lightingMode = useSpatialStore((state) => state.lightingMode);
  const isNight = lightingMode === 'night';

  return (
    <>
      <ambientLight
        intensity={isNight ? 0.2 : 0.65}
        color={isNight ? '#8b9bb4' : '#ffffff'}
      />
      <directionalLight
        position={[8, 12, 6]}
        intensity={isNight ? 0.3 : 1.2}
        color={isNight ? '#a2b4dc' : '#fff5eb'}
        castShadow
      />
      {isNight && (
        <pointLight
          position={[0, 2.5, 0]}
          intensity={0.8}
          color="#ffc38b"
          distance={8}
        />
      )}
    </>
  );
};
