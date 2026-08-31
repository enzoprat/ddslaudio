import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { WhatsAppFab } from "@/components/layout/WhatsApp";
import { QuoteProvider } from "@/components/quote/QuoteProvider";
import { QuoteDrawer } from "@/components/quote/QuoteDrawer";
import { QuoteToast } from "@/components/quote/QuoteToast";
import { CatalogueProvider } from "@/components/catalog/CatalogueProvider";
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd";
import { site } from "@/data/site";
import { listeProduitsPublics } from "@/lib/catalogue";

/* Titrage : grotesque de signalétique, dessiné pour les grands corps.
   Remplace le condensé tout-capitales, qui donnait au site un air de
   gabarit. Les titres s'écrivent désormais en bas-de-casse. */
const display = Archivo({
  subsets: ["latin"],
  variable: "--font-display-family",
  display: "swap",
});

const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

/* Monospace réservé aux références matériel (DJM-800, LUM-01…). */
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-tech",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.baseUrl),
  title: {
    default:
      "DDSL Audio — Location de matériel son, lumière et scène à Bordeaux",
    template: "%s | DDSL Audio",
  },
  description:
    "Location de matériel de sonorisation, d'éclairage, de scène et de vidéo à Bordeaux et en Gironde. Installation sur place et prestation DJ possibles. Demande de devis en ligne.",
  applicationName: "DDSL Audio",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: site.baseUrl,
    siteName: "DDSL Audio",
    title: "DDSL Audio — Son, lumière, scène et vidéo à Bordeaux",
    description:
      "Le parc technique se loue seul ou installé. Sonorisation, éclairage, scène jusqu'à 24 m², régie DJ Pioneer, vidéoprojection. Bordeaux et Gironde.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DDSL Audio — Son, lumière, scène et vidéo à Bordeaux",
    description:
      "Location de matériel événementiel à Bordeaux, avec ou sans installation. Prestation DJ et sonorisation d'événement en Gironde.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "Location de matériel événementiel",
};

export const viewport: Viewport = {
  themeColor: "#faf9f6",
  colorScheme: "light",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const produits = await listeProduitsPublics();

  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="antialiased">
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>

        <CatalogueProvider produits={produits}>
          <QuoteProvider>
            <Header />
            <main id="contenu" className="pt-[var(--header-h)]">
              {children}
            </main>
            <Footer />
            <QuoteDrawer />
            <QuoteToast />
            <MobileActionBar />
            <WhatsAppFab />
            <div className="h-16 lg:hidden" aria-hidden="true" />
          </QuoteProvider>
        </CatalogueProvider>

        <LocalBusinessJsonLd />
      </body>
    </html>
  );
}
