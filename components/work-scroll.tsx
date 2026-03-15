"use client";

import React, { useMemo, useRef, useState } from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";
import { ArrowUpRight, MousePointer2, Search, Sparkles } from "lucide-react";

const benefits = [
  {
    title: "Mehr Anfragen",
    subtitle: "Deine Website arbeitet 24/7 wie ein digitaler Verkäufer.",
    accent: "#2997ff",
    glow: "rgba(41,151,255,0.28)",
    badge: "+42% Leads",
    icon: Search,
    type: "magnet" as const,
  },
  {
    title: "Mehr Vertrauen",
    subtitle: "Ein starker erster Eindruck macht aus Klicks echte Kunden.",
    accent: "#5856d6",
    glow: "rgba(88,86,214,0.28)",
    badge: "stärkerer Auftritt",
    icon: Sparkles,
    type: "shield" as const,
  },
  {
    title: "Mehr Wirkung",
    subtitle: "Klare Botschaft, bessere Conversion, mehr Wirkung pro Besuch.",
    accent: "#17d2c2",
    glow: "rgba(23,210,194,0.24)",
    badge: "bessere Conversion",
    icon: MousePointer2,
    type: "pulse" as const,
  },
];

function BenefitObject({ type, accent }: { type: "magnet" | "shield" | "pulse"; accent: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * (hovered ? 0.9 : 0.45);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      hovered ? 0.24 : 0.12,
      0.08
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      hovered ? 0.14 : Math.sin(state.clock.elapsedTime * 1.2) * 0.06,
      0.08
    );
  });

  const coreMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: accent,
        emissive: accent,
        emissiveIntensity: hovered ? 0.5 : 0.22,
        metalness: 0.35,
        roughness: 0.28,
      }),
    [accent, hovered]
  );

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.05 : 1}
    >
      {type === "magnet" && (
        <>
          <Float speed={2.2} rotationIntensity={0.35} floatIntensity={0.5}>
            <mesh material={coreMaterial} position={[-0.48, 0, 0]}>
              <torusGeometry args={[0.48, 0.14, 16, 64, Math.PI]} />
            </mesh>
            <mesh material={coreMaterial} rotation={[0, 0, Math.PI]} position={[0.48, 0, 0]}>
              <torusGeometry args={[0.48, 0.14, 16, 64, Math.PI]} />
            </mesh>
            <mesh position={[0, 0, 0.04]}>
              <sphereGeometry args={[0.13, 24, 24]} />
              <meshStandardMaterial color="#ffffff" emissive={accent} emissiveIntensity={0.45} />
            </mesh>
          </Float>
        </>
      )}

      {type === "shield" && (
        <>
          <Float speed={2} rotationIntensity={0.3} floatIntensity={0.45}>
            <mesh material={coreMaterial} position={[0, 0.02, 0]}>
              <octahedronGeometry args={[0.72, 0]} />
            </mesh>
            <mesh position={[0, 0.02, 0.16]}>
              <octahedronGeometry args={[0.34, 0]} />
              <meshStandardMaterial color="#ffffff" emissive={accent} emissiveIntensity={0.35} />
            </mesh>
          </Float>
        </>
      )}

      {type === "pulse" && (
        <>
          <Float speed={2.4} rotationIntensity={0.4} floatIntensity={0.55}>
            <mesh material={coreMaterial}>
              <icosahedronGeometry args={[0.62, 0]} />
            </mesh>
            <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
              <torusGeometry args={[0.92, 0.04, 16, 80]} />
              <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.32} transparent opacity={0.75} />
            </mesh>
          </Float>
        </>
      )}
    </group>
  );
}

function BenefitCanvas({ type, accent }: { type: "magnet" | "shield" | "pulse"; accent: string }) {
  return (
    <div className="relative h-56 w-full sm:h-64">
      <div
        className="pointer-events-none absolute inset-0 rounded-[28px] blur-3xl"
        style={{ background: `radial-gradient(circle, ${accent}22 0%, transparent 68%)` }}
      />
      <Canvas camera={{ position: [0, 0, 3.8], fov: 42 }} dpr={[1, 2]}>
        <ambientLight intensity={1.1} />
        <directionalLight position={[3, 4, 5]} intensity={1.4} />
        <pointLight position={[-3, 1, 3]} intensity={0.7} color={accent} />
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
              Unsere Arbeit
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl"
            >
              Websites die
              <br />
              <span className="text-[#2997ff]">Vorteile sichtbar machen</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mx-auto max-w-2xl text-lg text-white/60"
            >
              Drei starke Gründe, warum eine gute Website nicht nur schön aussieht, sondern direkt Wirkung hat.
            </motion.p>
          </div>
        }
      >
        <div className="relative h-full w-full bg-[radial-gradient(circle_at_top,rgba(41,151,255,0.08),transparent_32%),linear-gradient(135deg,#090909,#11131a)] p-4 md:p-8">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(41,151,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(41,151,255,0.03)_1px,transparent_1px)] bg-[size:36px_36px] opacity-60" />

          <div className="relative mb-4 flex items-center gap-2 rounded-t-2xl border-b border-white/10 bg-white/[0.04] p-3 md:mb-6">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
            </div>
            <div className="mx-2 flex-1 rounded-md bg-white/5 px-3 py-1 text-xs text-white/40 md:mx-4">
              liminalo.com/vorteile
            </div>
          </div>

          <div className="relative grid h-[calc(100%-4rem)] gap-4 md:grid-cols-3 md:gap-5">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.18 + i * 0.1 }}
                  className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl md:p-5"
                >
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `radial-gradient(circle at top, ${benefit.glow} 0%, transparent 65%)` }}
                  />

                  <div className="relative z-10 flex h-full flex-col">
                    <div className="mb-3 flex items-center justify-between">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
                        style={{ boxShadow: `0 0 30px ${benefit.glow}` }}
                      >
                        <Icon className="h-5 w-5" style={{ color: benefit.accent }} />
                      </div>
                      <span
                        className="rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.18em]"
                        style={{ borderColor: `${benefit.accent}55`, color: benefit.accent, background: `${benefit.accent}12` }}
                      >
                        {benefit.badge}
                      </span>
                    </div>

                    <BenefitCanvas type={benefit.type} accent={benefit.accent} />

                    <div className="mt-3 space-y-2">
                      <h3 className="text-2xl font-semibold text-white">{benefit.title}</h3>
                      <p className="text-sm leading-relaxed text-white/62">{benefit.subtitle}</p>
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-sm text-white/55">
                      <ArrowUpRight className="h-4 w-4" style={{ color: benefit.accent }} />
                      <span>Interaktiv. Klar. Sofort verständlich.</span>
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
