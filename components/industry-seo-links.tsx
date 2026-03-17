"use client";

import Link from "next/link";

import { blogArticles } from "@/content/blog-articles";
import { industryPages } from "@/content/industry-pages";

const relatedIndustryMap: Record<string, string[]> = {
  "automobil-service": ["handwerk-gewerbe", "einzelhandel", "dienstleister"],
  "beauty-kosmetik": ["fitness-wellness", "cafes-restaurants", "einzelhandel"],
  "bildung-coaching": ["dienstleister", "gesundheit-praxen", "kreative-kuenstler"],
  "cafes-restaurants": ["hotels-unterkuenfte", "einzelhandel", "beauty-kosmetik"],
  dienstleister: ["bildung-coaching", "handwerk-gewerbe", "gesundheit-praxen"],
  einzelhandel: ["cafes-restaurants", "beauty-kosmetik", "automobil-service"],
  "fitness-wellness": ["beauty-kosmetik", "gesundheit-praxen", "bildung-coaching"],
  "gesundheit-praxen": ["bildung-coaching", "dienstleister", "fitness-wellness"],
  "handwerk-gewerbe": ["automobil-service", "dienstleister", "einzelhandel"],
  "hotels-unterkuenfte": ["cafes-restaurants", "einzelhandel", "beauty-kosmetik"],
  "kreative-kuenstler": ["bildung-coaching", "dienstleister", "beauty-kosmetik"],
};

type IndustrySeoLinksProps = {
  currentSlug: string;
  accentColor: string;
};

export default function IndustrySeoLinks({
  currentSlug,
  accentColor,
}: IndustrySeoLinksProps) {
  const relatedIndustries = (relatedIndustryMap[currentSlug] ?? [])
    .map((slug) => industryPages.find((page) => page.slug === slug))
    .filter((page): page is NonNullable<typeof page> => Boolean(page));

  const helpfulArticles = blogArticles.slice(0, 3);

  if (relatedIndustries.length === 0) {
    return null;
  }

  return (
    <section className="relative px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-3xl">
          <span
            className="mb-4 inline-flex rounded-full border px-4 py-1.5 text-sm font-medium"
            style={{
              color: accentColor,
              borderColor: `${accentColor}40`,
              backgroundColor: `${accentColor}12`,
            }}
          >
            Weitere Themen
          </span>
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Weitere Branchen und passende Inhalte
          </h2>
          <p className="text-white/60">
            Diese internen Links helfen Besuchern schneller zum passenden Angebot
            und staerken gleichzeitig die thematische Verknuepfung der
            Branchen-Seiten fuer Suchmaschinen.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-4 md:grid-cols-3">
            {relatedIndustries.map((page) => (
              <Link
                key={page.slug}
                href={page.path}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div
                  className="mb-3 inline-flex rounded-full border px-3 py-1 text-xs font-medium"
                  style={{
                    color: accentColor,
                    borderColor: `${accentColor}35`,
                    backgroundColor: `${accentColor}10`,
                  }}
                >
                  Branchenloesung
                </div>
                <h3 className="mb-3 text-lg font-semibold text-white">{page.serviceName}</h3>
                <p className="text-sm leading-6 text-white/55">{page.description}</p>
              </Link>
            ))}
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="mb-4 text-xl font-semibold text-white">Hilfreiche Artikel</h3>
            <div className="space-y-4">
              {helpfulArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="block rounded-2xl border border-white/8 bg-white/[0.02] p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <div className="mb-2 text-xs uppercase tracking-[0.2em] text-white/45">
                    {article.category}
                  </div>
                  <div className="mb-2 text-base font-semibold text-white">{article.title}</div>
                  <p className="text-sm leading-6 text-white/55">{article.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
