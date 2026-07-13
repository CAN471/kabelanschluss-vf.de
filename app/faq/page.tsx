import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { faqItems } from "@/lib/site";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";

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
      <section className="sub-hero">
        <p className="eyebrow">FAQ</p>
        <h1>Häufige Fragen. Klare Antworten.</h1>
        <p>Hier findest du klare Antworten zu Produkten, Verfügbarkeit, Kabelinternet, Glasfaser, HÜP, Koaxialkabel und persönlicher Beratung.</p>
      </section>
      <section className="section faq-strip faq-page-list">
        {faqItems.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </section>
      <ContactForm />
    </>
  );
}
