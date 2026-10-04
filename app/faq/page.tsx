import type { Metadata } from "next";
import { ConsultWizard } from "@/components/ConsultWizard";
import { FaqSearch } from "@/components/FaqSearch";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";
import { faqItems } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "FAQ | Vodafone Beratung, Kabelinternet, Glasfaser & Verfügbarkeit",
  description:
    "Antworten zur kostenlosen Vodafone Beratung, Kabelinternet, HFC, Koaxialkabel, HÜP, Glasfaser, Verfügbarkeit, Mobilfunk und TV.",
  path: "/faq"
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Start", href: "/" }, { name: "FAQ", href: "/faq" }])} />
      <JsonLd data={faqSchema(faqItems)} />
      <PageHero
        crumbs={[{ name: "Start", href: "/" }, { name: "FAQ" }]}
        eyebrow="FAQ"
        title={<>Häufige Fragen. <span className="text-red">Klare Antworten.</span></>}
        lead="Alles zu Produkten, Verfügbarkeit, Kabelinternet, Glasfaser, HÜP, Koaxialkabel und persönlicher Beratung – kurz und verständlich."
        compact
      />
      <section className="section section-tight">
        <div className="wrap wrap-narrow">
          <FaqSearch items={faqItems} />
        </div>
      </section>
      <ConsultWizard title="Deine Frage war nicht dabei?" />
    </>
  );
}
