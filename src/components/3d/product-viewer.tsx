'use client';

import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, MeshDistortMaterial, Center, Preload } from '@react-three/drei';
import * as THREE from 'three';
import { Loader2 } from 'lucide-react';

function TorusKnot({ autoRotate = true }: { autoRotate?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.5}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <MeshDistortMaterial
          color="#8b5cf6"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function GeometricShapes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[-2, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#f472b6" metalness={0.6} roughness={0.2} />
      </mesh>
      <mesh position={[2, 0, 0]}>
        <octahedronGeometry args={[0.8]} />
        <meshStandardMaterial color="#22d3ee" metalness={0.8} roughness={0.1} />
      </mesh>
      <mesh position={[0, 2, 0]}>
        <dodecahedronGeometry args={[0.6]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.7} roughness={0.2} />
      </mesh>
    </group>
  );
}

function generateParticlePositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }
  return positions;
}

function Particles({ count = 500 }: { count?: number }) {
  const particlesRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => generateParticlePositions(count), [count]);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial size={0.02} color="#8b5cf6" transparent opacity={0.6} />
    </points>
  );
}

function Scene({ variant }: { variant: 'hero' | 'demo' | 'card' }) {
  return (
    <>
      <color attach="background" args={['#09090b']} />
      <ambientLight intensity={0.3} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      
      <Suspense fallback={null}>
        <Center>
          {variant === 'hero' ? <TorusKnot /> : <GeometricShapes />}
        </Center>
        <Environment preset="city" />
        <Particles count={variant === 'card' ? 200 : 500} />
      </Suspense>

      <OrbitControls
        enableZoom={variant !== 'card'}
        enablePan={false}
        autoRotate={variant === 'hero'}
        autoRotateSpeed={0.5}
        minDistance={3}
        maxDistance={10}
      />
      <Preload all />
    </>
  );
}

function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-900/20 to-fuchsia-900/20">
      <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
    </div>
  );
}

interface ProductViewerProps {
  variant?: 'hero' | 'demo' | 'card';
}

export function ProductViewer({ variant = 'hero' }: ProductViewerProps) {
  const height = variant === 'card' ? 'h-[200px]' : variant === 'demo' ? 'h-[400px]' : 'h-[500px]';

  return (
    <div className={`w-full ${height} rounded-xl overflow-hidden bg-gradient-to-br from-violet-900/20 to-fuchsia-900/20`}>
      <Suspense fallback={<LoadingSpinner />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          className="touch-none"
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
          }}
          dpr={[1, 2]}
        >
          <Scene variant={variant} />
        </Canvas>
      </Suspense>
    </div>
  );
}
