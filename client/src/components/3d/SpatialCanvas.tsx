import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

export interface SpatialCanvasProps {
  children: React.ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  fov?: number;
}

export const SpatialCanvas: React.FC<SpatialCanvasProps> = ({
  children,
  className = 'w-full h-full min-h-[400px]',
  cameraPosition = [0, 5, 8],
  fov = 45,
}) => {
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    return (
      <div className={`flex items-center justify-center bg-clay-low border border-earth-indigo/10 p-6 ${className}`}>
        <p className="font-sans text-body-sm text-earth-indigo/60 text-center">
          3D hardware acceleration is unavailable on this device. Displaying architectural plan fallback.
        </p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position: cameraPosition, fov, near: 0.1, far: 100 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        dpr={[1, 2]} // Cap DPR between 1 and 2 for mobile performance
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0); // Transparent background
        }}
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
};
