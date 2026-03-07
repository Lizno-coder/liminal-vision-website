'use client';

import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Float,
  PerspectiveCamera,
  Points,
  PointMaterial,
} from "@react-three/drei";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import { Suspense, useMemo } from "react";
import * as THREE from "three";
import FloatingShapes from "./floating-shapes";

function DustParticles() {
  const positions = useMemo(() => {
    const count = 1200;
    const arr = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 28;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }

    return arr;
  }, []);

  return (
    <Points positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#7dd3fc"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        opacity={0.65}
      />
    </Points>
  );
}

function GradientOrbs() {
  return (
    <>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[-5, 3, -8]}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshBasicMaterial
            color="#2997ff"
            transparent
            opacity={0.08}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </Float>

      <Float speed={0.9} rotationIntensity={0.25} floatIntensity={0.8}>
        <mesh position={[5, -2, -10]}>
          <sphereGeometry args={[2.1, 32, 32]} />
          <meshBasicMaterial
            color="#5856d6"
            transparent
            opacity={0.08}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </Float>
    </>
  );
}

export default function ThreeBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />

          <fog attach="fog" args={["#020308", 12, 28]} />

          <ambientLight intensity={0.35} color="#3b82f6" />
          <directionalLight position={[6, 6, 4]} intensity={1.2} color="#2997ff" />
          <pointLight position={[-6, -2, 2]} intensity={1.4} color="#5856d6" />
          <pointLight position={[0, 4, 8]} intensity={0.8} color="#60a5fa" />

          <GradientOrbs />
          <DustParticles />
          <FloatingShapes />

          <Environment preset="night" />

          <EffectComposer multisampling={0}>
            <DepthOfField
              focusDistance={0.015}
              focalLength={0.02}
              bokehScale={1.8}
              height={480}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(41,151,255,0.14),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(88,86,214,0.12),transparent_26%),linear-gradient(to_bottom,rgba(0,0,0,0.12),rgba(0,0,0,0.66))]" />
    </div>
  );
}
