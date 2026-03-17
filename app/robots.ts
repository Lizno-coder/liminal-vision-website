import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/crm"],
      },
    ],
    sitemap: "https://liminalo.com/sitemap.xml",
    host: "https://liminalo.com",
  };
}
