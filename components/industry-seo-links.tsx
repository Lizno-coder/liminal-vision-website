"use client";

import Link from "next/link";

import { blogArticles } from "@/content/blog-articles";
import { industryPages } from "@/content/industry-pages";

const relatedIndustryMap: Record<string, string[]> = {
  "automobil-service": ["handwerk-gewerbe", "einzelhandel", "dienstleister"],
  "beauty-kosmetik": ["fitness-wellness", "cafes-restaurants", "einzelhandel"],
  "bildung-coaching": ["dienstleister", "gesundheit-praxen", "kreative-kuenstler"],
  "cafes-restaurants": ["hotels-unterkuenfte", "einzelhandel", "beauty-kosmetik"],
  dienstleister: ["bildung-coaching", "gesundheit-praxen", "handwerk-gewerbe"],
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

  const helpfulArticles = blogArticles.slice(0, 2);

  if (relatedIndustries.length === 0) {
    return null;
  }

  return (
    <section className="relative px-4 py-10 sm:py-12">
      <div className="mx-auto max-w-5xl rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl sm:p-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <div className="mb-3 text-sm font-semibold text-white">
              Weitere passende Branchen
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {relatedIndustries.map((page) => (
                <Link
                  key={page.slug}
                  href={page.path}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3.5 text-sm text-white/80 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
                >
                  <div className="font-medium">{page.serviceName}</div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 text-sm font-semibold text-white">
              Aus dem Blog
            </div>
            <div className="space-y-3">
              {helpfulArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="block rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3.5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <div className="mb-1 text-sm font-medium text-white">{article.title}</div>
                  <div className="text-sm text-white/50">{article.category}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
