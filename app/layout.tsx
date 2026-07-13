import type { Metadata, Viewport } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Intro } from "@/components/Intro";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Vodafone Beratung Wietze, Celle & Hannover | Kabelanschluss VF",
    description: site.description,
    path: "/"
  }),
  metadataBase: new URL(site.domain)
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <Intro />
        <a className="skip-link" href="#main-content">Zum Inhalt springen</a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
