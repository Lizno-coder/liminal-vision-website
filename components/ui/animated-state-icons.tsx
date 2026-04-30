"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface StateIconProps {
  size?: number;
  color?: string;
  className?: string;
  active?: boolean;
}

export function SuccessIcon({ size = 40, color = "currentColor", className, active = false }: StateIconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={cn(className)} style={{ width: size, height: size }}>
      <motion.circle
        cx="20"
        cy="20"
        r="16"
        stroke={color}
        strokeWidth={2}
        animate={active ? { pathLength: 1, opacity: 1 } : { pathLength: 0.74, opacity: 0.55 }}
        transition={{ duration: 0.45 }}
      />
      <motion.path
        d="M12 20l6 6 10-12"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={active ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.35, delay: active ? 0.08 : 0 }}
      />
    </svg>
  );
}

export function MenuCloseIcon({ size = 40, color = "currentColor", className, active = false }: StateIconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={cn(className)} style={{ width: size, height: size }}>
      <motion.line
        x1="10"
        x2="30"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        animate={active ? { y1: 20, y2: 20, rotate: 45 } : { y1: 12, y2: 12, rotate: 0 }}
        transition={{ duration: 0.34, ease: [0.32, 0.72, 0, 1] }}
        style={{ transformOrigin: "20px 20px" }}
      />
      <motion.line
        x1="10"
        y1="20"
        x2="30"
        y2="20"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        animate={active ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.18 }}
        style={{ transformOrigin: "20px 20px" }}
      />
      <motion.line
        x1="10"
        x2="30"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        animate={active ? { y1: 20, y2: 20, rotate: -45 } : { y1: 28, y2: 28, rotate: 0 }}
        transition={{ duration: 0.34, ease: [0.32, 0.72, 0, 1] }}
        style={{ transformOrigin: "20px 20px" }}
      />
    </svg>
  );
}

export function LockUnlockIcon({ size = 40, color = "currentColor", className, active = false }: StateIconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={cn(className)} style={{ width: size, height: size }}>
      <rect x="9" y="18" width="22" height="16" rx="3" stroke={color} strokeWidth={2} />
      <motion.path
        d="M14 18V13a6 6 0 0112 0v5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        animate={active ? { d: "M14 18V13a6 6 0 0112 0v2" } : { d: "M14 18V13a6 6 0 0112 0v5" }}
        transition={{ duration: 0.36, ease: [0.32, 0.72, 0, 1] }}
      />
      <motion.circle
        cx="20"
        cy="26"
        r="2"
        fill={color}
        animate={active ? { scale: 0.65, opacity: 0.45 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        style={{ transformOrigin: "20px 26px" }}
      />
    </svg>
  );
}

export function SendIcon({ size = 40, color = "currentColor", className, active = false }: StateIconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={cn(className)} style={{ width: size, height: size }}>
      <motion.g
        animate={active ? { x: [0, 18, 0], y: [0, -18, 0], opacity: [1, 0, 1], scale: [1, 0.72, 1] } : { x: 0, y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.62, ease: [0.32, 0.72, 0, 1] }}
      >
        <path d="M34 6L16 20l-6-2L34 6z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
        <path d="M34 6L22 34l-6-14" stroke={color} strokeWidth={2} strokeLinejoin="round" />
        <line x1="16" y1="20" x2="22" y2="34" stroke={color} strokeWidth={2} />
      </motion.g>
    </svg>
  );
}

export function UserPulseIcon({ size = 40, color = "currentColor", className, active = false }: StateIconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={cn(className)} style={{ width: size, height: size }}>
      <motion.circle
        cx="20"
        cy="14"
        r="6"
        stroke={color}
        strokeWidth={2}
        animate={active ? { scale: [1, 1.12, 1] } : { scale: 1 }}
        transition={{ duration: 0.45 }}
        style={{ transformOrigin: "20px 14px" }}
      />
      <motion.path
        d="M9 33c1.8-7 6.2-10 11-10s9.2 3 11 10"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        animate={active ? { pathLength: [0.45, 1], opacity: 1 } : { pathLength: 1, opacity: 0.8 }}
        transition={{ duration: 0.45 }}
      />
    </svg>
  );
}

export function DownloadDoneIcon({ size = 40, color = "currentColor", className, active = false }: StateIconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={cn(className)} style={{ width: size, height: size }}>
      <path d="M8 28v4a2 2 0 002 2h20a2 2 0 002-2v-4" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <AnimatePresence mode="wait">
        {active ? (
          <motion.path
            key="check"
            d="M14 22l6 6 8-10"
            stroke={color}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            exit={{ pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
          />
        ) : (
          <motion.g
            key="arrow"
            initial={{ y: -3, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 7, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
          >
            <line x1="20" y1="6" x2="20" y2="24" stroke={color} strokeWidth={2} strokeLinecap="round" />
            <polyline points="14,18 20,24 26,18" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}

type HoverStateIconProps = Omit<StateIconProps, "active"> & {
  icon: "success" | "menu" | "lock" | "send" | "user" | "download";
};

const iconMap = {
  success: SuccessIcon,
  menu: MenuCloseIcon,
  lock: LockUnlockIcon,
  send: SendIcon,
  user: UserPulseIcon,
  download: DownloadDoneIcon,
};

export function HoverStateIcon({ icon, size = 20, color = "currentColor", className }: HoverStateIconProps) {
  const Icon = iconMap[icon];
  const [active, setActive] = useState(false);

  return (
    <span
      className="inline-flex"
      aria-hidden="true"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <Icon size={size} color={color} className={className} active={active} />
    </span>
  );
}
