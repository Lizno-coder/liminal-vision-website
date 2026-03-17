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
    title: "Webdesign fuer Cafes und Restaurants | Liminalo",
    description:
      "Moderne Websites fuer Cafes und Restaurants mit Speisekarte, Reservierung, Oeffnungszeiten und lokalem SEO. Liminalo entwickelt Seiten, die mehr Gaeste und Anfragen bringen.",
    keywords: [
      "webdesign restaurant",
      "website fuer cafe",
      "restaurant website erstellen lassen",
      "webdesign gastronomie",
      "restaurant seo",
    ],
    serviceName: "Webdesign fuer Cafes und Restaurants",
  },
  {
    slug: "handwerk-gewerbe",
    path: "/branchen/handwerk-gewerbe",
    title: "Webdesign fuer Handwerk und Gewerbe | Liminalo",
    description:
      "Professionelle Websites fuer Handwerksbetriebe und Gewerbe mit Leistungsseiten, Referenzen, Kontaktformular und regionaler Sichtbarkeit in Google.",
    keywords: [
      "website fuer handwerker",
      "webdesign handwerk",
      "homepage handwerksbetrieb",
      "seo fuer handwerker",
      "website gewerbe",
    ],
    serviceName: "Webdesign fuer Handwerk und Gewerbe",
  },
  {
    slug: "fitness-wellness",
    path: "/branchen/fitness-wellness",
    title: "Webdesign fuer Fitness und Wellness | Liminalo",
    description:
      "Websites fuer Fitnessstudios, Yoga und Wellness mit Kursplan, Mitgliedschaft, Trainerprofilen und klarer Conversion fuer neue Mitglieder.",
    keywords: [
      "website fitnessstudio",
      "webdesign wellness",
      "homepage yoga studio",
      "fitnessstudio website",
      "webdesign fitness",
    ],
    serviceName: "Webdesign fuer Fitness und Wellness",
  },
  {
    slug: "beauty-kosmetik",
    path: "/branchen/beauty-kosmetik",
    title: "Webdesign fuer Beauty und Kosmetik | Liminalo",
    description:
      "Elegante Websites fuer Friseure, Beauty-Studios und Kosmetik mit Online-Terminbuchung, Preislisten und lokaler Sichtbarkeit.",
    keywords: [
      "website kosmetikstudio",
      "webdesign friseur",
      "website beauty salon",
      "online terminbuchung kosmetik",
      "webdesign beauty",
    ],
    serviceName: "Webdesign fuer Beauty und Kosmetik",
  },
  {
    slug: "einzelhandel",
    path: "/branchen/einzelhandel",
    title: "Webdesign fuer Einzelhandel | Liminalo",
    description:
      "Websites fuer Einzelhandel und lokale Geschaefte mit Produkt-Showcase, Oeffnungszeiten, Standorten und starker lokaler Auffindbarkeit.",
    keywords: [
      "website einzelhandel",
      "webdesign lokales geschaeft",
      "homepage boutique",
      "website laden",
      "lokales seo einzelhandel",
    ],
    serviceName: "Webdesign fuer Einzelhandel",
  },
  {
    slug: "dienstleister",
    path: "/branchen/dienstleister",
    title: "Webdesign fuer Dienstleister | Liminalo",
    description:
      "Professionelle Websites fuer Berater, Agenturen und Dienstleister mit klarer Positionierung, Referenzen, Leistungen und Kontaktanfragen.",
    keywords: [
      "website dienstleister",
      "webdesign berater",
      "homepage agentur",
      "website serviceunternehmen",
      "seo dienstleister",
    ],
    serviceName: "Webdesign fuer Dienstleister",
  },
  {
    slug: "hotels-unterkuenfte",
    path: "/branchen/hotels-unterkuenfte",
    title: "Webdesign fuer Hotels und Unterkuenfte | Liminalo",
    description:
      "Websites fuer Hotels, Pensionen und Unterkuenfte mit Zimmerdarstellung, Buchungsanfrage, Lageinfos und mehr Sichtbarkeit fuer Direktbuchungen.",
    keywords: [
      "website hotel",
      "webdesign unterkunft",
      "homepage pension",
      "hotel website erstellen lassen",
      "seo hotel",
    ],
    serviceName: "Webdesign fuer Hotels und Unterkuenfte",
  },
  {
    slug: "gesundheit-praxen",
    path: "/branchen/gesundheit-praxen",
    title: "Webdesign fuer Gesundheit und Praxen | Liminalo",
    description:
      "Vertrauensvolle Websites fuer Arztpraxen, Therapien und Gesundheitsbetriebe mit Terminbuchung, Leistungen und seriouser Nutzerfuehrung.",
    keywords: [
      "website arztpraxis",
      "webdesign gesundheit",
      "homepage therapeut",
      "website praxis",
      "seo arztpraxis",
    ],
    serviceName: "Webdesign fuer Gesundheit und Praxen",
  },
  {
    slug: "bildung-coaching",
    path: "/branchen/bildung-coaching",
    title: "Webdesign fuer Bildung und Coaching | Liminalo",
    description:
      "Websites fuer Coaches, Akademien und Bildungsangebote mit Kursen, Buchungen, Referenzen und klarer Positionierung fuer neue Kunden.",
    keywords: [
      "website coach",
      "webdesign bildung",
      "homepage akademie",
      "website coaching",
      "seo coach",
    ],
    serviceName: "Webdesign fuer Bildung und Coaching",
  },
  {
    slug: "automobil-service",
    path: "/branchen/automobil-service",
    title: "Webdesign fuer Automobil und Service | Liminalo",
    description:
      "Websites fuer Autohandel, Werkstaetten und Servicebetriebe mit Fahrzeug-Showcase, Terminanfragen und lokaler Sichtbarkeit.",
    keywords: [
      "website autohaus",
      "webdesign werkstatt",
      "homepage automobil service",
      "website kfz betrieb",
      "seo werkstatt",
    ],
    serviceName: "Webdesign fuer Automobil und Service",
  },
  {
    slug: "kreative-kuenstler",
    path: "/branchen/kreative-kuenstler",
    title: "Webdesign fuer Kreative und Kuenstler | Liminalo",
    description:
      "Portfolio-Websites fuer Kreative, Fotografen und Kuenstler mit starker Bildsprache, Anfragen und klarer Positionierung.",
    keywords: [
      "portfolio website kuenstler",
      "webdesign kreative",
      "website fotograf",
      "homepage designer",
      "portfolio erstellen lassen",
    ],
    serviceName: "Webdesign fuer Kreative und Kuenstler",
  },
];

export function getIndustryPageBySlug(slug: string): IndustryPage | undefined {
  return industryPages.find((page) => page.slug === slug);
}
