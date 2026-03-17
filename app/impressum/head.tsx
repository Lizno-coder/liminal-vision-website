import { SEOHead, createBreadcrumbSchema } from "@/lib/seo";

export default function Head() {
  return (
    <SEOHead
      title="Impressum | Liminalo"
      description="Impressum von Liminalo mit allen Pflichtangaben zu Anbieter, Kontakt und Verantwortlichkeit."
      path="/impressum"
      keywords={["impressum liminalo", "anbieterkennzeichnung", "rechtliche angaben website"]}
      schemas={[
        createBreadcrumbSchema([
          { name: "Startseite", path: "/" },
          { name: "Impressum", path: "/impressum" },
        ]),
      ]}
    />
  );
}
