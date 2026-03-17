import {
  SEOHead,
  createBreadcrumbSchema,
  createContactPageSchema,
} from "@/lib/seo";

const title = "Kontakt und kostenlose Website-Beratung | Liminalo";
const description =
  "Kontaktieren Sie Liminalo für eine kostenlose Website-Beratung. Teilen Sie Ihr Projekt, Ihre Branche und Ihre Ziele mit, damit wir ein passendes Konzept vorbereiten können.";
const keywords = [
  "kontakt webdesign",
  "website beratung",
  "kostenlose website beratung",
  "projektanfrage webdesign",
  "liminalo kontakt",
];

export default function Head() {
  return (
    <SEOHead
      title={title}
      description={description}
      path="/kontakt"
      keywords={keywords}
      schemas={[
        createContactPageSchema({
          path: "/kontakt",
          description,
        }),
        createBreadcrumbSchema([
          { name: "Startseite", path: "/" },
          { name: "Kontakt", path: "/kontakt" },
        ]),
      ]}
    />
  );
}
