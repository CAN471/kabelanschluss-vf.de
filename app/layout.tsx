import type { Metadata, Viewport } from "next";
import "@fontsource-variable/plus-jakarta-sans";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileDock } from "@/components/MobileDock";
import { RevealObserver } from "@/components/RevealObserver";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import "./styles/base.css";
import "./styles/chrome.css";
import "./styles/home.css";
import "./styles/wizard.css";
import "./styles/pages.css";

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
  themeColor: "#f6f4f1"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body id="top">
        <a className="skip-link" href="#main-content">Zum Inhalt springen</a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <MobileDock />
        <RevealObserver />
      </body>
    </html>
  );
}
