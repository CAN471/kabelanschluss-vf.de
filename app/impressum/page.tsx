import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Impressum | Kabelanschluss VF",
  description: "Impressum und Kontaktangaben von Jan Mirzo für die persönliche Vodafone Beratung über kabelanschluss-vf.de.",
  path: "/impressum"
});

export default function ImpressumPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Start", href: "/" }, { name: "Impressum", href: "/impressum" }])} />
      <PageHero crumbs={[{ name: "Start", href: "/" }, { name: "Impressum" }]} eyebrow="Rechtliches" title="Impressum" compact />
      <section className="section section-tight">
        <div className="wrap wrap-narrow legal">
          <div className="legal-card">
            <h2>Angaben gemäß § 5 DDG</h2>
            <p>{site.advisor}</p>
            <p>Vodafone Vertriebspartner / persönliche Beratung</p>
          </div>
          <div className="legal-card">
            <h2>Kontakt</h2>
            <p>Telefon: <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a></p>
            <p>E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a></p>
          </div>
          <div className="legal-card">
            <h2>Hinweis zur Beratung</h2>
            <p>
              Diese Website dient der persönlichen Beratung und Anfrageaufnahme zu Vodafone-Produkten.
              Angebote, Preise und Verfügbarkeit werden individuell geprüft und können je Adresse variieren.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
