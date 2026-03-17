import { SEOHead, createBreadcrumbSchema } from "@/lib/seo";

export default function Head() {
  return (
    <SEOHead
      title="AGB | Liminalo"
      description="Allgemeine Geschaeftsbedingungen von Liminalo."
      path="/agb"
      keywords={["agb liminalo", "allgemeine geschaeftsbedingungen", "vertragsbedingungen website"]}
      schemas={[
        createBreadcrumbSchema([
          { name: "Startseite", path: "/" },
          { name: "AGB", path: "/agb" },
        ]),
      ]}
    />
  );
}
