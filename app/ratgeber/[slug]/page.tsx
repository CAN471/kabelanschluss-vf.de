import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { CtaBand } from "@/components/Section";
import { ZoomableImage } from "@/components/ZoomableImage";
import { ComboVisual, HotlineSplit, HouseConnectionVisual, RegionSignal, UsageMatrix } from "@/components/Visuals";
import {
  AvailabilityCheckVisual,
  CableCrossSectionVisual,
  FiberVsCableVisual,
  HFCArticleLeadVisual,
  HFCSignalFlowVisual,
} from "@/components/visuals/PremiumVisuals";
import { guides } from "@/lib/site";
import { articleSchema, breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

const sectionIcons: Record<string, string> = {
  hfc: "coax",
  fiber: "fiber",
  compare: "signal",
  availability: "pin",
  usage: "home",
  hotline: "callback",
  combo: "tv",
  region: "pin"
};

const guideMedia: Record<string, { after: number; caption: string; aspectRatio?: string }> = {
  "wie-funktioniert-kabel-internet": {
    after: 1,
    caption: "Koaxialkabel bestehen aus mehreren Schichten und sind stark abgeschirmt. Quelle: Vodafone / V-Hub.",
    aspectRatio: "16 / 9"
  },
  "wie-funktioniert-glasfaser": {
    after: 0,
    caption: "Glasfaserleitungen übertragen Daten über Lichtsignale. Quelle: Vodafone.",
    aspectRatio: "16 / 12"
  },
  "kabel-oder-glasfaser": {
    after: 0,
    caption: "DSL, Glasfaser und Kabel nutzen unterschiedliche Wege bis zum Gebäude. Quelle: Vodafone.",
    aspectRatio: "16 / 11"
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
    after: 0,
    caption: "Internet zuhause, Mobilfunk unterwegs und TV lassen sich passend zum Alltag gemeinsam betrachten.",
    aspectRatio: "16 / 9"
  },
  "glasfaser-in-wietze-celle-und-umgebung": {
    after: 0,
    caption: "Glasfasertechnik wird schrittweise ausgebaut; die konkrete Buchbarkeit bleibt adressabhängig. Quelle: Vodafone.",
    aspectRatio: "16 / 11"
  }
};

function GuideLeadVisual({ slug }: { slug: string }) {
  if (slug === "wie-funktioniert-kabel-internet") return <HFCArticleLeadVisual />;
  if (slug === "wie-funktioniert-glasfaser") return <FiberVsCableVisual active={3} />;
  if (slug === "kabel-oder-glasfaser") return <FiberVsCableVisual active={1} />;
  if (slug === "vodafone-verfuegbarkeit-pruefen") return <AvailabilityCheckVisual active={2} />;
  if (slug === "internet-tarif-waehlen") return <UsageMatrix />;
  if (slug === "vodafone-beratung-statt-hotline") return <HotlineSplit />;
  if (slug === "internet-mobilfunk-tv-kombinieren") return <ComboVisual />;
  if (slug === "glasfaser-in-wietze-celle-und-umgebung") return <RegionSignal />;
  return null;
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

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) notFound();
  const media = guideMedia[guide.slug];
  const relatedGuides = guides.filter((item) => item.slug !== guide.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Start", href: "/" }, { name: "Ratgeber", href: "/ratgeber" }, { name: guide.h1, href: `/ratgeber/${guide.slug}` }])} />
      <JsonLd data={articleSchema({ title: guide.h1, description: guide.description, path: `/ratgeber/${guide.slug}`, image: guide.image })} />
      <JsonLd data={faqSchema(guide.faqs)} />

      <article className="article-page">
        <header className="article-hero">
          <div>
            <p className="eyebrow">{guide.category}</p>
            <h1>{guide.h1}</h1>
            <p>{guide.intro}</p>
          </div>
          <div className="article-hero-visual"><GuideLeadVisual slug={guide.slug} /></div>
        </header>

        <div className="article-layout">
          <aside className="content-nav" aria-label="Inhaltsverzeichnis">
            <strong>Inhalt</strong>
            {guide.sections.map((section, index) => (
              <Link key={section.title} href={`#abschnitt-${index + 1}`}>{section.title}</Link>
            ))}
            <Link href="#beratung-anfragen">Beratung anfragen</Link>
          </aside>

          <div className="article-content">
            <div className="article-note-grid">
              <article>
                <strong>Kurz erklärt</strong>
                <p>{guide.intro}</p>
              </article>
              <article>
                <strong>Wichtig zu wissen</strong>
                <p>Welche Lösung passt, hängt von Adresse, Gebäude, Ausbau und Nutzung ab.</p>
              </article>
            </div>

            {guide.sections.map((section, index) => (
              <section className="article-section" id={`abschnitt-${index + 1}`} key={section.title}>
                <div className="article-section-title">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <Icon name={sectionIcons[section.type ?? ""] ?? guide.icon} />
                  <h2>{section.title}</h2>
                </div>
                <p className="article-section-copy">{section.body}</p>
                {section.bullets && (
                  <ul className="clean-list">
                    {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                )}
                {guide.slug === "wie-funktioniert-kabel-internet" && index === 0 && <HFCSignalFlowVisual active={8} />}
                {media?.after === index && (
                  <ZoomableImage
                    src={guide.image}
                    alt={guide.imageAlt}
                    caption={media.caption}
                    aspectRatio={media.aspectRatio}
                  />
                )}
                {guide.slug === "wie-funktioniert-kabel-internet" && index === 2 && <CableCrossSectionVisual />}
                {guide.slug === "wie-funktioniert-kabel-internet" && index === 3 && <HouseConnectionVisual />}
              </section>
            ))}

            <section className="article-faq">
              <h2>Häufige Fragen</h2>
              {guide.faqs.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </section>

            <section className="related-guides" aria-labelledby="related-guides-title">
              <div>
                <p className="eyebrow">Weiterlesen</p>
                <h2 id="related-guides-title">Passende Themen.</h2>
              </div>
              <div>
                {relatedGuides.map((item) => (
                  <Link key={item.slug} href={`/ratgeber/${item.slug}`}>
                    <Icon name={item.icon} />
                    <span>{item.h1}</span>
                    <b aria-hidden="true">↗</b>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </article>

      <div id="beratung-anfragen">
        <CtaBand />
        <ContactForm />
      </div>
    </>
  );
}
