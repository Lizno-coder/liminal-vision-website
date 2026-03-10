"use client";

import { useEffect } from "react";
import Head from "next/head";
import { useSearchParams } from "next/navigation";

export default function AdminPage() {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Check if we have a token in URL (from OAuth callback)
    const token = searchParams.get("token");
    if (token) {
      // Store token for CMS to use
      localStorage.setItem("netlify-cms-user", JSON.stringify({
        token,
        backendName: "github"
      }));
      // Clean up URL
      window.history.replaceState({}, document.title, "/admin");
    }

    // Dynamically import Decap CMS only on client side
    const loadCMS = async () => {
      const CMS = (await import("decap-cms-app")).default;
      
      // Initialize CMS
      CMS.init({
        config: {
          backend: {
            name: "github",
            repo: "Lizno-coder/liminal-vision-website",
            branch: "main",
            base_url: "https://liminal-vision-website.vercel.app",
            auth_endpoint: "api/auth",
          },
          media_folder: "public/images/uploads",
          public_folder: "/images/uploads",
          publish_mode: "editorial_workflow",
          collections: [
            {
              name: "homepage",
              label: "Startseite",
              files: [
                {
                  file: "content/homepage.json",
                  label: "Hero-Bereich",
                  name: "hero",
                  fields: [
                    { label: "Überschrift", name: "headline", widget: "string" },
                    { label: "Unterüberschrift", name: "subheadline", widget: "text" },
                    { label: "CTA-Text", name: "ctaText", widget: "string" },
                    { label: "Beschreibung", name: "description", widget: "markdown" },
                  ],
                },
              ],
            },
            {
              name: "settings",
              label: "Einstellungen",
              files: [
                {
                  file: "content/settings.json",
                  label: "Kontaktdaten",
                  name: "contact",
                  fields: [
                    { label: "E-Mail", name: "email", widget: "string" },
                    { label: "Telefon", name: "phone", widget: "string" },
                    { label: "Adresse", name: "address", widget: "text" },
                    { label: "CTA-Button Text", name: "ctaText", widget: "string" },
                  ],
                },
                {
                  file: "content/pricing.json",
                  label: "Preise",
                  name: "pricing",
                  fields: [
                    {
                      label: "Pakete",
                      name: "packages",
                      widget: "list",
                      fields: [
                        { label: "Name", name: "name", widget: "string" },
                        { label: "Preis", name: "price", widget: "string" },
                        { label: "Beschreibung", name: "description", widget: "text" },
                        {
                          label: "Features",
                          name: "features",
                          widget: "list",
                          field: { label: "Feature", name: "feature", widget: "string" },
                        },
                        { label: "Popular", name: "popular", widget: "boolean", default: false },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      });
    };

    loadCMS();
  }, [searchParams]);

  return (
    <>
      <Head>
        <title>Content Manager | Liminal Vision</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div id="nc-root" className="h-screen" />
    </>
  );
}
