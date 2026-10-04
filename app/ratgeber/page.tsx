import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ConsultWizard } from "@/components/ConsultWizard";
import { GuideCover } from "@/components/GuideCover";
import { Icon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { CtaBand, SectionHead } from "@/components/Section";
import { breadcrumbSchema, pageMetadata, websiteSchema } from "@/lib/seo";
import { guides } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Vodafone Ratgeber | Kabel, Glasfaser, Internet & TV erklärt",
  description:
    "Vodafone Ratgeber für Kabelinternet, Glasfaser, DSL, Mobilfunk, TV und Verfügbarkeit: Technik und Tarifwahl verständlich erklärt.",
  path: "/ratgeber"
});

export default function GuideHubPage() {
  const [lead, ...rest] = guides;

  return (
    <>
      <JsonLd data={websiteSchema()} />
      <JsonLd data={breadcrumbSchema([{ name: "Start", href: "/" }, { name: "Ratgeber", href: "/ratgeber" }])} />

      <PageHero
        crumbs={[{ name: "Start", href: "/" }, { name: "Ratgeber" }]}
        eyebrow="Vodafone Ratgeber"
        title={<>Internet und Technik, <span className="text-red">einfach erklärt.</span></>}
        lead="Verständliche Antworten zu Kabelinternet, Glasfaser, DSL, Mobilfunk, TV und Verfügbarkeit – damit du weißt, was zu dir passt, bevor du entscheidest."
        aside={
          <nav className="shortcut-card" aria-label="Beliebte Ratgeber">
            <p>Beliebte Themen</p>
            {guides.slice(0, 4).map((guide) => (
              <Link key={guide.slug} href={`/ratgeber/${guide.slug}`}>
                <span><Icon name={guide.icon} /></span>
                <strong>{guide.h1}</strong>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            ))}
          </nav>
        }
      />

      <section className="section section-tight" id="themen">
        <div className="wrap">
          <Link href={`/ratgeber/${lead.slug}`} className="guide-feature" data-reveal>
            <GuideCover guide={lead} size="lg" />
            <span className="guide-feature-body">
              <span className="guide-feature-tag">Empfohlen · {lead.category}</span>
              <strong>{lead.h1}</strong>
              <span>{lead.intro}</span>
              <span className="guide-card-more">Artikel lesen <ArrowRight aria-hidden="true" /></span>
            </span>
          </Link>

          <SectionHead eyebrow="Alle Themen" title="Wissen, was zu dir passt." />
          <div className="guide-grid">
            {rest.map((guide, index) => (
              <Link
                key={guide.slug}
                href={`/ratgeber/${guide.slug}`}
                className="guide-card"
                data-reveal
                style={{ "--d": `${(index % 3) * 90}ms` } as CSSProperties}
              >
                <GuideCover guide={guide} />
                <span className="guide-card-body">
                  <strong>{guide.h1}</strong>
                  <span className="guide-card-text">{guide.intro}</span>
                  <span className="guide-card-more">Weiterlesen <ArrowRight aria-hidden="true" /></span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Lieber persönlich erklärt bekommen?" text="Jan beantwortet deine Fragen zu Technik, Verfügbarkeit und Tarifen – kostenlos und in verständlicher Sprache." />
      <ConsultWizard />
    </>
  );
}
