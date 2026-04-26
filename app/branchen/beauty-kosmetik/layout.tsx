import { SeoSchemaGroup, getIndustrySeoConfig } from "@/lib/seo";

const seo = getIndustrySeoConfig("beauty-kosmetik");

export const metadata = seo.metadata;

export default function BeautyKosmetikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SeoSchemaGroup schemas={seo.schemas}>{children}</SeoSchemaGroup>;
}
