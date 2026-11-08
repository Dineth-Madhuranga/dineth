import type { Metadata, Viewport } from "next";
import { Space_Grotesk, DM_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { site, siteUrl } from "@/data/site";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: "Dineth Madhuranga | Software Engineer & Full-Stack Developer",
  description: site.description,
  alternates: { canonical: "/" },
  authors: [{ name: site.name }],
  openGraph: {
    title: `${site.name} — Thoughtful interfaces. Dependable engineering.`,
    description: site.description,
    url: "/",
    siteName: site.name,
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Software Engineer`,
    description: site.description,
    images: ["/opengraph-image"],
  },
  robots: process.env.NEXT_PUBLIC_SITE_URL?.startsWith("https://")
    ? { index: true, follow: true }
    : { index: false, follow: false },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f5f2eb" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${serif.variable} ${mono.variable}`}
    >
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
