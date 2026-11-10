import type { Metadata, Viewport } from "next";
import "@fontsource-variable/sora";
import "@fontsource-variable/instrument-sans";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "AQRO — Creative & Technology Agency",
    template: "%s — AQRO",
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: "AQRO",
    title: "AQRO — Ideas deserve extraordinary execution",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#004AAD",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh">
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
