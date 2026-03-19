import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Bot,
  Building2,
  CheckCircle2,
  FileText,
  Globe,
  MapPin,
  MonitorSmartphone,
  Palette,
  PhoneCall,
  Rocket,
  Search,
  Sparkles,
  Workflow,
} from "lucide-react";
import Link from "next/link";

import type { IndustryPage } from "@/content/industry-pages";
import type { LocationPage } from "@/content/locations";

type FeaturedLocationPageProps = {
  location: LocationPage;
  relatedIndustries: IndustryPage[];
  siblingLocations: LocationPage[];
};

export function FeaturedLocationPage({
  location,
  relatedIndustries,
  siblingLocations,
}: FeaturedLocationPageProps) {
  const nearbyPrimary = location.nearby[0];

  const heroPoints = [
    "SEO und lokale Sichtbarkeit direkt mitgedacht",
    "Texte, Impressum, Datenschutz und AGB inklusive",
    "Modernes Design mit optionalen 3D- und Motion-Elementen",
  ];

  const featurePillars = [
    {
      icon: Search,
      title: "SEO von Anfang an",
      text: `Struktur, Inhalte und technische Basis werden auf Sichtbarkeit in ${location.city} und der Region ausgelegt.`,
    },
    {
      icon: Bot,
      title: "Business-Analyse",
      text: "Wir schauen auf Angebot, Zielgruppe und Positionierung, bevor Design und Texte gebaut werden.",
    },
    {
      icon: Palette,
      title: "Modernes Design",
      text: "Keine Standardseite, sondern ein klarer Auftritt mit starker Nutzerführung und sauberer Markenwirkung.",
    },
    {
      icon: Sparkles,
      title: "3D und Motion",
      text: "Wenn es zur Marke passt, ergänzen wir Animationen, Tiefe und visuelle Highlights ohne Spielerei.",
    },
    {
      icon: FileText,
      title: "Texte und Rechtliches",
      text: "Leistungstexte, CTAs, Impressum, Datenschutz und AGB werden direkt für Sie mit aufgebaut.",
    },
    {
      icon: Globe,
      title: "Hosting, Domain und Launch",
      text: "Wir bringen die Seite live, richten Domain und Hosting ein und übergeben keinen halbfertigen Baukasten.",
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Analyse",
      text: "Ihr Business, Ihre Zielgruppe und die wichtigsten Suchanfragen werden zuerst klargezogen.",
    },
    {
      step: "02",
      title: "Konzept und Design",
      text: "Wir definieren Seitenstruktur, Angebot, Designrichtung und die wichtigsten Conversion-Punkte.",
    },
    {
      step: "03",
      title: "Build mit Inhalt",
      text: "Texte, SEO, mobile Optimierung, rechtliche Seiten und alle Module werden direkt umgesetzt.",
    },
    {
      step: "04",
      title: "Launch",
      text: "Hosting, Domain, Livegang und Feinschliff laufen in einem Zug statt auf mehrere Dienstleister verteilt.",
    },
  ];

  const includedItems = [
    "Business- und Zielgruppenanalyse",
    "Seitenkonzept und Struktur",
    "Modernes UI-Design",
    "SEO-Grundlage und lokale Keywords",
    "Komplette Textproduktion",
    "Impressum, Datenschutz und AGB",
    "Hosting, SSL und Domain-Setup",
    "Mobile Optimierung und Go-live",
  ];

  const localReasons = [
    {
      icon: Building2,
      title: `Mehr Wettbewerb in ${location.city}`,
      text: `Gerade in ${location.city} reicht eine generische Website selten aus. Die Seite muss sofort klar, schnell und hochwertig wirken.`,
    },
    {
      icon: PhoneCall,
      title: "Viele Entscheidungen mobil",
      text: "Ein Großteil der Anfragen entsteht unterwegs. Deshalb bauen wir den gesamten Auftritt mobile-first auf.",
    },
    {
      icon: BadgeCheck,
      title: "Vertrauen ohne Reibung",
      text: "Texte, Struktur und rechtliche Sicherheit sorgen dafür, dass Interessenten schneller Kontakt aufnehmen.",
    },
  ];

  const launchStack = [
    "Analyse",
    "SEO",
    "Texte",
    "Impressum",
    "Datenschutz",
    "AGB",
    "Hosting",
    "Domain",
    "3D",
    "Launch",
  ];

  return (
    <div className="relative px-4 pb-24 pt-6 sm:pt-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/standorte"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 transition-all hover:border-white/20 hover:bg-white/8"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurück zu allen Standorten
        </Link>

        <section className="relative mt-8 overflow-hidden rounded-[2.4rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(41,151,255,0.22),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(88,86,214,0.18),transparent_34%)]" />
          <div className="absolute -left-16 top-10 h-64 w-64 rounded-full bg-[#2997ff]/18 blur-3xl" />
          <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[#5856d6]/10 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#2997ff]/30 bg-[#2997ff]/10 px-4 py-1.5 text-sm text-[#2997ff]">
                <MapPin className="h-4 w-4" />
                {location.city}, {location.state}
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
                Webdesign in <span className="text-[#2997ff]">{location.city}</span>, das Ihr
                Business komplett von Analyse bis Launch aufsetzt.
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/64 sm:text-base">
                Für Unternehmen in {location.city}, {nearbyPrimary} und Umgebung, die nicht nur
                eine schöne Website wollen, sondern einen kompletten digitalen Auftritt:
                Business-Analyse, SEO, Design, Texte, Hosting, Domain und Livegang in einem
                sauberen Prozess.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#2997ff] to-[#5856d6] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(41,151,255,0.24)] transition-all duration-300 hover:scale-[1.02]"
                >
                  Projekt für {location.city} anfragen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/25 hover:bg-white/[0.07]"
                >
                  Beispiele ansehen
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {heroPoints.map((point) => (
                  <div
                    key={point}
                    className="rounded-[1.4rem] border border-white/10 bg-black/20 px-4 py-4"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[#2997ff]" />
                    <p className="mt-3 text-sm leading-6 text-white/72">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[2rem] border border-white/10 bg-black/20 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-[0.24em] text-white/40">
                      Full Service Setup
                    </div>
                    <div className="mt-2 text-lg font-semibold text-white">
                      Alles, was für einen starken Auftritt nötig ist
                    </div>
                  </div>
                  <div className="rounded-full border border-[#2997ff]/25 bg-[#2997ff]/10 px-3 py-1 text-xs text-[#2997ff]">
                    in {location.city}
                  </div>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                    <Search className="h-5 w-5 text-[#2997ff]" />
                    <div className="mt-4 text-sm font-semibold text-white">SEO und Struktur</div>
                    <p className="mt-2 text-sm leading-6 text-white/58">
                      Lokale Keywords, klare Seitenlogik und technisch saubere Signale ab Tag eins.
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                    <Palette className="h-5 w-5 text-[#2997ff]" />
                    <div className="mt-4 text-sm font-semibold text-white">Design und Wirkung</div>
                    <p className="mt-2 text-sm leading-6 text-white/58">
                      Modern, hochwertig und auf schnelle Vertrauensbildung ausgelegt.
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                    <FileText className="h-5 w-5 text-[#2997ff]" />
                    <div className="mt-4 text-sm font-semibold text-white">Texte inklusive</div>
                    <p className="mt-2 text-sm leading-6 text-white/58">
                      Angebotsseiten, CTAs, FAQ und rechtliche Texte werden direkt mit gebaut.
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                    <Rocket className="h-5 w-5 text-[#2997ff]" />
                    <div className="mt-4 text-sm font-semibold text-white">Launch und Hosting</div>
                    <p className="mt-2 text-sm leading-6 text-white/58">
                      Domain, Hosting, SSL und Livegang laufen ohne zusätzliche Koordination.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#2997ff]/10 via-white/[0.02] to-transparent p-5 sm:p-6">
                <div className="text-sm font-semibold text-white">
                  Im {location.city}-Paket direkt mit drin
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {launchStack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-sm text-white/70"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="max-w-3xl">
            <div className="text-sm font-medium uppercase tracking-[0.22em] text-[#2997ff]/80">
              Full Service für Ihren Auftritt
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              Nicht nur eine Website. Ein kompletter digitaler Auftritt für {location.city}.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/58 sm:text-base">
              Die Landingpage wird so aufgebaut, dass sie gut aussieht, schnell lädt, Vertrauen
              aufbaut und Anfragen sauber abfängt. Alles aus einem System statt aus Einzelteilen.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featurePillars.map((feature) => (
              <div
                key={feature.title}
                className="rounded-[1.7rem] border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:border-[#2997ff]/30 hover:bg-white/[0.05]"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#2997ff]/20 bg-[#2997ff]/10 text-[#2997ff]">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/58">{feature.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.06fr_0.94fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-8">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#2997ff]/20 bg-[#2997ff]/10 text-[#2997ff]">
                <Workflow className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-medium uppercase tracking-[0.22em] text-[#2997ff]/80">
                  Ablauf
                </div>
                <h2 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">
                  So entsteht Ihr Projekt in {location.city}
                </h2>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {processSteps.map((step) => (
                <div
                  key={step.step}
                  className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2997ff]">
                    {step.step}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/58">{step.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-8">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#2997ff]/20 bg-[#2997ff]/10 text-[#2997ff]">
                <MonitorSmartphone className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-white sm:text-3xl">
                Was direkt inklusive ist
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/58">
                Sie müssen keine Texte zusammentragen, kein Hosting organisieren und keine extra
                SEO-Agentur suchen. Wir decken den Kern komplett mit ab.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {includedItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2997ff]" />
                    <span className="text-sm leading-6 text-white/72">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.04] to-[#2997ff]/10 p-6 backdrop-blur-xl sm:p-8">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#2997ff]/20 bg-[#2997ff]/10 text-[#2997ff]">
                <Sparkles className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-white">
                Optional mit 3D, Motion und markanterem Look
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/58">
                Wenn Ihre Marke visuell mehr Druck braucht, erweitern wir den Auftritt mit
                Animationen, Tiefe und individuellen Visuals. Nicht als Deko, sondern als Teil der
                Wirkung.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-8">
            <div className="text-sm font-medium uppercase tracking-[0.22em] text-[#2997ff]/80">
              Warum das lokal funktioniert
            </div>
            <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
              Warum Unternehmen in {location.city} damit schneller online überzeugen
            </h2>
            <div className="mt-6 space-y-4">
              {localReasons.map((reason) => (
                <div
                  key={reason.title}
                  className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#2997ff]/20 bg-[#2997ff]/10 text-[#2997ff]">
                    <reason.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">{reason.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/58">{reason.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-medium uppercase tracking-[0.22em] text-[#2997ff]/80">
                    Branchen und Regionen
                  </div>
                  <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                    Passend für viele Angebote in und um {location.city}
                  </h2>
                </div>
                <Link
                  href="/branchen"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm text-white/72 transition-all hover:border-[#2997ff]/30 hover:text-white"
                >
                  Alle Branchen
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {relatedIndustries.map((industry) => (
                  <Link
                    key={industry.slug}
                    href={industry.path}
                    className="rounded-[1.4rem] border border-white/10 bg-black/20 p-4 transition-all duration-300 hover:border-[#2997ff]/30 hover:bg-white/[0.05]"
                  >
                    <div className="text-sm font-semibold text-white">{industry.serviceName}</div>
                    <div className="mt-2 text-sm leading-6 text-white/55">
                      Auch für Unternehmen in {location.city} mit Fokus auf Sichtbarkeit und
                      direkte Anfragen.
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-6 rounded-[1.6rem] border border-white/10 bg-gradient-to-r from-white/[0.03] to-[#2997ff]/10 p-5">
                <div className="text-sm font-semibold text-white">Region mitgedacht</div>
                <p className="mt-2 text-sm leading-6 text-white/58">
                  Die Seite kann nicht nur auf {location.city}, sondern auch auf Suchanfragen aus{" "}
                  {location.nearby.join(", ")} ausgerichtet werden.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {location.nearby.map((place) => (
                    <span
                      key={place}
                      className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-sm text-white/68"
                    >
                      {place}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {siblingLocations.length > 0 ? (
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-8">
                <h2 className="text-xl font-semibold text-white">
                  Weitere Standorte in {location.state}
                </h2>
                <div className="mt-4 space-y-3">
                  {siblingLocations.map((sibling) => (
                    <Link
                      key={sibling.slug}
                      href={sibling.path}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white/72 transition-all duration-300 hover:border-[#2997ff]/30 hover:bg-white/[0.05] hover:text-white"
                    >
                      <span>Webdesign in {sibling.city}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <section className="mt-10 overflow-hidden rounded-[2.2rem] border border-white/10 bg-gradient-to-r from-[#2997ff]/16 via-white/[0.03] to-[#5856d6]/12 p-6 sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="text-sm font-medium uppercase tracking-[0.22em] text-[#2997ff]/90">
                Nächster Schritt
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                Wenn Sie in {location.city} online sauber auftreten wollen, setzen wir das komplett
                für Sie um.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/64 sm:text-base">
                Ohne Baukasten-Chaos, ohne Sammeln von zehn Einzelservices und ohne halbfertigen
                Launch. Wir planen, schreiben, gestalten und bringen die Seite live.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#2997ff] to-[#5856d6] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(41,151,255,0.24)] transition-all duration-300 hover:scale-[1.02]"
              >
                Anfrage starten
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/kontakt#faq"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/25 hover:bg-white/[0.07]"
              >
                Fragen klären
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
