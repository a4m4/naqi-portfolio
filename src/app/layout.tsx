import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/data/site";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Cursor } from "@/components/ui/Cursor";

// Self-hosted fonts (no Google Fonts request at build or runtime).
const display = localFont({
  variable: "--font-display",
  display: "swap",
  src: [
    { path: "../fonts/syne-latin-600-normal.woff2", weight: "600" },
    { path: "../fonts/syne-latin-700-normal.woff2", weight: "700" },
    { path: "../fonts/syne-latin-800-normal.woff2", weight: "800" },
  ],
});

const body = localFont({
  variable: "--font-body",
  display: "swap",
  src: [{ path: "../fonts/manrope-latin-wght.woff2", weight: "200 800" }],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.description,
    type: "website",
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#07060a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SmoothScroll>
          {children}
          <Cursor />
          <div className="grain" aria-hidden />
        </SmoothScroll>
      </body>
    </html>
  );
}
