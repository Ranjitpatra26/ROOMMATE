import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface MatchRevealSceneProps {
  convergenceProgress?: number;
}

export const MatchRevealScene: React.FC<MatchRevealSceneProps> = () => {
  const groupRef = useRef<THREE.Group>(null);
  const youSphereRef = useRef<THREE.Mesh>(null);
  const themSphereRef = useRef<THREE.Mesh>(null);
  const roomMeshRef = useRef<THREE.Mesh>(null);
  const connectionTubeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.15;
    }

    // Convergence animation
    const factor = Math.abs(Math.sin(time * 0.5));
    if (youSphereRef.current) {
      youSphereRef.current.position.x = -3 + factor * 2.2;
    }
    if (themSphereRef.current) {
      themSphereRef.current.position.x = 3 - factor * 2.2;
    }

    if (roomMeshRef.current) {
      const scale = factor * 1.2;
      roomMeshRef.current.scale.set(scale, scale, scale);
      roomMeshRef.current.rotation.y += 0.01;
      roomMeshRef.current.rotation.x += 0.005;
    }

    if (connectionTubeRef.current) {
      connectionTubeRef.current.scale.set(1 - factor * 0.7, 1, 1);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* You Sphere */}
      <mesh ref={youSphereRef} position={[-3, 0, 0]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#fcf8fa"
          transparent
          opacity={0.85}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      {/* Them Sphere */}
      <mesh ref={themSphereRef} position={[3, 0, 0]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#fcf8fa"
          transparent
          opacity={0.85}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      {/* Central Shared Space Convergence Box */}
      <mesh ref={roomMeshRef} position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial
          color="#f05a5a"
          transparent
          opacity={0.4}
          roughness={0.1}
          emissive="#f05a5a"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Connection Line / Cylinder */}
      <mesh ref={connectionTubeRef} rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 6, 16]} />
        <meshBasicMaterial color="#f05a5a" transparent opacity={0.5} />
      </mesh>

      <ambientLight intensity={0.7} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color="#f05a5a" />
    </group>
  );
};
