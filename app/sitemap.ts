import { MetadataRoute } from "next";

import { blogArticles } from "@/content/blog-articles";
import { industryPages } from "@/content/industry-pages";
import { absoluteUrl } from "@/lib/seo";

const siteLastModified = new Date("2026-03-17");

const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: absoluteUrl("/"),
    lastModified: siteLastModified,
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    url: absoluteUrl("/branchen"),
    lastModified: siteLastModified,
    changeFrequency: "weekly",
    priority: 0.95,
  },
  {
    url: absoluteUrl("/kontakt"),
    lastModified: siteLastModified,
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    url: absoluteUrl("/portfolio"),
    lastModified: siteLastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: absoluteUrl("/blog"),
    lastModified: siteLastModified,
    changeFrequency: "weekly",
    priority: 0.85,
  },
  {
    url: absoluteUrl("/impressum"),
    lastModified: siteLastModified,
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    url: absoluteUrl("/datenschutz"),
    lastModified: siteLastModified,
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    url: absoluteUrl("/agb"),
    lastModified: siteLastModified,
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes,
    ...industryPages.map((page) => ({
      url: absoluteUrl(page.path),
      lastModified: siteLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.84,
    })),
    ...blogArticles.map((article) => ({
      url: absoluteUrl(`/blog/${article.slug}`),
      lastModified: new Date(article.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
