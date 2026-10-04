import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check, PhoneCall } from "lucide-react";
import { ConnectionDiagram } from "@/components/ConnectionPath";
import { ConsultWizard } from "@/components/ConsultWizard";
import { FaqList } from "@/components/Faq";
import { ExplorerSection } from "@/components/home/Sections";
import { Icon, WhatsAppIcon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { RegionMap } from "@/components/RegionMap";
import { CtaBand, SectionHead } from "@/components/Section";
import { AvailabilityVisual, CoaxCrossSection, ComboVisual } from "@/components/Visuals";
import { ZoomableImage } from "@/components/ZoomableImage";
import { serviceTopics } from "@/lib/consult";
import { breadcrumbSchema, faqSchema, pageMetadata, serviceSchema } from "@/lib/seo";
import { locationFaqs, locations, serviceFaqs, services, shortServiceName, site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

const serviceMedia: Record<string, { src: string; alt: string; caption: string; aspectRatio: string } | undefined> = {
  "internet-kabel": {
    src: "/assets/giga-glasfaser-netz.webp",
    alt: "Schematische Darstellung des Vodafone GigaGlasfaser- und Koax-Netzes",
    caption: "Ein Datenpaket legt den Großteil des Weges über Glasfaser zurück. Quelle: Vodafone.",
    aspectRatio: "16 / 9"
  },
  glasfaser: {
    src: "/assets/vodafone-glasfaser-baustelle.jpeg",
    alt: "Glasfaser-Leerrohre an einer Vodafone Baustelle",
    caption: "Glasfaser-Ausbau: Leerrohre mit vielen einzelnen Röhrchen für die Fasern.",
    aspectRatio: "3 / 2"
  },
  dsl: {
    src: "/assets/netzvergleich-dsl-glasfaser-kabel.jpg",
    alt: "Vergleich von DSL, VDSL, Glasfaser und TV-Kabel bis zum Haus",
    caption: "DSL, Glasfaser und Kabel nutzen unterschiedliche Wege bis zum Gebäude. Quelle: Vodafone.",
    aspectRatio: "16 / 11"
  },
  "verfuegbarkeit-pruefen": {
    src: "/assets/glasfaser-kabelnetz-ausbau.jpg",
    alt: "Netzausbau mit mehr Glasfaser-Technik im Kabelnetz",
    caption: "Netzabschnitte und Ausbaustand können sich regional und je Adresse unterscheiden. Quelle: Vodafone.",
    aspectRatio: "16 / 11"
  }
};

function ServiceVisual({ slug }: { slug: string }) {
  if (slug === "internet-kabel") return <ConnectionDiagram preset="kabel" caption="Vereinfachter Signalweg im Kabel-Glasfaser-Hybridnetz (HFC)." />;
  if (slug === "glasfaser") return <ConnectionDiagram preset="glasfaser" caption="Je nach Ausbau reicht Glasfaser bis ins Gebäude (FTTB) oder bis in die Wohnung (FTTH)." />;
  if (slug === "dsl") return <ConnectionDiagram preset="dsl" caption="DSL nutzt ab dem Verteiler die Telefonleitung bis zur TAE-Dose." />;
  if (slug === "mobilfunk") return <ComboVisual highlight="mobilfunk" />;
  if (slug === "tv-gigatv") return <ComboVisual highlight="tv" />;
  if (slug === "kombi-beratung") return <ComboVisual />;
  return <AvailabilityVisual />;
}

export function generateStaticParams() {
  return [...locations.map(({ slug }) => ({ slug })), ...services.map(({ slug }) => ({ slug }))];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const location = locations.find((item) => item.slug === slug);
  const service = services.find((item) => item.slug === slug);

  if (location) {
    const isWietze = location.slug === "vodafone-beratung-wietze";
    return pageMetadata({
      title: isWietze
        ? "Vodafone Beratung Wietze | Glasfaser, Internet & Mobilfunk"
        : `Vodafone Beratung ${location.name} | Internet & Glasfaser`,
      description: isWietze
        ? "Persönliche Vodafone Beratung in Wietze mit Glasfaser-Fokus: Internet, DSL, Mobilfunk und TV verständlich einordnen lassen."
        : `Persönliche Vodafone Beratung in ${location.name}: Internet, Glasfaser, Kabel je nach Adresse, DSL, Mobilfunk und TV verständlich einordnen lassen.`,
      path: `/${location.slug}`
    });
  }

  if (service) {
    return pageMetadata({
      title: service.title,
      description: service.description,
      path: `/${service.slug}`
    });
  }

  return {};
}

function HeroActions() {
  return (
    <>
      <Link className="btn btn-red btn-lg" href="#kontakt">
        Beratung starten <ArrowRight aria-hidden="true" />
      </Link>
      <a className="btn btn-ghost btn-lg" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon /> WhatsApp
      </a>
    </>
  );
}

function ServiceLinks({ exclude }: { exclude?: string }) {
  return (
    <div className="topic-links">
      {services
        .filter((item) => item.slug !== exclude)
        .map((item) => (
          <Link key={item.slug} href={`/${item.slug}`}>
            <span className="topic-links-icon"><Icon name={item.icon} /></span>
            <span>
              <strong>{shortServiceName(item)}</strong>
              <small>{item.points[0]}</small>
            </span>
            <ArrowUpRight aria-hidden="true" />
          </Link>
        ))}
    </div>
  );
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const location = locations.find((item) => item.slug === slug);
  const service = services.find((item) => item.slug === slug);

  if (location) {
    const localFaqs = locationFaqs(location);
    const isWietze = location.slug === "vodafone-beratung-wietze";
    const relatedLocations = location.nearby
      .map((name) => locations.find((item) => item.name === name))
      .filter((item): item is (typeof locations)[number] => Boolean(item));

    return (
      <>
        <JsonLd data={breadcrumbSchema([{ name: "Start", href: "/" }, { name: `Vodafone Beratung ${location.name}`, href: `/${location.slug}` }])} />
        <JsonLd data={serviceSchema(undefined, location.name)} />
        <JsonLd data={faqSchema(localFaqs)} />

        <PageHero
          crumbs={[{ name: "Start", href: "/" }, { name: "Region", href: "/#region" }, { name: location.name }]}
          eyebrow={`Persönlich in ${location.name}`}
          title={<>Vodafone Beratung in <span className="text-red">{location.name}</span></>}
          lead="Hast du Fragen zu Internet, Glasfaser, DSL, Mobilfunk oder TV? Jan prüft deine Adresse und hilft dir, die Möglichkeiten verständlich einzuordnen – kostenlos und unverbindlich."
          actions={<HeroActions />}
          aside={
            <div className="loc-card">
              <div className="loc-map">
                <RegionMap focus={location.slug} className="rmap-compact" />
              </div>
              <div className="loc-card-body">
                <small>Beratungsschwerpunkt</small>
                <strong>{location.focus}</strong>
                <div className="loc-nearby">
                  <span>In der Nähe:</span>
                  {relatedLocations.map((item) => (
                    <Link key={item.slug} href={`/${item.slug}`}>{item.name}</Link>
                  ))}
                </div>
              </div>
            </div>
          }
        />

        <section className="section section-tight">
          <div className="wrap">
            <SectionHead eyebrow={location.focus} title="Direkter Kontakt statt Hotline." lead={location.intro} />
            <div className="fact-cards">
              <article className="fact-card" data-reveal>
                <span><Icon name="pin" /></span>
                <h3>Lokal in {location.name}</h3>
                <p>Du bekommst eine Rückmeldung, die zu deinem Ort und deiner Adresse passt.</p>
              </article>
              <article className="fact-card" data-reveal style={{ "--d": "100ms" } as CSSProperties}>
                <span><Icon name="check" /></span>
                <h3>Verfügbarkeit prüfen</h3>
                <p>
                  {isWietze
                    ? "In Wietze prüfen wir Glasfaser, Internet, DSL, Mobilfunk und TV. Kabelinternet ist hier keine Zuhause-Lösung."
                    : "Internet, Glasfaser, Kabel je nach Adresse, DSL, Mobilfunk und TV werden gemeinsam betrachtet."}
                </p>
              </article>
              <article className="fact-card" data-reveal style={{ "--d": "200ms" } as CSSProperties}>
                <span><Icon name="recommendation" /></span>
                <h3>Empfehlung erhalten</h3>
                <p>Du bekommst eine verständliche Einschätzung statt Tarifdschungel – und auf Wunsch Begleitung bis zur Aktivierung.</p>
              </article>
            </div>
          </div>
        </section>

        <ExplorerSection />

        <section className="section">
          <div className="wrap">
            <SectionHead
              eyebrow="Beratungsthemen"
              title={`Was möchtest du in ${location.name} klären?`}
              lead="Von Internet zuhause bis Mobilfunk und TV: Starte direkt beim passenden Thema."
            />
            <ServiceLinks />
          </div>
        </section>

        <section className="section section-tight faq-preview">
          <div className="wrap faq-layout">
            <div className="faq-side" data-reveal>
              <p className="eyebrow">Fragen aus {location.name}</p>
              <h2>Gut zu wissen.</h2>
              <p className="lead">Die wichtigsten Antworten zu Beratung, Verfügbarkeit und persönlicher Rückmeldung.</p>
              <div className="faq-side-actions">
                <a className="btn btn-ghost" href={`tel:${site.phone}`}>
                  <PhoneCall aria-hidden="true" /> {site.phoneDisplay}
                </a>
              </div>
            </div>
            <div data-reveal>
              <FaqList items={localFaqs} openFirst />
            </div>
          </div>
        </section>

        <CtaBand title={`Beratung in ${location.name} anfragen.`} />
        <ConsultWizard
          title={`Beratung in ${location.name}.`}
          lead={`Ort ist schon eingetragen. In vier kurzen Schritten zu deiner Anfrage – Jan meldet sich persönlich mit einer Einschätzung für deine Adresse in ${location.name}.`}
          initialOrt={location.name}
        />
      </>
    );
  }

  if (service) {
    const faqs = serviceFaqs(service);
    const media = serviceMedia[service.slug];

    return (
      <>
        <JsonLd data={breadcrumbSchema([{ name: "Start", href: "/" }, { name: service.h1, href: `/${service.slug}` }])} />
        <JsonLd data={serviceSchema(service.slug)} />
        <JsonLd data={faqSchema(faqs)} />

        <PageHero
          crumbs={[{ name: "Start", href: "/" }, { name: "Leistungen", href: "/#leistungen" }, { name: shortServiceName(service) }]}
          eyebrow="Vodafone Beratung"
          title={service.h1}
          lead={service.intro}
          actions={<HeroActions />}
          aside={
            <div className="svc-card">
              <span className="svc-card-icon"><Icon name={service.icon} /></span>
              <p className="svc-card-label">Das klären wir gemeinsam</p>
              <ul className="ticks">
                {service.points.map((point) => (
                  <li key={point}><Check aria-hidden="true" /> {point}</li>
                ))}
              </ul>
              <div className="svc-card-person">
                <span className="avatar" aria-hidden="true">JM</span>
                <span>
                  <strong>{site.advisor}</strong>
                  <small>Kostenlos &amp; unverbindlich</small>
                </span>
              </div>
            </div>
          }
        />

        <section className="section section-tight">
          <div className="wrap split">
            <div className="split-copy" data-reveal>
              <p className="eyebrow">Worum es geht</p>
              <h2>Was für dich wichtig ist.</h2>
              <p className="lead">{service.description}</p>
              <ul className="ticks">
                {service.points.map((point) => (
                  <li key={point}><Check aria-hidden="true" /> {point}</li>
                ))}
              </ul>
            </div>
            <div className="split-visual" data-reveal style={{ "--d": "120ms" } as CSSProperties}>
              <ServiceVisual slug={service.slug} />
            </div>
          </div>
        </section>

        {service.slug === "internet-kabel" && (
          <section className="section section-tight">
            <div className="wrap">
              <SectionHead
                eyebrow="Technik"
                title="Kabelinternet ist HFC: Glasfaser plus Koax."
                lead="Große Strecken laufen über Glasfaser. Im letzten Abschnitt zum Gebäude kommt je nach Ausbau Koaxialkabel zum Einsatz."
              />
              <div data-reveal><CoaxCrossSection /></div>
            </div>
          </section>
        )}

        {media && (
          <section className="section section-tight">
            <div className="wrap media-split">
              <div data-reveal>
                <ZoomableImage src={media.src} alt={media.alt} caption={media.caption} aspectRatio={media.aspectRatio} />
              </div>
              <div className="media-split-copy" data-reveal style={{ "--d": "120ms" } as CSSProperties}>
                <p className="eyebrow">Adresse zuerst</p>
                <h2>Deine Adresse macht den Unterschied.</h2>
                <p className="lead">Verfügbarkeit, Anschlussart und Produktoptionen hängen von Standort, Gebäude und aktuellem Ausbau ab.</p>
                <Link className="btn btn-red" href="#kontakt">
                  Verfügbarkeit prüfen lassen <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>
        )}

        <section className="section section-tight faq-preview">
          <div className="wrap faq-layout">
            <div className="faq-side" data-reveal>
              <p className="eyebrow">Häufige Fragen</p>
              <h2>Fragen zur {service.h1}.</h2>
              <p className="lead">Klare Antworten zu Verfügbarkeit, Ablauf und persönlicher Beratung.</p>
              <div className="faq-side-actions">
                <Link className="btn btn-ghost" href="/faq">Alle Fragen ansehen</Link>
              </div>
            </div>
            <div data-reveal>
              <FaqList items={faqs} openFirst />
            </div>
          </div>
        </section>

        <section className="section section-tight">
          <div className="wrap">
            <SectionHead eyebrow="Weitere Themen" title="Auch interessant für dich." />
            <ServiceLinks exclude={service.slug} />
          </div>
        </section>

        <CtaBand />
        <ConsultWizard initialTopics={serviceTopics[service.slug] ?? []} />
      </>
    );
  }

  notFound();
}
