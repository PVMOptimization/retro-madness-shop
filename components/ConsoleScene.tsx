"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center, Environment } from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/models/nes-console.glb");

function NESModel({ scrollProgress }: { scrollProgress: number }) {
  const group = useRef<THREE.Group>(null!);
  const { scene } = useGLTF("/models/nes-console.glb");
  const scaleRef = useRef<number | null>(null);

  useFrame((state) => {
    if (!group.current) return;

    // Measure the raw scene once on first frame to get true dimensions
    if (scaleRef.current === null) {
      const box = new THREE.Box3().setFromObject(scene);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      scaleRef.current = maxDim > 0 ? 1.4 / maxDim : 1;
    }

    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.18 + scrollProgress * Math.PI * 0.6;
    group.current.rotation.x = Math.sin(t * 0.25) * 0.06 - scrollProgress * 0.2;
    group.current.position.y = Math.sin(t * 0.6) * 0.07;
    group.current.scale.setScalar(
      scaleRef.current * (1 - scrollProgress * 0.12)
    );
  });

  return (
    <group ref={group}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[-3, 2, 4]} color="#00e5ff" intensity={6} />
      <pointLight position={[4, -1, 3]} color="#ff0080" intensity={4} />
      <pointLight position={[0, 5, -2]} color="#ffffff" intensity={1.5} />
      <pointLight position={[0, -4, 2]} color="#6600ff" intensity={1} />
    </>
  );
}

type Props = { scrollProgress?: number; className?: string };

export default function ConsoleScene({ scrollProgress = 0, className }: Props) {
  return (
    <Canvas
      className={className}
      camera={{ position: [0, 0.2, 4], fov: 22 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <Lights />
      <Suspense fallback={null}>
        <NESModel scrollProgress={scrollProgress} />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
}