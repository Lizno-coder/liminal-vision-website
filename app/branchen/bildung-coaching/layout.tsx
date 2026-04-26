import { SeoSchemaGroup, getIndustrySeoConfig } from "@/lib/seo";

const seo = getIndustrySeoConfig("bildung-coaching");

export const metadata = seo.metadata;

export default function BildungCoachingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SeoSchemaGroup schemas={seo.schemas}>{children}</SeoSchemaGroup>;
}
