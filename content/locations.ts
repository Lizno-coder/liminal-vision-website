export type LocationPage = {
  slug: string;
  city: string;
  state: string;
  nearby: string[];
  focusIndustries: string[];
  path: string;
};

const rawLocationPages = [
  {
    slug: "berlin",
    city: "Berlin",
    state: "Berlin",
    nearby: ["Potsdam", "Bernau", "Oranienburg"],
    focusIndustries: ["dienstleister", "gesundheit-praxen", "kreative-kuenstler"],
  },
  {
    slug: "hamburg",
    city: "Hamburg",
    state: "Hamburg",
    nearby: ["Norderstedt", "Ahrensburg", "Pinneberg"],
    focusIndustries: ["cafes-restaurants", "hotels-unterkuenfte", "dienstleister"],
  },
  {
    slug: "muenchen",
    city: "München",
    state: "Bayern",
    nearby: ["Freising", "Erding", "Starnberg"],
    focusIndustries: ["cafes-restaurants", "beauty-kosmetik", "hotels-unterkuenfte"],
  },
  {
    slug: "nuernberg",
    city: "Nürnberg",
    state: "Bayern",
    nearby: ["Fürth", "Erlangen", "Schwabach"],
    focusIndustries: ["handwerk-gewerbe", "einzelhandel", "dienstleister"],
  },
  {
    slug: "stuttgart",
    city: "Stuttgart",
    state: "Baden-Württemberg",
    nearby: ["Ludwigsburg", "Esslingen", "Böblingen"],
    focusIndustries: ["automobil-service", "dienstleister", "gesundheit-praxen"],
  },
  {
    slug: "karlsruhe",
    city: "Karlsruhe",
    state: "Baden-Württemberg",
    nearby: ["Ettlingen", "Bruchsal", "Rastatt"],
    focusIndustries: ["dienstleister", "handwerk-gewerbe", "bildung-coaching"],
  },
  {
    slug: "freiburg-im-breisgau",
    city: "Freiburg im Breisgau",
    state: "Baden-Württemberg",
    nearby: ["Offenburg", "Emmendingen", "Lörrach"],
    focusIndustries: ["gesundheit-praxen", "hotels-unterkuenfte", "cafes-restaurants"],
  },
  {
    slug: "frankfurt-am-main",
    city: "Frankfurt am Main",
    state: "Hessen",
    nearby: ["Offenbach", "Eschborn", "Bad Homburg"],
    focusIndustries: ["dienstleister", "bildung-coaching", "gesundheit-praxen"],
  },
  {
    slug: "wiesbaden",
    city: "Wiesbaden",
    state: "Hessen",
    nearby: ["Mainz", "Taunusstein", "Rüsselsheim"],
    focusIndustries: ["dienstleister", "beauty-kosmetik", "gesundheit-praxen"],
  },
  {
    slug: "mainz",
    city: "Mainz",
    state: "Rheinland-Pfalz",
    nearby: ["Wiesbaden", "Ingelheim", "Bingen"],
    focusIndustries: ["dienstleister", "bildung-coaching", "cafes-restaurants"],
  },
  {
    slug: "koeln",
    city: "Köln",
    state: "Nordrhein-Westfalen",
    nearby: ["Leverkusen", "Bonn", "Bergisch Gladbach"],
    focusIndustries: ["cafes-restaurants", "einzelhandel", "dienstleister"],
  },
  {
    slug: "duesseldorf",
    city: "Düsseldorf",
    state: "Nordrhein-Westfalen",
    nearby: ["Neuss", "Ratingen", "Krefeld"],
    focusIndustries: ["beauty-kosmetik", "dienstleister", "einzelhandel"],
  },
  {
    slug: "dortmund",
    city: "Dortmund",
    state: "Nordrhein-Westfalen",
    nearby: ["Bochum", "Unna", "Lünen"],
    focusIndustries: ["handwerk-gewerbe", "automobil-service", "dienstleister"],
  },
  {
    slug: "muenster",
    city: "Münster",
    state: "Nordrhein-Westfalen",
    nearby: ["Warendorf", "Greven", "Coesfeld"],
    focusIndustries: ["bildung-coaching", "gesundheit-praxen", "dienstleister"],
  },
  {
    slug: "hannover",
    city: "Hannover",
    state: "Niedersachsen",
    nearby: ["Langenhagen", "Garbsen", "Laatzen"],
    focusIndustries: ["dienstleister", "handwerk-gewerbe", "gesundheit-praxen"],
  },
  {
    slug: "bremen",
    city: "Bremen",
    state: "Bremen",
    nearby: ["Delmenhorst", "Stuhr", "Oldenburg"],
    focusIndustries: ["dienstleister", "einzelhandel", "hotels-unterkuenfte"],
  },
  {
    slug: "kiel",
    city: "Kiel",
    state: "Schleswig-Holstein",
    nearby: ["Neumünster", "Plön", "Eckernförde"],
    focusIndustries: ["hotels-unterkuenfte", "gesundheit-praxen", "cafes-restaurants"],
  },
  {
    slug: "rostock",
    city: "Rostock",
    state: "Mecklenburg-Vorpommern",
    nearby: ["Warnemünde", "Bad Doberan", "Güstrow"],
    focusIndustries: ["hotels-unterkuenfte", "cafes-restaurants", "dienstleister"],
  },
  {
    slug: "potsdam",
    city: "Potsdam",
    state: "Brandenburg",
    nearby: ["Berlin", "Werder", "Teltow"],
    focusIndustries: ["dienstleister", "bildung-coaching", "kreative-kuenstler"],
  },
  {
    slug: "magdeburg",
    city: "Magdeburg",
    state: "Sachsen-Anhalt",
    nearby: ["Schönebeck", "Burg", "Haldensleben"],
    focusIndustries: ["handwerk-gewerbe", "dienstleister", "gesundheit-praxen"],
  },
  {
    slug: "dresden",
    city: "Dresden",
    state: "Sachsen",
    nearby: ["Radebeul", "Pirna", "Freital"],
    focusIndustries: ["kreative-kuenstler", "hotels-unterkuenfte", "dienstleister"],
  },
  {
    slug: "leipzig",
    city: "Leipzig",
    state: "Sachsen",
    nearby: ["Markkleeberg", "Taucha", "Schkeuditz"],
    focusIndustries: ["dienstleister", "kreative-kuenstler", "bildung-coaching"],
  },
  {
    slug: "erfurt",
    city: "Erfurt",
    state: "Thüringen",
    nearby: ["Weimar", "Arnstadt", "Jena"],
    focusIndustries: ["dienstleister", "handwerk-gewerbe", "gesundheit-praxen"],
  },
  {
    slug: "saarbruecken",
    city: "Saarbrücken",
    state: "Saarland",
    nearby: ["Völklingen", "St. Ingbert", "Neunkirchen"],
    focusIndustries: ["handwerk-gewerbe", "dienstleister", "cafes-restaurants"],
  },
] as const;

export const locationPages: LocationPage[] = rawLocationPages.map((location) => ({
  ...location,
  path: `/standorte/${location.slug}`,
}));

export function getLocationPageBySlug(slug: string): LocationPage | undefined {
  return locationPages.find((location) => location.slug === slug);
}
