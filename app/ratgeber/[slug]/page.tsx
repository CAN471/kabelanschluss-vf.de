import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowRight, BookOpen, Clock3, Info, UserRound } from "lucide-react";
import { ConnectionDiagram } from "@/components/ConnectionPath";
import { ConsultWizard } from "@/components/ConsultWizard";
import { FaqList } from "@/components/Faq";
import { GuideCover } from "@/components/GuideCover";
import { Icon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { RegionMap } from "@/components/RegionMap";
import { CtaBand } from "@/components/Section";
import { AvailabilityVisual, CoaxCrossSection, ComboVisual, HotlineMini, HouseConnectionDiagram, UsageGrid } from "@/components/Visuals";
import { ZoomableImage } from "@/components/ZoomableImage";
import { articleSchema, breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";
import { guides, site, type GuidePage as Guide } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

const guideMedia: Record<string, { after: number; caption: string; aspectRatio?: string }> = {
  "wie-funktioniert-kabel-internet": {
    after: 1,
    caption: "Koaxialkabel bestehen aus mehreren Schichten und sind stark abgeschirmt. Quelle: Vodafone / V-Hub.",
    aspectRatio: "16 / 9"
  },
  "wie-funktioniert-glasfaser": {
    after: 0,
    caption: "Glasfaserleitungen übertragen Daten über Lichtsignale. Quelle: Vodafone.",
    aspectRatio: "16 / 12.5"
  },
  "kabel-oder-glasfaser": {
    after: 0,
    caption: "DSL, Glasfaser und Kabel nutzen unterschiedliche Wege bis zum Gebäude. Quelle: Vodafone.",
    aspectRatio: "16 / 11.3"
  },
  "vodafone-verfuegbarkeit-pruefen": {
    after: 1,
    caption: "Netzabschnitte und Anschlussarten können sich regional und je Adresse unterscheiden. Quelle: Vodafone.",
    aspectRatio: "16 / 9"
  },
  "internet-tarif-waehlen": {
    after: 1,
    caption: "Vom Hausanschluss verteilt der Router die Verbindung per WLAN oder LAN im Zuhause. Quelle: Vodafone.",
    aspectRatio: "16 / 9"
  },
  "vodafone-beratung-statt-hotline": {
    after: 1,
    caption: "Ein direkter Ansprechpartner verbindet Adresse, Bedarf und die nächsten Schritte.",
    aspectRatio: "16 / 9"
  },
  "internet-mobilfunk-tv-kombinieren": {
    after: 1,
    caption: "Internet zuhause, Mobilfunk unterwegs und TV lassen sich passend zum Alltag gemeinsam betrachten.",
    aspectRatio: "16 / 9"
  },
  "glasfaser-in-wietze-celle-und-umgebung": {
    after: 1,
    caption: "Glasfasertechnik wird schrittweise ausgebaut; die konkrete Buchbarkeit bleibt adressabhängig. Quelle: Vodafone.",
    aspectRatio: "16 / 11.3"
  }
};

/** Zusätzliche Grafiken, die nach einem bestimmten Abschnitt erscheinen. */
function sectionExtras(slug: string, index: number): ReactNode {
  const extras: Record<string, Record<number, ReactNode>> = {
    "wie-funktioniert-kabel-internet": {
      0: <ConnectionDiagram preset="kabel" caption="Vereinfachter Signalweg im Kabel-Glasfaser-Hybridnetz." />,
      2: <CoaxCrossSection />,
      3: <HouseConnectionDiagram />
    },
    "wie-funktioniert-glasfaser": {
      2: <ConnectionDiagram preset="glasfaser" caption="FTTB: Glasfaser bis ins Gebäude. FTTH: Glasfaser bis in die Wohnung." />
    },
    "kabel-oder-glasfaser": {
      0: (
        <>
          <ConnectionDiagram preset="kabel" />
          <ConnectionDiagram preset="glasfaser" />
        </>
      )
    },
    "vodafone-verfuegbarkeit-pruefen": { 0: <AvailabilityVisual /> },
    "internet-tarif-waehlen": { 0: <UsageGrid /> },
    "vodafone-beratung-statt-hotline": { 0: <HotlineMini /> },
    "internet-mobilfunk-tv-kombinieren": { 0: <ComboVisual /> },
    "glasfaser-in-wietze-celle-und-umgebung": {
      0: (
        <figure className="article-map">
          <RegionMap focus="vodafone-beratung-wietze" className="rmap-compact" />
          <figcaption>Wietze, Celle, Hannover und Umgebung – jede Adresse wird einzeln eingeordnet.</figcaption>
        </figure>
      )
    }
  };
  return extras[slug]?.[index] ?? null;
}

function readingMinutes(guide: Guide) {
  const words = [guide.intro, ...guide.sections.flatMap((section) => [section.title, section.body, ...(section.bullets ?? [])]), ...guide.faqs.flatMap((faq) => [faq.question, faq.answer])]
    .join(" ")
    .split(/\s+/).length;
  return Math.max(2, Math.round(words / 180));
}

export function generateStaticParams() {
  return guides.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) return {};
  return pageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/ratgeber/${guide.slug}`,
    image: guide.image
  });
}

export default async function GuideArticlePage({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) notFound();
  const media = guideMedia[guide.slug];
  const index = guides.findIndex((item) => item.slug === guide.slug);
  const relatedGuides = [1, 2, 3].map((offset) => guides[(index + offset) % guides.length]);

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Start", href: "/" }, { name: "Ratgeber", href: "/ratgeber" }, { name: guide.h1, href: `/ratgeber/${guide.slug}` }])} />
      <JsonLd data={articleSchema({ title: guide.h1, description: guide.description, path: `/ratgeber/${guide.slug}`, image: guide.image })} />
      <JsonLd data={faqSchema(guide.faqs)} />

      <PageHero
        crumbs={[{ name: "Start", href: "/" }, { name: "Ratgeber", href: "/ratgeber" }, { name: guide.category }]}
        eyebrow={guide.category}
        title={guide.h1}
        lead={guide.intro}
        meta={
          <>
            <span><Clock3 aria-hidden="true" /> {readingMinutes(guide)} Min. Lesezeit</span>
            <span><UserRound aria-hidden="true" /> {site.advisor}</span>
            <span><BookOpen aria-hidden="true" /> {guide.sections.length} Abschnitte</span>
          </>
        }
        aside={<div className="article-cover"><GuideCover guide={guide} size="lg" /></div>}
      />

      <article className="article">
        <div className="wrap article-layout">
          <aside className="toc" aria-label="Inhaltsverzeichnis">
            <p>Inhalt</p>
            <ol>
              {guide.sections.map((section, sectionIndex) => (
                <li key={section.title}>
                  <a href={`#abschnitt-${sectionIndex + 1}`}>
                    <span>{String(sectionIndex + 1).padStart(2, "0")}</span>
                    {section.title}
                  </a>
                </li>
              ))}
              <li>
                <a href="#fragen"><span>?</span>Häufige Fragen</a>
              </li>
            </ol>
            <Link className="toc-cta" href="#kontakt">
              <span className="avatar" aria-hidden="true">JM</span>
              <span>
                <strong>Persönlich klären?</strong>
                <small>Kostenlos beraten lassen</small>
              </span>
            </Link>
          </aside>

          <div className="article-body">
            <div className="callout">
              <span className="callout-icon"><Info aria-hidden="true" /></span>
              <div>
                <strong>Kurz erklärt</strong>
                <p>{guide.intro}</p>
                <p className="callout-note">Welche Lösung passt, hängt immer von Adresse, Gebäude, Ausbau und Nutzung ab.</p>
              </div>
            </div>

            {guide.sections.map((section, sectionIndex) => (
              <section className="article-section" id={`abschnitt-${sectionIndex + 1}`} key={section.title}>
                <h2>
                  <span>{String(sectionIndex + 1).padStart(2, "0")}</span>
                  {section.title}
                </h2>
                <p>{section.body}</p>
                {section.bullets && (
                  <ul className="article-bullets">
                    {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                )}
                {sectionExtras(guide.slug, sectionIndex)}
                {media?.after === sectionIndex && (
                  <ZoomableImage src={guide.image} alt={guide.imageAlt} caption={media.caption} aspectRatio={media.aspectRatio} />
                )}
              </section>
            ))}

            <section className="article-faq" id="fragen">
              <h2>Häufige Fragen</h2>
              <FaqList items={guide.faqs} />
            </section>

            <div className="article-author">
              <span className="avatar avatar-lg" aria-hidden="true">JM</span>
              <div>
                <strong>{site.advisor}</strong>
                <p>{site.role} für Wietze, Celle, Hannover und Umgebung. Erklärt Technik so, dass Entscheidungen leichter fallen.</p>
              </div>
              <Link className="btn btn-ink btn-sm" href="#kontakt">Frage stellen</Link>
            </div>
          </div>
        </div>
      </article>

      <section className="section section-tight">
        <div className="wrap">
          <div className="related-head">
            <h2>Passende Themen</h2>
            <Link className="link-arrow" href="/ratgeber">Alle Ratgeber <ArrowRight aria-hidden="true" /></Link>
          </div>
          <div className="guide-grid">
            {relatedGuides.map((item) => (
              <Link key={item.slug} href={`/ratgeber/${item.slug}`} className="guide-card">
                <GuideCover guide={item} />
                <span className="guide-card-body">
                  <strong>{item.h1}</strong>
                  <span className="guide-card-more"><Icon name={item.icon} /> {item.category}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
      <ConsultWizard />
    </>
  );
}
