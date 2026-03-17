import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import {
  locationPages,
} from "@/content/locations";
import {
  JsonLd,
  createBreadcrumbSchema,
  createCollectionPageSchema,
  createPageMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Webdesign in Deutschland und lokalen Standorten",
  description:
    "Liminalo entwickelt moderne Websites für Unternehmen in ganz Deutschland. Entdecken Sie Standortseiten für Berlin, Hamburg, München, Köln und viele weitere Städte.",
  path: "/standorte",
  keywords: [
    "webdesign deutschland",
    "webdesign berlin",
    "webdesign münchen",
    "website erstellen lassen deutschland",
    "lokales webdesign",
  ],
});

export default function LocationsPage() {
  return (
    <>
      <JsonLd
        data={createCollectionPageSchema({
          title: "Standorte | Liminalo",
          description:
            "Standortseiten für Unternehmen in ganz Deutschland mit Fokus auf lokale Sichtbarkeit, schnelle Websites und klare Anfragen.",
          path: "/standorte",
          items: locationPages.map((location) => ({
            name: `Webdesign in ${location.city}`,
            path: location.path,
          })),
        })}
      />
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Startseite", path: "/" },
          { name: "Standorte", path: "/standorte" },
        ])}
      />

      <div className="relative px-4 pb-24 pt-6 sm:pt-10">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 transition-all hover:border-white/20 hover:bg-white/8"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück zur Startseite
          </Link>

          <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#2997ff]/30 bg-[#2997ff]/10 px-4 py-1.5 text-sm text-[#2997ff]">
                <MapPin className="h-4 w-4" />
                Standorte
              </div>
              <h1 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                Webdesign für Unternehmen in ganz <span className="text-[#2997ff]">Deutschland</span>
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/62 sm:text-base">
                Wir betreuen Unternehmen digital in ganz Deutschland. Die folgenden Standortseiten
                bündeln lokale Suchintention, passende Branchen und direkte Wege zur Anfrage für
                Ihre Region.
              </p>
            </div>
          </section>

          <section className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {locationPages.map((location) => (
              <Link
                key={location.slug}
                href={location.path}
                className="group rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:border-[#2997ff]/30 hover:bg-white/[0.05]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 text-sm text-[#2997ff]">
                    <MapPin className="h-4 w-4" />
                    {location.state}
                  </div>
                  <ArrowRight className="h-4 w-4 text-white/35 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white/70" />
                </div>
                <h2 className="mt-4 text-2xl font-semibold text-white">{location.city}</h2>
                <p className="mt-3 text-sm leading-6 text-white/58">
                  Für Unternehmen in {location.city}, {location.nearby[0]} und der Region{" "}
                  {location.state}.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {location.nearby.map((place) => (
                    <span
                      key={place}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/55"
                    >
                      {place}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </section>
        </div>
      </div>
    </>
  );
}
