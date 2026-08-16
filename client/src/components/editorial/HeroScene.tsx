import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface HeroSceneProps {
  mouseX?: number;
  mouseY?: number;
}

export const HeroScene: React.FC<HeroSceneProps> = ({ mouseX = 0, mouseY = 0 }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // Generate elegant floating ambient particles
  const particleCount = 600;
  const positions = React.useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 3.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((_state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(
        pointsRef.current.rotation.x,
        mouseY * 0.15,
        0.05
      );
      pointsRef.current.rotation.y += (mouseX * 0.15 - pointsRef.current.rotation.y) * 0.02;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.03;
      ringRef.current.rotation.x = THREE.MathUtils.lerp(
        ringRef.current.rotation.x,
        0.5 + mouseY * 0.2,
        0.05
      );
      ringRef.current.rotation.y = THREE.MathUtils.lerp(
        ringRef.current.rotation.y,
        mouseX * 0.2,
        0.05
      );
    }
  });

  return (
    <group>
      {/* Ambient Particle Cloud */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#f05a5a"
          transparent
          opacity={0.35}
          sizeAttenuation
        />
      </points>

      {/* Subtle Orbital Ring */}
      <mesh ref={ringRef} rotation={[0.6, 0.2, 0]}>
        <torusGeometry args={[3.2, 0.012, 16, 100]} />
        <meshBasicMaterial color="#dee2f4" transparent opacity={0.2} wireframe />
      </mesh>
    </group>
  );
};
