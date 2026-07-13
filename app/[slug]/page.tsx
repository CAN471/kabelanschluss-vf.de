import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { FactCard, SectionIntro } from "@/components/Section";
import { ComboVisual, CompareDiagram, UsageMatrix } from "@/components/Visuals";
import {
  AvailabilityCheckVisual,
  FiberVsCableVisual,
  HFCSignalFlowVisual,
  RegionSignalMapVisual
} from "@/components/visuals/PremiumVisuals";
import { locationFaqs, locations, serviceFaqs, services } from "@/lib/site";
import { breadcrumbSchema, faqSchema, pageMetadata, serviceSchema } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

const serviceMedia: Record<string, { src: string; alt: string } | undefined> = {
  "internet-kabel": {
    src: "/assets/giga-glasfaser-netz.webp",
    alt: "Glasfaser- und Koaxialabschnitte im Kabelnetz"
  },
  glasfaser: {
    src: "/assets/glasfaser-innenansicht.jpg",
    alt: "Aufbau einer Glasfaserleitung mit einzelnen Fasern"
  },
  dsl: {
    src: "/assets/netzvergleich-dsl-glasfaser-kabel.jpg",
    alt: "Vergleich von DSL, Glasfaser und Kabelanschlüssen"
  },
  mobilfunk: {
    src: "/assets/home-router-editorial-v2.jpg",
    alt: "Smartphone und Internetrouter in einem hellen Wohnraum"
  },
  "tv-gigatv": {
    src: "/assets/glasfaser-im-haus.png",
    alt: "Hausanschluss mit Router und vernetzten Geräten"
  }
};

function ServiceVisual({ slug }: { slug: string }) {
  if (slug === "internet-kabel") return <HFCSignalFlowVisual active={8} />;
  if (slug === "glasfaser" || slug === "dsl") return <FiberVsCableVisual active={slug === "glasfaser" ? 3 : 0} />;
  if (slug === "mobilfunk" || slug === "tv-gigatv" || slug === "kombi-beratung") return <ComboVisual />;
  if (slug === "verfuegbarkeit-pruefen") return <AvailabilityCheckVisual active={2} />;
  return <UsageMatrix />;
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

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const location = locations.find((item) => item.slug === slug);
  const service = services.find((item) => item.slug === slug);

  if (location) {
    const localFaqs = locationFaqs(location);
    const relatedLocations = location.nearby
      .map((name) => locations.find((item) => item.name === name))
      .filter((item): item is (typeof locations)[number] => Boolean(item));

    return (
      <>
        <JsonLd data={breadcrumbSchema([{ name: "Start", href: "/" }, { name: `Vodafone Beratung ${location.name}`, href: `/${location.slug}` }])} />
        <JsonLd data={serviceSchema(undefined, location.name)} />
        <JsonLd data={faqSchema(localFaqs)} />
        <section className="sub-hero location-hero">
          <div>
            <p className="eyebrow">Persönlich in {location.name}</p>
            <h1>Vodafone Beratung in {location.name}</h1>
            <p>Hast du Fragen zu Internet, Glasfaser, DSL, Mobilfunk oder TV? Wir prüfen deine Adresse und helfen dir, die Möglichkeiten verständlich einzuordnen.</p>
            <div className="hero-actions">
              <Link className="button button-red" href="/#kontakt">Beratung anfragen</Link>
              <Link className="button button-soft" href="/verfuegbarkeit-pruefen">Verfügbarkeit prüfen lassen</Link>
            </div>
          </div>
          <aside className="location-hero-panel">
            <Icon name="pin" />
            <span>Beratungsschwerpunkt</span>
            <strong>{location.focus}</strong>
            <small>Auch in der Nähe</small>
            <div>{location.nearby.map((place) => <span key={place}>{place}</span>)}</div>
          </aside>
        </section>

        <section className="section">
          <SectionIntro eyebrow={location.focus} title="Direkter Kontakt statt Hotline.">
            <p>{location.intro}</p>
          </SectionIntro>
          <div className="fact-grid">
            <FactCard icon="pin" title={`Lokal in ${location.name}`} text="Du bekommst eine Rückmeldung, die zu deinem Ort und deiner Adresse passt." />
            <FactCard
              icon="check"
              title="Verfügbarkeit prüfen"
              text={location.slug === "vodafone-beratung-wietze"
                ? "In Wietze prüfen wir Glasfaser, Internet, DSL, Mobilfunk und TV. Kabelinternet ist hier keine Zuhause-Lösung."
                : "Internet, Glasfaser, Kabel je nach Adresse, DSL, Mobilfunk und TV werden gemeinsam betrachtet."}
            />
            <FactCard icon="advice" title="Empfehlung erhalten" text="Du bekommst eine verständliche Einschätzung statt Tarifdschungel." />
          </div>
        </section>

        <section className="section location-check-section">
          <SectionIntro eyebrow={`Adresse in ${location.name} prüfen`} title="So prüfen wir deine Möglichkeiten.">
            <p>Du nennst Adresse und Bedarf. Wir ordnen die möglichen Anschlussarten ein und melden uns persönlich bei dir zurück.</p>
          </SectionIntro>
          <AvailabilityCheckVisual active={2} />
        </section>

        <section className="section dark-story">
          <SectionIntro eyebrow="Verfügbarkeit" title={`Was ist in ${location.name} möglich?`}>
            <p>Produktmöglichkeiten hängen von Adresse, Ausbau, Gebäude und aktueller Angebotslage ab. Deshalb wird nichts pauschal versprochen.</p>
          </SectionIntro>
          <RegionSignalMapVisual locations={locations} active={2} />
        </section>

        <section className="section location-links-section">
          <div>
            <p className="eyebrow">Beratungsthemen</p>
            <h2>Was möchtest du klären?</h2>
            <p>Von Internet zuhause bis Mobilfunk und TV: Starte direkt beim passenden Thema.</p>
          </div>
          <div className="location-service-links">
            {services.slice(0, 6).map((item) => (
              <Link key={item.slug} href={`/${item.slug}`}>
                <Icon name={item.icon} />
                <span>{item.h1}</span>
                <b aria-hidden="true">↗</b>
              </Link>
            ))}
          </div>
          <div className="location-nearby-links">
            <strong>Beratung in der Nähe</strong>
            {relatedLocations.map((item) => (
              <Link key={item.slug} href={`/${item.slug}`}>{item.name}</Link>
            ))}
          </div>
        </section>

        <section className="section location-faq-section">
          <SectionIntro eyebrow={`Fragen aus ${location.name}`} title="Gut zu wissen.">
            <p>Die wichtigsten Antworten zu Beratung, Verfügbarkeit und persönlicher Rückmeldung.</p>
          </SectionIntro>
          <div className="faq-strip location-faq-list">
            {localFaqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <ContactForm />
      </>
    );
  }

  if (service) {
    const faqs = serviceFaqs(service);
    return (
      <>
        <JsonLd data={breadcrumbSchema([{ name: "Start", href: "/" }, { name: service.h1, href: `/${service.slug}` }])} />
        <JsonLd data={serviceSchema(service.slug)} />
        <JsonLd data={faqSchema(faqs)} />
        <section className="sub-hero sub-hero-service service-hero">
          <div>
            <span className="service-hero-icon"><Icon name={service.icon} /></span>
            <p className="eyebrow">Vodafone Beratung</p>
            <h1>{service.h1}</h1>
            <p>{service.intro}</p>
            <div className="hero-actions">
              <Link className="button button-red" href="/#kontakt">Beratung anfragen</Link>
              <Link className="button button-soft" href="/ratgeber">Ratgeber ansehen</Link>
            </div>
          </div>
          <aside className="service-hero-panel">
            <span>Das klären wir gemeinsam</span>
            {service.points.slice(0, 3).map((point) => (
              <p key={point}><Icon name="check" /> {point}</p>
            ))}
          </aside>
        </section>

        <section className="section service-detail">
          <div className="service-copy">
            <p className="eyebrow">Worum es geht</p>
            <h2>Was für dich wichtig ist.</h2>
            <p>{service.description}</p>
            <ul>
              {service.points.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </div>
          <ServiceVisual slug={service.slug} />
        </section>

        {service.slug === "internet-kabel" && (
          <section className="section">
            <SectionIntro eyebrow="Technik" title="Kabelinternet ist HFC: Glasfaser plus Koax.">
              <p>Große Strecken laufen über Glasfaser. Im letzten Abschnitt zum Gebäude kann je nach Ausbau Koaxialkabel zum Einsatz kommen.</p>
            </SectionIntro>
            <CompareDiagram />
          </section>
        )}

        <section className="section media-row service-media-row">
          {serviceMedia[service.slug] ? (
            <figure className="image-panel image-panel-contain">
              <Image
                src={serviceMedia[service.slug]!.src}
                alt={serviceMedia[service.slug]!.alt}
                width={1440}
                height={809}
              />
              <figcaption>{serviceMedia[service.slug]!.alt}</figcaption>
            </figure>
          ) : (
            <div className="service-media-visual"><ServiceVisual slug={service.slug} /></div>
          )}
          <div>
            <h2>Deine Adresse macht den Unterschied.</h2>
            <p>Verfügbarkeit, Anschlussart und Produktoptionen hängen vom Standort, Gebäude und aktuellen Ausbau ab.</p>
            <Link className="button button-red" href="/#kontakt">Verfügbarkeit prüfen lassen</Link>
          </div>
        </section>

        <section className="section service-faq-section">
          <SectionIntro eyebrow="Häufige Fragen" title={`Fragen zur ${service.h1}.`}>
            <p>Klare Antworten zu Verfügbarkeit, Ablauf und persönlicher Beratung.</p>
          </SectionIntro>
          <div className="faq-strip service-faq-list">
            {faqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <ContactForm />
      </>
    );
  }

  notFound();
}
