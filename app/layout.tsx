import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Footer from "@/components/footer";
import GridBackground from "@/components/grid-background";
import Header from "@/components/header";
import {
  JsonLd,
  createOrganizationSchema,
  createWebsiteSchema,
  siteConfig,
} from "@/lib/seo";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.founder }],
  creator: siteConfig.founder,
  publisher: siteConfig.name,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: siteConfig.image,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Vorschau`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.image],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <body className={`${inter.variable} font-sans min-h-screen bg-[#0a0a0a] text-white antialiased`}>
        <JsonLd data={createOrganizationSchema()} />
        <JsonLd data={createWebsiteSchema()} />

        <GridBackground />
        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]/80 pointer-events-none" />

        <Header />

        <main className="relative z-10 overflow-x-hidden pt-24">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
