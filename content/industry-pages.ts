export type IndustryPage = {
  slug: string;
  path: string;
  title: string;
  description: string;
  keywords: string[];
  serviceName: string;
};

export const industryPages: IndustryPage[] = [
  {
    slug: "cafes-restaurants",
    path: "/branchen/cafes-restaurants",
    title: "Webdesign für Cafés und Restaurants | Liminalo",
    description:
      "Moderne Websites für Cafés und Restaurants mit Speisekarte, Reservierung, Öffnungszeiten und lokalem SEO. Liminalo entwickelt Seiten, die mehr Gäste und Anfragen bringen.",
    keywords: [
      "webdesign restaurant",
      "website für café",
      "restaurant website erstellen lassen",
      "webdesign gastronomie",
      "restaurant seo",
    ],
    serviceName: "Webdesign für Cafés und Restaurants",
  },
  {
    slug: "handwerk-gewerbe",
    path: "/branchen/handwerk-gewerbe",
    title: "Webdesign für Handwerk und Gewerbe | Liminalo",
    description:
      "Professionelle Websites für Handwerksbetriebe und Gewerbe mit Leistungsseiten, Referenzen, Kontaktformular und regionaler Sichtbarkeit in Google.",
    keywords: [
      "website für handwerker",
      "webdesign handwerk",
      "homepage handwerksbetrieb",
      "seo für handwerker",
      "website gewerbe",
    ],
    serviceName: "Webdesign für Handwerk und Gewerbe",
  },
  {
    slug: "fitness-wellness",
    path: "/branchen/fitness-wellness",
    title: "Webdesign für Fitness und Wellness | Liminalo",
    description:
      "Websites für Fitnessstudios, Yoga und Wellness mit Kursplan, Mitgliedschaft, Trainerprofilen und klarer Conversion für neue Mitglieder.",
    keywords: [
      "website fitnessstudio",
      "webdesign wellness",
      "homepage yoga studio",
      "fitnessstudio website",
      "webdesign fitness",
    ],
    serviceName: "Webdesign für Fitness und Wellness",
  },
  {
    slug: "beauty-kosmetik",
    path: "/branchen/beauty-kosmetik",
    title: "Webdesign für Beauty und Kosmetik | Liminalo",
    description:
      "Elegante Websites für Friseure, Beauty-Studios und Kosmetik mit Online-Terminbuchung, Preislisten und lokaler Sichtbarkeit.",
    keywords: [
      "website kosmetikstudio",
      "webdesign friseur",
      "website beauty salon",
      "online terminbuchung kosmetik",
      "webdesign beauty",
    ],
    serviceName: "Webdesign für Beauty und Kosmetik",
  },
  {
    slug: "einzelhandel",
    path: "/branchen/einzelhandel",
    title: "Webdesign für Einzelhandel | Liminalo",
    description:
      "Websites für Einzelhandel und lokale Geschäfte mit Produkt-Showcase, Öffnungszeiten, Standorten und starker lokaler Auffindbarkeit.",
    keywords: [
      "website einzelhandel",
      "webdesign lokales geschäft",
      "homepage boutique",
      "website laden",
      "lokales seo einzelhandel",
    ],
    serviceName: "Webdesign für Einzelhandel",
  },
  {
    slug: "dienstleister",
    path: "/branchen/dienstleister",
    title: "Webdesign für Dienstleister | Liminalo",
    description:
      "Professionelle Websites für Berater, Agenturen und Dienstleister mit klarer Positionierung, Referenzen, Leistungen und Kontaktanfragen.",
    keywords: [
      "website dienstleister",
      "webdesign berater",
      "homepage agentur",
      "website serviceunternehmen",
      "seo dienstleister",
    ],
    serviceName: "Webdesign für Dienstleister",
  },
  {
    slug: "hotels-unterkuenfte",
    path: "/branchen/hotels-unterkuenfte",
    title: "Webdesign für Hotels und Unterkünfte | Liminalo",
    description:
      "Websites für Hotels, Pensionen und Unterkünfte mit Zimmerdarstellung, Buchungsanfrage, Lageinfos und mehr Sichtbarkeit für Direktbuchungen.",
    keywords: [
      "website hotel",
      "webdesign unterkunft",
      "homepage pension",
      "hotel website erstellen lassen",
      "seo hotel",
    ],
    serviceName: "Webdesign für Hotels und Unterkünfte",
  },
  {
    slug: "gesundheit-praxen",
    path: "/branchen/gesundheit-praxen",
    title: "Webdesign für Gesundheit und Praxen | Liminalo",
    description:
      "Vertrauensvolle Websites für Arztpraxen, Therapien und Gesundheitsbetriebe mit Terminbuchung, Leistungen und seriöser Nutzerführung.",
    keywords: [
      "website arztpraxis",
      "webdesign gesundheit",
      "homepage therapeut",
      "website praxis",
      "seo arztpraxis",
    ],
    serviceName: "Webdesign für Gesundheit und Praxen",
  },
  {
    slug: "bildung-coaching",
    path: "/branchen/bildung-coaching",
    title: "Webdesign für Bildung und Coaching | Liminalo",
    description:
      "Websites für Coaches, Akademien und Bildungsangebote mit Kursen, Buchungen, Referenzen und klarer Positionierung für neue Kunden.",
    keywords: [
      "website coach",
      "webdesign bildung",
      "homepage akademie",
      "website coaching",
      "seo coach",
    ],
    serviceName: "Webdesign für Bildung und Coaching",
  },
  {
    slug: "automobil-service",
    path: "/branchen/automobil-service",
    title: "Webdesign für Automobil und Service | Liminalo",
    description:
      "Websites für Autohandel, Werkstätten und Servicebetriebe mit Fahrzeug-Showcase, Terminanfragen und lokaler Sichtbarkeit.",
    keywords: [
      "website autohaus",
      "webdesign werkstatt",
      "homepage automobil service",
      "website kfz betrieb",
      "seo werkstatt",
    ],
    serviceName: "Webdesign für Automobil und Service",
  },
  {
    slug: "kreative-kuenstler",
    path: "/branchen/kreative-kuenstler",
    title: "Webdesign für Kreative und Künstler | Liminalo",
    description:
      "Portfolio-Websites für Kreative, Fotografen und Künstler mit starker Bildsprache, Anfragen und klarer Positionierung.",
    keywords: [
      "portfolio website künstler",
      "webdesign kreative",
      "website fotograf",
      "homepage designer",
      "portfolio erstellen lassen",
    ],
    serviceName: "Webdesign für Kreative und Künstler",
  },
];

export function getIndustryPageBySlug(slug: string): IndustryPage | undefined {
  return industryPages.find((page) => page.slug === slug);
}
