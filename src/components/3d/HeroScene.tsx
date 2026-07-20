"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, Environment } from "@react-three/drei";
import * as THREE from "three";

// The 3D Compass object
function CompassMesh() {
  const group = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const needleRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current || !ringRef.current || !needleRef.current) return;
    
    // Gentle rotation of the whole compass
    group.current.rotation.y += delta * 0.1;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

    // The ring spins slightly faster
    ringRef.current.rotation.z -= delta * 0.2;

    // The needle "seeks" north with a springy motion
    const targetY = Math.sin(state.clock.elapsedTime) * 0.5;
    needleRef.current.rotation.y += (targetY - needleRef.current.rotation.y) * 0.1;
  });

  return (
    <group ref={group}>
      <Float
        speed={2} 
        rotationIntensity={0.5} 
        floatIntensity={1} 
        floatingRange={[-0.1, 0.1]}
      >
        {/* Outer Ring */}
        <mesh ref={ringRef} rotation-x={Math.PI / 2}>
          <torusGeometry args={[1.5, 0.05, 16, 64]} />
          <meshStandardMaterial 
            color="#123A63" 
            metalness={0.8} 
            roughness={0.2} 
            envMapIntensity={2} 
          />
        </mesh>

        {/* Inner Ring */}
        <mesh rotation-x={Math.PI / 2}>
          <torusGeometry args={[1.3, 0.02, 16, 64]} />
          <meshStandardMaterial 
            color="#1A9BC7" 
            metalness={0.5} 
            roughness={0.3} 
          />
        </mesh>

        {/* Compass Needle Group */}
        <group ref={needleRef} rotation-x={Math.PI / 2}>
          {/* North Point (Red/Teal) */}
          <mesh position={[0, 1, 0]} rotation-z={Math.PI}>
            <coneGeometry args={[0.15, 1.2, 4]} />
            <meshStandardMaterial 
              color="#15779D" 
              metalness={0.4} 
              roughness={0.3} 
            />
          </mesh>
          {/* South Point (Silver/Navy) */}
          <mesh position={[0, -1, 0]}>
            <coneGeometry args={[0.15, 1.2, 4]} />
            <meshStandardMaterial 
              color="#0A1628" 
              metalness={0.7} 
              roughness={0.2} 
            />
          </mesh>
          {/* Center Hub */}
          <mesh>
            <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
            <meshStandardMaterial 
              color="#FFFFFF" 
              metalness={0.9} 
              roughness={0.1} 
            />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

export default function HeroScene() {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check user preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  if (isReducedMotion) {
    // Render static image or simplified fallback for accessibility
    return (
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/compass-fallback.png" alt="" aria-hidden="true" className="w-1/2 max-w-sm" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-60 mix-blend-screen mix-blend-plus-lighter">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#1A9BC7" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#123A63" />
        
        <CompassMesh />
        
        {/* Environment map for realistic reflections */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
