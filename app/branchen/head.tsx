import { industryPages } from "@/content/industry-pages";
import {
  SEOHead,
  createBreadcrumbSchema,
  createCollectionPageSchema,
} from "@/lib/seo";

const title = "Webdesign für Branchen und lokale Betriebe | Liminalo";
const description =
  "Branchenspezifische Websites für Restaurants, Handwerk, Fitness, Beauty, Einzelhandel, Praxen und weitere lokale Unternehmen. Liminalo entwickelt Seiten mit klarer Conversion und SEO-Basis.";
const keywords = [
  "webdesign branchen",
  "branchenspezifische websites",
  "website für lokale unternehmen",
  "landingpages branchen",
  "webdesign branchenlösungen",
];

export default function Head() {
  return (
    <SEOHead
      title={title}
      description={description}
      path="/branchen"
      keywords={keywords}
      schemas={[
        createCollectionPageSchema({
          title,
          description,
          path: "/branchen",
          items: industryPages.map((page) => ({
            name: page.serviceName,
            path: page.path,
          })),
        }),
        createBreadcrumbSchema([
          { name: "Startseite", path: "/" },
          { name: "Branchen", path: "/branchen" },
        ]),
      ]}
    />
  );
}
