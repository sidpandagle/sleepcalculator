import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Figtree } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GA4Script from "@/components/analytics/GA4Script";
import CookieBanner from "@/components/analytics/CookieBanner";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sleepschedule.in"),
  title: {
    default: "Sleep Calculator — Find Your Perfect Bedtime & Wake Up Time",
    template: "%s | Sleep Schedule",
  },
  description: "Free sleep calculator based on 90-minute sleep cycles. Find the best time to wake up or go to sleep to feel refreshed and avoid grogginess.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sleepschedule.in",
    siteName: "Sleep Schedule",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://sleepschedule.in",
    languages: { en: "https://sleepschedule.in" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${instrumentSerif.variable} ${figtree.variable} ${geistMono.variable} font-sans bg-ink text-linen dark:bg-ink dark:text-linen min-h-screen overflow-x-hidden antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
          <Header />
          <main>{children}</main>
          <Footer />
          <Analytics />
          <GA4Script />
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
