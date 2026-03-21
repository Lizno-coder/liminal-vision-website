"use client";

import React, { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Palette,
  Globe,
  Shield,
  Smartphone,
  Code2,
  Sparkles,
  Rocket,
  ChevronDown,
  Database,
  LayoutDashboard,
  Mail,
  Phone,
  Bot,
  ShoppingCart,
  Layers,
  Headphones,
} from "lucide-react";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
};

function NoiseOverlay() {
  return (
    <div 
      className="pointer-events-none absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

export default function BerlinContent() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="relative min-h-screen">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2997ff] to-[#f59e0b] origin-left z-50"
        style={{ scaleX }}
      />

      <section className="relative min-h-[90vh] flex items-center justify-center px-4">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-[#2997ff]/20 blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-[#f59e0b]/20 blur-[100px]" />
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 mb-8"
          >
            <MapPin className="h-4 w-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-300">Berlin & Brandenburg</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
          >
            <span className="text-white">Webdesign in</span>
            <br />
            <span className="bg-gradient-to-r from-[#2997ff] via-[#f59e0b] to-[#ef4444] bg-clip-text text-transparent">
              Berlin
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 max-w-2xl mx-auto text-lg sm:text-xl text-white/60"
          >
            Maßgeschneiderte Websites für Unternehmen in Berlin, Potsdam und ganz Brandenburg. 
            Keine Templates. Keine Kompromisse. Nur reine Handarbeit.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2997ff] to-[#5856d6] px-8 py-4 text-base font-semibold text-white shadow-[0_20px_50px_rgba(41,151,255,0.3)] transition-all hover:scale-[1.02]"
            >
              <Sparkles className="h-5 w-5" />
              Kostenlos beraten lassen
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
