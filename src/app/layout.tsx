import type { Metadata, Viewport } from "next";
import { Space_Grotesk, DM_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { site, siteUrl } from "@/data/site";
import { pageMetadata, shouldIndexSite } from "@/lib/seo";
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
  ...pageMetadata("/", site.seoTitle, site.description),
  metadataBase: new URL(siteUrl()),
  authors: [{ name: site.name, url: siteUrl() }],
  creator: site.name,
  robots: shouldIndexSite() ? { index: true, follow: true } : { index: false, follow: false },
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
