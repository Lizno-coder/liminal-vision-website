"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock, CheckCircle, TrendingUp } from "lucide-react";

const projects = [
  {
    name: "Café Sonnenschein",
    industry: "Gastronomie",
    location: "München",
    challenge: "Keine Online-Präsenz, Reservierungen nur telefonisch, junge Zielgruppe über Instagram nicht erreichbar.",
    solution: "Moderne Website mit Online-Reservierung, digitale Speisekarte, Event-Kalender und Instagram-Integration.",
    result: "+40% mehr Reservierungen, 60% weniger Telefonanfragen, 3x so viele Instagram-Follower.",
    tech: ["Next.js", "Tailwind", "Supabase"],
    color: "from-[#f59e0b] to-[#fbbf24]",
    year: "2025",
  },
  {
    name: "FitZone Studio",
    industry: "Fitness & Gesundheit",
    location: "Rosenheim",
    challenge: "Alte Website langsam und nicht mobil-optimiert, keine Online-Mitgliedschafts-Anmeldung, schlechte Google-Rankings.",
    solution: "Performance-optimierte Website mit Kurs-Buchungssystem, Mitgliedschafts-Infos und automatisierten E-Mails.",
    result: "Seitenladezeit von 4s auf 0.8s verbessert, +25% neue Mitglieder, Top 3 Google-Ranking für 'Fitness Rosenheim'.",
    tech: ["Next.js", "Stripe", "SendGrid"],
    color: "from-[#22c55e] to-[#4ade80]",
    year: "2024",
  },
  {
    name: "Kunsthandwerk Müller",
    industry: "Handwerk & Kunst",
    location: "Waldkraiburg",
    challenge: "Produkte nur lokal verkauft, keine Reichweite über die Region hinaus, zeitaufwändige Anfragen per WhatsApp.",
    solution: "E-Commerce-Website mit Produktgalerie, Warenkorb, Bezahlung per PayPal und automatischer Bestellbestätigung.",
    result: "Verkauf in ganz Deutschland möglich, +150% Umsatz in 6 Monaten, 80% weniger Zeit für Anfragen.",
    tech: ["Next.js", "Stripe", "Cloudflare R2"],
    color: "from-[#8b5cf6] to-[#a78bfa]",
    year: "2024",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#2997ff]">
            Portfolio
          </p>
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl lg:text-5xl">
            Ausgewählte Projekte
          </h2>
          <p className="mt-4 max-w-2xl text-white/60">
            Echte Ergebnisse für echte Unternehmen. Jedes Projekt ist eine Geschichte 
            von Problem zu Lösung.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-8"
        >
          {projects.map((project, index) => (
            <motion.article
              key={project.name}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-500 hover:border-white/20"
            >
              <div className="grid gap-8 p-8 lg:grid-cols-[1fr_1.2fr] lg:p-10">
                {/* Left: Header */}
                <div>
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className={`inline-flex items-center rounded-full bg-gradient-to-r ${project.color} px-3 py-1 text-xs font-medium text-white`}>
                      {project.industry}
                    </span>
                    <span className="text-sm text-white/50">{project.location}</span>
                  </div>

                  <h3 className="mb-2 text-2xl font-semibold text-white lg:text-3xl">
                    {project.name}
                  </h3>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-white/50">
                    <Clock className="h-4 w-4" />
                    Realisiert {project.year}
                  </div>
                </div>

                {/* Right: Details */}
                <div className="space-y-6">
                  <div>
                    <h4 className="mb-2 flex items-center gap-2 text-sm font-medium text-white/50">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                      Challenge
                    </h4>
                    <p className="text-white/80">{project.challenge}</p>
                  </div>

                  <div>
                    <h4 className="mb-2 flex items-center gap-2 text-sm font-medium text-white/50">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#2997ff]" />
                      Lösung
                    </h4>
                    <p className="text-white/80">{project.solution}</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#2997ff]/10 to-[#5856d6]/10 p-5">
                    <h4 className="mb-2 flex items-center gap-2 text-sm font-medium text-[#2997ff]">
                      <TrendingUp className="h-4 w-4" />
                      Ergebnis
                    </h4>
                    <p className="text-white">{project.result}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
