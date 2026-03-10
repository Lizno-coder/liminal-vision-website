"use client";

import { useEffect } from "react";
import Head from "next/head";

export default function AdminPage() {
  useEffect(() => {
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
        },
      });
    };

    loadCMS();
  }, []);

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
