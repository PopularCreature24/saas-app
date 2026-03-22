'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, MeshDistortMaterial, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

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

function Particles() {
  const count = 500;
  const particlesRef = useRef<THREE.Points>(null);

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#8b5cf6" transparent opacity={0.6} />
    </points>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#8b5cf6" wireframe />
    </mesh>
  );
}

interface ProductViewerProps {
  variant?: 'hero' | 'demo' | 'card';
}

export function ProductViewer({ variant = 'hero' }: ProductViewerProps) {
  const height = variant === 'card' ? 'h-[200px]' : variant === 'demo' ? 'h-[400px]' : 'h-[500px]';

  return (
    <div className={`w-full ${height} rounded-xl overflow-hidden bg-gradient-to-br from-violet-900/20 to-fuchsia-900/20`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        className="touch-none"
      >
        <color attach="background" args={['#09090b']} />
        <ambientLight intensity={0.3} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        
        <Suspense fallback={<LoadingFallback />}>
          <Center>
            {variant === 'hero' ? <TorusKnot /> : <GeometricShapes />}
          </Center>
          <Environment preset="city" />
          <Particles />
        </Suspense>

        <OrbitControls
          enableZoom={variant !== 'card'}
          enablePan={false}
          autoRotate={variant === 'hero'}
          autoRotateSpeed={0.5}
          minDistance={3}
          maxDistance={10}
        />
      </Canvas>
    </div>
  );
}
