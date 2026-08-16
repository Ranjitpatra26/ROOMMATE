import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface DNAVisualizerProps {
  sleepHabit: string;
  cleanHabit: string;
  noiseHabit: string;
  completionRate?: number;
}

const DNACoreMesh: React.FC<{ sleepHabit: string; cleanHabit: string; noiseHabit: string }> = ({
  sleepHabit,
  cleanHabit,
  noiseHabit,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // Dynamic colors derived from user's habit DNA
  const getCoreColor = () => {
    if (sleepHabit === 'early') return '#476253'; // Trust Teal
    if (sleepHabit === 'night') return '#1a1f2c'; // Earth Indigo
    return '#e45759'; // Vitality Coral
  };

  const getRingColor = () => {
    if (cleanHabit === 'meticulous') return '#e45759';
    if (cleanHabit === 'relaxed') return '#c6c6cc';
    return '#1a1f2c';
  };

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.4;
      meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;
      meshRef.current.position.y = Math.sin(t * 1.2) * 0.1;
    }
    if (ringRef.current) {
      const speed = noiseHabit === 'vibrant' || noiseHabit === 'music' ? 1.5 : 0.6;
      ringRef.current.rotation.z = t * speed;
      ringRef.current.rotation.y = t * (speed * 0.5);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Dynamic Central Habit Sphere */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.2, 3]} />
        <meshStandardMaterial
          color={getCoreColor()}
          wireframe={cleanHabit === 'meticulous'}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>

      {/* Orbiting Acoustic Field */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.9, 0.03, 16, 80]} />
        <meshBasicMaterial color={getRingColor()} transparent opacity={0.6} />
      </mesh>

      <ambientLight intensity={0.8} />
      <pointLight position={[3, 3, 3]} intensity={1.5} color="#fff" />
    </group>
  );
};

export const DNAVisualizer: React.FC<DNAVisualizerProps> = (props) => {
  return (
    <div className="relative w-full h-48 md:h-64 rounded-2xl bg-surface-low/80 border border-surface-dim overflow-hidden flex flex-col items-center justify-center">
      {/* 3D R3F Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 45 }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 2]}
        >
          <DNACoreMesh {...props} />
        </Canvas>
      </div>

      {/* Floating Status Pill */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-clay/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-surface-dim text-xs font-sans text-earth-indigo font-semibold shadow-sm pointer-events-none">
        DNA Harmony Calibration: {props.completionRate || 50}%
      </div>
    </div>
  );
};
