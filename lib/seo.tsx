import type { Metadata } from "next";

import type { FAQItem } from "@/content/faqs";

const defaultImagePath = "/Liminalo.png";

export const siteConfig = {
  name: "Liminalo",
  url: "https://liminalo.com",
  title: "Liminalo | Premium Websites für Unternehmen",
  description:
    "Liminalo erstellt moderne Websites für Unternehmen, Restaurants, Handwerk und lokale Dienstleister. Schnell, klar, conversionstark und suchmaschinenfreundlich.",
  image: defaultImagePath,
  email: "business@liminalo.com",
  phone: "+491746509061",
  telephoneDisplay: "0174 6509061",
  streetAddress: "Graf-zu-Toerring-Straße 10",
  postalCode: "84478",
  city: "Waldkraiburg",
  region: "Bayern",
  country: "DE",
  founder: "Noel Liessel",
  sameAs: [
    "https://www.instagram.com/limi.nalo/",
    "https://www.facebook.com/Liminalo",
  ],
};

const defaultKeywords = [
  "webdesign",
  "website erstellen lassen",
  "webagentur",
  "lokales seo",
  "unternehmenswebsite",
  "landingpage",
  "liminalo",
];

type CreatePageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  noIndex?: boolean;
};

type BreadcrumbItem = {
  name: string;
  path: string;
};

type ServiceSchemaInput = {
  name: string;
  description: string;
  path: string;
  keywords?: string[];
};

type ArticleSchemaInput = {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  updatedAt: string;
  author?: string;
};

type CollectionPageSchemaInput = {
  title: string;
  description: string;
  path: string;
  items: Array<{ name: string; path: string }>;
};

type ContactPageSchemaInput = {
  path: string;
  description: string;
};

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.url).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "website",
  noIndex = false,
}: CreatePageMetadataInput): Metadata {
  const mergedKeywords = [...new Set([...defaultKeywords, ...keywords])];
  const imageUrl = absoluteUrl(siteConfig.image);
  const canonical = absoluteUrl(path);

  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: "de_DE",
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} Vorschau`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    ...(noIndex
      ? {
          robots: {
            index: false,
            follow: false,
            nocache: true,
            googleBot: {
              index: false,
              follow: false,
              noimageindex: true,
            },
          },
        }
      : {}),
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> }): JSX.Element {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function SEOHead({
  title,
  description,
  path,
  keywords = [],
  noIndex = false,
  schemas = [],
}: CreatePageMetadataInput & { schemas?: Record<string, unknown>[] }): JSX.Element {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(siteConfig.image);
  const robots = noIndex
    ? "noindex, nofollow, noarchive"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={[...new Set([...defaultKeywords, ...keywords])].join(", ")} />
      <meta name="robots" content={robots} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content="de_DE" />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <link rel="canonical" href={canonical} />
      {schemas.map((schema, index) => (
        <script
          key={`${path}-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

export function createOrganizationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.image),
    image: absoluteUrl(siteConfig.image),
    email: siteConfig.email,
    telephone: siteConfig.phone,
    founder: siteConfig.founder,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.streetAddress,
      postalCode: siteConfig.postalCode,
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.region,
      addressCountry: siteConfig.country,
    },
    areaServed: {
      "@type": "Country",
      name: "Deutschland",
    },
    sameAs: siteConfig.sameAs,
  };
}

export function createWebsiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "de-DE",
  };
}

export function createServiceSchema({
  name,
  description,
  path,
  keywords = [],
}: ServiceSchemaInput): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    url: absoluteUrl(path),
    areaServed: {
      "@type": "Country",
      name: "Deutschland",
    },
    provider: {
      "@type": "ProfessionalService",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    keywords: keywords.join(", "),
  };
}

export function createFAQSchema(faqs: FAQItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function createBreadcrumbSchema(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function createArticleSchema({
  title,
  description,
  path,
  publishedAt,
  updatedAt,
  author = siteConfig.name,
}: ArticleSchemaInput): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: publishedAt,
    dateModified: updatedAt,
    mainEntityOfPage: absoluteUrl(path),
    author: {
      "@type": "Organization",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(siteConfig.image),
      },
    },
    image: [absoluteUrl(siteConfig.image)],
  };
}

export function createCollectionPageSchema({
  title,
  description,
  path,
  items,
}: CollectionPageSchemaInput): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: absoluteUrl(path),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: absoluteUrl(item.path),
      })),
    },
  };
}

export function createContactPageSchema({
  path,
  description,
}: ContactPageSchemaInput): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Kontakt | Liminalo",
    description,
    url: absoluteUrl(path),
    mainEntity: {
      "@type": "ProfessionalService",
      name: siteConfig.name,
      email: siteConfig.email,
      telephone: siteConfig.phone,
    },
  };
}
