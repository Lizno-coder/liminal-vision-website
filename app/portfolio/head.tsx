import { industryPages } from "@/content/industry-pages";
import {
  SEOHead,
  createBreadcrumbSchema,
  createCollectionPageSchema,
} from "@/lib/seo";

const title = "Portfolio und Branchenbeispiele fuer Websites | Liminalo";
const description =
  "Entdecken Sie Branchenbeispiele und Website-Konzepte von Liminalo. Moderne Auftritte fuer Restaurants, Handwerk, Studios, Dienstleister und lokale Unternehmen.";
const keywords = [
  "webdesign portfolio",
  "website beispiele",
  "branchenbeispiele website",
  "portfolio webagentur",
  "landingpage beispiele",
];

export default function Head() {
  return (
    <SEOHead
      title={title}
      description={description}
      path="/portfolio"
      keywords={keywords}
      schemas={[
        createCollectionPageSchema({
          title,
          description,
          path: "/portfolio",
          items: industryPages.slice(0, 8).map((page) => ({
            name: page.serviceName,
            path: page.path,
          })),
        }),
        createBreadcrumbSchema([
          { name: "Startseite", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
        ]),
      ]}
    />
  );
}
