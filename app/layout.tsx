import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GA4Script from "@/components/analytics/GA4Script";
import CookieBanner from "@/components/analytics/CookieBanner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className} bg-slate-950 text-white dark:bg-slate-950 dark:text-white min-h-screen overflow-x-hidden`}>
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
