import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Portfolio | Liminal Vision",
  description: "Unsere besten Projekte für kleine Unternehmen, Cafés und Influencer.",
};

const projects = [
  {
    name: "Café Sonnenschein",
    type: "Café",
    location: "München",
    price: "699€",
    result: "+40% Reservierungen",
    image: "bg-gradient-to-br from-orange-400 to-yellow-300",
  },
  {
    name: "FitZone",
    type: "Fitness-Studio",
    location: "Rosenheim",
    price: "899€",
    result: "+25% neue Mitglieder",
    image: "bg-gradient-to-br from-green-400 to-emerald-500",
  },
  {
    name: "Kunsthandwerk Müller",
    type: "Handwerker",
    location: "Waldkraiburg",
    price: "899€",
    result: "+150% Umsatz",
    image: "bg-gradient-to-br from-purple-400 to-violet-500",
  },
  {
    name: "Lisa's Beauty",
    type: "Kosmetik",
    location: "Mühldorf",
    price: "1.299€",
    result: "Online-Buchung",
    image: "bg-gradient-to-br from-pink-400 to-rose-400",
  },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-semibold text-white">
            Liminal<span className="text-[#2997ff]">Vision</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/80"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück
          </Link>
        </div>
      </header>

      <main className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm uppercase tracking-[0.2em] text-[#2997ff]">Portfolio</p>
            <h1 className="text-4xl font-semibold text-white">Unsere Arbeit</h1>
            <p className="mx-auto mt-3 max-w-lg text-white/60">
              Echte Ergebnisse für echte Unternehmen.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <div
                key={project.name}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <div className={`h-48 ${project.image}`} />
                <div className="p-6">
                  <div className="mb-2 flex items-center gap-2 text-sm text-white/50">
                    <span>{project.type}</span>
                    <span>•</span>
                    <span>{project.location}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[#2997ff]">{project.price}</span>
                    <span className="text-sm text-green-400">{project.result}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2997ff] to-[#5856d6] px-6 py-3 font-medium text-white"
            >
              Auch ein Projekt starten
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
