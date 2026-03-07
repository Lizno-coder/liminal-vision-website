import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Liminal Vision | Premium Websites für Unternehmen",
  description: "Wir erstellen einzigartige Websites für Unternehmen, die sich von der Masse abheben wollen. Kostenlose Demo vor dem Deal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <body className={`${inter.variable} font-sans min-h-screen bg-[#060816] text-white antialiased`}>
        <div className="fixed inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(41,151,255,0.16),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(88,86,214,0.18),transparent_28%),linear-gradient(180deg,#060816_0%,#0a1020_100%)]" />
        <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(circle_at_center,black,transparent_85%)]" />

        <Header />

        <main className="relative overflow-x-hidden pt-24">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
