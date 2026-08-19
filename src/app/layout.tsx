import type { Metadata } from "next";
import { Poppins, Allura, Playfair_Display } from "next/font/google";
import AuthGuard from "@/components/auth/AuthGuard";
import AIChatbot from "@/components/ui/AIChatbot";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
});

const allura = Allura({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-allura",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Zero Gravity Tours — The Art of Curated Expeditions",
  description: "Bespoke regional journeys, transparent group sizes, and live schedules for discerning explorers.",
  keywords: [
    "luxury regional tours",
    "budget expeditions",
    "curated travel",
    "transparent travel",
    "zero gravity tours",
  ],
  openGraph: {
    title: "Zero Gravity Tours — Curated Expeditions",
    description: "Life is not meant to be in one place. Discover bespoke regional journeys.",
    url: "https://zerogravitytours.com",
    siteName: "Zero Gravity Tours",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

import SmoothAnimationEngine from "@/components/providers/SmoothAnimationEngine";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${allura.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <SmoothAnimationEngine>
          <AuthGuard>{children}</AuthGuard>
          <AIChatbot />
        </SmoothAnimationEngine>
      </body>
    </html>
  );
}
