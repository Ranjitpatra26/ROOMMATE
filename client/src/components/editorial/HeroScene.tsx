import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface HeroSceneProps {
  mouseX?: number;
  mouseY?: number;
}

export const HeroScene: React.FC<HeroSceneProps> = ({ mouseX = 0, mouseY = 0 }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const meshGroupRef = useRef<THREE.Group>(null);
  const waveRibbonRef = useRef<THREE.LineSegments>(null);

  // Generate elegant floating ambient particles with depth
  const particleCount = 280;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 2.5 + Math.random() * 5.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.7; // slightly flattened for widescreen aesthetic
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  // Generate a modern architectural ribbon grid (replacing the single harsh circle)
  const ribbonGeometry = useMemo(() => {
    const segments = 64;
    const rings = 4;
    const geometry = new THREE.BufferGeometry();
    const linePositions: number[] = [];

    for (let r = 0; r < rings; r++) {
      const radius = 2.8 + r * 0.45;
      const heightOffset = (r - rings / 2) * 0.35;
      for (let i = 0; i <= segments; i++) {
        const u = (i / segments) * Math.PI * 2;
        const x = Math.cos(u) * radius;
        const wave = Math.sin(u * 3) * 0.25;
        const y = heightOffset + wave;
        const z = Math.sin(u) * radius;

        if (i > 0) {
          const prevU = ((i - 1) / segments) * Math.PI * 2;
          const prevX = Math.cos(prevU) * radius;
          const prevWave = Math.sin(prevU * 3) * 0.25;
          const prevY = heightOffset + prevWave;
          const prevZ = Math.sin(prevU) * radius;

          linePositions.push(prevX, prevY, prevZ);
          linePositions.push(x, y, z);
        }
      }
    }

    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    return geometry;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(
        pointsRef.current.rotation.x,
        mouseY * 0.1,
        0.05
      );
      pointsRef.current.rotation.z = THREE.MathUtils.lerp(
        pointsRef.current.rotation.z,
        mouseX * 0.1,
        0.05
      );
    }

    if (meshGroupRef.current) {
      meshGroupRef.current.rotation.y = t * 0.08 + mouseX * 0.2;
      meshGroupRef.current.rotation.x = Math.sin(t * 0.2) * 0.15 + 0.3 + mouseY * 0.15;
      meshGroupRef.current.position.y = Math.sin(t * 0.5) * 0.08;
    }
  });

  return (
    <group>
      {/* Subtle Floating Ambient Nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.025}
          color="#f05a5a"
          transparent
          opacity={0.3}
          sizeAttenuation
        />
      </points>

      {/* Modern Architectural Resonance Ribbon (Parametric Wave Lattice) */}
      <group ref={meshGroupRef}>
        <lineSegments ref={waveRibbonRef} geometry={ribbonGeometry}>
          <lineBasicMaterial
            color="#f05a5a"
            transparent
            opacity={0.18}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>
      </group>
    </group>
  );
};
