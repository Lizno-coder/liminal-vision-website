import { SEOHead, createBreadcrumbSchema } from "@/lib/seo";

export default function Head() {
  return (
    <SEOHead
      title="Datenschutz | Liminalo"
      description="Datenschutzerklaerung von Liminalo mit Informationen zur Datenverarbeitung auf liminalo.com."
      path="/datenschutz"
      keywords={["datenschutz liminalo", "datenschutzerklaerung", "datenverarbeitung website"]}
      schemas={[
        createBreadcrumbSchema([
          { name: "Startseite", path: "/" },
          { name: "Datenschutz", path: "/datenschutz" },
        ]),
      ]}
    />
  );
}
