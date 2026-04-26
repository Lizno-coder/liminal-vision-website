import { SeoSchemaGroup, getIndustrySeoConfig } from "@/lib/seo";

const seo = getIndustrySeoConfig("cafes-restaurants");

export const metadata = seo.metadata;

export default function CafesRestaurantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SeoSchemaGroup schemas={seo.schemas}>{children}</SeoSchemaGroup>;
}
