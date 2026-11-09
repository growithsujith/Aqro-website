import type { Metadata, Viewport } from "next";
import "@fontsource-variable/sora";
import "@fontsource-variable/instrument-sans";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Cursor, IntroLoader, ScrollProgress, SmoothScroll } from "@/components/motion";
import ClickSpark from "@/components/reactbits/ClickSpark/ClickSpark";
import { FilmGrainOverlay } from "@/components/sections/AtmosphereLayer";
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
        <SmoothScroll>
          <ClickSpark
            sparkColor={["#ED1C24", "#004AAD", "#F5F1E8"]}
            sparkSize={12}
            sparkRadius={28}
            sparkCount={10}
            sparkWidth={1.75}
            duration={480}
            easing="ease-out"
            shape="streak"
            ring
          >
            <IntroLoader />
            <ScrollProgress />
            <FilmGrainOverlay />
            <Cursor />
            <Nav />
            <main id="main">{children}</main>
            <Footer />
          </ClickSpark>
        </SmoothScroll>
      </body>
    </html>
  );
}
