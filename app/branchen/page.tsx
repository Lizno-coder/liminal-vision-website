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
import { ChevronDown, Globe2, ShieldCheck, Sparkles, TrendingUp, Zap } from "lucide-react";

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

const heroNav = ["Branchen", "Prozess", "SEO", "Kontakt"];

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
        @import url("https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap");

        .industries-page {
          font-family: "General Sans", var(--font-inter), sans-serif;
        }

        .industries-gradient-text {
          color: transparent;
          background: linear-gradient(144.5deg, #ffffff 18%, #dbeafe 36%, rgba(41, 151, 255, 0.42) 72%, rgba(0, 0, 0, 0) 116%);
          -webkit-background-clip: text;
          background-clip: text;
        }
      `}</style>

      <div className="industries-page min-h-screen overflow-x-hidden bg-black text-white">
        <section className="relative min-h-[100svh] overflow-hidden bg-black">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260217_030345_246c0224-10a4-422c-b324-070b7c0eceda.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(41,151,255,0.28),transparent_36%),linear-gradient(to_bottom,rgba(0,0,0,0.12),#000_94%)]" />

          <div className="relative z-10 flex min-h-[100svh] flex-col px-5 pb-[102px] pt-[calc(env(safe-area-inset-top)+88px)] md:px-[120px] md:pt-[calc(env(safe-area-inset-top)+20px)]">
            <nav className="flex items-center justify-between py-5">
              <Link
                href="/"
                className="text-[18px] font-semibold tracking-[-0.04em] text-white md:w-[187px]"
              >
                LIMINALO
              </Link>

              <div className="hidden items-center gap-[30px] md:flex">
                {heroNav.map((item) => (
                  <a
                    key={item}
                    href={item === "Kontakt" ? "/kontakt" : `#${item.toLowerCase()}`}
                    className="inline-flex items-center gap-[14px] text-sm font-medium text-white transition hover:text-[#8ecbff]"
                  >
                    {item}
                    <ChevronDown className="h-[14px] w-[14px]" />
                  </a>
                ))}
              </div>

              <Link href="/kontakt" className="group relative rounded-full border border-white/60 p-[3px]">
                <span className="absolute left-5 right-5 top-0 h-3 rounded-full bg-white/70 blur-md opacity-70" />
                <span className="relative flex rounded-full bg-black px-[29px] py-[11px] text-sm font-medium text-white transition group-hover:bg-[#061423]">
                  Projekt starten
                </span>
              </Link>
            </nav>

            <div className="flex flex-1 items-center justify-center pt-[112px] md:pt-[220px]">
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

        <section id="prozess" className="bg-[#02050a] px-5 py-24 md:px-[120px]">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2997ff]">
                Unser Prozess
              </span>
              <h2 className="mt-4 text-3xl font-medium tracking-[-0.04em] text-white md:text-5xl">
                Von der Branchenlogik zur Website, die verkauft.
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] p-6"
                  >
                    <div className="absolute right-4 top-2 text-7xl font-semibold text-white/[0.035]">
                      {step.step}
                    </div>
                    <div className="relative z-10">
                      <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#2997ff]/35 bg-[#2997ff]/12">
                        <Icon className="h-6 w-6" weight="duotone" color="#2997ff" />
                      </div>
                      <div className="text-sm font-semibold text-[#2997ff]">{step.step}</div>
                      <h3 className="mt-2 text-xl font-semibold text-white">{step.title}</h3>
                      <p className="mt-1 text-sm text-white/72">{step.subtitle}</p>
                      <p className="mt-4 text-sm leading-6 text-white/48">{step.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-black px-5 py-24 md:px-[120px]">
          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-4">
            {[
              { icon: Zap, title: "Blitzschnell", desc: "Performance fuer mobile Nutzer." },
              { icon: Globe2, title: "SEO-Ready", desc: "Struktur fuer bessere Auffindbarkeit." },
              { icon: ShieldCheck, title: "Vertrauen", desc: "Klare Inhalte, echte Signale." },
              { icon: TrendingUp, title: "Conversion", desc: "Mehr Anfragen statt nur Klicks." },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6 text-center transition hover:border-[#2997ff]/35 hover:bg-white/[0.065]"
                >
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#2997ff]/30 bg-[#2997ff]/12">
                    <Icon className="h-7 w-7 text-[#2997ff]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/52">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="bg-[#02050a] px-5 py-24 md:px-[120px]">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative mx-auto max-w-4xl overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] p-8 text-center md:p-12"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(41,151,255,0.28),transparent_45%)]" />
            <div className="relative z-10">
              <Sparkles className="mx-auto mb-5 h-8 w-8 text-[#2997ff]" />
              <h2 className="text-3xl font-medium tracking-[-0.04em] text-white md:text-5xl">
                Bereit fuer eine Website, die zu Ihrer Branche passt?
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/58">
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
