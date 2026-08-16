import React from 'react';
import { OrbitControls } from '@react-three/drei';

export interface CameraControllerProps {
  enableZoom?: boolean;
  enablePan?: boolean;
  enableRotate?: boolean;
  autoRotate?: boolean;
  maxPolarAngle?: number;
}

export const CameraController: React.FC<CameraControllerProps> = ({
  enableZoom = false,
  enablePan = false,
  enableRotate = true,
  autoRotate = false,
  maxPolarAngle = Math.PI / 2.1, // Prevent going under the floorplan
}) => {
  return (
    <OrbitControls
      makeDefault
      enableZoom={enableZoom}
      enablePan={enablePan}
      enableRotate={enableRotate}
      autoRotate={autoRotate}
      autoRotateSpeed={0.5}
      maxPolarAngle={maxPolarAngle}
      minDistance={2}
      maxDistance={20}
      dampingFactor={0.05}
    />
  );
};
