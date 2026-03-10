"use client";

import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Coffee,
  Dumbbell,
  Flower2,
  Hammer,
  MapPin,
  Scissors,
  Sparkles,
  Star,
} from "lucide-react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef } from "react";

function MiniSiteFrame({
  children,
  className = "",
  index = 0,
}: {
  children: React.ReactNode;
  className?: string;
  index?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax effect based on scroll
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -8]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  
  // Physics-based spring animations
  const springY = useSpring(y, { stiffness: 100, damping: 30, mass: 0.8 });
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30, mass: 0.8 });
  const springScale = useSpring(scale, { stiffness: 100, damping: 30, mass: 0.8 });

  // Hover physics
  const hoverY = useMotionValue(0);
  const hoverScale = useMotionValue(1);
  const springHoverY = useSpring(hoverY, { stiffness: 400, damping: 25 });
  const springHoverScale = useSpring(hoverScale, { stiffness: 400, damping: 25 });

  return (
    <motion.div
      ref={ref}
      style={{ 
        y: springY, 
        rotateX: springRotateX, 
        scale: springScale,
        translateY: springHoverY,
      }}
      onHoverStart={() => {
        hoverY.set(-12);
        hoverScale.set(1.02);
      }}
      onHoverEnd={() => {
        hoverY.set(0);
        hoverScale.set(1);
      }}
      whileHover={{ 
        boxShadow: "0 50px 120px rgba(41,151,255,0.15)",
      }}
      transition={{ duration: 0.4 }}
      className={`group relative h-[320px] sm:h-[420px] lg:h-[520px] overflow-hidden rounded-[1.2rem] sm:rounded-[1.5rem] lg:rounded-[2rem] border border-white/10 bg-[#0d0d0f]/95 shadow-[0_30px_100px_rgba(0,0,0,0.35)] transition-colors hover:border-[#2997ff]/30 ${className}`}
    >
      {/* Browser chrome */}
      <div className="absolute inset-x-0 top-0 z-20 flex h-8 sm:h-10 lg:h-11 items-center gap-1.5 sm:gap-2 border-b border-white/8 bg-black/30 px-2 sm:px-3 lg:px-4 backdrop-blur-xl">
        <motion.span 
          className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#ff5f57]"
          whileHover={{ scale: 1.2 }}
        />
        <motion.span 
          className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#febc2e]"
          whileHover={{ scale: 1.2 }}
        />
        <motion.span 
          className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#28c840]"
          whileHover={{ scale: 1.2 }}
        />
        <div className="ml-1.5 sm:ml-2 lg:ml-3 h-5 sm:h-6 lg:h-7 flex-1 rounded-full border border-white/8 bg-white/[0.04]" />
      </div>
      
      {/* Content with scroll */}
      <div className="custom-scroll absolute inset-0 overflow-y-auto pt-8 sm:pt-10 lg:pt-11">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          viewport={{ once: true }}
        >
          {children}
        </motion.div>
      </div>
      
      {/* Glow effect on hover */}
      <motion.div 
        className="pointer-events-none absolute inset-0 rounded-[1.2rem] sm:rounded-[1.5rem] lg:rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: "radial-gradient(circle at 50% 0%, rgba(41,151,255,0.08), transparent 60%)",
        }}
      />
      
      {/* Bottom gradient */}
      <div className="pointer-events-none absolute inset-x-4 sm:inset-x-6 lg:inset-x-10 bottom-0 h-16 sm:h-20 bg-gradient-to-t from-black/30 to-transparent" />
    </motion.div>
  );
}

function CafeMiniSite() {
  return (
    <MiniSiteFrame className="bg-[#20150f]" index={0}>
      <div className="min-h-[600px] sm:min-h-[720px] lg:min-h-[860px] bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.18),transparent_28%),linear-gradient(180deg,#2a1b13_0%,#1b120e_100%)] px-3 sm:px-4 lg:px-5 pb-4 sm:pb-5 lg:pb-6 pt-3 sm:pt-4 lg:pt-5 text-[#fff7ed]">
        <motion.div 
          className="rounded-[1.1rem] sm:rounded-[1.3rem] lg:rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-3 sm:p-4 lg:p-5 backdrop-blur-xl"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between text-[9px] sm:text-[10px] lg:text-xs uppercase tracking-[0.18em] sm:tracking-[0.22em] text-amber-100/65">
            <span>Café Sonnenschein</span>
            <span>Frühstück & Brunch</span>
          </div>
          <h3 className="mt-3 sm:mt-4 lg:mt-5 text-xl sm:text-[1.55rem] lg:text-[2rem] font-semibold leading-[1.05] text-white">
            Guter Kaffee. <br /> Mehr Reservierungen.
          </h3>
          <p className="mt-2 sm:mt-3 lg:mt-4 max-w-[16rem] sm:max-w-[18rem] text-[11px] sm:text-xs lg:text-sm leading-4 sm:leading-5 lg:leading-6 text-amber-50/76">
            Für Cafés, die ihre Karte, Öffnungszeiten und Tischanfragen klar und hochwertig zeigen wollen.
          </p>
          <motion.div 
            className="mt-3 sm:mt-4 lg:mt-5 inline-flex rounded-full bg-white px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs lg:text-sm font-medium text-[#7c4a12]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Tisch anfragen
          </motion.div>
        </motion.div>

        <div className="mt-2 sm:mt-3 lg:mt-4 grid grid-cols-2 gap-2 sm:gap-2.5 lg:gap-3">
          <motion.div 
            className="rounded-[1rem] sm:rounded-[1.1rem] lg:rounded-[1.4rem] border border-white/10 bg-[#fff7ed]/[0.06] p-2.5 sm:p-3 lg:p-4"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, borderColor: "rgba(251,191,36,0.3)" }}
          >
            <Coffee className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-200" />
            <div className="mt-2 sm:mt-2.5 lg:mt-3 text-[11px] sm:text-xs lg:text-sm font-medium text-white">Karte & Specials</div>
            <div className="mt-0.5 sm:mt-1 text-[10px] sm:text-[11px] lg:text-xs text-amber-50/60">Saisonal, klar und mobil optimiert</div>
          </motion.div>
          <motion.div 
            className="rounded-[1rem] sm:rounded-[1.1rem] lg:rounded-[1.4rem] border border-white/10 bg-[#fff7ed]/[0.06] p-2.5 sm:p-3 lg:p-4"
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, borderColor: "rgba(251,191,36,0.3)" }}
          >
            <CalendarDays className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-200" />
            <div className="mt-2 sm:mt-2.5 lg:mt-3 text-[11px] sm:text-xs lg:text-sm font-medium text-white">Reservierungen</div>
            <div className="mt-0.5 sm:mt-1 text-[10px] sm:text-[11px] lg:text-xs text-amber-50/60">Schnell und direkt auf einen Blick</div>
          </motion.div>
        </div>

        <motion.div 
          className="mt-2 sm:mt-3 lg:mt-4 rounded-[1.1rem] sm:rounded-[1.3rem] lg:rounded-[1.6rem] border border-white/10 bg-[#fff7ed]/[0.05] p-3 sm:p-4 lg:p-5"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
        >
          <div className="text-[9px] sm:text-[10px] lg:text-xs uppercase tracking-[0.16em] sm:tracking-[0.2em] text-amber-100/60">Für Ihre Gäste relevant</div>
          <div className="mt-2 sm:mt-3 lg:mt-4 space-y-2 sm:space-y-2.5 lg:space-y-3">
            {[
              ["Frühstückskarte", "sichtbar"],
              ["Öffnungszeiten", "aktuell"],
              ["Reservieren", "einfach"],
            ].map(([name, price], i) => (
              <motion.div 
                key={name} 
                className="flex items-center justify-between rounded-lg sm:rounded-xl lg:rounded-2xl border border-white/8 bg-black/10 px-2.5 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 text-[11px] sm:text-xs lg:text-sm"
                initial={{ x: -10, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 4, borderColor: "rgba(251,191,36,0.2)" }}
              >
                <span className="text-white/85">{name}</span>
                <span className="text-amber-200">{price}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="mt-2 sm:mt-3 lg:mt-4 flex items-center justify-between rounded-[1rem] sm:rounded-[1.1rem] lg:rounded-[1.4rem] border border-white/10 bg-black/15 px-2.5 sm:px-3 lg:px-4 py-2.5 sm:py-3 text-[10px] sm:text-[11px] lg:text-sm text-amber-50/75"
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-200" />
            Waldkraiburg
          </div>
          <span>Mobil klar lesbar</span>
        </motion.div>
      </div>
    </MiniSiteFrame>
  );
}

function FitnessMiniSite() {
  return (
    <MiniSiteFrame className="bg-[#08100c]" index={1}>
      <div className="min-h-[620px] sm:min-h-[740px] lg:min-h-[880px] bg-[radial-gradient(circle_at_80%_0%,rgba(34,197,94,0.18),transparent_25%),linear-gradient(180deg,#07110c_0%,#0b1612_55%,#08100c_100%)] px-3 sm:px-4 lg:px-5 pb-4 sm:pb-5 lg:pb-6 pt-3 sm:pt-4 lg:pt-5 text-white">
        <motion.div 
          className="rounded-[1.2rem] sm:rounded-[1.4rem] lg:rounded-[1.8rem] border border-emerald-300/10 bg-[linear-gradient(135deg,rgba(34,197,94,0.16),rgba(6,78,59,0.08))] p-3 sm:p-4 lg:p-5"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between text-[9px] sm:text-[10px] lg:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.24em] text-emerald-100/65">
            <span>FitZone Studio</span>
            <span>Performance</span>
          </div>
          <h3 className="mt-3 sm:mt-4 lg:mt-5 text-xl sm:text-[1.55rem] lg:text-[2rem] font-semibold leading-[1.02]">
            Mehr Anfragen. <br /> Mehr Probetrainings.
          </h3>
          <p className="mt-2 sm:mt-3 lg:mt-4 max-w-[15rem] sm:max-w-[17rem] text-[11px] sm:text-xs lg:text-sm leading-4 sm:leading-5 lg:leading-6 text-white/68">
            Für Studios, die Kurse, Coaching und Mitgliedschaften modern und überzeugend präsentieren wollen.
          </p>
          <motion.div 
            className="mt-3 sm:mt-4 lg:mt-5 inline-flex rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs lg:text-sm font-medium text-emerald-100"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(52,211,153,0.15)" }}
            whileTap={{ scale: 0.95 }}
          >
            Probetraining starten
          </motion.div>
        </motion.div>

        <div className="mt-2 sm:mt-3 lg:mt-4 grid grid-cols-3 gap-2 sm:gap-2.5 lg:gap-3">
          {[
            ["24/7", "Zugang"],
            ["12", "Kurse"],
            ["1:1", "Coaching"],
          ].map(([value, label], i) => (
            <motion.div 
              key={label} 
              className="rounded-[0.9rem] sm:rounded-[1rem] lg:rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-2 sm:p-3 lg:p-4 text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 150 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, borderColor: "rgba(52,211,153,0.3)" }}
            >
              <div className="text-base sm:text-lg lg:text-xl font-semibold text-emerald-200">{value}</div>
              <div className="mt-0.5 sm:mt-1 text-[9px] sm:text-[10px] lg:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.18em] text-white/45">{label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-2 sm:mt-3 lg:mt-4 rounded-[1.1rem] sm:rounded-[1.3rem] lg:rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-3 sm:p-4 lg:p-5"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
        >
          <div className="mb-2 sm:mb-3 lg:mb-4 flex items-center justify-between">
            <div>
              <div className="text-[9px] sm:text-[10px] lg:text-xs uppercase tracking-[0.16em] sm:tracking-[0.2em] text-white/45">Direkt verständlich</div>
              <div className="mt-0.5 sm:mt-1 text-sm sm:text-base lg:text-lg font-medium text-white">Kurse & Mitgliedschaft</div>
            </div>
            <Dumbbell className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-300" />
          </div>
          <div className="space-y-2 sm:space-y-2.5 lg:space-y-3 text-[11px] sm:text-xs lg:text-sm">
            {[
              ["Probetraining buchen", "schnell"],
              ["Kursplan ansehen", "klar"],
              ["Leistungen vergleichen", "direkt"],
            ].map(([title, time], i) => (
              <motion.div 
                key={title} 
                className="flex items-center justify-between rounded-lg sm:rounded-xl lg:rounded-2xl border border-white/8 bg-black/15 px-2.5 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3"
                initial={{ x: -10, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 4, borderColor: "rgba(52,211,153,0.2)" }}
              >
                <span className="text-white/82">{title}</span>
                <span className="text-emerald-200">{time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </MiniSiteFrame>
  );
}

function HandwerkMiniSite() {
  return (
    <MiniSiteFrame className="bg-[#14111c]" index={2}>
      <div className="min-h-[600px] sm:min-h-[720px] lg:min-h-[860px] bg-[radial-gradient(circle_at_top_left,rgba(167,139,250,0.16),transparent_28%),linear-gradient(180deg,#13111b_0%,#161320_100%)] px-3 sm:px-4 lg:px-5 pb-4 sm:pb-5 lg:pb-6 pt-3 sm:pt-4 lg:pt-5 text-white">
        <motion.div 
          className="rounded-[1.2rem] sm:rounded-[1.4rem] lg:rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-3 sm:p-4 lg:p-5"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
        >
          <div className="text-[9px] sm:text-[10px] lg:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.24em] text-violet-100/60">Kunsthandwerk Müller</div>
          <h3 className="mt-2 sm:mt-3 lg:mt-4 text-xl sm:text-[1.55rem] lg:text-[1.95rem] font-semibold leading-[1.06] text-white">
            Vertrauen durch Klarheit.
          </h3>
          <p className="mt-2 sm:mt-3 lg:mt-4 max-w-[16rem] sm:max-w-[18rem] text-[11px] sm:text-xs lg:text-sm leading-4 sm:leading-5 lg:leading-6 text-white/66">
            Für Handwerksbetriebe, die Leistungen, Referenzen und Kontakt professionell und übersichtlich zeigen möchten.
          </p>
        </motion.div>

        <div className="mt-2 sm:mt-3 lg:mt-4 grid gap-2 sm:gap-2.5 lg:gap-3">
          <div className="grid grid-cols-[1.1fr_0.9fr] gap-2 sm:gap-2.5 lg:gap-3">
            <motion.div 
              className="rounded-[1.1rem] sm:rounded-[1.2rem] lg:rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(167,139,250,0.14),rgba(255,255,255,0.04))] p-2.5 sm:p-3 lg:p-4"
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, borderColor: "rgba(167,139,250,0.3)" }}
            >
              <div className="text-[9px] sm:text-[10px] lg:text-xs uppercase tracking-[0.14em] sm:tracking-[0.18em] text-violet-100/60">Leistungen</div>
              <div className="mt-1 sm:mt-2 text-xs sm:text-sm lg:text-lg font-medium text-white">Sauber geplant. Sauber umgesetzt.</div>
            </motion.div>
            <motion.div 
              className="rounded-[1.1rem] sm:rounded-[1.2rem] lg:rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-2.5 sm:p-3 lg:p-4"
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <Hammer className="h-4 w-4 sm:h-5 sm:w-5 text-violet-300" />
              <div className="mt-2 sm:mt-2.5 lg:mt-3 text-[11px] sm:text-xs lg:text-sm text-white/72">Maßarbeit & Montage</div>
            </motion.div>
          </div>

          <motion.div 
            className="rounded-[1.1rem] sm:rounded-[1.2rem] lg:rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-3 sm:p-4 lg:p-5"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
          >
            <div className="mb-2 sm:mb-3 lg:mb-4 text-[9px] sm:text-[10px] lg:text-xs uppercase tracking-[0.14em] sm:tracking-[0.18em] text-white/45">Was Kunden sofort finden sollen</div>
            <div className="space-y-2 sm:space-y-2.5 lg:space-y-3 text-[11px] sm:text-xs lg:text-sm">
              {[
                "Leistungsübersicht",
                "Referenzen & Beispiele",
                "Einsatzgebiet",
                "Anfrage in wenigen Klicks",
              ].map((item, i) => (
                <motion.div 
                  key={item} 
                  className="rounded-lg sm:rounded-xl lg:rounded-2xl border border-white/8 bg-black/10 px-2.5 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 text-white/78"
                  initial={{ x: -10, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 4, borderColor: "rgba(167,139,250,0.2)" }}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="mt-2 sm:mt-3 lg:mt-4 rounded-[1.1rem] sm:rounded-[1.2rem] lg:rounded-[1.5rem] border border-white/10 bg-black/15 px-2.5 sm:px-3 lg:px-4 py-3 sm:py-3.5 lg:py-4 text-[11px] sm:text-xs lg:text-sm text-white/68"
          whileHover={{ scale: 1.01 }}
        >
          Professionell, strukturiert und vertrauenswürdig – ohne unnötige visuelle Unruhe.
        </motion.div>
      </div>
    </MiniSiteFrame>
  );
}

function BeautyMiniSite() {
  return (
    <MiniSiteFrame className="bg-[#1c1017]" index={3}>
      <div className="min-h-[620px] sm:min-h-[740px] lg:min-h-[890px] bg-[radial-gradient(circle_at_80%_0%,rgba(251,113,133,0.16),transparent_28%),linear-gradient(180deg,#1b1117_0%,#1c1017_100%)] px-3 sm:px-4 lg:px-5 pb-4 sm:pb-5 lg:pb-6 pt-3 sm:pt-4 lg:pt-5 text-white">
        <motion.div 
          className="rounded-[1.3rem] sm:rounded-[1.5rem] lg:rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-3 sm:p-4 lg:p-5"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[9px] sm:text-[10px] lg:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.24em] text-rose-100/60">Lisa's Beauty</div>
              <h3 className="mt-2 sm:mt-3 text-lg sm:text-[1.55rem] lg:text-[1.95rem] font-semibold leading-[1.06] text-white">
                Eleganter Auftritt. <br /> Mehr Buchungen.
              </h3>
            </div>
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-rose-300" />
          </div>
          <p className="mt-2 sm:mt-3 lg:mt-4 max-w-[16rem] sm:max-w-[18rem] text-[11px] sm:text-xs lg:text-sm leading-4 sm:leading-5 lg:leading-6 text-rose-50/78">
            Für Beauty- und Kosmetikstudios, die Treatments, Vertrauen und Stil hochwertig präsentieren möchten.
          </p>
          <motion.div 
            className="mt-3 sm:mt-4 lg:mt-5 inline-flex rounded-full bg-white px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs lg:text-sm font-medium text-rose-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Termin buchen
          </motion.div>
        </motion.div>

        <div className="mt-2 sm:mt-3 lg:mt-4 grid grid-cols-2 gap-2 sm:gap-2.5 lg:gap-3">
          {[
            ["Treatments", Star],
            ["Brows & Lashes", Flower2],
            ["Beratung", Scissors],
            ["Signature Glow", Sparkles],
          ].map(([label, Icon], i) => {
            const Comp = Icon as typeof Star;
            return (
              <motion.div 
                key={label as string} 
                className="rounded-[1.1rem] sm:rounded-[1.2rem] lg:rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-2.5 sm:p-3 lg:p-4"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 150 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, borderColor: "rgba(251,113,133,0.3)" }}
              >
                <Comp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-rose-300" />
                <div className="mt-2 sm:mt-2.5 lg:mt-3 text-[11px] sm:text-xs lg:text-sm font-medium text-white">{label as string}</div>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          className="mt-2 sm:mt-3 lg:mt-4 rounded-[1.1rem] sm:rounded-[1.3rem] lg:rounded-[1.6rem] border border-white/10 bg-black/10 p-3 sm:p-4 lg:p-5"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
        >
          <div className="text-[9px] sm:text-[10px] lg:text-xs uppercase tracking-[0.14em] sm:tracking-[0.18em] text-white/45">Was Kundinnen sofort sehen</div>
          <div className="mt-2 sm:mt-3 lg:mt-4 space-y-2 sm:space-y-2.5 lg:space-y-3 text-[11px] sm:text-xs lg:text-sm text-rose-50/80">
            <motion.div 
              className="rounded-lg sm:rounded-xl lg:rounded-2xl border border-white/8 bg-white/[0.04] px-2.5 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3"
              whileHover={{ x: 4, borderColor: "rgba(251,113,133,0.2)" }}
            >
              Behandlungen & Preise
            </motion.div>
            <motion.div 
              className="rounded-lg sm:rounded-xl lg:rounded-2xl border border-white/8 bg-white/[0.04] px-2.5 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3"
              whileHover={{ x: 4, borderColor: "rgba(251,113,133,0.2)" }}
            >
              Look & Vertrauen
            </motion.div>
            <motion.div 
              className="rounded-lg sm:rounded-xl lg:rounded-2xl border border-white/8 bg-white/[0.04] px-2.5 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3"
              whileHover={{ x: 4, borderColor: "rgba(251,113,133,0.2)" }}
            >
              Schnelle Terminbuchung
            </motion.div>
          </div>
        </motion.div>
      </div>
    </MiniSiteFrame>
  );
}

const sites = [
  {
    title: "Cafés & Gastronomie",
    desc: "Für Betriebe, die Atmosphäre, Angebot und Reservierung klar zeigen wollen.",
    component: <CafeMiniSite />,
  },
  {
    title: "Fitness & Studios",
    desc: "Für Studios, die Leistung, Energie und Conversion sauber verbinden möchten.",
    component: <FitnessMiniSite />,
  },
  {
    title: "Handwerk",
    desc: "Für Unternehmen, die Vertrauen, Leistungen und Anfragen professionell präsentieren wollen.",
    component: <HandwerkMiniSite />,
  },
  {
    title: "Beauty & Kosmetik",
    desc: "Für Studios, die Stil, Treatments und Terminbuchung elegant sichtbar machen möchten.",
    component: <BeautyMiniSite />,
  },
];

export default function PortfolioPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.1], [0, -30]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);

  return (
    <div ref={containerRef} className="min-h-screen text-white">
      <main className="px-4 sm:px-6 py-10 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            className="mb-8 sm:mb-10 lg:mb-14 max-w-2xl"
            style={{ y: headerY, opacity: headerOpacity }}
          >
            <motion.span 
              className="mb-3 sm:mb-4 inline-block rounded-full border border-[#2997ff]/30 bg-[#2997ff]/10 px-3 sm:px-4 py-1.5 text-xs sm:text-sm text-[#2997ff]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Anwendungsbereiche
            </motion.span>
            <motion.h1 
              className="text-3xl sm:text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <span className="text-[#2997ff]">Websites</span>, die zu Ihrer Branche passen.
            </motion.h1>
            <motion.div 
              className="mt-4 sm:mt-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 py-2 text-xs sm:text-sm text-white/85 transition-all hover:border-white/20 hover:bg-white/8"
              >
                <ArrowLeft className="h-4 w-4" />
                Zurück zur Startseite
              </Link>
            </motion.div>
          </motion.div>

          <div className="grid gap-4 sm:gap-6 lg:gap-10 grid-cols-1 lg:grid-cols-2">
            {sites.map((site, index) => (
              <motion.section 
                key={site.title} 
                className="space-y-2 sm:space-y-3 lg:space-y-4"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div>
                  <h2 className="text-sm sm:text-base lg:text-lg font-medium text-white">{site.title}</h2>
                  <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs lg:text-sm text-white/48">{site.desc}</p>
                </div>
                {site.component}
              </motion.section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
