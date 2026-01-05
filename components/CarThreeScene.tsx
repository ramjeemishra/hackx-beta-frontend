
/// <reference types="@react-three/fiber" />
import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const F1CarModel = () => {
  const carRef = useRef<THREE.Group>(null!);
  
  useFrame((state) => {
    if (carRef.current) {
      carRef.current.rotation.y = Math.PI + Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
      carRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.5) * 0.02;

      if (state.clock.elapsedTime < 5) {
        carRef.current.position.z = THREE.MathUtils.lerp(carRef.current.position.z, 0, 0.02);
      }
    }
  });

  return (
    <group ref={carRef} scale={1.8} position={[0, -0.5, 5]}>
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[4.5, 0.2, 1.2]} />
        <meshStandardMaterial color="#111" roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh position={[0.2, 0.5, 0]}>
        <boxGeometry args={[1.2, 0.4, 0.8]} />
        <meshStandardMaterial color="#ef4444" roughness={0} metalness={0.8} />
      </mesh>
      <mesh position={[2.2, 0.2, 0]}>
        <boxGeometry args={[0.8, 0.05, 1.8]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      <mesh position={[-2.1, 0.7, 0]}>
        <boxGeometry args={[0.2, 0.6, 1.4]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>

      {[
        [1.3, 0.25, 0.75], [1.3, 0.25, -0.75], 
        [-1.3, 0.3, 0.8], [-1.3, 0.3, -0.8]
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
          <meshStandardMaterial color="#080808" roughness={1} />
        </mesh>
      ))}

      {[
        [1.3, 0.25, 0.91], [1.3, 0.25, -0.91], 
        [-1.3, 0.3, 0.96], [-1.3, 0.3, -0.96]
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.05, 16]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      ))}
    </group>
  );
};

const CarThreeScene: React.FC = () => {
  return (
    <div className="w-full h-full opacity-100">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 1.5, 6]} fov={45} />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <F1CarModel />
          <ContactShadows 
            position={[0, -0.5, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2} 
            far={10} 
            resolution={512} 
            color="#000000" 
          />
          <ambientLight intensity={0.5} />
          <spotLight position={[5, 10, 5]} angle={0.2} penumbra={1} intensity={1} castShadow />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CarThreeScene;
