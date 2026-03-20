"use client";

import React, { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Zap,
  Palette,
  Globe,
  Shield,
  Smartphone,
  Search,
  Server,
  Users,
  Code2,
  Sparkles,
  Rocket,
} from "lucide-react";
import Link from "next/link";

interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  color?: string;
}

function ServiceCard({ icon: Icon, title, description, features, color = "#2997ff" }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6 backdrop-blur-xl transition-all duration-500 hover:border-white/[0.15] sm:p-8"
    >
      <div 
        className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ 
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${color}15, transparent 40%)`,
        }}
      />
      
      <div className="relative z-10">
        <div 
          className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300 group-hover:scale-110"
          style={{ 
            backgroundColor: `${color}15`,
            borderColor: `${color}30`,
            color: color
          }}
        >
          <Icon className="h-7 w-7" />
        </div>
        
        <h3 className="mb-3 text-xl font-semibold text-white">{title}</h3>
        <p className="mb-5 text-sm leading-relaxed text-white/60">{description}</p>
        
        <ul className="space-y-2.5">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-white/70">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color }} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function BerlinContent() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.group');
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2997ff] to-[#f59e0b] origin-left z-50"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -right-1/2 w-[100vw] h-[100vw] rounded-full border border-white/[0.03]"
          />
        </div>

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
            <Link
              href="#services"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10"
            >
              Unsere Leistungen
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="relative py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Alles aus einer Hand
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Vom ersten Konzept bis zur fertigen Website – wir kümmern uns um alles. 
              Du musst dich um nichts sorgen.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              icon={Code2}
              title="Individuelle Entwicklung"
              description="Keine WordPress-Templates. Kein Elementor. Wir programmieren deine Website von Grund auf mit modernsten Frameworks."
              features={["Next.js & React", "TypeScript", "Tailwind CSS", "100% maßgeschneidert"]}
              color="#2997ff"
            />
            <ServiceCard
              icon={Palette}
              title="Einzigartiges Design"
              description="Deine Website soll einzigartig sein. Wir entwerfen ein Design, das perfekt zu deiner Marke passt."
              features={["UI/UX Design", "Brand Identity", "Responsive Design", "Animationen"]}
              color="#f59e0b"
            />
            <ServiceCard
              icon={Shield}
              title="Rechtssicherheit"
              description="Impressum, Datenschutz, AGBs – wir kümmern uns um alle rechtlichen Anforderungen deiner Website."
              features={["DSGVO-konform", "Impressum", "Datenschutzerklärung", "AGBs"]}
              color="#10b981"
            />
            <ServiceCard
              icon={Search}
              title="SEO-Optimierung"
              description="Wir optimieren deine Website für Suchmaschinen, damit Kunden dich in Berlin und darüber hinaus finden."
              features={["On-Page SEO", "Meta-Daten", "Ladezeiten", "Core Web Vitals"]}
              color="#8b5cf6"
            />
            <ServiceCard
              icon={Smartphone}
              title="Multi-Device Testing"
              description="Wir testen auf zahlreichen Geräten – von iPhone bis Android, Tablet bis Desktop."
              features={["Mobile-first", "Tablet optimiert", "Desktop perfekt", "Cross-Browser"]}
              color="#ec4899"
            />
            <ServiceCard
              icon={Globe}
              title="Domain & Hosting"
              description="Behalte deine Domain oder wir besorgen eine neue. Wir hosten deine Website auf Vercel – schnell und sicher."
              features={["Domain-Verwaltung", "Cloudflare CDN", "SSL-Zertifikat", "99.9% Uptime"]}
              color="#06b6d4"
            />
          </div>
        </div>
      </section>

      {/* Berlin specific section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2997ff]/5 to-transparent" />
        
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#2997ff]/30 bg-[#2997ff]/10 px-4 py-2 mb-6">
                <Zap className="h-4 w-4 text-[#2997ff]" />
                <span className="text-sm font-medium text-[#2997ff]">Lokal verwurzelt</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Wir kennen Berlin.<br />
                Wir kennen den Markt.
              </h2>
              <p className="text-lg text-white/60 mb-6">
                Von Startups in Mitte bis zum Handwerk in Spandau – wir wissen, was Berliner Unternehmen brauchen. 
                Deine Website wird perfekt auf deine Zielgruppe in Berlin, Potsdam und Brandenburg abgestimmt.
              </p>
              <ul className="space-y-3">
                {[
                  "Lokale SEO für Berliner Bezirke",
                  "Verständnis für den Berliner Markt",
                  "Persönliche Betreuung vor Ort möglich",
                  "Netzwerk aus Berliner Unternehmern"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/70">
                    <div className="h-6 w-6 rounded-full bg-[#2997ff]/20 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-[#2997ff]" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#2997ff]/20 to-[#f59e0b]/20 rounded-3xl blur-3xl" />
              <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#2997ff] to-[#5856d6] flex items-center justify-center">
                      <Rocket className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Schnelle Ladezeiten</div>
                      <div className="text-white/50 text-sm">Unter 2 Sekunden</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#f59e0b] to-[#ef4444] flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Zielgruppenanalyse</div>
                      <div className="text-white/50 text-sm">Datenbasierte Entscheidungen</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#10b981] to-[#06b6d4] flex items-center justify-center">
                      <Server className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">24/7 Support</div>
                      <div className="text-white/50 text-sm">Wir kümmern uns um alles</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-8 sm:p-12 backdrop-blur-xl"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Bereit für deine neue<br />
              <span className="bg-gradient-to-r from-[#2997ff] to-[#f59e0b] bg-clip-text text-transparent">
                Berliner Website?
              </span>
            </h2>
            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
              Lass uns gemeinsam deine perfekte Website erstellen. 
              Kostenlose Erstberatung – unverbindlich und ohne Verpflichtungen.
            </p>
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2997ff] to-[#f59e0b] px-10 py-5 text-lg font-semibold text-white shadow-[0_20px_60px_rgba(41,151,255,0.4)] transition-all hover:scale-[1.02] hover:shadow-[0_25px_70px_rgba(41,151,255,0.5)]"
            >
              Jetzt kostenlos beraten lassen
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
