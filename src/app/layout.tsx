import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
