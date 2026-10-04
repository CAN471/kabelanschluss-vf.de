import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Clock3, Headset, Mail, PhoneCall, X } from "lucide-react";
import { ConnectionExplorer } from "@/components/home/ConnectionExplorer";
import { TiltCard } from "@/components/home/TiltCard";
import { FaqList } from "@/components/Faq";
import { GuideCover } from "@/components/GuideCover";
import { Icon, WhatsAppIcon } from "@/components/Icons";
import { RegionExplorer } from "@/components/RegionMap";
import { SectionHead } from "@/components/Section";
import { faqItems, guides, locations, services, shortServiceName, site } from "@/lib/site";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/* ------------------------------------------------------------------ Ticker */

const tickerItems = ["Glasfaser", "Kabelinternet", "DSL", "Mobilfunk", "GigaTV", "Kombi-Beratung", "Router & WLAN", "Verfügbarkeit"];

export function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {[0, 1].map((copy) => (
          <div className="ticker-group" key={copy}>
            {tickerItems.map((item) => (
              <span key={item}>
                {item}
                <i />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- Hotline vs Jan */

const hotlinePains = [
  "Warteschleife und Weiterleitungen",
  "Bei jedem Anruf alles neu erklären",
  "Wechselnde Ansprechpartner",
  "Standardtarif statt echter Bedarf"
];

const personalGains = [
  "Ein fester Ansprechpartner",
  "Rückmeldung im gewünschten Zeitraum",
  "Prüfung deiner konkreten Adresse",
  "Empfehlung nach eurer Nutzung",
  "Begleitung bis zur Aktivierung"
];

export function PersonalCompare() {
  return (
    <section className="section compare" id="beratung" aria-labelledby="compare-title">
      <div className="wrap">
        <SectionHead
          id="compare-title"
          eyebrow="Warum persönlich?"
          title={<>Beratung, die bei deiner Adresse beginnt. <span className="muted-title">Nicht in der Warteschleife.</span></>}
          lead="Viele möchten keine Hotline, sondern jemanden, der die Anfrage versteht. Genau dafür gibt es einen direkten Ansprechpartner."
        />
        <div className="compare-grid">
          <article className="compare-card compare-hotline" data-reveal>
            <header>
              <span className="compare-icon"><Headset aria-hidden="true" /></span>
              <span>
                <small>Der übliche Weg</small>
                <strong>Anonyme Hotline</strong>
              </span>
            </header>
            <ul>
              {hotlinePains.map((item) => (
                <li key={item}><X aria-hidden="true" /> {item}</li>
              ))}
            </ul>
            <p className="compare-hold">
              <Clock3 aria-hidden="true" />
              <span>„Bitte haben Sie noch einen Moment Geduld …“</span>
              <i aria-hidden="true"><b /><b /><b /><b /><b /></i>
            </p>
          </article>

          <article className="compare-card compare-personal" data-reveal style={delay(120)}>
            <span className="compare-glow" aria-hidden="true" />
            <header>
              <span className="avatar avatar-light" aria-hidden="true">JM</span>
              <span>
                <small>Mit {site.advisor.split(" ")[0]}</small>
                <strong>Persönliche Beratung</strong>
              </span>
            </header>
            <ul>
              {personalGains.map((item) => (
                <li key={item}><Check aria-hidden="true" /> {item}</li>
              ))}
            </ul>
            <Link className="btn btn-white" href="/#kontakt">
              Kostenlos beraten lassen <ArrowRight aria-hidden="true" />
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Service bento */

function BentoArt({ slug }: { slug: string }) {
  switch (slug) {
    case "glasfaser":
      return (
        <svg viewBox="0 0 600 320" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {Array.from({ length: 12 }, (_, index) => {
            const d = `M-40 ${40 + index * 22} C 160 ${10 + index * 30}, 360 ${300 - index * 16}, 640 ${120 + index * 10}`;
            return (
              <g key={index}>
                <path className="art-strand-base" d={d} />
                <path className="art-strand" style={{ animationDelay: `${index * -0.37}s` }} d={d} />
              </g>
            );
          })}
        </svg>
      );
    case "internet-kabel":
      return (
        <svg viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="100" cy="100" r="92" className="art-coax-jacket" />
          <circle cx="100" cy="100" r="72" className="art-coax-shield" />
          <circle cx="100" cy="100" r="54" className="art-coax-dielectric" />
          <circle cx="100" cy="100" r="14" className="art-coax-core" />
        </svg>
      );
    case "dsl":
      return (
        <svg viewBox="0 0 200 120" aria-hidden="true">
          <path className="art-wire" d="M0 90 C 40 90, 50 30, 100 30 S 160 90, 200 90" />
          <path className="art-wire art-wire-b" d="M0 100 C 40 100, 50 40, 100 40 S 160 100, 200 100" />
        </svg>
      );
    case "mobilfunk":
      return (
        <svg viewBox="0 0 200 140" aria-hidden="true">
          {[30, 55, 80, 105, 130].map((h, index) => (
            <rect key={h} className="art-bar" x={30 + index * 30} y={135 - h} width="18" height={h} rx="9" style={{ animationDelay: `${index * 0.15}s` }} />
          ))}
        </svg>
      );
    case "tv-gigatv":
      return (
        <svg viewBox="0 0 200 140" aria-hidden="true">
          <rect className="art-screen" x="20" y="14" width="160" height="96" rx="14" />
          <path className="art-play" d="M90 46 L120 62 L90 78 Z" />
          <path className="art-stand" d="M80 126 h40" />
        </svg>
      );
    case "kombi-beratung":
      return (
        <svg viewBox="0 0 260 180" aria-hidden="true">
          <circle className="art-venn art-venn-a" cx="100" cy="76" r="56" />
          <circle className="art-venn art-venn-b" cx="160" cy="76" r="56" />
          <circle className="art-venn art-venn-c" cx="130" cy="122" r="56" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 200 200" aria-hidden="true">
          {[30, 55, 80].map((r) => (
            <circle key={r} className="art-radar" cx="100" cy="100" r={r} />
          ))}
          <circle className="art-radar-core" cx="100" cy="100" r="8" />
        </svg>
      );
  }
}

const bentoLayout: Record<string, string> = {
  glasfaser: "bento-xl is-night",
  "internet-kabel": "bento-md",
  dsl: "bento-sm",
  mobilfunk: "bento-sm",
  "tv-gigatv": "bento-sm",
  "kombi-beratung": "bento-lg",
  "verfuegbarkeit-pruefen": "bento-md is-red"
};

const bentoOrder = ["glasfaser", "internet-kabel", "dsl", "mobilfunk", "tv-gigatv", "kombi-beratung", "verfuegbarkeit-pruefen"];

export function ServiceBento() {
  const ordered = bentoOrder
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is (typeof services)[number] => Boolean(service));

  return (
    <section className="section services" id="leistungen" aria-labelledby="services-title">
      <div className="wrap">
        <SectionHead
          id="services-title"
          eyebrow="Beratungsbereiche"
          title="Internet, Mobilfunk und TV. Passend zu deinem Alltag."
          lead="Wir betrachten Verfügbarkeit und Nutzung gemeinsam – und sortieren den Tarifdschungel, bevor du dich entscheidest."
        />
        <div className="bento">
          {ordered.map((service, index) => (
            <Link
              key={service.slug}
              href={`/${service.slug}`}
              className={`bento-card ${bentoLayout[service.slug] ?? "bento-sm"} bento-${service.slug}`}
              data-reveal
              style={delay((index % 3) * 90)}
            >
              <span className="bento-art"><BentoArt slug={service.slug} /></span>
              <span className="bento-top">
                <span className="bento-icon"><Icon name={service.icon} /></span>
                <span className="bento-arrow"><ArrowUpRight aria-hidden="true" /></span>
              </span>
              <span className="bento-body">
                <strong className="bento-title">{shortServiceName(service)}</strong>
                <span className="bento-text">{service.teaser}</span>
                <span className="bento-points">
                  {service.points.map((point) => <span key={point}>{point}</span>)}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- Explorer (dark) */

export function ExplorerSection() {
  return (
    <section className="section section-dark explorer" id="anschlussarten" aria-labelledby="explorer-title">
      <div className="explorer-bg" aria-hidden="true" />
      <div className="wrap">
        <SectionHead
          id="explorer-title"
          eyebrow="Anschlussarten verstehen"
          title="Glasfaser, Kabel oder DSL? So kommt das Internet zu dir."
          lead="Drei Technologien, drei Wege ins Haus. Tippe auf eine Anschlussart und sieh, wie das Signal bis zu deinem Router läuft."
        />
        <ConnectionExplorer />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Process */

const processSteps = [
  { icon: "advice", title: "Anfrage senden", text: "Über den Assistenten, per WhatsApp oder Telefon – mit Ort, Thema und deinem Wunsch-Kontaktweg." },
  { icon: "pin", title: "Adresse & Bedarf klären", text: "Jan prüft, was an deiner Adresse möglich ist, und fragt nach, wie ihr Internet, Mobilfunk und TV nutzt." },
  { icon: "recommendation", title: "Empfehlung erhalten", text: "Eine verständliche Einschätzung statt Tarifdschungel – kostenlos und ohne Verpflichtung." },
  { icon: "shield", title: "Bis zur Aktivierung", text: "Auf Wunsch begleitet Jan auch Bestellung und Aktivierung, damit nichts offen bleibt." }
];

export function Process() {
  return (
    <section className="section process" id="ablauf" aria-labelledby="process-title">
      <div className="wrap">
        <SectionHead
          id="process-title"
          eyebrow="So läuft es ab"
          title="In vier Schritten zur passenden Lösung."
          lead="Die Beratung beginnt mit wenigen Angaben – und hört nicht beim ersten Formularfeld auf."
        />
        <ol className="steps" data-reveal>
          {processSteps.map((step, index) => (
            <li key={step.title} style={{ "--i": index } as CSSProperties}>
              <span className="steps-num">{String(index + 1).padStart(2, "0")}</span>
              <span className="steps-icon"><Icon name={step.icon} /></span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Advisor */

const principles = [
  { title: "Erst verstehen", text: "Adresse, Haushalt und Nutzung kommen vor der Tarifempfehlung." },
  { title: "Dann einordnen", text: "Kabel, Glasfaser, DSL, Mobilfunk und TV werden verständlich sortiert." },
  { title: "Persönlich begleiten", text: "Ein direkter Ansprechpartner bleibt bis zur Aktivierung erreichbar." }
];

export function Advisor() {
  const facts = [
    { value: "0 €", label: "kostet dich die Beratung" },
    { value: "1", label: "fester Ansprechpartner statt Hotline" },
    { value: String(locations.length), label: "Orte mit eigener Beratungsseite" },
    { value: "3", label: "Wege zu Jan: WhatsApp, Telefon, E-Mail" }
  ];

  return (
    <section className="section advisor" id="ansprechpartner" aria-labelledby="advisor-title">
      <div className="wrap advisor-layout">
        <div className="advisor-visual" data-reveal>
          <figure className="advisor-photo">
            <Image
              src="/assets/home-router-editorial-v2.jpg"
              alt="Router mit rotem Kabel und Smartphone in einem hellen Wohnzimmer"
              fill
              sizes="(min-width: 1000px) 44vw, 100vw"
            />
          </figure>
          <TiltCard className="bizcard-tilt">
            <div className="bizcard">
              <span className="bizcard-shine" aria-hidden="true" />
              <span className="bizcard-top">
                <Image src="/assets/vodafone-mark.svg" alt="" width={34} height={34} />
                <span>Vodafone Beratung</span>
              </span>
              <span className="bizcard-name">
                <strong>{site.advisor}</strong>
                <small>{site.role}</small>
              </span>
              <span className="bizcard-meta">
                <span><PhoneCall aria-hidden="true" /> {site.phoneDisplay}</span>
                <span><Mail aria-hidden="true" /> {site.email}</span>
              </span>
              <span className="bizcard-region">Wietze · Celle · Hannover</span>
            </div>
          </TiltCard>
        </div>

        <div className="advisor-copy" data-reveal style={delay(120)}>
          <p className="eyebrow">Dein Ansprechpartner</p>
          <h2 id="advisor-title">Ein Name statt einer Nummer in der Warteschleife.</h2>
          <blockquote className="advisor-quote">
            <p>
              „Ich prüfe, was an deiner Adresse wirklich möglich ist, erkläre dir die Optionen in Ruhe – und bleibe
              erreichbar, auch nach der Bestellung.“
            </p>
            <footer>{site.advisor}, {site.role}</footer>
          </blockquote>
          <ol className="principles">
            {principles.map((item, index) => (
              <li key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="advisor-actions">
            <a className="btn btn-red" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> Jan schreiben
            </a>
            <a className="btn btn-ghost" href={`tel:${site.phone}`}>
              <PhoneCall aria-hidden="true" /> Anrufen
            </a>
          </div>
        </div>
      </div>

      <div className="wrap">
        <dl className="facts" data-reveal>
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.value}</dt>
              <dd>{fact.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- Region */

export function RegionSection() {
  return (
    <section className="section region" id="region" aria-labelledby="region-title">
      <div className="wrap">
        <SectionHead
          id="region-title"
          eyebrow="Wietze · Celle · Hannover"
          title="Persönlich in deiner Region."
          lead={`Wietze, Celle, Hannover und ${locations.length - 3} weitere Orte. Ausbau und Anschlussarten unterscheiden sich schon innerhalb eines Ortes – deshalb wird jede Adresse einzeln geprüft.`}
        />
        <RegionExplorer />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- Guides */

export function GuidesPreview() {
  const featured = [guides[0], guides[1], guides[2]];
  return (
    <section className="section guides-preview" aria-labelledby="guides-title">
      <div className="wrap">
        <SectionHead id="guides-title" eyebrow="Ratgeber" title="Technik, einfach erklärt.">
          <Link className="link-arrow" href="/ratgeber">
            Alle Ratgeber ansehen <ArrowRight aria-hidden="true" />
          </Link>
        </SectionHead>
        <div className="guide-cards">
          {featured.map((guide, index) => (
            <Link
              key={guide.slug}
              href={`/ratgeber/${guide.slug}`}
              className={index === 0 ? "guide-card is-lead" : "guide-card"}
              data-reveal
              style={delay(index * 100)}
            >
              <GuideCover guide={guide} size={index === 0 ? "lg" : "md"} />
              <span className="guide-card-body">
                <strong>{guide.h1}</strong>
                {index === 0 && <span className="guide-card-text">{guide.intro}</span>}
                <span className="guide-card-more">Weiterlesen <ArrowRight aria-hidden="true" /></span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- FAQ */

export function FaqPreview() {
  return (
    <section className="section faq-preview" aria-labelledby="faq-title">
      <div className="wrap faq-layout">
        <div className="faq-side" data-reveal>
          <p className="eyebrow">Häufige Fragen</p>
          <h2 id="faq-title">Gut zu wissen, bevor du anfragst.</h2>
          <p className="lead">Kurze Antworten zu Beratung, Verfügbarkeit und den nächsten Schritten.</p>
          <div className="faq-side-actions">
            <Link className="btn btn-ghost" href="/faq">Alle Fragen ansehen</Link>
            <a className="link-arrow" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
              Eigene Frage stellen <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
        <div data-reveal style={delay(120)}>
          <FaqList items={faqItems.slice(0, 6)} openFirst />
        </div>
      </div>
    </section>
  );
}
