import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Impressum | Kabelanschluss VF",
  description: "Impressum und Kontaktangaben von Jan Mirzo für die persönliche Vodafone Beratung über kabelanschluss-vf.de.",
  path: "/impressum"
});

export default function ImpressumPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Start", href: "/" }, { name: "Impressum", href: "/impressum" }])} />
      <section className="legal-page">
        <p className="eyebrow">Rechtliches</p>
        <h1>Impressum</h1>
        <div className="legal-card">
          <h2>Angaben gemäß § 5 DDG</h2>
          <p>Jan Mirzo</p>
          <p>Vodafone Vertriebspartner / persönliche Beratung</p>
        </div>
        <div className="legal-card">
          <h2>Kontakt</h2>
          <p>Telefon: +49 1512 6915595</p>
          <p>E-Mail: j.mirzo@vertriebspartner-vfkd.de</p>
        </div>
        <div className="legal-card">
          <h2>Hinweis zur Beratung</h2>
          <p>
            Diese Website dient der persönlichen Beratung und Anfrageaufnahme zu Vodafone-Produkten.
            Angebote, Preise und Verfügbarkeit werden individuell geprüft und können je Adresse variieren.
          </p>
        </div>
      </section>
    </>
  );
}
