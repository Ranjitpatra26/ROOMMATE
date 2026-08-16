import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../../../context/ThemeContext.js';

export interface NeighborhoodData {
  id: string;
  name: string;
  position: [number, number, number];
  roomsCount: number;
  avgRent: string;
  vibe: string;
}

export interface SpatialCitySceneProps {
  neighborhoods: NeighborhoodData[];
  selectedId: string;
  onSelectNeighborhood: (id: string) => void;
}

export const SpatialCityScene: React.FC<SpatialCitySceneProps> = ({
  neighborhoods,
  selectedId,
  onSelectNeighborhood,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Abstract City Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[30, 30, 20, 20]} />
        <meshStandardMaterial
          color={isDark ? '#2c3345' : '#c6c6cc'}
          wireframe
          transparent
          opacity={isDark ? 0.3 : 0.2}
        />
      </mesh>

      {/* Abstract Low-Poly City Blocks */}
      {[-4, -2, 0, 2, 4].map((x, i) =>
        [-3, -1, 1, 3].map((z, j) => {
          const height = ((i * 3 + j * 7) % 5) * 0.4 + 0.3;
          return (
            <mesh key={`${x}-${z}`} position={[x * 1.5, height / 2 - 1, z * 1.5]}>
              <boxGeometry args={[1, height, 1]} />
              <meshStandardMaterial
                color={isDark ? '#141822' : '#e5e2e3'}
                roughness={0.7}
                metalness={0.2}
                transparent
                opacity={isDark ? 0.85 : 0.75}
              />
            </mesh>
          );
        })
      )}

      {/* Interactive Neighborhood Markers */}
      {neighborhoods.map((n) => {
        const isSelected = n.id === selectedId;
        return (
          <group
            key={n.id}
            position={n.position}
            onClick={(e) => {
              e.stopPropagation();
              onSelectNeighborhood(n.id);
            }}
          >
            {/* Marker Pin Sphere */}
            <mesh position={[0, 0.6, 0]}>
              <sphereGeometry args={[isSelected ? 0.35 : 0.25, 32, 32]} />
              <meshStandardMaterial
                color={isSelected ? '#f05a5a' : '#476253'}
                emissive={isSelected ? '#f05a5a' : '#1a1f2c'}
                emissiveIntensity={isSelected ? 0.8 : 0.2}
                roughness={0.2}
              />
            </mesh>

            {/* Glowing Base Ring */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
              <ringGeometry args={[0.3, 0.5, 32]} />
              <meshBasicMaterial
                color={isSelected ? '#f05a5a' : (isDark ? '#c2c6d8' : '#76777c')}
                transparent
                opacity={isSelected ? 0.8 : 0.3}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        );
      })}

      <ambientLight intensity={isDark ? 0.8 : 1.2} />
      <pointLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-5, 5, -5]} intensity={0.8} color="#f05a5a" />
    </group>
  );
};
