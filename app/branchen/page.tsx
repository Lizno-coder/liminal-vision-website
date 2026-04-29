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
import { Globe2, ShieldCheck, Sparkles, TrendingUp, Zap } from "lucide-react";

import { industryPages } from "@/content/industry-pages";
import { JsonLd, createBreadcrumbSchema, createCollectionPageSchema } from "@/lib/seo";

const industries = [
  {
    id: "cafe",
    icon: Coffee,
    title: "Cafes & Restaurants",
    shortDesc: "Mehr Gaeste durch klare Praesentation.",
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
    benefits: ["Leistungsuebersicht", "Referenzen"],
    color: "#2997ff",
    stat: "24/7",
    href: "/branchen/handwerk-gewerbe",
  },
  {
    id: "fitness",
    icon: Barbell,
    title: "Fitness & Wellness",
    shortDesc: "Mehr Mitglieder durch starke Praesenz.",
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
    shortDesc: "Ihr Geschaeft digital erlebbar.",
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
    benefits: ["Service-Uebersicht", "Case Studies"],
    color: "#06b6d4",
    stat: "3x",
    href: "/branchen/dienstleister",
  },
  {
    id: "hotel",
    icon: Bed,
    title: "Hotels & Unterkuenfte",
    shortDesc: "Buchungsanfragen rund um die Uhr.",
    benefits: ["Zimmer-Uebersicht", "Buchungsanfrage"],
    color: "#ec4899",
    stat: "+120%",
    href: "/branchen/hotels-unterkuenfte",
  },
  {
    id: "health",
    icon: Stethoscope,
    title: "Gesundheit & Praxen",
    shortDesc: "Serioes, klar und einfach erreichbar.",
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
    title: "Kreative & Kuenstler",
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
    shortDesc: "Massgeschneidert fuer Ihr Business.",
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
    desc: "Wir klaeren, was Kunden auf Ihrer Website sofort verstehen muessen.",
    icon: ChartLineUp,
  },
  {
    step: "02",
    title: "Konzept",
    subtitle: "Struktur vor Design",
    desc: "Wir bauen eine klare Seitenlogik fuer Vertrauen, SEO und Anfragen.",
    icon: Briefcase,
  },
  {
    step: "03",
    title: "Design",
    subtitle: "Modern und markengerecht",
    desc: "Ihre Branche bekommt einen Look, der nicht nach Vorlage aussieht.",
    icon: PaintBrush,
  },
  {
    step: "04",
    title: "Launch",
    subtitle: "Schnell, sicher, sichtbar",
    desc: "Wir bringen die Seite live und optimieren sie fuer echte Besucher.",
    icon: Wrench,
  },
];

const marqueeItems = [
  "Cafes",
  "Handwerk",
  "Fitness",
  "Beauty",
  "Praxen",
  "Hotels",
  "Dienstleister",
  "Einzelhandel",
  "Coaching",
  "Automobil",
];

const conversionStack = [
  { icon: Zap, title: "Schnelle Ladezeit", desc: "Saubere Assets, klare Struktur und mobile Prioritaet." },
  { icon: Globe2, title: "Lokale Sichtbarkeit", desc: "SEO-Aufbau fuer Stadt, Branche und konkrete Leistungen." },
  { icon: ShieldCheck, title: "Vertrauen sofort", desc: "Referenzen, Leistungen und Kontaktwege sichtbar sortiert." },
  { icon: TrendingUp, title: "Anfragen statt Klicks", desc: "CTA-Fuehrung, Angebotslogik und Formularwege ohne Reibung." },
];

export default function IndustriesPage() {
  return (
    <>
      <JsonLd
        data={createCollectionPageSchema({
          title: "Webdesign fuer Branchen und lokale Betriebe | Liminalo",
          description:
            "Branchenspezifische Websites fuer Restaurants, Handwerk, Fitness, Beauty, Einzelhandel, Praxen und weitere lokale Unternehmen.",
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

        @keyframes industry-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
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
          .industry-marquee-track,
          .pulse-line {
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
                    Websites fuer jede Branche. Schnell sichtbar. Direkt anfragbar.
                  </h1>
                  <p className="mx-auto mt-6 max-w-[680px] text-[15px] font-normal leading-7 text-white/70">
                    Liminalo entwickelt Websites fuer Cafes, Handwerk, Fitness, Praxen, Hotels,
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
              { value: "500+", label: "moegliche Branchen-Setups" },
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
                Branchenloesungen
              </span>
              <h2 className="mt-4 text-3xl font-medium tracking-[-0.04em] text-white md:text-5xl">
                Fuer jedes Geschaeft der passende digitale Auftritt.
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

        <section id="prozess" className="relative overflow-hidden bg-[#02050a] px-5 py-28 md:px-[120px]">
          <div className="industries-texture absolute inset-0 opacity-55" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_14%,rgba(41,151,255,0.28),transparent_30%),radial-gradient(circle_at_88%_74%,rgba(41,151,255,0.16),transparent_32%),linear-gradient(to_bottom,#02050a_0%,rgba(2,5,10,0.72)_52%,#000_100%)]" />
          <div className="relative mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="lg:sticky lg:top-28"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2997ff]">
                  Unser Prozess
                </span>
                <h2 className="mt-4 max-w-xl text-3xl font-medium tracking-[-0.045em] text-white md:text-5xl md:leading-[1.05]">
                  Von der Branchenlogik zur Website, die{" "}
                  <span className="rounded-2xl border border-[#2997ff]/30 bg-[#2997ff]/15 px-2 text-[#8ecbff]">
                    verkauft.
                  </span>
                </h2>
                <p className="mt-6 max-w-lg text-base leading-7 text-white/60">
                  Jede Seite wird wie ein kleines Verkaufssystem geplant: erst verstehen,
                  dann strukturieren, dann gestalten und messbar live bringen.
                </p>

                <div className="mt-10 overflow-hidden rounded-[32px] border border-white/10 bg-black/45 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">Launch Blueprint</span>
                    <span className="rounded-full border border-[#2997ff]/30 bg-[#2997ff]/12 px-3 py-1 text-xs text-[#8ecbff]">
                      live-ready
                    </span>
                  </div>
                  {["Angebot sofort klar", "SEO-Struktur pro Leistung", "Kontaktweg ohne Reibung"].map(
                    (item, index) => (
                      <div key={item} className="group flex items-center gap-4 border-t border-white/8 py-4">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#2997ff]/30 bg-[#2997ff]/12 text-xs font-semibold text-[#8ecbff]">
                          0{index + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-white">{item}</div>
                          <div className="mt-2 h-px overflow-hidden rounded-full bg-white/10">
                            <div className="pulse-line h-full rounded-full bg-gradient-to-r from-[#2997ff] via-white to-[#2997ff]" />
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </motion.div>

              <div className="grid gap-4">
                {processSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, y: 28, scale: 0.98 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      whileHover={{ y: -4 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className="process-card group relative overflow-hidden rounded-[34px] bg-white/[0.035] p-5 backdrop-blur-xl md:p-6"
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_0%,rgba(41,151,255,0.18),transparent_32%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                      <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-center">
                        <div className="flex items-center gap-4 md:w-56">
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#2997ff]/35 bg-[#2997ff]/12">
                            <Icon className="h-7 w-7" weight="duotone" color="#2997ff" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-[#8ecbff]">{step.step}</div>
                            <h3 className="mt-1 text-xl font-semibold text-white">{step.title}</h3>
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-white/82">{step.subtitle}</p>
                          <p className="mt-2 text-sm leading-6 text-white/52">{step.desc}</p>
                        </div>
                        <ArrowRight className="hidden h-5 w-5 text-white/28 transition group-hover:translate-x-1 group-hover:text-[#2997ff] md:block" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-black px-5 py-24 md:px-[120px]">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#000_0%,#02050a_48%,#000_100%)]" />
          <div className="absolute left-0 right-0 top-10 overflow-hidden opacity-35">
            <div className="industry-marquee-track flex w-max gap-4 whitespace-nowrap">
              {[...marqueeItems, ...marqueeItems].map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="rounded-full border border-[#2997ff]/20 bg-[#2997ff]/8 px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#8ecbff]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.035] p-6 shadow-[0_34px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-10">
            <div className="absolute inset-0 industries-texture opacity-35" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(41,151,255,0.25),transparent_34%),radial-gradient(circle_at_80%_84%,rgba(88,86,214,0.16),transparent_32%)]" />
            <div className="relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2997ff]">
                  Conversion-System
                </span>
                <h2 className="mt-4 text-3xl font-medium tracking-[-0.045em] text-white md:text-5xl md:leading-[1.06]">
                  Nicht nur schoen. Auf echte Besucher optimiert.
                </h2>
                <p className="mt-6 max-w-xl text-base leading-7 text-white/60">
                  Design, Ladezeit, lokale Suchintention und Kontaktwege greifen ineinander.
                  So wirkt die Website hochwertig und bleibt trotzdem klar verkaufsorientiert.
                </p>
                <div className="mt-8 grid grid-cols-3 gap-3">
                  {["Speed", "Trust", "SEO"].map((label) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-black/35 p-4 text-center">
                      <div className="text-xl font-semibold text-[#8ecbff]">100%</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/42">{label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="grid gap-4 sm:grid-cols-2">
                {conversionStack.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -5, rotateX: 2, rotateY: -2 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ delay: index * 0.06, duration: 0.5 }}
                      className="group rounded-[28px] border border-white/10 bg-black/35 p-6 transition duration-500 hover:border-[#2997ff]/45 hover:bg-[#061423]/70"
                    >
                      <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-2xl border border-[#2997ff]/30 bg-[#2997ff]/12">
                        <Icon className="h-6 w-6 text-[#2997ff]" />
                      </div>
                      <h3 className="text-lg font-semibold text-white transition group-hover:text-[#8ecbff]">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-white/52">{feature.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#02050a] px-5 pb-28 pt-6 md:px-[120px]">
          <div className="industries-texture absolute inset-0 opacity-45" />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            className="group relative mx-auto max-w-4xl overflow-hidden rounded-[40px] border border-white/10 bg-black/45 p-8 text-center shadow-[0_34px_120px_rgba(0,0,0,0.5)] backdrop-blur-xl md:p-12"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(41,151,255,0.34),transparent_45%)]" />
            <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(260px_circle_at_50%_38%,rgba(41,151,255,0.28),transparent_70%)]" />
            <div className="relative z-10">
              <Sparkles className="mx-auto mb-5 h-8 w-8 text-[#2997ff]" />
              <h2 className="text-3xl font-medium tracking-[-0.04em] text-white md:text-5xl">
                Bereit fuer eine Website, die zu Ihrer Branche passt?
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/60">
                Lassen Sie uns in einem kostenlosen Gespraech klaeren, welche Inhalte,
                Funktionen und Designrichtung fuer Ihr Business am meisten bringen.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition hover:bg-[#eaf5ff]"
                >
                  Kontakt aufnehmen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/#pricing"
                  className="inline-flex items-center justify-center rounded-full border border-white/18 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/8"
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
