import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Coffee,
  Dumbbell,
  Flower2,
  Hammer,
  Sparkles,
  Store,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Mini-Websites | Liminal Vision",
  description:
    "Vier minimalistische Mini-Websites mit eigenständigem Branchen-Design für Gastronomie, Fitness, Handwerk und Beauty.",
};

const showcases = [
  {
    name: "Café Sonnenschein",
    category: "Gastronomie",
    city: "München",
    accent: "#f59e0b",
    badgeClass: "border-amber-300/30 bg-amber-300/10 text-amber-200",
    panelClass:
      "border-amber-200/10 bg-[linear-gradient(135deg,rgba(245,158,11,0.16),rgba(120,53,15,0.08)_55%,rgba(255,255,255,0.03))]",
    cardClass:
      "bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.2),transparent_45%),linear-gradient(180deg,rgba(255,251,235,0.08),rgba(17,24,39,0.1))]",
    icon: Coffee,
    eyebrow: "Warm. Einladend. Lokal.",
    headline: "Eine Café-Seite, die wie ein guter Morgen wirkt.",
    copy:
      "Warme Töne, luftige Karten und klare Reservierungswege sorgen für einen ruhigen, hochwertigen Auftritt – ohne visuelles Chaos.",
    highlights: ["Frühstück & Kuchen im Fokus", "Reservierung in 1 Klick", "Event-Hinweise elegant integriert"],
    cta: "Reservieren",
    mockup: (
      <div className="grid gap-3 rounded-[2rem] border border-white/10 bg-[#22160d]/70 p-4 text-[#fff7ed] shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-amber-100/70">
          <span>Sonnenschein</span>
          <span>Seit 2012</span>
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(251,191,36,0.18),rgba(120,53,15,0.15))] p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-amber-100/70">Café & Brunch</p>
          <h3 className="mt-3 text-2xl font-semibold leading-tight text-white">
            Hausgemacht, hell und entspannt.
          </h3>
          <p className="mt-3 max-w-xs text-sm leading-6 text-amber-50/78">
            Frühstück, Specialty Coffee und kleine Events – modern präsentiert, aber mit echter Wärme.
          </p>
          <div className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-amber-700">
            Tisch anfragen
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 text-sm">
          {[
            "Brunch",
            "Flat White",
            "Kuchenkarte",
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-center text-amber-50/85">
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    name: "FitZone Studio",
    category: "Fitness",
    city: "Rosenheim",
    accent: "#22c55e",
    badgeClass: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
    panelClass:
      "border-emerald-200/10 bg-[linear-gradient(135deg,rgba(34,197,94,0.16),rgba(5,46,22,0.08)_55%,rgba(255,255,255,0.03))]",
    cardClass:
      "bg-[radial-gradient(circle_at_top_right,rgba(74,222,128,0.2),transparent_42%),linear-gradient(180deg,rgba(236,253,245,0.08),rgba(3,7,18,0.16))]",
    icon: Dumbbell,
    eyebrow: "Klar. Energiegeladen. Direkt.",
    headline: "Ein Fitness-Look mit Spannung statt Überladung.",
    copy:
      "Kräftige Kontraste, starke Typografie und klare Conversion-Flächen machen aus einem Studio-Auftritt eine fokussierte Performance-Seite.",
    highlights: ["Probetraining prominent", "Kursplan klar strukturiert", "Mitgliedschaft sofort verständlich"],
    cta: "Probetraining",
    mockup: (
      <div className="grid gap-3 rounded-[2rem] border border-white/10 bg-[#08110c]/80 p-4 text-white shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-emerald-100/70">
          <span>FitZone</span>
          <span>Performance Club</span>
        </div>
        <div className="rounded-[1.5rem] border border-emerald-300/10 bg-[linear-gradient(135deg,rgba(34,197,94,0.18),rgba(6,78,59,0.16))] p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-emerald-100/70">Move better</p>
          <h3 className="mt-3 text-2xl font-semibold leading-tight">
            Training mit Fokus auf Ergebnis.
          </h3>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
            {[
              ["12", "Kurse"],
              ["24/7", "Zugang"],
              ["1:1", "Coaching"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-black/25 px-3 py-3">
                <div className="text-lg font-semibold text-emerald-200">{value}</div>
                <div className="text-xs text-white/60">{label}</div>
              </div>
            ))}
          </div>
          <div className="mt-5 inline-flex rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-sm font-medium text-emerald-100">
            Kostenlos starten
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "Kunsthandwerk Müller",
    category: "Handwerk",
    city: "Waldkraiburg",
    accent: "#a78bfa",
    badgeClass: "border-violet-300/30 bg-violet-300/10 text-violet-200",
    panelClass:
      "border-violet-200/10 bg-[linear-gradient(135deg,rgba(167,139,250,0.16),rgba(49,46,129,0.08)_55%,rgba(255,255,255,0.03))]",
    cardClass:
      "bg-[radial-gradient(circle_at_top_left,rgba(196,181,253,0.22),transparent_45%),linear-gradient(180deg,rgba(245,243,255,0.08),rgba(15,23,42,0.14))]",
    icon: Hammer,
    eyebrow: "Handgemacht. Präzise. Vertrauensvoll.",
    headline: "Eine Handwerksseite mit Materialgefühl und Ruhe.",
    copy:
      "Mehr Struktur, weniger Schnickschnack: Das Design setzt auf Vertrauen, Referenzen und saubere Leistungsblöcke – passend zu handwerklicher Qualität.",
    highlights: ["Referenzen sauber präsentiert", "Leistungen glasklar gegliedert", "Kontakt für Anfragen sofort sichtbar"],
    cta: "Projekt anfragen",
    mockup: (
      <div className="grid gap-3 rounded-[2rem] border border-white/10 bg-[#12101c]/80 p-4 text-white shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-violet-100/70">
          <span>Müller</span>
          <span>Werkstatt & Ausbau</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-violet-100/60">Maßarbeit</p>
            <h3 className="mt-3 text-2xl font-semibold leading-tight text-white">
              Details, die Vertrauen schaffen.
            </h3>
            <p className="mt-3 text-sm leading-6 text-white/70">
              Innenausbau, Sonderanfertigungen und klare Projektkommunikation in einer ruhigen, hochwertigen Darstellung.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-violet-300/12 bg-[linear-gradient(180deg,rgba(167,139,250,0.18),rgba(15,23,42,0.1))] p-5">
            <div className="space-y-3 text-sm text-violet-50/85">
              <div className="rounded-2xl border border-white/10 bg-black/15 px-3 py-3">Innenausbau</div>
              <div className="rounded-2xl border border-white/10 bg-black/15 px-3 py-3">Möbel nach Maß</div>
              <div className="rounded-2xl border border-white/10 bg-black/15 px-3 py-3">Montage & Planung</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "Lisa's Beauty",
    category: "Beauty",
    city: "Mühldorf",
    accent: "#fb7185",
    badgeClass: "border-rose-300/30 bg-rose-300/10 text-rose-200",
    panelClass:
      "border-rose-200/10 bg-[linear-gradient(135deg,rgba(251,113,133,0.16),rgba(131,24,67,0.08)_55%,rgba(255,255,255,0.03))]",
    cardClass:
      "bg-[radial-gradient(circle_at_top_right,rgba(251,113,133,0.2),transparent_42%),linear-gradient(180deg,rgba(255,241,242,0.08),rgba(17,24,39,0.14))]",
    icon: Flower2,
    eyebrow: "Sanft. Hochwertig. Feminin.",
    headline: "Eine Beauty-Seite mit Leichtigkeit statt Kitsch.",
    copy:
      "Softes Editorial-Feeling, viel Weißraum und elegante Service-Darstellung geben Beauty-Angeboten einen modernen Premium-Rahmen.",
    highlights: ["Behandlungen elegant sortiert", "Termin-CTA immer präsent", "Premium statt verspielt-chaotisch"],
    cta: "Termin buchen",
    mockup: (
      <div className="grid gap-3 rounded-[2rem] border border-white/10 bg-[#1c1017]/80 p-4 text-white shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-rose-100/70">
          <span>Lisa's Beauty</span>
          <span>Glow Studio</span>
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(251,113,133,0.16),rgba(255,255,255,0.06))] p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-rose-100/70">Skin & Care</p>
          <h3 className="mt-3 text-2xl font-semibold leading-tight text-white">
            Ruhige Ästhetik, klare Buchung.
          </h3>
          <p className="mt-3 max-w-xs text-sm leading-6 text-rose-50/80">
            Behandlungen, Ergebnisse und Vertrauen werden minimalistisch und hochwertig statt überladen gezeigt.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm text-rose-50/85">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">Hydrafacial</div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">Lashes</div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">Brows</div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">Skincare</div>
        </div>
      </div>
    ),
  },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-semibold text-white">
            Liminal<span className="text-[#2997ff]">Vision</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 transition-all hover:border-white/20 hover:bg-white/8"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück zur Startseite
          </Link>
        </div>
      </header>

      <main className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/55">
              <Store className="h-3.5 w-3.5" />
              Mini-Websites
            </div>
            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl">
              Jede Mini-Website bekommt ihre eigene visuelle Sprache.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/60 md:text-lg">
              Gleiche Qualitätslinie, aber kein Einheitsbrei: Gastronomie, Fitness,
              Handwerk und Beauty erhalten jeweils ein eigenes, minimalistisches
              Branchengefühl – sauber, aufgeräumt und passend zum Rest der Seite.
            </p>
          </div>

          <div className="grid gap-8">
            {showcases.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.name}
                  className={`group overflow-hidden rounded-[2rem] border ${item.panelClass} shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/20`}
                >
                  <div className="grid gap-8 p-6 lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
                    <div className="flex flex-col justify-between">
                      <div>
                        <div className="mb-5 flex flex-wrap items-center gap-3">
                          <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${item.badgeClass}`}>
                            {item.category}
                          </span>
                          <span className="text-sm text-white/50">{item.city}</span>
                        </div>

                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                          <Icon className="h-5 w-5" style={{ color: item.accent }} />
                        </div>

                        <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                          {item.eyebrow}
                        </p>
                        <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-[-0.03em] text-white lg:text-4xl">
                          {item.headline}
                        </h2>
                        <p className="mt-4 max-w-xl text-base leading-7 text-white/68">
                          {item.copy}
                        </p>
                      </div>

                      <div className="mt-8 grid gap-3 sm:grid-cols-3">
                        {item.highlights.map((point) => (
                          <div
                            key={point}
                            className={`rounded-2xl border border-white/10 px-4 py-4 text-sm leading-6 text-white/76 ${item.cardClass}`}
                          >
                            {point}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col justify-between gap-6">
                      {item.mockup}

                      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] border border-white/10 bg-black/20 px-5 py-4">
                        <div>
                          <p className="text-sm text-white/45">Mini-Website</p>
                          <p className="mt-1 text-lg font-medium text-white">{item.name}</p>
                        </div>
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-medium text-white transition hover:border-white/25 hover:bg-white/12"
                        >
                          {item.cta}
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-14 rounded-[2rem] border border-white/10 bg-gradient-to-r from-[#2997ff]/10 via-white/[0.02] to-[#5856d6]/10 p-8 text-center">
            <div className="mx-auto max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/55">
                <Sparkles className="h-3.5 w-3.5 text-[#7ab8ff]" />
                Neu aufgebaut
              </div>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
                Minimalistisch im System, individuell in der Branche.
              </h2>
              <p className="mt-4 text-white/60">
                Genau so wirken die Mini-Websites jetzt: zusammengehörig im Markenauftritt,
                aber jeweils eigenständig genug, um glaubwürdig zur Branche zu passen.
              </p>
              <Link
                href="/kontakt"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2997ff] to-[#5856d6] px-6 py-3 text-sm font-medium text-white transition hover:scale-[1.02]"
              >
                Nächstes Projekt starten
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
