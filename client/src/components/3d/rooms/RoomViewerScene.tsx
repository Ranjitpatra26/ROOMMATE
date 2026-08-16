import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface RoomViewerSceneProps {
  roomName?: string;
}

export const RoomViewerScene: React.FC<RoomViewerSceneProps> = () => {
  const roomGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (roomGroupRef.current) {
      roomGroupRef.current.rotation.y = Math.sin(t * 0.2) * 0.15 + 0.3;
    }
  });

  return (
    <group ref={roomGroupRef} position={[0, -0.5, 0]}>
      {/* Floor */}
      <mesh position={[0, -1.8, 0]}>
        <boxGeometry args={[9, 0.1, 9]} />
        <meshStandardMaterial color="#fcf8fa" roughness={0.4} />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 1.2, -4.45]}>
        <boxGeometry args={[9, 6, 0.1]} />
        <meshStandardMaterial color="#ebe7e9" roughness={0.6} transparent opacity={0.9} />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-4.45, 1.2, 0]}>
        <boxGeometry args={[0.1, 6, 9]} />
        <meshStandardMaterial color="#f6f2f4" roughness={0.6} transparent opacity={0.9} />
      </mesh>

      {/* Minimalist Bed Frame & Mattress */}
      <group position={[-2.2, -1.4, -2]}>
        {/* Bed Frame */}
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[2.8, 0.4, 4.4]} />
          <meshStandardMaterial color="#dcd9db" roughness={0.5} />
        </mesh>
        {/* Mattress */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[2.6, 0.35, 4.2]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
        {/* Pillow */}
        <mesh position={[0, 0.75, -1.5]}>
          <boxGeometry args={[1.8, 0.18, 0.9]} />
          <meshStandardMaterial color="#f05a5a" roughness={0.4} />
        </mesh>
      </group>

      {/* Minimalist Desk & Chair */}
      <group position={[2.5, -1.2, -3]}>
        {/* Desk Top */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[2.2, 0.1, 1.2]} />
          <meshStandardMaterial color="#1a1f2c" roughness={0.2} />
        </mesh>
        {/* Legs */}
        {[-0.9, 0.9].map((lx) =>
          [-0.45, 0.45].map((lz) => (
            <mesh key={`${lx}-${lz}`} position={[lx, 0, lz]}>
              <boxGeometry args={[0.08, 0.9, 0.08]} />
              <meshStandardMaterial color="#1a1f2c" />
            </mesh>
          ))
        )}
      </group>

      {/* Architectural Window Light Accent */}
      <mesh position={[-4.4, 2, -1]}>
        <boxGeometry args={[0.05, 2.5, 3]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      <ambientLight intensity={0.9} />
      <pointLight position={[4, 6, 5]} intensity={1.8} color="#fff8f0" />
      <directionalLight position={[-6, 8, 4]} intensity={1.2} color="#f05a5a" />
    </group>
  );
};
