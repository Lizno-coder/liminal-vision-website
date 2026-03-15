"use client";

import React, { useRef, useState } from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Sphere, Torus, Text } from "@react-three/drei";
import * as THREE from "three";
import { ArrowUpRight, MousePointer2, ShieldCheck, TrendingUp } from "lucide-react";

const benefits = [
  {
    title: "Mehr Anfragen",
    text: "Klarer Auftritt. Mehr qualifizierte Leads.",
    accent: "#2997ff",
    glow: "rgba(41,151,255,0.20)",
    badge: "+42% Leads",
    icon: TrendingUp,
    type: "growth" as const,
  },
  {
    title: "Mehr Vertrauen",
    text: "Professionell wirken in wenigen Sekunden.",
    accent: "#6d5efc",
    glow: "rgba(109,94,252,0.18)",
    badge: "starker Eindruck",
    icon: ShieldCheck,
    type: "trust" as const,
  },
  {
    title: "Mehr Wirkung",
    text: "Botschaft, Design und Conversion greifen zusammen.",
    accent: "#16d5c0",
    glow: "rgba(22,213,192,0.16)",
    badge: "mehr Conversion",
    icon: MousePointer2,
    type: "impact" as const,
  },
];

function BenefitObject({ type, accent }: { type: "growth" | "trust" | "impact"; accent: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * (hovered ? 0.85 : 0.42);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, hovered ? 0.18 : 0.08, 0.08);
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      Math.sin(state.clock.elapsedTime * 1.15) * 0.05 + (hovered ? 0.06 : 0),
      0.08
    );
  });

  return (
    <group ref={groupRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      {type === "growth" && (
        <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.35}>
          <RoundedBox args={[0.7, 1.2, 0.28]} radius={0.2} position={[-0.5, -0.12, 0]}>
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.22} roughness={0.28} metalness={0.35} />
          </RoundedBox>
          <RoundedBox args={[0.7, 1.75, 0.28]} radius={0.2} position={[0.1, 0.08, 0]}>
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.26} roughness={0.28} metalness={0.35} />
          </RoundedBox>
          <RoundedBox args={[0.7, 2.25, 0.28]} radius={0.2} position={[0.7, 0.34, 0]}>
            <meshStandardMaterial color="#8dd0ff" emissive={accent} emissiveIntensity={0.18} roughness={0.24} metalness={0.32} />
          </RoundedBox>
        </Float>
      )}

      {type === "trust" && (
        <Float speed={1.7} rotationIntensity={0.18} floatIntensity={0.32}>
          <mesh position={[0, 0.02, 0]}>
            <octahedronGeometry args={[0.88, 0]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.22} roughness={0.3} metalness={0.3} />
          </mesh>
          <Sphere args={[0.18, 32, 32]} position={[0, 0.02, 0.38]}>
            <meshStandardMaterial color="#f7f7ff" emissive={accent} emissiveIntensity={0.18} />
          </Sphere>
        </Float>
      )}

      {type === "impact" && (
        <Float speed={1.9} rotationIntensity={0.24} floatIntensity={0.38}>
          <mesh>
            <icosahedronGeometry args={[0.7, 0]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.18} roughness={0.3} metalness={0.28} />
          </mesh>
          <Torus args={[1.02, 0.06, 20, 80]} rotation={[Math.PI / 2.8, 0, 0]}>
            <meshStandardMaterial color="#87fff1" emissive={accent} emissiveIntensity={0.16} transparent opacity={0.8} />
          </Torus>
        </Float>
      )}
    </group>
  );
}

function BenefitCanvas({ type, accent }: { type: "growth" | "trust" | "impact"; accent: string }) {
  return (
    <div className="relative h-36 w-full sm:h-40 md:h-44">
      <div className="pointer-events-none absolute inset-0 rounded-[28px] blur-3xl" style={{ background: `radial-gradient(circle, ${accent}18 0%, transparent 70%)` }} />
      <Canvas camera={{ position: [0, 0, 4.2], fov: 40 }} dpr={[1, 2]}>
        <ambientLight intensity={1.05} />
        <directionalLight position={[3, 4, 5]} intensity={1.25} />
        <pointLight position={[-2, 1, 3]} intensity={0.58} color={accent} />
        <BenefitObject type={type} accent={accent} />
      </Canvas>
    </div>
  );
}

export function WorkScrollSection() {
  return (
    <section id="work" className="relative overflow-hidden">
      <ContainerScroll
        titleComponent={
          <div className="mb-8 px-4">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 inline-block text-sm uppercase tracking-[0.2em] text-[#2997ff]"
            >
              Vorteile
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl"
            >
              Was eine starke
              <br />
              <span className="text-[#2997ff]">Website wirklich bringt</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mx-auto max-w-2xl text-lg text-white/60"
            >
              Minimalistisch, klar und direkt verständlich — ohne visuelles Chaos.
            </motion.p>
          </div>
        }
      >
        <div className="relative h-full w-full bg-[radial-gradient(circle_at_top,rgba(41,151,255,0.06),transparent_32%),linear-gradient(135deg,#08090d,#10131b)] p-3 sm:p-4 md:p-7">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(41,151,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(41,151,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />

          <div className="relative mb-4 flex items-center gap-2 rounded-t-2xl border-b border-white/10 bg-white/[0.035] px-3 py-3 md:mb-5">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
            </div>
            <div className="mx-2 flex-1 rounded-md bg-white/5 px-3 py-1 text-xs text-white/40 md:mx-4">liminalo.com/vorteile</div>
          </div>

          <div className="relative grid h-[calc(100%-4rem)] gap-3 md:grid-cols-3 md:gap-4">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.16 + i * 0.08 }}
                  className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.025] p-4 backdrop-blur-lg md:p-5"
                >
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: `radial-gradient(circle at top, ${benefit.glow} 0%, transparent 64%)` }} />

                  <div className="relative z-10 flex h-full flex-col">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                        <Icon className="h-5 w-5" style={{ color: benefit.accent }} />
                      </div>
                      <span className="rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.14em]" style={{ borderColor: `${benefit.accent}44`, color: benefit.accent, background: `${benefit.accent}10` }}>
                        {benefit.badge}
                      </span>
                    </div>

                    <BenefitCanvas type={benefit.type} accent={benefit.accent} />

                    <div className="mt-2 space-y-1.5">
                      <h3 className="text-[1.65rem] font-semibold leading-none text-white">{benefit.title}</h3>
                      <p className="max-w-[22ch] text-sm leading-5 text-white/62">{benefit.text}</p>
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-xs text-white/46">
                      <ArrowUpRight className="h-4 w-4" style={{ color: benefit.accent }} />
                      <span>Sofort klar. Sofort hochwertig.</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
