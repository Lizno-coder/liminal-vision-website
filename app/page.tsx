import type { Metadata } from "next";

import Blog from "@/components/blog";
import Contact from "@/components/contact";
import FAQ from "@/components/faq";
import Hero from "@/components/hero";
import LogoCloudSection from "@/components/logo-cloud-section";
import Pricing from "@/components/pricing";
import Process from "@/components/process";
import Services from "@/components/services";
import { WorkScrollSection } from "@/components/work-scroll";
import { TextColor } from "@/components/ui/text-color";
import { homeFaqs } from "@/content/faqs";
import {
  JsonLd,
  createFAQSchema,
  createPageMetadata,
  createServiceSchema,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Webdesign für Unternehmen und lokale Betriebe",
  description:
    "Liminalo erstellt moderne Websites für Unternehmen, Restaurants, Handwerk, Studios und lokale Dienstleister. Schnell, suchmaschinenfreundlich und auf Anfragen optimiert.",
  path: "/",
  keywords: [
    "webdesign unternehmen",
    "website erstellen lassen",
    "webdesign lokal",
    "landingpage agentur",
    "seo website unternehmen",
  ],
});

export default function Home() {
  return (
    <>
      <JsonLd
        data={createServiceSchema({
          name: "Webdesign und SEO für Unternehmen",
          description:
            "Liminalo entwickelt moderne, schnelle und suchmaschinenfreundliche Websites für Unternehmen, lokale Dienstleister und branchenspezifische Landingpages.",
          path: "/",
          keywords: [
            "webdesign",
            "seo",
            "website erstellen lassen",
            "unternehmenswebsite",
            "landingpage",
          ],
        })}
      />
      <JsonLd data={createFAQSchema(homeFaqs)} />

      <Hero />
      <WorkScrollSection />
      <Services />
      <Process />
      <Pricing />
      <FAQ />
      <LogoCloudSection />
      <Blog />
      <Contact />
      <TextColor />
    </>
  );
}
