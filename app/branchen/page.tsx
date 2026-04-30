"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bed,
  Briefcase,
  Buildings,
  Car,
  ChartLineUp,
  Coffee,
  GraduationCap,
  Hammer,
  PaintBrush,
  Scissors,
  Sparkle,
  Storefront,
  Stethoscope,
  Wrench,
  Barbell,
} from "@phosphor-icons/react";
import { Globe2, Search, ShieldCheck, SlidersHorizontal, Sparkles, TrendingUp, Zap } from "lucide-react";

import { industryPages } from "@/content/industry-pages";
import { JsonLd, createBreadcrumbSchema, createCollectionPageSchema } from "@/lib/seo";

const industries = [
  {
    id: "cafe",
    icon: Coffee,
    title: "Cafés & Restaurants",
    shortDesc: "Mehr Gäste durch klare Präsentation.",
    benefits: ["Online-Reservierung", "Digitale Speisekarte"],
    color: "#f59e0b",
    stat: "+47%",
    href: "/branchen/cafes-restaurants",
  },
  {
    id: "handwerk",
    icon: Hammer,
    title: "Handwerk & Gewerbe",
    shortDesc: "Vertrauen durch professionelle Referenzen.",
    benefits: ["Leistungsübersicht", "Referenzen"],
    color: "#2997ff",
    stat: "24/7",
    href: "/branchen/handwerk-gewerbe",
  },
  {
    id: "fitness",
    icon: Barbell,
    title: "Fitness & Wellness",
    shortDesc: "Mehr Mitglieder durch starke Präsenz.",
    benefits: ["Kursplan", "Online-Anmeldung"],
    color: "#10b981",
    stat: "+62%",
    href: "/branchen/fitness-wellness",
  },
  {
    id: "beauty",
    icon: Scissors,
    title: "Beauty & Kosmetik",
    shortDesc: "Ein Auftritt, der Stil sofort zeigt.",
    benefits: ["Online-Termine", "Preisliste"],
    color: "#f43f5e",
    stat: "-40%",
    href: "/branchen/beauty-kosmetik",
  },
  {
    id: "retail",
    icon: Storefront,
    title: "Einzelhandel",
    shortDesc: "Ihr Geschäft digital erlebbar.",
    benefits: ["Produkt-Showcase", "Standorte"],
    color: "#3b82f6",
    stat: "+85%",
    href: "/branchen/einzelhandel",
  },
  {
    id: "business",
    icon: Buildings,
    title: "Dienstleister",
    shortDesc: "Kompetenz, die sichtbar Vertrauen schafft.",
    benefits: ["Service-Übersicht", "Case Studies"],
    color: "#06b6d4",
    stat: "3x",
    href: "/branchen/dienstleister",
  },
  {
    id: "hotel",
    icon: Bed,
    title: "Hotels & Unterkünfte",
    shortDesc: "Buchungsanfragen rund um die Uhr.",
    benefits: ["Zimmer-Übersicht", "Buchungsanfrage"],
    color: "#ec4899",
    stat: "+120%",
    href: "/branchen/hotels-unterkuenfte",
  },
  {
    id: "health",
    icon: Stethoscope,
    title: "Gesundheit & Praxen",
    shortDesc: "Seriös, klar und einfach erreichbar.",
    benefits: ["Online-Terminbuchung", "Leistungskatalog"],
    color: "#ef4444",
    stat: "-55%",
    href: "/branchen/gesundheit-praxen",
  },
  {
    id: "education",
    icon: GraduationCap,
    title: "Bildung & Coaching",
    shortDesc: "Kurse und Expertise strukturiert verkaufen.",
    benefits: ["Kurskalender", "Buchungssystem"],
    color: "#f97316",
    stat: "+200%",
    href: "/branchen/bildung-coaching",
  },
  {
    id: "auto",
    icon: Car,
    title: "Automobil & Service",
    shortDesc: "Fahrzeuge, Service und Termine auf einen Blick.",
    benefits: ["Fahrzeug-Showcase", "Werkstatt-Termine"],
    color: "#6366f1",
    stat: "+78%",
    href: "/branchen/automobil-service",
  },
  {
    id: "creative",
    icon: PaintBrush,
    title: "Kreative & Künstler",
    shortDesc: "Portfolio, Stil und Buchungsanfragen vereint.",
    benefits: ["Portfolio", "Buchungsanfragen"],
    color: "#a855f7",
    stat: "5x",
    href: "/branchen/kreative-kuenstler",
  },
  {
    id: "other",
    icon: Sparkle,
    title: "Weitere Branchen",
    shortDesc: "Maßgeschneidert für Ihr Business.",
    benefits: ["Individuell", "Flexibel"],
    color: "#2997ff",
    stat: "100%",
    href: "/kontakt?websiteType=other",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Analyse",
    subtitle: "Branche, Zielgruppe, Angebot",
    desc: "Was muss sofort klar sein?",
    icon: ChartLineUp,
  },
  {
    step: "02",
    title: "Konzept",
    subtitle: "Struktur vor Design",
    desc: "Struktur für Vertrauen und Anfragen.",
    icon: Briefcase,
  },
  {
    step: "03",
    title: "Design",
    subtitle: "Modern und markengerecht",
    desc: "Ein Look, der nach Marke wirkt.",
    icon: PaintBrush,
  },
  {
    step: "04",
    title: "Launch",
    subtitle: "Schnell, sicher, sichtbar",
    desc: "Live, schnell und sauber messbar.",
    icon: Wrench,
  },
];

const carouselFeatures = [
  {
    id: "speed",
    label: "Speed",
    title: "Sofort schnell",
    desc: "Schlanke Seitenstruktur, starke Bildauslieferung und saubere mobile Priorität.",
    icon: Zap,
    object: "bolt",
  },
  {
    id: "seo",
    label: "SEO",
    title: "Lokal sichtbar",
    desc: "Branche, Ort und Leistung werden so verbunden, dass Suchintention klar bedient wird.",
    icon: Globe2,
    object: "orb",
  },
  {
    id: "trust",
    label: "Trust",
    title: "Vertrauen aufbauen",
    desc: "Referenzen, Leistungen und Kontaktwege erscheinen genau dort, wo Besucher entscheiden.",
    icon: ShieldCheck,
    object: "shield",
  },
  {
    id: "leads",
    label: "Leads",
    title: "Mehr Anfragen",
    desc: "Jede Sektion führt bewusst zum nächsten Schritt statt nur schön auszusehen.",
    icon: TrendingUp,
    object: "arrow",
  },
];

function CpuArchitecture({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 220 120" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="cpuLine" x1="0" x2="1">
          <stop stopColor="#0b2440" />
          <stop offset="0.5" stopColor="#2997ff" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
        <radialGradient id="cpuGlow">
          <stop stopColor="#8ecbff" />
          <stop offset="1" stopColor="transparent" />
        </radialGradient>
      </defs>
      <g stroke="url(#cpuLine)" strokeWidth="1" opacity="0.65">
        <path d="M14 22h78c7 0 10 3 10 10v20" pathLength="1" strokeDasharray="1" strokeDashoffset="0">
          <animate attributeName="stroke-dashoffset" values="1;0" dur="1.6s" repeatCount="indefinite" />
        </path>
        <path d="M206 18h-76c-7 0-10 3-10 10v24" pathLength="1" strokeDasharray="1" strokeDashoffset="0">
          <animate attributeName="stroke-dashoffset" values="1;0" dur="1.8s" repeatCount="indefinite" />
        </path>
        <path d="M34 90h50c8 0 12-4 12-12V66" />
        <path d="M190 94h-52c-8 0-12-4-12-12V66" />
        <path d="M110 18v34" />
        <path d="M110 68v34" />
      </g>
      <circle cx="35" cy="22" r="9" fill="url(#cpuGlow)">
        <animateMotion dur="3.4s" repeatCount="indefinite" path="M0 0 H70 Q78 0 78 10 V32" />
      </circle>
      <circle cx="190" cy="18" r="8" fill="url(#cpuGlow)">
        <animateMotion dur="3.8s" repeatCount="indefinite" path="M0 0 H-70 Q-78 0 -78 10 V34" />
      </circle>
      <rect x="82" y="48" width="56" height="28" rx="7" fill="#050b13" stroke="#2997ff" strokeOpacity="0.55" />
      <rect x="92" y="56" width="36" height="12" rx="3" fill="#07182a" />
      <text x="110" y="65" textAnchor="middle" fontSize="8" fontWeight="700" fill="#8ecbff">
        SEO
      </text>
    </svg>
  );
}

function MetallicVisual({ type }: { type: string }) {
  return (
    <div className="relative flex h-full min-h-[380px] items-center justify-center overflow-hidden rounded-[34px] bg-[#02050a]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(41,151,255,0.32),transparent_34%),radial-gradient(circle_at_50%_70%,rgba(255,255,255,0.09),transparent_28%)]" />
      <div className="absolute inset-0 industries-texture opacity-30" />
      <CpuArchitecture className="absolute inset-x-6 top-8 h-32 text-[#2997ff] opacity-55" />
      <motion.div
        key={type}
        initial={{ opacity: 0, y: 26, rotate: -6, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`metallic-object metallic-${type}`}
      >
        <span />
      </motion.div>
    </div>
  );
}

function FeatureCarouselNative() {
  const [active, setActive] = React.useState(0);
  const current = carouselFeatures[active];
  const Icon = current.icon;

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setActive((value) => (value + 1) % carouselFeatures.length);
    }, 3400);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[42px] border border-white/10 bg-white/[0.035] shadow-[0_36px_130px_rgba(0,0,0,0.5)] backdrop-blur-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(41,151,255,0.26),transparent_32%),radial-gradient(circle_at_100%_100%,rgba(88,86,214,0.16),transparent_34%)]" />
      <div className="relative grid min-h-[620px] lg:grid-cols-[0.42fr_0.58fr]">
        <div className="relative flex flex-col justify-center overflow-hidden bg-[#2997ff] p-7 md:p-10">
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#2997ff] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#2997ff] to-transparent" />
          <div className="relative z-10 space-y-3">
            {carouselFeatures.map((feature, index) => {
              const FeatureIcon = feature.icon;
              const isActive = index === active;
              return (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`group flex w-full items-center gap-4 rounded-full border px-5 py-4 text-left transition duration-500 ${
                    isActive
                      ? "border-white bg-white text-[#0a65aa] shadow-[0_18px_50px_rgba(0,0,0,0.18)]"
                      : "border-white/20 bg-transparent text-white/68 hover:border-white/45 hover:text-white"
                  }`}
                >
                  <FeatureIcon className={`h-5 w-5 transition group-hover:rotate-12 ${isActive ? "text-[#2997ff]" : ""}`} />
                  <span className="text-sm font-semibold uppercase tracking-[0.18em]">{feature.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative overflow-hidden p-6 md:p-10">
          <div className="grid h-full gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
            <div>
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#2997ff]/35 bg-[#2997ff]/12 text-[#8ecbff]">
                <Icon className="h-6 w-6" />
              </div>
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.45 }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2997ff]">
                  Website-System
                </p>
                <h2 className="mt-4 text-3xl font-medium tracking-[-0.045em] text-white md:text-5xl md:leading-[1.05]">
                  {current.title}
                </h2>
                <p className="mt-5 text-base leading-7 text-white/62">{current.desc}</p>
              </motion.div>
            </div>
            <MetallicVisual type={current.object} />
          </div>
        </div>
      </div>
    </div>
  );
}

function BentoSystemCard() {
  const tabs = ["Dashboard", "SEO", "Anfragen", "Launch"];
  return (
    <div className="group relative mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="relative overflow-hidden rounded-[38px] border border-white/10 bg-white/[0.035] p-6 shadow-[0_28px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(41,151,255,0.2),transparent_34%)]" />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2997ff]">Live Dashboard</p>
          <h3 className="mt-3 max-w-xl text-2xl font-medium tracking-[-0.04em] text-white md:text-4xl">
            Alles, was später verkauft, wird vorher sauber sortiert.
          </h3>
          <div className="mt-8 overflow-hidden rounded-[30px] border border-white/10 bg-[#050b13]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ff605c]" />
                <span className="h-3 w-3 rounded-full bg-[#ffbd44]" />
                <span className="h-3 w-3 rounded-full bg-[#00ca4e]" />
              </div>
              <span className="text-xs uppercase tracking-[0.2em] text-white/35">Liminalo Workspace</span>
            </div>
            <div className="grid min-h-[310px] md:grid-cols-[170px_1fr]">
              <div className="border-b border-white/10 p-3 md:border-b-0 md:border-r">
                {tabs.map((tab, index) => (
                  <div
                    key={tab}
                    className={`mb-2 rounded-xl px-3 py-3 text-sm font-semibold ${
                      index === 1 ? "bg-[#2997ff]/14 text-[#8ecbff]" : "text-white/45"
                    }`}
                  >
                    {tab}
                  </div>
                ))}
              </div>
              <div className="p-5">
                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">Lokale Sichtbarkeit</span>
                    <span className="rounded-full bg-[#2997ff]/14 px-3 py-1 text-xs text-[#8ecbff]">94%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "94%" }}
                      viewport={{ once: true }}
                      className="h-full rounded-full bg-gradient-to-r from-[#2997ff] to-white"
                    />
                  </div>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {["Keyword-Cluster", "Kontaktwege", "Trust-Signale", "Mobile Speed"].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-black/28 p-4">
                      <div className="text-sm font-semibold text-white">{item}</div>
                      <div className="mt-2 text-xs text-white/45">optimiert</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[38px] border border-white/10 bg-[#02050a] p-7 shadow-[0_28px_100px_rgba(0,0,0,0.45)]">
        <div className="absolute inset-0 industries-texture opacity-35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(41,151,255,0.28),transparent_42%)]" />
        <div className="relative">
          <CpuArchitecture className="h-56 w-full text-[#2997ff]" />
          <div className="mt-6 rounded-[28px] border border-white/10 bg-black/35 p-5 backdrop-blur-xl">
            <div className="text-5xl font-semibold tracking-[-0.08em] text-white">4</div>
            <p className="mt-2 text-sm leading-6 text-white/58">
              zentrale Ebenen: Geschwindigkeit, Sichtbarkeit, Vertrauen und Anfrageführung.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function IndustriesPage() {
  return (
    <>
      <JsonLd
        data={createCollectionPageSchema({
          title: "Webdesign für Branchen und lokale Betriebe | Liminalo",
          description:
            "Branchenspezifische Websites für Restaurants, Handwerk, Fitness, Beauty, Einzelhandel, Praxen und weitere lokale Unternehmen.",
          path: "/branchen",
          items: industryPages.map((page) => ({
            name: page.serviceName,
            path: page.path,
          })),
        })}
      />
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Startseite", path: "/" },
          { name: "Branchen", path: "/branchen" },
        ])}
      />

      <style>{`
        @import url(https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap);

        .industries-page {
          font-family: "General Sans", var(--font-inter), sans-serif;
        }

        .industries-gradient-text {
          color: transparent;
          background: linear-gradient(144.5deg, #ffffff 18%, #dbeafe 36%, rgba(41, 151, 255, 0.42) 72%, rgba(0, 0, 0, 0) 116%);
          -webkit-background-clip: text;
          background-clip: text;
        }

        body:has(.industries-page) {
          background: #000;
        }

        body:has(.industries-page) > canvas {
          display: none !important;
        }

        body:has(.industries-page) main {
          padding-top: 0 !important;
        }

        body:has(.industries-page) footer {
          margin-top: 0;
          overflow: hidden;
          background:
            radial-gradient(circle at 18% 0%, rgba(41, 151, 255, 0.18), transparent 34%),
            radial-gradient(circle at 82% 24%, rgba(88, 86, 214, 0.14), transparent 36%),
            #02050a;
        }

        body:has(.industries-page) footer::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(41, 151, 255, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(41, 151, 255, 0.08) 1px, transparent 1px);
          background-size: 42px 42px;
          mask-image: linear-gradient(to bottom, transparent, black 18%, black 82%, transparent);
          opacity: 0.45;
        }

        body:has(.industries-page) footer > * {
          position: relative;
          z-index: 1;
        }

        .industries-texture {
          background-image:
            radial-gradient(circle at 1px 1px, rgba(94, 185, 255, 0.26) 1px, transparent 0),
            linear-gradient(135deg, rgba(41, 151, 255, 0.12), transparent 28%, rgba(88, 86, 214, 0.12) 62%, transparent);
          background-size: 18px 18px, 100% 100%;
        }

        .process-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, rgba(41, 151, 255, 0.75), rgba(255, 255, 255, 0.08), rgba(41, 151, 255, 0.16));
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0.32;
          transition: opacity 0.35s ease;
        }

        .process-card:hover::before {
          opacity: 0.9;
        }

        .neo-process-card {
          border: 3px solid #05060f;
          box-shadow: 0.45rem 0.45rem #05060f;
        }

        .glow-process-card::before,
        .glow-process-card::after {
          content: "";
          position: absolute;
          top: 0;
          left: 21%;
          width: 54%;
          height: 100%;
          border-radius: 24px;
          background: linear-gradient(315deg, rgba(41, 151, 255, 0.9), rgba(88, 166, 255, 0.22));
          transform: skewX(13deg);
          transition: transform 0.45s ease, opacity 0.45s ease;
          opacity: 0.72;
        }

        .glow-process-card::after {
          filter: blur(34px);
          opacity: 0.46;
        }

        .glow-process-card:hover::before,
        .glow-process-card:hover::after {
          transform: skewX(0deg) scaleX(1.25);
        }

        .industry-search-shell::before,
        .industry-search-shell::after {
          content: "";
          position: absolute;
          inset: -3px;
          border-radius: 18px;
          background: conic-gradient(from 80deg, transparent, #2997ff, transparent 28%, transparent 56%, rgba(255,255,255,0.5), transparent);
          filter: blur(2px);
          opacity: 0.75;
        }

        .industry-search-shell::after {
          inset: -18px;
          filter: blur(28px);
          opacity: 0.28;
        }

        .typing-phrases {
          position: relative;
          display: inline-block;
          width: min(24ch, 100%);
          height: 1.35em;
          overflow: hidden;
          vertical-align: bottom;
        }

        .typing-phrases span {
          position: absolute;
          left: 0;
          top: 0;
          display: inline-block;
          width: 0;
          max-width: 24ch;
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid #8ecbff;
          opacity: 0;
          animation: typing-cycle 12s steps(18, end) infinite, caret-blink 0.9s step-end infinite;
        }

        .typing-phrases span:nth-child(2) {
          animation-delay: 3s;
        }

        .typing-phrases span:nth-child(3) {
          animation-delay: 6s;
        }

        .typing-phrases span:nth-child(4) {
          animation-delay: 9s;
        }

        @keyframes typing-cycle {
          0%, 4% { width: 0; opacity: 1; }
          16%, 22% { width: 18ch; opacity: 1; }
          28%, 100% { width: 0; opacity: 0; }
        }

        @keyframes caret-blink {
          50% { border-color: transparent; }
        }

        .metallic-object {
          position: relative;
          width: min(220px, 62vw);
          aspect-ratio: 1;
          border-radius: 32%;
          transform-style: preserve-3d;
          filter: drop-shadow(0 30px 70px rgba(41,151,255,0.28));
        }

        .metallic-object::before,
        .metallic-object::after,
        .metallic-object span {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
        }

        .metallic-object::before {
          background:
            radial-gradient(circle at 32% 22%, rgba(255,255,255,0.9), transparent 13%),
            linear-gradient(135deg, #dcefff 0%, #2997ff 32%, #081522 64%, #9bd6ff 100%);
          box-shadow: inset -28px -34px 60px rgba(0,0,0,0.58), inset 24px 24px 46px rgba(255,255,255,0.22);
        }

        .metallic-object::after {
          inset: 18%;
          background: radial-gradient(circle, rgba(255,255,255,0.24), transparent 66%);
          filter: blur(14px);
        }

        .metallic-object span {
          inset: -8%;
          border: 1px solid rgba(142,203,255,0.38);
          transform: rotateX(62deg) rotateZ(-18deg);
          box-shadow: 0 0 40px rgba(41,151,255,0.18);
        }

        .metallic-bolt {
          clip-path: polygon(46% 0, 78% 0, 59% 40%, 88% 40%, 35% 100%, 48% 56%, 20% 56%);
          border-radius: 18%;
        }

        .metallic-shield {
          clip-path: polygon(50% 0, 88% 15%, 78% 72%, 50% 100%, 22% 72%, 12% 15%);
          border-radius: 20%;
        }

        .metallic-arrow {
          clip-path: polygon(55% 0, 100% 50%, 55% 100%, 55% 64%, 0 64%, 0 36%, 55% 36%);
          border-radius: 16%;
        }

        @keyframes pulse-line {
          0%, 100% { opacity: 0.28; transform: scaleX(0.72); }
          50% { opacity: 1; transform: scaleX(1); }
        }

        .industry-marquee-track {
          animation: industry-marquee 28s linear infinite;
        }

        .pulse-line {
          animation: pulse-line 3.2s ease-in-out infinite;
          transform-origin: left;
        }

        @media (prefers-reduced-motion: reduce) {
          .pulse-line,
          .typing-phrases span {
            animation: none;
          }
        }
      `}</style>

      <div className="industries-page min-h-screen overflow-x-hidden bg-black text-white">
        <section className="relative isolate min-h-[100svh] overflow-hidden bg-black">
          <video
            className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260217_030345_246c0224-10a4-422c-b324-070b7c0eceda.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
          <div className="absolute inset-0 z-10 bg-black/50" />
          <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_18%,rgba(41,151,255,0.28),transparent_36%),linear-gradient(to_bottom,rgba(0,0,0,0.12),#000_94%)]" />

          <div className="relative z-20 flex min-h-[100svh] flex-col px-5 pb-[102px] pt-[calc(env(safe-area-inset-top)+7.5rem)] md:px-[120px] md:pt-[calc(env(safe-area-inset-top)+8rem)]">
            <div className="flex flex-1 items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto flex max-w-[760px] flex-col items-center gap-10 text-center"
              >
                <div className="inline-flex items-center gap-2 rounded-[20px] border border-white/20 bg-white/10 px-4 py-2 text-[13px] font-medium">
                  <span className="h-1 w-1 rounded-full bg-white" />
                  <span className="text-white/60">Branchenspezifische Websites ab</span>
                  <span className="text-white">50 EUR</span>
                </div>

                <div>
                  <h1 className="industries-gradient-text mx-auto max-w-[680px] text-[36px] font-medium leading-[1.18] tracking-[-0.05em] md:text-[56px] md:leading-[1.28]">
                    Websites für jede Branche. Schnell sichtbar. Direkt anfragbar.
                  </h1>
                  <p className="mx-auto mt-6 max-w-[680px] text-[15px] font-normal leading-7 text-white/70">
                    Liminalo entwickelt Websites für Cafés, Handwerk, Fitness, Praxen, Hotels,
                    Dienstleister und lokale Betriebe. Klar im Aufbau, stark im Design und auf
                    echte Anfragen optimiert.
                  </p>
                </div>

                <Link href="/kontakt" className="group relative rounded-full border border-white/60 p-[3px]">
                  <span className="absolute left-6 right-6 top-0 h-3 rounded-full bg-white/80 blur-md opacity-80" />
                  <span className="relative inline-flex items-center gap-2 rounded-full bg-white px-[29px] py-[11px] text-sm font-medium text-black transition group-hover:bg-[#eaf5ff]">
                    Kostenlose Anfrage
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-black px-5 py-8 md:px-[120px]" id="seo">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { value: "500+", label: "mögliche Branchen-Setups" },
              { value: "98%", label: "klarer Fokus auf Anfragen" },
              { value: "<2s", label: "Performance-Ziel" },
              { value: "24/7", label: "online erreichbar" },
            ].map((badge, index) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="text-center"
              >
                <div className="text-2xl font-semibold text-[#2997ff] md:text-3xl">{badge.value}</div>
                <div className="mt-1 text-sm text-white/50">{badge.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="branchen" className="relative bg-black px-5 py-24 md:px-[120px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(41,151,255,0.18),transparent_28%),radial-gradient(circle_at_85%_55%,rgba(88,86,214,0.18),transparent_30%)]" />
          <div className="relative mx-auto max-w-7xl">
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2997ff]">
                Branchenlösungen
              </span>
              <h2 className="mt-4 text-3xl font-medium tracking-[-0.04em] text-white md:text-5xl">
                Für jedes Geschäft der passende digitale Auftritt.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/58">
                Jede Branche braucht andere Inhalte, Funktionen und Vertrauenssignale. Genau
                darauf wird Ihre Website ausgerichtet.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {industries.map((industry, index) => {
                const Icon = industry.icon;
                return (
                  <motion.div
                    key={industry.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: index * 0.035 }}
                  >
                    <Link href={industry.href} className="group block h-full">
                      <div className="relative h-full overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-[#2997ff]/45 hover:bg-white/[0.07]">
                        <div
                          className="absolute inset-x-0 top-0 h-px opacity-80"
                          style={{ background: `linear-gradient(90deg, transparent, ${industry.color}, transparent)` }}
                        />
                        <div className="relative z-10">
                          <div className="mb-5 flex items-start justify-between">
                            <div
                              className="flex h-12 w-12 items-center justify-center rounded-2xl border"
                              style={{
                                backgroundColor: `${industry.color}18`,
                                borderColor: `${industry.color}40`,
                              }}
                            >
                              <Icon className="h-6 w-6" weight="duotone" color={industry.color} />
                            </div>
                            <span
                              className="rounded-full px-3 py-1 text-xs font-semibold"
                              style={{ backgroundColor: `${industry.color}18`, color: industry.color }}
                            >
                              {industry.stat}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-white transition group-hover:text-[#8ecbff]">
                            {industry.title}
                          </h3>
                          <p className="mt-2 min-h-[44px] text-sm leading-6 text-white/52">
                            {industry.shortDesc}
                          </p>
                          <div className="mt-5 flex flex-wrap gap-2">
                            {industry.benefits.map((benefit) => (
                              <span
                                key={benefit}
                                className="rounded-full px-2.5 py-1 text-xs"
                                style={{
                                  backgroundColor: `${industry.color}12`,
                                  color: `${industry.color}dd`,
                                }}
                              >
                                {benefit}
                              </span>
                            ))}
                          </div>
                          <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition group-hover:text-white">
                            Mehr erfahren
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="prozess" className="relative overflow-hidden bg-black px-5 py-28 md:px-[120px]">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#050a12_0%,#02050a_42%,#000_100%)]" />
          <div className="industries-texture absolute inset-0 opacity-35" />
          <div className="absolute left-1/2 top-16 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#2997ff]/16 blur-[120px]" />
          <div className="relative mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2997ff]">
                Unser Prozess
              </span>
              <h2 className="mt-4 text-3xl font-medium tracking-[-0.045em] text-white md:text-5xl md:leading-[1.08]">
                Aus Branchenlogik wird ein Auftritt, der{" "}
                <span className="text-[#8ecbff]">direkt verstanden wird.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/58">
                Weniger Bla-bla, mehr Klarheit: Wir sortieren Angebot, Vertrauen und Kontaktweg so,
                dass Besucher schneller handeln.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
              className="mx-auto mt-12 max-w-xl"
            >
              <div className="industry-search-shell relative mx-auto flex h-16 max-w-[430px] items-center justify-center">
                <div className="relative z-10 flex h-14 w-full items-center rounded-2xl border border-white/10 bg-[#01050b] px-5 text-left shadow-[0_22px_80px_rgba(41,151,255,0.18)]">
                  <Search className="mr-3 h-5 w-5 shrink-0 text-[#8ecbff]" />
                  <span className="min-w-0 flex-1 text-sm font-medium text-white/78 md:text-base">
                    <span className="typing-phrases">
                      <span>mehr Anfragen</span>
                      <span>lokal sichtbar</span>
                      <span>schnell online</span>
                      <span>klar verkaufen</span>
                    </span>
                  </span>
                  <span className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#07111e]">
                    <SlidersHorizontal className="h-4 w-4 text-[#8ecbff]" />
                  </span>
                </div>
              </div>
            </motion.div>

            <div className="mt-16 grid gap-5 md:grid-cols-4">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                const isAccent = index === 1;
                const isGlow = index === 2;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -8 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative min-h-[230px] overflow-hidden rounded-[28px] ${
                      isAccent
                        ? "neo-process-card bg-[#2997ff] p-5 text-[#05060f]"
                        : isGlow
                          ? "glow-process-card p-3"
                          : "border border-white/10 bg-white/[0.045] p-5 text-white backdrop-blur-xl"
                    }`}
                  >
                    {isGlow ? (
                      <span className="absolute inset-0 z-10 pointer-events-none">
                        <span className="absolute left-8 top-0 h-12 w-12 rounded-2xl bg-white/12 shadow-[0_14px_40px_rgba(41,151,255,0.25)] backdrop-blur-xl" />
                        <span className="absolute bottom-0 right-8 h-12 w-12 rounded-2xl bg-white/10 shadow-[0_14px_40px_rgba(41,151,255,0.2)] backdrop-blur-xl" />
                      </span>
                    ) : null}
                    <div
                      className={`relative z-20 flex h-full flex-col justify-between rounded-[22px] ${
                        isGlow ? "min-h-[206px] border border-white/12 bg-black/45 p-5 text-white backdrop-blur-xl" : ""
                      }`}
                    >
                      <div>
                        <div className="mb-6 flex items-center justify-between">
                          <div
                            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                              isAccent ? "bg-[#05060f] text-white" : "border border-[#2997ff]/30 bg-[#2997ff]/12 text-[#2997ff]"
                            }`}
                          >
                            <Icon className="h-6 w-6" weight="duotone" />
                          </div>
                          <span className={`text-sm font-bold ${isAccent ? "text-[#05060f]/70" : "text-[#8ecbff]"}`}>
                            {step.step}
                          </span>
                        </div>
                        <h3 className="text-2xl font-semibold tracking-[-0.04em]">{step.title}</h3>
                        <p className={`mt-2 text-sm font-medium ${isAccent ? "text-[#05060f]/78" : "text-white/58"}`}>
                          {step.subtitle}
                        </p>
                      </div>
                      <p className={`mt-8 text-sm leading-6 ${isAccent ? "text-[#05060f]/76" : "text-white/62"}`}>
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#02050a] px-5 py-24 md:px-[120px]">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#000_0%,#02050a_28%,#02050a_72%,#000_100%)]" />
          <div className="industries-texture absolute inset-0 opacity-30" />
          <div className="absolute left-0 top-20 h-[520px] w-[520px] rounded-full bg-[#2997ff]/14 blur-[130px]" />
          <div className="absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full bg-[#5856d6]/12 blur-[140px]" />
          <div className="relative space-y-8">
            <FeatureCarouselNative />
            <BentoSystemCard />
          </div>
        </section>

        <section className="relative overflow-hidden bg-black px-5 pb-28 pt-6 md:px-[120px]">
          <div className="industries-texture absolute inset-0 opacity-35" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(41,151,255,0.26),transparent_42%),linear-gradient(180deg,#000_0%,#02050a_100%)]" />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            className="group relative mx-auto max-w-5xl overflow-hidden rounded-[44px] border border-white/10 bg-black/45 p-8 text-center shadow-[0_34px_120px_rgba(0,0,0,0.5)] backdrop-blur-xl md:p-12"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(41,151,255,0.34),transparent_45%)]" />
            <div className="relative z-10">
              <Sparkles className="mx-auto mb-5 h-8 w-8 text-[#2997ff] transition group-hover:rotate-12" />
              <h2 className="text-3xl font-medium tracking-[-0.04em] text-white md:text-5xl">
                Bereit für eine Website, die zu Ihrer Branche passt?
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/60">
                Lassen Sie uns in einem kostenlosen Gespräch klären, welche Inhalte,
                Funktionen und Designrichtung für Ihr Business am meisten bringen.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/kontakt"
                  className="group/button inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-[#eaf5ff]"
                >
                  Kontakt aufnehmen
                  <ArrowRight className="h-4 w-4 transition group-hover/button:translate-x-1" />
                </Link>
                <Link
                  href="/#pricing"
                  className="inline-flex items-center justify-center rounded-full border border-white/18 px-8 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/8"
                >
                  Preise ansehen
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}
