"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function GradientTorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        colorA: { value: new THREE.Color("#2997ff") },
        colorB: { value: new THREE.Color("#5856d6") },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;

        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 colorA;
        uniform vec3 colorB;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;

        void main() {
          float gradient = smoothstep(-1.2, 1.2, vWorldPosition.y * 0.7 + vWorldPosition.x * 0.35);
          vec3 baseColor = mix(colorA, colorB, gradient);

          vec3 lightDir = normalize(vec3(0.4, 0.8, 1.0));
          float lighting = max(dot(normalize(vNormal), lightDir), 0.0);
          float fresnel = pow(1.0 - max(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 0.0), 2.2);

          vec3 finalColor = baseColor * (0.55 + lighting * 0.7) + vec3(1.0) * fresnel * 0.2;
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
    });
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const { x, y } = state.pointer;
    targetRotation.current.x = y * 0.35;
    targetRotation.current.y = x * 0.6;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetRotation.current.x,
      0.06
    );
    meshRef.current.rotation.y += delta * 0.35;
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      targetRotation.current.y,
      0.05
    );
  });

  return (
    <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.5}>
      <mesh ref={meshRef} material={shaderMaterial} castShadow receiveShadow>
        <torusKnotGeometry args={[1.15, 0.34, 260, 32, 3, 7]} />
      </mesh>
    </Float>
  );
}

function SparklesField() {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 650;
    const array = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 2.2 + Math.random() * 2.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      array[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      array[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.8;
      array[i * 3 + 2] = radius * Math.cos(phi);
    }

    return array;
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.04;
    pointsRef.current.rotation.x += delta * 0.015;
  });

  return (
    <Points
      ref={pointsRef}
      positions={positions}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#cfe3ff"
        size={0.035}
        sizeAttenuation
        depthWrite={false}
        opacity={0.9}
      />
    </Points>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[4, 4, 5]} intensity={2.2} color="#ffffff" />
      <pointLight position={[-4, -2, 3]} intensity={1.4} color="#5856d6" />
      <pointLight position={[3, 1, -2]} intensity={1.2} color="#2997ff" />
    </>
  );
}

export default function Hero3D() {
  return (
    <div className="relative h-[380px] w-full sm:h-[460px] lg:h-[560px]">
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#2997ff]/10 via-white/5 to-[#5856d6]/10 blur-3xl" />
      <div className="absolute inset-0 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-md" />
      <Canvas
        className="relative z-10"
        camera={{ position: [0, 0, 4.8], fov: 45 }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <SceneLights />
          <SparklesField />
          <GradientTorusKnot />
        </Suspense>
      </Canvas>
    </div>
  );
}
