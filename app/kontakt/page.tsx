import type { Metadata } from "next";

import ContactPage from "@/components/contact-page";
import {
  JsonLd,
  createBreadcrumbSchema,
  createContactPageSchema,
  createPageMetadata,
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

type PageProps = {
  params?: Record<string, never>;
};

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/kontakt",
  keywords,
});

export default function KontaktPage(_: PageProps) {
  return (
    <>
      <JsonLd
        data={createContactPageSchema({
          path: "/kontakt",
          description,
        })}
      />
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Startseite", path: "/" },
          { name: "Kontakt", path: "/kontakt" },
        ])}
      />
      <ContactPage />
    </>
  );
}
