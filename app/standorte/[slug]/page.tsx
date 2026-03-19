import { ArrowLeft, ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FeaturedLocationPage } from "@/components/featured-location-page";
import { getIndustryPageBySlug } from "@/content/industry-pages";
import { getLocationPageBySlug, locationPages } from "@/content/locations";
import {
  JsonLd,
  createBreadcrumbSchema,
  createPageMetadata,
  createServiceSchema,
} from "@/lib/seo";

type Props = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return locationPages.map((location) => ({
    slug: location.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const location = getLocationPageBySlug(params.slug);

  if (!location) {
    return createPageMetadata({
      title: "Standort nicht gefunden",
      description: "Die angeforderte Standortseite konnte nicht gefunden werden.",
      path: "/standorte",
      noIndex: true,
    });
  }

  if (location.slug === "berlin") {
    return createPageMetadata({
      title: "Webdesign in Berlin mit SEO, Design und Launch",
      description:
        "Liminalo entwickelt für Unternehmen in Berlin komplette Websites inklusive Business-Analyse, SEO, Texten, Hosting, Domain und Launch.",
      path: location.path,
      keywords: [
        "webdesign berlin",
        "website erstellen lassen berlin",
        "seo berlin",
        "landingpage berlin agentur",
        "webagentur berlin",
      ],
    });
  }

  return createPageMetadata({
    title: `Webdesign in ${location.city} für Unternehmen`,
    description: `Liminalo entwickelt moderne Websites für Unternehmen in ${location.city}, ${location.nearby[0]} und ganz ${location.state}. Schnell, klar und auf Anfragen optimiert.`,
    path: location.path,
    keywords: [
      `webdesign ${location.city.toLowerCase()}`,
      `website erstellen lassen ${location.city.toLowerCase()}`,
      `seo ${location.city.toLowerCase()}`,
      `webagentur ${location.city.toLowerCase()}`,
      `landingpage ${location.city.toLowerCase()}`,
    ],
  });
}

export default function LocationDetailPage({ params }: Props) {
  const location = getLocationPageBySlug(params.slug);

  if (!location) {
    notFound();
  }

  const relatedIndustries = location.focusIndustries
    .map((slug) => getIndustryPageBySlug(slug))
    .filter((page): page is NonNullable<typeof page> => Boolean(page));

  const siblingLocations = locationPages
    .filter((candidate) => candidate.state === location.state && candidate.slug !== location.slug)
    .slice(0, 3);

  const serviceSchema = createServiceSchema({
    name: `Webdesign in ${location.city}`,
    description:
      location.slug === "berlin"
        ? `Komplette Websites für Unternehmen in ${location.city} mit Business-Analyse, SEO, Texten, Hosting und Launch.`
        : `Moderne Websites für Unternehmen in ${location.city}, ${location.nearby[0]} und der Region ${location.state}.`,
    path: location.path,
    keywords: [
      `webdesign ${location.city.toLowerCase()}`,
      `website ${location.city.toLowerCase()}`,
      `seo ${location.city.toLowerCase()}`,
    ],
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Startseite", path: "/" },
    { name: "Standorte", path: "/standorte" },
    { name: location.city, path: location.path },
  ]);

  if (location.slug === "berlin") {
    return (
      <>
        <JsonLd data={serviceSchema} />
        <JsonLd data={breadcrumbSchema} />
        <FeaturedLocationPage
          location={location}
          relatedIndustries={relatedIndustries}
          siblingLocations={siblingLocations}
        />
      </>
    );
  }

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="relative px-4 pb-24 pt-6 sm:pt-10">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/standorte"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 transition-all hover:border-white/20 hover:bg-white/8"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück zu allen Standorten
          </Link>

          <section className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#2997ff]/30 bg-[#2997ff]/10 px-4 py-1.5 text-sm text-[#2997ff]">
                <MapPin className="h-4 w-4" />
                {location.city}, {location.state}
              </div>
              <h1 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                Webdesign in <span className="text-[#2997ff]">{location.city}</span>
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/62 sm:text-base">
                Wir entwickeln moderne Websites für Unternehmen in {location.city},{" "}
                {location.nearby[0]} und der gesamten Region {location.state}. Die Zusammenarbeit
                läuft digital, klar strukturiert und mit Fokus auf lokale Sichtbarkeit, mobile
                Nutzung und direkte Anfragen.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#2997ff] to-[#5856d6] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_15px_40px_rgba(41,151,255,0.24)] transition-all duration-300 hover:scale-[1.02]"
                >
                  Kontakt
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/branchen"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/[0.05]"
                >
                  Branchen ansehen
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-8">
              <div className="grid gap-4">
                {[
                  {
                    title: "Lokale Sichtbarkeit",
                    text: `Optimiert für Suchanfragen in ${location.city}, ${location.nearby[0]} und Ihrer Umgebung.`,
                  },
                  {
                    title: "Mobile Nutzung",
                    text: "Schnelle, klare Seiten für Smartphones, Anrufe und direkte Kontaktanfragen.",
                  },
                  {
                    title: "Transparente Zusammenarbeit",
                    text: "Digital umgesetzt, deutschlandweit betreut und immer auf Ihre Zielgruppe ausgerichtet.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.4rem] border border-white/10 bg-white/[0.02] p-5"
                  >
                    <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#2997ff]/25 bg-[#2997ff]/10 text-[#2997ff]">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-white/58">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.92fr]">
            <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-8">
              <h2 className="text-2xl font-semibold text-white">
                Passende Branchen in {location.city}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/58">
                Diese Branchen profitieren in {location.city} besonders stark von klarer
                Nutzerführung, lokaler Auffindbarkeit und einer schnellen Kontaktstrecke.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {relatedIndustries.map((industry) => (
                  <Link
                    key={industry.slug}
                    href={industry.path}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-4 transition-all duration-300 hover:border-[#2997ff]/30 hover:bg-white/[0.05]"
                  >
                    <div className="text-sm font-medium text-white">{industry.serviceName}</div>
                    <div className="mt-2 text-sm text-white/50">
                      Mehr dazu für Unternehmen in {location.city}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-8">
              <h2 className="text-2xl font-semibold text-white">
                Auch relevant für Ihre Region
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/58">
                Wir unterstützen Unternehmen in {location.city} und den umliegenden Orten{" "}
                {location.nearby.join(", ")}.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {location.nearby.map((place) => (
                  <span
                    key={place}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm text-white/60"
                  >
                    {place}
                  </span>
                ))}
              </div>

              {siblingLocations.length > 0 ? (
                <div className="mt-8">
                  <div className="mb-3 text-sm font-semibold text-white">
                    Weitere Standorte in {location.state}
                  </div>
                  <div className="space-y-3">
                    {siblingLocations.map((sibling) => (
                      <Link
                        key={sibling.slug}
                        href={sibling.path}
                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3.5 text-sm text-white/72 transition-all duration-300 hover:border-[#2997ff]/30 hover:bg-white/[0.05] hover:text-white"
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
        </div>
      </div>
    </>
  );
}
