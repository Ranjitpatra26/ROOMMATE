import React, { useRef, useEffect, useState, useMemo, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image as DreiImage } from '@react-three/drei';
import * as THREE from 'three';

export interface HeroSceneProps {
  mouseX?: number;
  mouseY?: number;
}

interface EditorialPlaneConfig {
  id: string;
  url: string;
  title: string;
  basePos: [number, number, number];
  baseRot: [number, number, number];
  scale: [number, number];
  layer: 'foreground' | 'midground' | 'background';
  parallaxFactor: number;
  velocityFactor: number;
  mouseFactor: number;
  driftSpeed: number;
  phaseOffset: number;
  minDevice: 'mobile' | 'tablet' | 'desktop';
}

// Curated collection of 12 authentic ROOMMATE editorial photographs
const EDITORIAL_PLANES: EditorialPlaneConfig[] = [
  // --- FOREGROUND LAYER (Crisp, close, high parallax, framing peripheral edges) ---
  {
    id: 'plane-fg-1',
    url: '/images/editorial/roommate_cooking_kitchen_1786824811146.jpg',
    title: 'Shared Morning Chai & Breakfast',
    basePos: [-3.8, 1.2, 0.9],
    baseRot: [0.03, 0.07, -0.03],
    scale: [2.3, 1.72],
    layer: 'foreground',
    parallaxFactor: 1.45,
    velocityFactor: 1.3,
    mouseFactor: 0.22,
    driftSpeed: 0.7,
    phaseOffset: 0.2,
    minDevice: 'mobile',
  },
  {
    id: 'plane-fg-2',
    url: '/images/editorial/roommate_coworking_living_1786824857462.jpg',
    title: 'Bengaluru Living Room Co-working',
    basePos: [3.9, -1.0, 0.7],
    baseRot: [-0.04, -0.08, 0.025],
    scale: [2.35, 1.76],
    layer: 'foreground',
    parallaxFactor: 1.4,
    velocityFactor: 1.25,
    mouseFactor: 0.2,
    driftSpeed: 0.65,
    phaseOffset: 1.8,
    minDevice: 'mobile',
  },
  {
    id: 'plane-fg-3',
    url: '/images/editorial/roommate_coffee_conversation_1786825497081.jpg',
    title: 'Indiranagar Filter Coffee & Conversation',
    basePos: [-3.5, -1.9, 0.5],
    baseRot: [0.02, 0.05, 0.02],
    scale: [2.1, 1.57],
    layer: 'foreground',
    parallaxFactor: 1.3,
    velocityFactor: 1.15,
    mouseFactor: 0.18,
    driftSpeed: 0.75,
    phaseOffset: 3.4,
    minDevice: 'tablet',
  },

  // --- MIDGROUND LAYER (Architectural core & cohabitant lifestyle spaces) ---
  {
    id: 'plane-mg-1',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCU9qF-fRppSg_q_fHfIvpbWCQztObHtKg4yVaXXXeo9oB1qPQzUOhyZIf1uLDnnEx-9EVOuVUWDtqt1Mewgv9HEJJQLSc2f7c_9N9ysGvebCQrk9RNuUFpF8RsDbV1fxablWYKIoi68jnTcmUCVZr8IwKYqe7rQvgjiyO8MZo5kYxQ22cneNF-zn7i8zqMFb-M9UyU_059zcCzriaF642s21ynSvKxj7_02LmJQv7dMjY3kFUSffi0dg',
    title: 'Architectural Sunlit Bedroom Suite',
    basePos: [3.7, 1.8, -0.3],
    baseRot: [0.04, -0.05, 0.015],
    scale: [2.0, 1.4],
    layer: 'midground',
    parallaxFactor: 1.0,
    velocityFactor: 0.95,
    mouseFactor: 0.14,
    driftSpeed: 0.55,
    phaseOffset: 0.9,
    minDevice: 'mobile',
  },
  {
    id: 'plane-mg-2',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCizJ3f4c7EY30dIWEJ8ZA1N24Iu3EmeKUF7FJCMfBFTL2bxx4wUTi-snMIY-1nWssyvuITIJy9BTbVEQqY7MQfUk1-N8fpGTt3W3YU7G5KhlO6hlMcW5xqORptC5z1WZOrLo7yUpSBwc5Viov1TF3TNbLEOfxXDOYLf-R6__3Z6olBJNEuwvVszLLyYT9mZ7yKaD76MiIoaMLwx9Kt0b-KnYUizV5T4JncLYNX6EnwNL4Gs7Gl4PLDrQ',
    title: 'Curated Modern Co-Living Spaces',
    basePos: [-4.4, 0.0, -0.5],
    baseRot: [-0.02, 0.09, -0.025],
    scale: [1.95, 1.46],
    layer: 'midground',
    parallaxFactor: 0.95,
    velocityFactor: 0.9,
    mouseFactor: 0.13,
    driftSpeed: 0.6,
    phaseOffset: 2.3,
    minDevice: 'tablet',
  },
  {
    id: 'plane-mg-3',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcPyLH-KHdtS72x-hr5aPCs6xyEcUEmITkP5TRXSn-oG2C8akFaJT_vZDf8BEjVan9T-esm9GYSrfOoNY26kY-TxpKGLGgPdTzGHR-g1ye90LLaOerp0adDCc-LDyfOLVdi2QsZey0oN9H6JqEegvVB_k7GX5IESd5ysRopJZSU68x_vfwS04XnUzlAajbCHf8NeAncqqm2_lYRBRJ2kf8oL3bYkgQu2sOAiOVvQYhw1bzIqYF-ufI7w',
    title: 'Bandra Heritage Duplex',
    basePos: [4.4, 0.4, -0.4],
    baseRot: [0.03, -0.07, -0.02],
    scale: [1.9, 1.42],
    layer: 'midground',
    parallaxFactor: 0.9,
    velocityFactor: 0.85,
    mouseFactor: 0.12,
    driftSpeed: 0.5,
    phaseOffset: 4.1,
    minDevice: 'tablet',
  },
  {
    id: 'plane-mg-4',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJfZh2AkHLiWeIMVRiVBEvrekrs7IqEWr1Py0aJiWvJUzogR0emd_5v9JVwH7_iaqfEm7F8OgNWv2FEuO5i3JX6NVx8mHfnRvL_MGzQUqiooVHoMBMTN-PvnWtN1YACurcrHKjKugPhuEO-Nti6CRMfZMO0zleQ9utZd-3NtXA1Y7jXz-z_6l_5Yo3BGT1bVcjTwUg73KD8Oggs-EtspKVWQgGvWnEvFl6ynyVewg0nCTxMHVYLFVcmQ',
    title: 'Indiranagar Garden Studio & Balcony',
    basePos: [0.3, 2.7, -0.8],
    baseRot: [-0.03, 0.02, 0.01],
    scale: [1.85, 1.38],
    layer: 'midground',
    parallaxFactor: 0.85,
    velocityFactor: 0.8,
    mouseFactor: 0.1,
    driftSpeed: 0.45,
    phaseOffset: 1.2,
    minDevice: 'mobile',
  },
  {
    id: 'plane-mg-5',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEWrgUNcRr6nebRXtPIO7abqFux49UUUAf66KOSsOl5mVkYNETBXTiw6QlCfbFRfTotsPvyasktRwzMrgX0B_nIObb7a3VTaoQalieqgFd_kqqyy5Ts97sYEKclvpJF9RHSuDqr4I_9ZNr5dolPXBQbOozBYZM9OyWdM1dmDB8S6igPiKPLH1JRVqKAgMCndxEEsZOTcWYeB9LnKsQqchwfK70j85fh3pcUD5S95U3JxgNfypN9EmqBw',
    title: 'Hauz Khas Artisan Loft Sanctuary',
    basePos: [-0.5, -2.7, -0.7],
    baseRot: [0.03, -0.02, -0.015],
    scale: [1.85, 1.38],
    layer: 'midground',
    parallaxFactor: 0.8,
    velocityFactor: 0.75,
    mouseFactor: 0.09,
    driftSpeed: 0.48,
    phaseOffset: 2.8,
    minDevice: 'tablet',
  },

  // --- BACKGROUND LAYER (Deep atmospheric space & verified roommate portraits) ---
  {
    id: 'plane-bg-1',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0ZyjxDjRQuQZHNkpfNglORcqnfU8Ka1u6AT7THzvX-MKZrhyurNd8JMBcrDTQL8NWFu1MT_xR_CxSS-HhFSvxMuwFw50QHbPsnpHEBGJGIuzHVyENdJvbXue--YmTiuUVii_iTT2Egjeng4WJnPiHXhgmf6SKl9r8OwP1_8tFCo8b-bmEFf4dIRggWJaEZGYb3IpwnhD9R8lTDKMVUN-qRnAR8VC-2J9pR9skoAQNIcqFQJ5xvkPY-A',
    title: 'Baner Minimalist Habitat',
    basePos: [-4.9, 2.3, -2.1],
    baseRot: [-0.04, 0.08, 0.03],
    scale: [2.1, 1.57],
    layer: 'background',
    parallaxFactor: 0.55,
    velocityFactor: 0.5,
    mouseFactor: 0.06,
    driftSpeed: 0.35,
    phaseOffset: 0.5,
    minDevice: 'desktop',
  },
  {
    id: 'plane-bg-2',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTwHP-dedcvHuy1rko6qYkrmV_43Hl2to-1vH2SnFApVj2UEXDeSUeX4FvgXIQHRoEcY-aOfxeIkHlzdQMV1HiJXcdJ2CvOZxKi9CcoJsjXU9GR1HM0R4zdpv9tCAA3IIUHOhhoJ83PVw-njK-O8KGd4bPYUSBMtARJdTDO9sDF5F5UI25dy25hEN6nasZd2YYMKv2usKhBIcS7o9vzno75rGzkLGPC9Tn3L_gnbKiO4_4JbIWEMDZ8A',
    title: 'Ananya Sharma — Spatial Architect',
    basePos: [5.0, 2.3, -2.3],
    baseRot: [0.05, -0.07, -0.025],
    scale: [1.75, 1.75],
    layer: 'background',
    parallaxFactor: 0.5,
    velocityFactor: 0.45,
    mouseFactor: 0.05,
    driftSpeed: 0.32,
    phaseOffset: 1.9,
    minDevice: 'desktop',
  },
  {
    id: 'plane-bg-3',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2i8SWb4apq6U1es6wns7xbL7M0iATnV9B0tUPVJ8wkAcPPnSxWpkn7RkYeWkoEHQd0963RC1wXOpzAIpyr3-iHi_2rFrr0ee44glSA9C-3IMa8KVBFUuRkLkR7z5xDs39RTkQi5dodR4MExu9kttg4kfvaxAUCMKUutHCViobglnW4KmJvyEBm03D1AT5KE-6Vi3hF7cWFK6G_AwvFQE5R9fiVI_tgFyEztv6vxUoaqk8MaqskJEImQ',
    title: 'Rohan Patil — AI Researcher',
    basePos: [-5.0, -2.2, -2.0],
    baseRot: [-0.03, 0.06, 0.025],
    scale: [1.7, 1.7],
    layer: 'background',
    parallaxFactor: 0.45,
    velocityFactor: 0.4,
    mouseFactor: 0.05,
    driftSpeed: 0.3,
    phaseOffset: 3.1,
    minDevice: 'desktop',
  },
  {
    id: 'plane-bg-4',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkrXIOQFr_z5E9eGhR9o5GdKIcRJItc5Va0e1s6Pvi2gJW9HstlN__2qqmol8Whb70aPTmU4TPWCvRGbOLjD7wwEDKCt9NMueejAZcpY_mEO-mVGei_3MiHaDq5qLMbEq_gHwvIm6BryawU0LrRMqY-zn1f7WInRW9Ktgdy5sP7qxlaFJIIM0_XJYflVqkUCxY7NYBnJkV6MHSa6RydvmAFN5TiOLhpZP7hGmsrkBOtAB1YJZSX8hYIg',
    title: 'Aarav Mehta — Fintech Product Lead',
    basePos: [4.9, -2.3, -2.2],
    baseRot: [0.04, -0.05, -0.02],
    scale: [1.7, 1.7],
    layer: 'background',
    parallaxFactor: 0.48,
    velocityFactor: 0.42,
    mouseFactor: 0.05,
    driftSpeed: 0.33,
    phaseOffset: 4.5,
    minDevice: 'desktop',
  },
];

// Single Floating Editorial Image Plane
const SingleEditorialPlane: React.FC<{
  config: EditorialPlaneConfig;
  velocityRef: React.MutableRefObject<number>;
  scrollYRef: React.MutableRefObject<number>;
  mouseX: number;
  mouseY: number;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  reducedMotion: boolean;
}> = ({
  config,
  velocityRef,
  scrollYRef,
  mouseX,
  mouseY,
  deviceType,
  reducedMotion,
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Responsive device horizontal scaling factor to prevent viewport overflow
  const responsiveXMultiplier = useMemo(() => {
    if (deviceType === 'mobile') return 0.72;
    if (deviceType === 'tablet') return 0.88;
    return 1.0;
  }, [deviceType]);

  const targetX = config.basePos[0] * responsiveXMultiplier;
  const targetY = config.basePos[1];
  const targetZ = config.basePos[2];

  // Opacity based on depth layer
  const planeOpacity = useMemo(() => {
    if (config.layer === 'foreground') return 0.95;
    if (config.layer === 'midground') return 0.85;
    return 0.7;
  }, [config.layer]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    if (reducedMotion) {
      // In reduced-motion mode: maintain static calm position with zero oscillation
      meshRef.current.position.x = targetX;
      meshRef.current.position.y = targetY;
      meshRef.current.position.z = targetZ;
      meshRef.current.rotation.x = config.baseRot[0];
      meshRef.current.rotation.y = config.baseRot[1];
      meshRef.current.rotation.z = config.baseRot[2];
      return;
    }

    const t = state.clock.getElapsedTime();
    const vel = velocityRef.current;
    const scrollY = scrollYRef.current;

    // 1. Scroll-induced Parallax & Velocity Drift
    const scrollDisplacementY = -scrollY * 0.0012 * config.parallaxFactor;
    const velocityPushY = vel * 0.015 * config.velocityFactor;
    const velocityPushX = vel * 0.005 * (config.basePos[0] > 0 ? 0.6 : -0.6);
    const velocityPushZ = Math.min(Math.abs(vel) * 0.008, 0.4) * (config.layer === 'foreground' ? 1.0 : -0.5);

    // 2. Subtle Organic Breathing Float
    const breathingY = Math.sin(t * config.driftSpeed + config.phaseOffset) * 0.04;
    const breathingX = Math.cos(t * config.driftSpeed * 0.7 + config.phaseOffset) * 0.02;

    // 3. Mouse Parallax (only enabled on desktop/tablet)
    const effectiveMouseFactor = deviceType === 'mobile' ? 0 : config.mouseFactor;
    const mouseOffsetX = mouseX * effectiveMouseFactor;
    const mouseOffsetY = -mouseY * effectiveMouseFactor * 0.7;

    // 4. Dynamic Rotational Tilt Influenced by Velocity & Mouse
    const velocityTiltX = THREE.MathUtils.clamp(-vel * 0.004 * config.velocityFactor, -0.15, 0.15);
    const velocityTiltZ = THREE.MathUtils.clamp(vel * 0.002 * (config.basePos[0] > 0 ? -1 : 1), -0.08, 0.08);
    const mouseTiltY = mouseX * effectiveMouseFactor * 0.3;
    const mouseTiltX = -mouseY * effectiveMouseFactor * 0.2;

    // 5. Smooth Interpolation (Damped Lerp with physical inertia)
    const lerpSpeed = Math.min(delta * 6.5, 0.25);

    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      targetX + mouseOffsetX + breathingX + velocityPushX,
      lerpSpeed
    );

    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      targetY + scrollDisplacementY + mouseOffsetY + breathingY + velocityPushY,
      lerpSpeed
    );

    meshRef.current.position.z = THREE.MathUtils.lerp(
      meshRef.current.position.z,
      targetZ + velocityPushZ,
      lerpSpeed
    );

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      config.baseRot[0] + velocityTiltX + mouseTiltX,
      lerpSpeed
    );

    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      config.baseRot[1] + mouseTiltY,
      lerpSpeed
    );

    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      config.baseRot[2] + velocityTiltZ,
      lerpSpeed
    );
  });

  return (
    <group
      ref={meshRef}
      position={[targetX, targetY, targetZ]}
      rotation={config.baseRot}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <Suspense fallback={null}>
        <DreiImage
          url={config.url}
          scale={config.scale}
          radius={0.04}
          transparent
          opacity={isHovered ? Math.min(planeOpacity + 0.1, 1.0) : planeOpacity}
          toneMapped={false}
        />
      </Suspense>

      {/* Editorial Border Framing Accents */}
      <mesh position={[0, 0, -0.005]}>
        <planeGeometry args={[config.scale[0] + 0.04, config.scale[1] + 0.04]} />
        <meshBasicMaterial
          color="#1a1f2c"
          transparent
          opacity={config.layer === 'foreground' ? 0.12 : 0.06}
        />
      </mesh>
    </group>
  );
};

export const HeroScene: React.FC<HeroSceneProps> = ({ mouseX = 0, mouseY = 0 }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Scroll tracking and velocity state
  const scrollYRef = useRef<number>(0);
  const prevScrollYRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const lastScrollTimeRef = useRef<number>(performance.now());

  // Responsive device categorization
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    const checkMedia = () => {
      const w = window.innerWidth;
      if (w < 768) {
        setDeviceType('mobile');
      } else if (w < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }

      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);
    };

    checkMedia();
    window.addEventListener('resize', checkMedia);

    // High-precision scroll velocity tracking with passive listener
    const handleScroll = () => {
      const currentScrollY = window.scrollY || window.pageYOffset || 0;
      const now = performance.now();
      const dt = Math.max((now - lastScrollTimeRef.current) / 1000, 0.008);

      const deltaY = currentScrollY - prevScrollYRef.current;
      const instantVelocity = deltaY / dt;

      // Smooth instantaneous velocity injection
      velocityRef.current = THREE.MathUtils.clamp(
        instantVelocity * 0.15 + velocityRef.current * 0.85,
        -180,
        180
      );

      scrollYRef.current = currentScrollY;
      prevScrollYRef.current = currentScrollY;
      lastScrollTimeRef.current = now;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', checkMedia);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Filter planes according to responsive device capacity
  const visiblePlanes = useMemo(() => {
    if (deviceType === 'mobile') {
      return EDITORIAL_PLANES.filter((p) => p.minDevice === 'mobile');
    }
    if (deviceType === 'tablet') {
      return EDITORIAL_PLANES.filter((p) => p.minDevice === 'mobile' || p.minDevice === 'tablet');
    }
    return EDITORIAL_PLANES;
  }, [deviceType]);

  useFrame((_, delta) => {
    // 1. Decay scroll velocity smoothly to zero (Physical inertia)
    if (!reducedMotion) {
      velocityRef.current = THREE.MathUtils.damp(velocityRef.current, 0, 4.5, delta);
    } else {
      velocityRef.current = 0;
    }

    // 2. Subtle scene-wide parallax tilt from mouse
    if (groupRef.current) {
      if (!reducedMotion && deviceType !== 'mobile') {
        const targetRotY = mouseX * 0.05;
        const targetRotX = -mouseY * 0.035;
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.04);
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.04);
      } else {
        groupRef.current.rotation.y = 0;
        groupRef.current.rotation.x = 0;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Editorial Lighting Rig */}
      <ambientLight intensity={1.1} color="#fcf8fa" />
      <directionalLight position={[5, 8, 6]} intensity={0.6} color="#fff5eb" />
      <directionalLight position={[-5, -4, 4]} intensity={0.3} color="#e5ddd6" />

      {/* Floating 3D Image Planes */}
      {visiblePlanes.map((config) => (
        <SingleEditorialPlane
          key={config.id}
          config={config}
          velocityRef={velocityRef}
          scrollYRef={scrollYRef}
          mouseX={mouseX}
          mouseY={mouseY}
          deviceType={deviceType}
          reducedMotion={reducedMotion}
        />
      ))}
    </group>
  );
};

