import type { Metadata } from "next";
import AuthGuard from "@/components/auth/AuthGuard";
import AIChatbot from "@/components/ui/AIChatbot";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zero Gravity Tours — Regional Expeditions",
  description: "Transparent group sizes, clear inclusions, and live schedules for budget travellers.",
  keywords: [
    "regional tours",
    "budget travel",
    "guided expeditions",
    "travel transparently",
    "zero gravity tours",
  ],
  openGraph: {
    title: "Zero Gravity Tours",
    description: "Your next journey is calling.",
    url: "https://zerogravitytours.com",
    siteName: "Zero Gravity",
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
    <html lang="en">
      <body className="font-sans antialiased">
        <SmoothAnimationEngine>
          <AuthGuard>{children}</AuthGuard>
          <AIChatbot />
        </SmoothAnimationEngine>
      </body>
    </html>
  );
}
