import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext.js';

export interface CompatibilitySceneProps {
  score?: number;
  activeDimension?: string | null;
}

export const CompatibilityScene: React.FC<CompatibilitySceneProps> = ({
  activeDimension = null,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const youRef = useRef<THREE.Mesh>(null);
  const themRef = useRef<THREE.Mesh>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // Generate 6 curved bezier tubes linking the two people
  const tubes = useMemo(() => {
    const items = [];
    for (let i = 0; i < 6; i++) {
      const midY = Math.sin(i * 1.2) * 2.2;
      const midZ = Math.cos(i * 1.5) * 2.2;
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-3.2, 0, 0),
        new THREE.Vector3(0, midY, midZ),
        new THREE.Vector3(3.2, 0, 0)
      );
      items.push({ curve, id: i });
    }
    return items;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.15;
      groupRef.current.rotation.x = Math.cos(t * 0.2) * 0.08;
    }

    if (youRef.current) {
      youRef.current.position.y = Math.sin(t * 1.1) * 0.2;
    }

    if (themRef.current) {
      themRef.current.position.y = Math.cos(t * 1.1) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* User A Sphere (You) */}
      <mesh ref={youRef} position={[-3.2, 0, 0]}>
        <sphereGeometry args={[1.1, 64, 64]} />
        <meshStandardMaterial
          color={isDark ? '#dee2f4' : '#242a38'}
          roughness={0.25}
          metalness={0.4}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* User B Sphere (Them) */}
      <mesh ref={themRef} position={[3.2, 0, 0]}>
        <sphereGeometry args={[1.1, 64, 64]} />
        <meshStandardMaterial
          color={isDark ? '#dee2f4' : '#242a38'}
          roughness={0.25}
          metalness={0.4}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* 6 Curved Connection Tubes */}
      {tubes.map((item, idx) => (
        <mesh key={idx}>
          <tubeGeometry args={[item.curve, 32, 0.025, 8, false]} />
          <meshBasicMaterial
            color={activeDimension ? '#f05a5a' : (isDark ? '#6db08c' : '#476253')}
            transparent
            opacity={activeDimension ? 0.8 : (isDark ? 0.45 : 0.6)}
          />
        </mesh>
      ))}

      {/* Central Harmonic Glow Core */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#f05a5a" transparent opacity={0.65} />
      </mesh>

      <ambientLight intensity={isDark ? 0.9 : 1.2} />
      <pointLight position={[0, 5, 8]} intensity={1.8} color="#ffffff" />
      <pointLight position={[0, -5, -4]} intensity={1.0} color="#f05a5a" />
    </group>
  );
};
