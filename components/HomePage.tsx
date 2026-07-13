import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/Icons";
import {
  AdviceVsHotlineStory,
  HfcNetworkStory,
  RegionStory,
  RequestProcessStory,
  TariffChaosStory
} from "@/components/scroll-stories";
import { faqItems, guides, locations, services, site } from "@/lib/site";

const advicePrinciples = [
  {
    number: "01",
    title: "Erst verstehen",
    text: "Adresse, Haushalt und Nutzung kommen vor der Tarifempfehlung."
  },
  {
    number: "02",
    title: "Dann einordnen",
    text: "Kabel, Glasfaser, DSL, Mobilfunk und TV werden verständlich sortiert."
  },
  {
    number: "03",
    title: "Persönlich begleiten",
    text: "Ein direkter Ansprechpartner bleibt bis zur Aktivierung erreichbar."
  }
];

export function HomePage() {
  const featuredGuides = [guides[0], guides[1], guides[2]];

  return (
    <>
      <section className="vf-hero-v3" id="start">
        <Image
          className="vf-hero-v3-image"
          src="/assets/home-router-editorial-v2.jpg"
          alt="Internetrouter und Smartphone in einem hellen Wohnraum"
          fill
          priority
          sizes="100vw"
        />
        <div className="vf-hero-v3-overlay" aria-hidden="true" />
        <div className="vf-hero-v3-content">
          <p className="vf-hero-kicker">Jan Mirzo · Persönlicher Ansprechpartner</p>
          <h1
            className="vf-hero-animated-title"
            aria-label="Vodafone Beratung. Persönlich statt Hotline."
          >
            <span className="vf-hero-brand-line" aria-hidden="true">Vodafone Beratung.</span>
            <span className="vf-hero-title-fixed" aria-hidden="true">Persönlich statt</span>
            <span className="vf-hero-title-rotator" aria-hidden="true">
              <span className="vf-hero-word">Hotline.</span>
              <span className="vf-hero-word">Warteschleife.</span>
              <span className="vf-hero-word">Tarifchaos.</span>
            </span>
          </h1>
          <p>
            Internet, Glasfaser, DSL, Mobilfunk und TV – kostenlos beraten,
            verständlich erklärt und persönlich begleitet.
          </p>
          <div className="vf-hero-actions">
            <Link className="button button-red" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
              Per WhatsApp beraten lassen
            </Link>
            <Link className="button vf-button-glass" href="/#kontakt">
              Verfügbarkeit prüfen
            </Link>
          </div>
        </div>
        <div className="vf-hero-check" aria-label="Von der Adresse zur persönlichen Empfehlung">
          <span>Deine Anfrage</span>
          <ol>
            <li><strong>01</strong> Adresse</li>
            <li><strong>02</strong> Möglichkeiten</li>
            <li><strong>03</strong> Empfehlung</li>
          </ol>
        </div>
        <div className="vf-hero-v3-bottom">
          <span>Wietze · Celle · Hannover · Umgebung</span>
          <div>
            <span><Icon name="advice" /> Kostenlose Beratung</span>
            <span><Icon name="callback" /> Direkter Kontakt</span>
            <span><Icon name="shield" /> Begleitung bis zur Aktivierung</span>
          </div>
        </div>
      </section>

      <section className="vf-manifesto" id="beratung">
        <div className="vf-manifesto-heading">
          <p className="eyebrow">Persönliche Beratung</p>
          <h2>Ein Ansprechpartner. Klare Antworten.</h2>
        </div>
        <div className="vf-manifesto-copy">
          <p>
            Wir prüfen, was an deiner Adresse möglich ist, und ordnen die Optionen passend
            zu deinem Haushalt und deiner Nutzung ein.
          </p>
          <Link href={`tel:${site.phone}`}>Jan direkt anrufen · {site.phoneDisplay}</Link>
        </div>
        <div className="vf-principles">
          {advicePrinciples.map((item) => (
            <article key={item.number}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <TariffChaosStory />

      <section className="vf-service-index" id="leistungen">
        <header>
          <p className="eyebrow">Beratungsbereiche</p>
          <h2>Internet. Mobilfunk. TV. Passend zu deinem Alltag.</h2>
          <p>
            Wir betrachten Verfügbarkeit und Nutzung gemeinsam – ohne unnötigen Tarifdschungel.
          </p>
        </header>
        <div className="vf-service-list">
          {services.slice(0, 6).map((service, index) => (
            <Link href={`/${service.slug}`} key={service.slug}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <Icon name={service.icon} />
              <div>
                <h3>{service.h1}</h3>
                <p>{service.points[0]}</p>
              </div>
              <strong aria-hidden="true">↗</strong>
            </Link>
          ))}
        </div>
      </section>

      <HfcNetworkStory />

      <AdviceVsHotlineStory />

      <RequestProcessStory />

      <section className="vf-editorial-guides">
        <header>
          <div>
            <p className="eyebrow">Ratgeber</p>
            <h2>Technik einfach erklärt.</h2>
          </div>
          <Link href="/ratgeber">Alle Themen ansehen</Link>
        </header>
        <div className="vf-editorial-grid">
          {featuredGuides.map((guide, index) => (
            <Link href={`/ratgeber/${guide.slug}`} key={guide.slug} className={index === 0 ? "is-lead" : ""}>
              <figure>
                <Image src={guide.image} alt={guide.imageAlt} fill sizes={index === 0 ? "(min-width: 900px) 58vw, 100vw" : "(min-width: 900px) 28vw, 100vw"} />
              </figure>
              <div>
                <span>{guide.category}</span>
                <h3>{guide.h1}</h3>
                {index === 0 && <p>{guide.intro}</p>}
                <strong>Weiterlesen ↗</strong>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <RegionStory locations={locations} />

      <section className="vf-faq-preview" aria-labelledby="faq-preview-title">
        <header>
          <div>
            <p className="eyebrow">Häufige Fragen</p>
            <h2 id="faq-preview-title">Gut zu wissen, bevor du anfragst.</h2>
          </div>
          <p>Kurze Antworten zu Beratung, Verfügbarkeit und den nächsten Schritten.</p>
        </header>
        <div className="vf-faq-preview-list">
          {faqItems.slice(0, 5).map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
        <Link className="vf-text-link" href="/faq">Alle Fragen ansehen <span aria-hidden="true">↗</span></Link>
      </section>

      <section className="vf-contact-shell">
        <ContactForm />
      </section>
    </>
  );
}
