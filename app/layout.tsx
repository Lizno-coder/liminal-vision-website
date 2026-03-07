import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Liminal Vision | Premium Web Design Agency",
  description: "Wir erstellen einzigartige Websites für Unternehmen, die sich abheben wollen. Kostenlose Demo-Seite vor dem Deal.",
  keywords: ["Web Design", "Webentwicklung", "Astro", "Next.js", "Cloudflare", "Webagentur"],
  authors: [{ name: "Liminal Vision" }],
  creator: "Liminal Vision",
  metadataBase: new URL("https://liminal-vision.de"),
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://liminal-vision.de",
    title: "Liminal Vision | Premium Web Design Agency",
    description: "Wir erstellen einzigartige Websites für Unternehmen, die sich abheben wollen.",
    siteName: "Liminal Vision",
  },
  twitter: {
    card: "summary_large_image",
    title: "Liminal Vision | Premium Web Design Agency",
    description: "Wir erstellen einzigartige Websites für Unternehmen, die sich abheben wollen.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="gradient-mesh" />
        <div className="noise" />
        <Navbar />
        <main className="relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
