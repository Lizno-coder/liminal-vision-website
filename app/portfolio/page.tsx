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

export const metadata: Metadata = {
  title: "Anwendungsbereiche | Liminal Vision",
  description:
    "Mini-Websites mit eigenständigem Branchen-Design für Gastronomie, Fitness, Handwerk und Beauty.",
};

function MiniSiteFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`group relative h-[420px] sm:h-[520px] overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-white/10 bg-[#0d0d0f]/95 shadow-[0_30px_100px_rgba(0,0,0,0.35)] ${className}`}>
      <div className="absolute inset-x-0 top-0 z-20 flex h-10 sm:h-11 items-center gap-2 border-b border-white/8 bg-black/30 px-3 sm:px-4 backdrop-blur-xl">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <div className="ml-2 sm:ml-3 h-6 sm:h-7 flex-1 rounded-full border border-white/8 bg-white/[0.04]" />
      </div>
      <div className="custom-scroll absolute inset-0 overflow-y-auto pt-10 sm:pt-11">{children}</div>
      <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] sm:rounded-[2rem] ring-1 ring-white/5 ring-inset" />
      <div className="pointer-events-none absolute inset-x-6 sm:inset-x-10 bottom-0 h-20 bg-gradient-to-t from-black/22 to-transparent" />
    </div>
  );
}

function CafeMiniSite() {
  return (
    <MiniSiteFrame className="bg-[#20150f]">
      <div className="min-h-[720px] sm:min-h-[860px] bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.18),transparent_28%),linear-gradient(180deg,#2a1b13_0%,#1b120e_100%)] px-4 sm:px-5 pb-5 sm:pb-6 pt-4 sm:pt-5 text-[#fff7ed]">
        <div className="rounded-[1.3rem] sm:rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-4 sm:p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between text-[10px] sm:text-xs uppercase tracking-[0.22em] text-amber-100/65">
            <span>Café Sonnenschein</span>
            <span>Frühstück & Brunch</span>
          </div>
          <h3 className="mt-4 sm:mt-5 text-[1.55rem] sm:text-[2rem] font-semibold leading-[1.05] text-white">
            Guter Kaffee. <br /> Mehr Reservierungen.
          </h3>
          <p className="mt-3 sm:mt-4 max-w-[18rem] text-xs sm:text-sm leading-5 sm:leading-6 text-amber-50/76">
            Für Cafés, die ihre Karte, Öffnungszeiten und Tischanfragen klar und hochwertig zeigen wollen.
          </p>
          <div className="mt-4 sm:mt-5 inline-flex rounded-full bg-white px-4 py-2 text-xs sm:text-sm font-medium text-[#7c4a12]">
            Tisch anfragen
          </div>
        </div>

        <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2.5 sm:gap-3">
          <div className="rounded-[1.1rem] sm:rounded-[1.4rem] border border-white/10 bg-[#fff7ed]/[0.06] p-3 sm:p-4">
            <Coffee className="h-4 w-4 text-amber-200" />
            <div className="mt-2.5 sm:mt-3 text-xs sm:text-sm font-medium text-white">Karte & Specials</div>
            <div className="mt-1 text-[11px] sm:text-xs text-amber-50/60">Saisonal, klar und mobil optimiert</div>
          </div>
          <div className="rounded-[1.1rem] sm:rounded-[1.4rem] border border-white/10 bg-[#fff7ed]/[0.06] p-3 sm:p-4">
            <CalendarDays className="h-4 w-4 text-amber-200" />
            <div className="mt-2.5 sm:mt-3 text-xs sm:text-sm font-medium text-white">Reservierungen</div>
            <div className="mt-1 text-[11px] sm:text-xs text-amber-50/60">Schnell und direkt auf einen Blick</div>
          </div>
        </div>

        <div className="mt-3 sm:mt-4 rounded-[1.3rem] sm:rounded-[1.6rem] border border-white/10 bg-[#fff7ed]/[0.05] p-4 sm:p-5">
          <div className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-amber-100/60">Für Ihre Gäste relevant</div>
          <div className="mt-3 sm:mt-4 space-y-2.5 sm:space-y-3">
            {[
              ["Frühstückskarte", "sichtbar"],
              ["Öffnungszeiten", "aktuell"],
              ["Reservieren", "einfach"],
            ].map(([name, price]) => (
              <div key={name} className="flex items-center justify-between rounded-xl sm:rounded-2xl border border-white/8 bg-black/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm">
                <span className="text-white/85">{name}</span>
                <span className="text-amber-200">{price}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 sm:mt-4 flex items-center justify-between rounded-[1.1rem] sm:rounded-[1.4rem] border border-white/10 bg-black/15 px-3 sm:px-4 py-3 text-[11px] sm:text-sm text-amber-50/75">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-amber-200" />
            Waldkraiburg
          </div>
          <span>Mobil klar lesbar</span>
        </div>
      </div>
    </MiniSiteFrame>
  );
}

function FitnessMiniSite() {
  return (
    <MiniSiteFrame className="bg-[#08100c]">
      <div className="min-h-[740px] sm:min-h-[880px] bg-[radial-gradient(circle_at_80%_0%,rgba(34,197,94,0.18),transparent_25%),linear-gradient(180deg,#07110c_0%,#0b1612_55%,#08100c_100%)] px-4 sm:px-5 pb-5 sm:pb-6 pt-4 sm:pt-5 text-white">
        <div className="rounded-[1.4rem] sm:rounded-[1.8rem] border border-emerald-300/10 bg-[linear-gradient(135deg,rgba(34,197,94,0.16),rgba(6,78,59,0.08))] p-4 sm:p-5">
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-emerald-100/65">
            <span>FitZone Studio</span>
            <span>Performance</span>
          </div>
          <h3 className="mt-4 sm:mt-5 text-[1.55rem] sm:text-[2rem] font-semibold leading-[1.02]">
            Mehr Anfragen. <br /> Mehr Probetrainings.
          </h3>
          <p className="mt-3 sm:mt-4 max-w-[17rem] text-xs sm:text-sm leading-5 sm:leading-6 text-white/68">
            Für Studios, die Kurse, Coaching und Mitgliedschaften modern und überzeugend präsentieren wollen.
          </p>
          <div className="mt-4 sm:mt-5 inline-flex rounded-full border border-emerald-300/25 bg-emerald-300/10 px-4 py-2 text-xs sm:text-sm font-medium text-emerald-100">
            Probetraining starten
          </div>
        </div>

        <div className="mt-3 sm:mt-4 grid grid-cols-3 gap-2.5 sm:gap-3">
          {[
            ["24/7", "Zugang"],
            ["12", "Kurse"],
            ["1:1", "Coaching"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-[1rem] sm:rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-3 sm:p-4 text-center">
              <div className="text-lg sm:text-xl font-semibold text-emerald-200">{value}</div>
              <div className="mt-1 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-white/45">{label}</div>
            </div>
          ))}
        </div>

        <div className="mt-3 sm:mt-4 rounded-[1.3rem] sm:rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-4 sm:p-5">
          <div className="mb-3 sm:mb-4 flex items-center justify-between">
            <div>
              <div className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/45">Direkt verständlich</div>
              <div className="mt-1 text-base sm:text-lg font-medium text-white">Kurse & Mitgliedschaft</div>
            </div>
            <Dumbbell className="h-5 w-5 text-emerald-300" />
          </div>
          <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
            {[
              ["Probetraining buchen", "schnell"],
              ["Kursplan ansehen", "klar"],
              ["Leistungen vergleichen", "direkt"],
            ].map(([title, time]) => (
              <div key={title} className="flex items-center justify-between rounded-xl sm:rounded-2xl border border-white/8 bg-black/15 px-3 sm:px-4 py-2.5 sm:py-3">
                <span className="text-white/82">{title}</span>
                <span className="text-emerald-200">{time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MiniSiteFrame>
  );
}

function HandwerkMiniSite() {
  return (
    <MiniSiteFrame className="bg-[#14111c]">
      <div className="min-h-[720px] sm:min-h-[860px] bg-[radial-gradient(circle_at_top_left,rgba(167,139,250,0.16),transparent_28%),linear-gradient(180deg,#13111b_0%,#161320_100%)] px-4 sm:px-5 pb-5 sm:pb-6 pt-4 sm:pt-5 text-white">
        <div className="rounded-[1.4rem] sm:rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-4 sm:p-5">
          <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-violet-100/60">Kunsthandwerk Müller</div>
          <h3 className="mt-3 sm:mt-4 text-[1.55rem] sm:text-[1.95rem] font-semibold leading-[1.06] text-white">
            Vertrauen durch Klarheit.
          </h3>
          <p className="mt-3 sm:mt-4 max-w-[18rem] text-xs sm:text-sm leading-5 sm:leading-6 text-white/66">
            Für Handwerksbetriebe, die Leistungen, Referenzen und Kontakt professionell und übersichtlich zeigen möchten.
          </p>
        </div>

        <div className="mt-3 sm:mt-4 grid gap-2.5 sm:gap-3">
          <div className="grid grid-cols-[1.1fr_0.9fr] gap-2.5 sm:gap-3">
            <div className="rounded-[1.2rem] sm:rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(167,139,250,0.14),rgba(255,255,255,0.04))] p-3 sm:p-4">
              <div className="text-[10px] sm:text-xs uppercase tracking-[0.18em] text-violet-100/60">Leistungen</div>
              <div className="mt-2 text-sm sm:text-lg font-medium text-white">Sauber geplant. Sauber umgesetzt.</div>
            </div>
            <div className="rounded-[1.2rem] sm:rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-3 sm:p-4">
              <Hammer className="h-5 w-5 text-violet-300" />
              <div className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-white/72">Maßarbeit & Montage</div>
            </div>
          </div>

          <div className="rounded-[1.2rem] sm:rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 sm:p-5">
            <div className="mb-3 sm:mb-4 text-[10px] sm:text-xs uppercase tracking-[0.18em] text-white/45">Was Kunden sofort finden sollen</div>
            <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
              {[
                "Leistungsübersicht",
                "Referenzen & Beispiele",
                "Einsatzgebiet",
                "Anfrage in wenigen Klicks",
              ].map((item) => (
                <div key={item} className="rounded-xl sm:rounded-2xl border border-white/8 bg-black/10 px-3 sm:px-4 py-2.5 sm:py-3 text-white/78">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 sm:mt-4 rounded-[1.2rem] sm:rounded-[1.5rem] border border-white/10 bg-black/15 px-3 sm:px-4 py-3.5 sm:py-4 text-xs sm:text-sm text-white/68">
          Professionell, strukturiert und vertrauenswürdig – ohne unnötige visuelle Unruhe.
        </div>
      </div>
    </MiniSiteFrame>
  );
}

function BeautyMiniSite() {
  return (
    <MiniSiteFrame className="bg-[#1c1017]">
      <div className="min-h-[740px] sm:min-h-[890px] bg-[radial-gradient(circle_at_80%_0%,rgba(251,113,133,0.16),transparent_28%),linear-gradient(180deg,#1b1117_0%,#1c1017_100%)] px-4 sm:px-5 pb-5 sm:pb-6 pt-4 sm:pt-5 text-white">
        <div className="rounded-[1.5rem] sm:rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-rose-100/60">Lisa's Beauty</div>
              <h3 className="mt-3 text-[1.55rem] sm:text-[1.95rem] font-semibold leading-[1.06] text-white">
                Eleganter Auftritt. <br /> Mehr Buchungen.
              </h3>
            </div>
            <Sparkles className="h-5 w-5 text-rose-300" />
          </div>
          <p className="mt-3 sm:mt-4 max-w-[18rem] text-xs sm:text-sm leading-5 sm:leading-6 text-rose-50/78">
            Für Beauty- und Kosmetikstudios, die Treatments, Vertrauen und Stil hochwertig präsentieren möchten.
          </p>
          <div className="mt-4 sm:mt-5 inline-flex rounded-full bg-white px-4 py-2 text-xs sm:text-sm font-medium text-rose-700">
            Termin buchen
          </div>
        </div>

        <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2.5 sm:gap-3">
          {[
            ["Treatments", Star],
            ["Brows & Lashes", Flower2],
            ["Beratung", Scissors],
            ["Signature Glow", Sparkles],
          ].map(([label, Icon]) => {
            const Comp = Icon as typeof Star;
            return (
              <div key={label as string} className="rounded-[1.2rem] sm:rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-3 sm:p-4">
                <Comp className="h-4 w-4 text-rose-300" />
                <div className="mt-2.5 sm:mt-3 text-xs sm:text-sm font-medium text-white">{label as string}</div>
              </div>
            );
          })}
        </div>

        <div className="mt-3 sm:mt-4 rounded-[1.3rem] sm:rounded-[1.6rem] border border-white/10 bg-black/10 p-4 sm:p-5">
          <div className="text-[10px] sm:text-xs uppercase tracking-[0.18em] text-white/45">Was Kundinnen sofort sehen</div>
          <div className="mt-3 sm:mt-4 space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-rose-50/80">
            <div className="rounded-xl sm:rounded-2xl border border-white/8 bg-white/[0.04] px-3 sm:px-4 py-2.5 sm:py-3">Behandlungen & Preise</div>
            <div className="rounded-xl sm:rounded-2xl border border-white/8 bg-white/[0.04] px-3 sm:px-4 py-2.5 sm:py-3">Look & Vertrauen</div>
            <div className="rounded-xl sm:rounded-2xl border border-white/8 bg-white/[0.04] px-3 sm:px-4 py-2.5 sm:py-3">Schnelle Terminbuchung</div>
          </div>
        </div>
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
  return (
    <div className="min-h-screen text-white">
      <main className="px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 sm:mb-14 max-w-2xl">
            <span className="mb-4 inline-block rounded-full border border-[#2997ff]/30 bg-[#2997ff]/10 px-4 py-1.5 text-sm text-[#2997ff]">
              Anwendungsbereiche
            </span>
            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
              Websites, die zu Ihrer Branche passen.
            </h1>
            <div className="mt-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 transition-all hover:border-white/20 hover:bg-white/8"
              >
                <ArrowLeft className="h-4 w-4" />
                Zurück zur Startseite
              </Link>
            </div>
          </div>

          <div className="grid gap-6 sm:gap-10 lg:grid-cols-2">
            {sites.map((site) => (
              <section key={site.title} className="space-y-3 sm:space-y-4">
                <div>
                  <h2 className="text-base sm:text-lg font-medium text-white">{site.title}</h2>
                  <p className="mt-1 text-xs sm:text-sm text-white/48">{site.desc}</p>
                </div>
                {site.component}
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
