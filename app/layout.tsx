import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import GridBackground from "@/components/grid-background";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Liminal Vision | Premium Websites für Unternehmen",
  description: "Wir erstellen einzigartige Websites für Unternehmen, die sich von der Masse abheben wollen. Kostenlose Demo vor dem Deal.",
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <head>
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.variable} font-sans min-h-screen bg-[#0a0a0a] text-white antialiased`}>
        {/* Interactive Grid Background - covers entire page */}
        <GridBackground />
        
        {/* Subtle gradient overlay */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]/80 pointer-events-none" />

        <Header />

        <main className="relative z-10 overflow-x-hidden pt-24">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
