'use client'

import * as React from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox, Text } from '@react-three/drei'

const BRAND = {
  primary: '#2997ff',
  secondary: '#5856d6',
  background: '#1a1d29',
  card: '#252a3a',
  text: '#ffffff',
  muted: '#8b92a8',
  success: '#27ca40',
}

function useResponsiveScale() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return {
    isMobile,
    scale: isMobile ? 0.79 : 0.59,
    rotationMultiplier: isMobile ? 0.6 : 0.12,
  }
}

function StatCard({
  position,
  title,
  value,
  change,
  accent,
}: {
  position: [number, number, number]
  title: string
  value: string
  change: string
  accent: string
}) {
  return (
    <group position={position}>
      {/* Main card body with depth */}
      <RoundedBox args={[2.25, 1.45, 0.22]} radius={0.12} smoothness={6} castShadow receiveShadow>
        <meshStandardMaterial color={BRAND.card} metalness={0.15} roughness={0.72} />
      </RoundedBox>

      {/* Top surface layer */}
      <RoundedBox args={[2.25, 1.45, 0.04]} radius={0.12} smoothness={6} position={[0, 0, 0.1]}>
        <meshStandardMaterial color="#2c3144" metalness={0.08} roughness={0.85} />
      </RoundedBox>

      {/* Accent indicator strip */}
      <RoundedBox args={[0.06, 1.05, 0.04]} radius={0.03} smoothness={4} position={[-1.02, 0, 0.13]}>
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.18} />
      </RoundedBox>

      {/* Title - top left */}
      <Text
        position={[-0.78, 0.38, 0.14]}
        fontSize={0.16}
        color={BRAND.muted}
        anchorX="left"
        anchorY="middle"
      >
        {title}
      </Text>

      {/* Value - centered */}
      <Text
        position={[-0.78, 0.02, 0.14]}
        fontSize={0.34}
        color={BRAND.text}
        anchorX="left"
        anchorY="middle"
      >
        {value}
      </Text>

      {/* Change - below value */}
      <Text
        position={[-0.78, -0.4, 0.14]}
        fontSize={0.16}
        color={BRAND.success}
        anchorX="left"
        anchorY="middle"
      >
        {change}
      </Text>
    </group>
  )
}

function PerformanceChart({ position }: { position: [number, number, number] }) {
  const bars = [
    { h: 0.8, color: BRAND.primary },
    { h: 1.15, color: BRAND.secondary },
    { h: 1.45, color: BRAND.primary },
    { h: 1.05, color: '#4f7cff' },
    { h: 1.68, color: BRAND.secondary },
    { h: 1.28, color: BRAND.primary },
  ]

  return (
    <group position={position}>
      {/* Chart container with depth */}
      <RoundedBox args={[4.1, 2.6, 0.26]} radius={0.14} smoothness={6} castShadow receiveShadow>
        <meshStandardMaterial color={BRAND.card} metalness={0.15} roughness={0.74} />
      </RoundedBox>

      {/* Top surface */}
      <RoundedBox args={[4.1, 2.6, 0.04]} radius={0.14} smoothness={6} position={[0, 0, 0.12]}>
        <meshStandardMaterial color="#2c3144" roughness={0.86} />
      </RoundedBox>

      {/* Title - top left */}
      <Text
        position={[-1.72, 0.96, 0.15]}
        fontSize={0.18}
        color={BRAND.text}
        anchorX="left"
        anchorY="middle"
      >
        Performance
      </Text>

      {/* Subtitle */}
      <Text
        position={[-1.72, 0.72, 0.15]}
        fontSize={0.12}
        color={BRAND.muted}
        anchorX="left"
        anchorY="middle"
      >
        Last 6 months
      </Text>

      {/* Grid lines */}
      {[-0.75, -0.2, 0.35, 0.9].map((y, i) => (
        <mesh key={i} position={[0, y, 0.13]}>
          <boxGeometry args={[3.35, 0.015, 0.01]} />
          <meshBasicMaterial color="#384056" />
        </mesh>
      ))}

      {/* Chart bars with depth */}
      {bars.map((bar, i) => (
        <group key={i} position={[-1.3 + i * 0.5, -0.55 + bar.h / 2, 0.19]}>
          <RoundedBox args={[0.24, bar.h, 0.22]} radius={0.08} smoothness={5} castShadow receiveShadow>
            <meshStandardMaterial
              color={bar.color}
              metalness={0.18}
              roughness={0.42}
              emissive={bar.color}
              emissiveIntensity={0.12}
            />
          </RoundedBox>
        </group>
      ))}
    </group>
  )
}

function ActivityPanel({ position }: { position: [number, number, number] }) {
  const items = [
    { label: 'New signup', time: '2m ago', color: BRAND.primary },
    { label: 'Revenue spike', time: '18m ago', color: BRAND.success },
    { label: 'Campaign live', time: '1h ago', color: BRAND.secondary },
  ]

  return (
    <group position={position}>
      {/* Panel with depth */}
      <RoundedBox args={[2.55, 2.6, 0.26]} radius={0.14} smoothness={6} castShadow receiveShadow>
        <meshStandardMaterial color={BRAND.card} metalness={0.15} roughness={0.74} />
      </RoundedBox>

      {/* Top surface */}
      <RoundedBox args={[2.55, 2.6, 0.04]} radius={0.14} smoothness={6} position={[0, 0, 0.12]}>
        <meshStandardMaterial color="#2c3144" roughness={0.86} />
      </RoundedBox>

      {/* Title */}
      <Text
        position={[-0.93, 0.96, 0.15]}
        fontSize={0.18}
        color={BRAND.text}
        anchorX="left"
        anchorY="middle"
      >
        Activity
      </Text>

      {/* Activity items */}
      {items.map((item, i) => {
        const y = 0.45 - i * 0.72
        return (
          <group key={i} position={[0, y, 0.15]}>
            {/* Item background */}
            <RoundedBox args={[2.05, 0.5, 0.12]} radius={0.09} smoothness={4} position={[0, 0, 0]}>
              <meshStandardMaterial color="#2a3043" roughness={0.82} />
            </RoundedBox>

            {/* Status dot */}
            <mesh position={[-0.83, 0, 0.09]}>
              <sphereGeometry args={[0.08, 20, 20]} />
              <meshStandardMaterial
                color={item.color}
                emissive={item.color}
                emissiveIntensity={0.25}
                roughness={0.35}
              />
            </mesh>

            {/* Label */}
            <Text
              position={[-0.62, 0.08, 0.1]}
              fontSize={0.13}
              color={BRAND.text}
              anchorX="left"
              anchorY="middle"
            >
              {item.label}
            </Text>

            {/* Time */}
            <Text
              position={[-0.62, -0.12, 0.1]}
              fontSize={0.1}
              color={BRAND.muted}
              anchorX="left"
              anchorY="middle"
            >
              {item.time}
            </Text>
          </group>
        )
      })}
    </group>
  )
}

function Dashboard3D() {
  const groupRef = React.useRef<THREE.Group>(null)
  const { isMobile, scale, rotationMultiplier } = useResponsiveScale()

  const pointerTarget = React.useRef({ x: 0, y: 0 })
  const currentRotation = React.useRef({ x: 0, y: 0 })

  const spring = React.useRef({
    y: 0,
    velocity: 0,
    lastScrollY: 0,
    lastTime: 0,
    scrollVelocity: 0,
  })

  React.useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0
      let clientY = 0

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
      } else if ('clientX' in e) {
        clientX = e.clientX
        clientY = e.clientY
      }

      const x = (clientX / window.innerWidth) * 2 - 1
      const y = (clientY / window.innerHeight) * 2 - 1

      pointerTarget.current.x = x * rotationMultiplier
      pointerTarget.current.y = y * rotationMultiplier
    }

    const handleScroll = () => {
      const now = performance.now()
      const scrollY = window.scrollY
      const dt = Math.max((now - (spring.current.lastTime || now)) / 1000, 0.016)
      const delta = scrollY - spring.current.lastScrollY
      const velocity = delta / dt

      spring.current.scrollVelocity = THREE.MathUtils.lerp(
        spring.current.scrollVelocity,
        velocity * 0.00003,  // very low sensitivity
        0.2  // very slow lerp
      )

      spring.current.velocity += spring.current.scrollVelocity * 0.3  // very dampened

      spring.current.lastScrollY = scrollY
      spring.current.lastTime = now
    }

    if (isMobile) {
      window.addEventListener('touchmove', handlePointerMove, { passive: true })
    } else {
      window.addEventListener('mousemove', handlePointerMove)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    spring.current.lastScrollY = window.scrollY
    spring.current.lastTime = performance.now()

    return () => {
      window.removeEventListener('mousemove', handlePointerMove as EventListener)
      window.removeEventListener('touchmove', handlePointerMove as EventListener)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isMobile, rotationMultiplier])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    // Smooth pointer follow
    currentRotation.current.y = THREE.MathUtils.lerp(
      currentRotation.current.y,
      pointerTarget.current.x,
      0.08
    )
    currentRotation.current.x = THREE.MathUtils.lerp(
      currentRotation.current.x,
      -pointerTarget.current.y * 0.8,
      0.08
    )

    // Spring physics for scroll - QUICK SETTLE (minimal wobble)
    const stiffness = 30
    const damping = 0.75
    const velocityCutoff = 0.002
    
    spring.current.velocity += -spring.current.y * stiffness * delta
    spring.current.y += spring.current.velocity
    spring.current.velocity *= Math.pow(damping, delta * 60)
    
    // Cutoff: stop micro-oscillations
    if (Math.abs(spring.current.velocity) < velocityCutoff) {
      spring.current.velocity = 0
    }
    
    spring.current.scrollVelocity *= Math.pow(0.8, delta * 60)

    // Apply rotations - clamp spring effect
    groupRef.current.rotation.y = currentRotation.current.y
    groupRef.current.rotation.x = currentRotation.current.x + Math.max(-0.1, Math.min(0.1, spring.current.y * 0.15))
    
    // Spring bounce on Y position - reduced
    groupRef.current.position.y = spring.current.y * 0.6
    
    // Subtle floating
    groupRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.6) * 0.03
  })

  return (
    <group ref={groupRef} scale={scale}>
      {/* Main dashboard frame with REAL 3D thickness */}
      <RoundedBox args={[7.6, 5.1, 0.42]} radius={0.24} smoothness={8} castShadow receiveShadow>
        <meshStandardMaterial color={BRAND.background} metalness={0.2} roughness={0.58} />
      </RoundedBox>

      {/* Inner frame surface */}
      <RoundedBox args={[7.58, 5.08, 0.08]} radius={0.23} smoothness={8} position={[0, 0, 0.18]}>
        <meshStandardMaterial color="#202535" roughness={0.72} metalness={0.08} />
      </RoundedBox>

      {/* Header bar */}
      <RoundedBox args={[7.2, 0.72, 0.08]} radius={0.18} smoothness={6} position={[0, 2.03, 0.22]}>
        <meshStandardMaterial color="#22283a" roughness={0.76} />
      </RoundedBox>

      {/* Traffic lights */}
      <mesh position={[-3.18, 2.03, 0.27]}>
        <sphereGeometry args={[0.09, 24, 24]} />
        <meshStandardMaterial color="#ff5f57" emissive="#ff5f57" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[-2.92, 2.03, 0.27]}>
        <sphereGeometry args={[0.09, 24, 24]} />
        <meshStandardMaterial color="#febc2e" emissive="#febc2e" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[-2.66, 2.03, 0.27]}>
        <sphereGeometry args={[0.09, 24, 24]} />
        <meshStandardMaterial color={BRAND.success} emissive={BRAND.success} emissiveIntensity={0.2} />
      </mesh>

      {/* Title */}
      <Text
        position={[-2.2, 2.02, 0.28]}
        fontSize={0.18}
        color={BRAND.text}
        anchorX="left"
        anchorY="middle"
      >
        Liminalo
      </Text>

      {/* Stats row */}
      <StatCard position={[-2.42, 0.92, 0.3]} title="Revenue" value="$48.2K" change="+12%" accent={BRAND.primary} />
      <StatCard position={[0, 0.92, 0.34]} title="Users" value="18.4K" change="+8%" accent={BRAND.secondary} />
      <StatCard position={[2.42, 0.92, 0.3]} title="Growth" value="4.82%" change="+3%" accent={BRAND.success} />

      {/* Chart and Activity */}
      <PerformanceChart position={[-1.18, -1.15, 0.28]} />
      <ActivityPanel position={[2.54, -1.15, 0.32]} />
    </group>
  )
}

export default function Hero3D() {
  return (
    <div className="relative w-full" style={{ height: 'clamp(350px, 50vw, 550px)' }}>
      <Canvas 
        shadows 
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true,
          premultipliedAlpha: false,
          powerPreference: 'high-performance'
        }}
        camera={{ position: [0, 0, 10], fov: 42 }}
        className="cursor-grab active:cursor-grabbing"
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight
          position={[6, 8, 10]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <directionalLight position={[-4, -2, 6]} intensity={0.35} color={BRAND.secondary} />
        <pointLight position={[0, 2, 8]} intensity={0.55} color={BRAND.primary} />
        <spotLight position={[0, 8, 12]} angle={0.35} penumbra={1} intensity={0.7} color="#ffffff" />
        <Dashboard3D />
      </Canvas>
    </div>
  )
}
