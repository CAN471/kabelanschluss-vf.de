import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { SectionIntro } from "@/components/Section";
import { guides } from "@/lib/site";
import { breadcrumbSchema, pageMetadata, websiteSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Vodafone Ratgeber | Kabel, Glasfaser, Internet & TV erklärt",
  description:
    "Vodafone Ratgeber für Kabelinternet, Glasfaser, DSL, Mobilfunk, TV und Verfügbarkeit: Technik und Tarifwahl verständlich erklärt.",
  path: "/ratgeber"
});

export default function GuideHubPage() {
  return (
    <>
      <JsonLd data={websiteSchema()} />
      <JsonLd data={breadcrumbSchema([{ name: "Start", href: "/" }, { name: "Ratgeber", href: "/ratgeber" }])} />
      <section className="sub-hero guide-hub-hero">
        <div>
          <p className="eyebrow">Vodafone Ratgeber</p>
          <h1>Internet und Technik einfach erklärt.</h1>
          <p>
            Verständliche Antworten zu Kabelinternet, Glasfaser, DSL, Mobilfunk, TV und Verfügbarkeit.
          </p>
        </div>
        <nav className="guide-hub-shortcuts" aria-label="Beliebte Ratgeber">
          {guides.slice(0, 4).map((guide) => (
            <Link key={guide.slug} href={`/ratgeber/${guide.slug}`}>
              <Icon name={guide.icon} />
              <span>{guide.h1}</span>
              <b aria-hidden="true">↗</b>
            </Link>
          ))}
        </nav>
      </section>

      <section className="section" id="themen">
        <SectionIntro eyebrow="Alle Themen" title="Wissen, was zu dir passt.">
          <p>Die Artikel erklären Anschlussarten, Verfügbarkeit und typische Entscheidungen rund um Internet zuhause, Mobilfunk und TV.</p>
        </SectionIntro>
        <div className="guide-grid guide-grid-large">
          {guides.map((guide, index) => (
            <Link className={index === 0 ? "guide-card guide-card-featured" : "guide-card"} key={guide.slug} href={`/ratgeber/${guide.slug}`}>
              <figure>
                <Image src={guide.image} alt={guide.imageAlt} fill sizes={index === 0 ? "(min-width: 900px) 52vw, 100vw" : "(min-width: 900px) 25vw, 100vw"} />
                <span className="guide-icon"><Icon name={guide.icon} /></span>
              </figure>
              <p className="eyebrow">{guide.category}</p>
              <h2>{guide.h1}</h2>
              <p>{guide.intro}</p>
              <span className="card-link">Artikel lesen</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
