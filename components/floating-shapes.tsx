'use client';

import { Float } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type ShapeKind = "torus" | "sphere" | "icosahedron";

type ShapeData = {
  id: number;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
  kind: ShapeKind;
  speed: number;
};

function Shape({ data }: { data: ShapeData }) {
  const ref = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (!ref.current) return;

    const t = state.clock.getElapsedTime();
    const px = mouse.x * 0.8;
    const py = mouse.y * 0.6;

    ref.current.rotation.x =
      data.rotation[0] + t * 0.12 * data.speed + py * 0.18;
    ref.current.rotation.y =
      data.rotation[1] + t * 0.18 * data.speed + px * 0.25;

    ref.current.position.x = data.position[0] + Math.sin(t * 0.4 + data.id) * 0.12 + px * 0.45;
    ref.current.position.y = data.position[1] + Math.cos(t * 0.5 + data.id) * 0.16 + py * 0.35;
  });

  const material = (
    <meshStandardMaterial
      color={data.color}
      metalness={0.7}
      roughness={0.18}
      transparent
      opacity={0.72}
      emissive={data.color}
      emissiveIntensity={0.12}
    />
  );

  return (
    <Float
      speed={data.speed}
      rotationIntensity={0.35}
      floatIntensity={0.55}
    >
      <mesh
        ref={ref}
        position={data.position}
        rotation={data.rotation}
        scale={data.scale}
      >
        {data.kind === "torus" && <torusGeometry args={[0.7, 0.2, 24, 64]} />}
        {data.kind === "sphere" && <sphereGeometry args={[0.6, 32, 32]} />}
        {data.kind === "icosahedron" && <icosahedronGeometry args={[0.75, 0]} />}
        {material}
      </mesh>
    </Float>
  );
}

export default function FloatingShapes() {
  const shapes = useMemo<ShapeData[]>(
    () => [
      {
        id: 1,
        kind: "torus",
        position: [-4.5, 2.6, -3],
        rotation: [0.4, 0.2, 0.1],
        scale: 1.1,
        color: "#2997ff",
        speed: 0.8,
      },
      {
        id: 2,
        kind: "sphere",
        position: [3.8, 2.2, -5],
        rotation: [0.2, 0.6, 0.1],
        scale: 0.9,
        color: "#7c83ff",
        speed: 0.7,
      },
      {
        id: 3,
        kind: "icosahedron",
        position: [-3.2, -1.8, -6],
        rotation: [0.9, 0.3, 0.5],
        scale: 1.2,
        color: "#5856d6",
        speed: 0.95,
      },
      {
        id: 4,
        kind: "torus",
        position: [4.7, -2.5, -8],
        rotation: [0.1, 0.8, 0.3],
        scale: 1.35,
        color: "#60a5fa",
        speed: 0.65,
      },
      {
        id: 5,
        kind: "sphere",
        position: [0, 3.8, -9],
        rotation: [0.3, 0.1, 0.2],
        scale: 0.7,
        color: "#93c5fd",
        speed: 0.75,
      },
      {
        id: 6,
        kind: "icosahedron",
        position: [1.2, -3.4, -4.5],
        rotation: [0.7, 0.4, 0.2],
        scale: 0.95,
        color: "#8b5cf6",
        speed: 1.05,
      },
    ],
    []
  );

  return (
    <group>
      {shapes.map((shape) => (
        <Shape key={shape.id} data={shape} />
      ))}
    </group>
  );
}
