import type { CSSProperties } from "react";
import Image from "next/image";
import { Check, PhoneCall } from "lucide-react";
import { HeroStarter } from "@/components/home/HeroStarter";
import { Icon, WhatsAppIcon } from "@/components/Icons";
import { site } from "@/lib/site";

const checks = [
  { label: "Glasfaser", icon: "fiber" },
  { label: "Kabelinternet", icon: "coax" },
  { label: "DSL", icon: "router" },
  { label: "Mobilfunk & TV", icon: "phone" }
];

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <span className="hero-glow hero-glow-a" />
        <span className="hero-glow hero-glow-b" />
        <span className="hero-grid" />
      </div>

      <div className="wrap hero-layout">
        <div className="hero-copy">
          <p className="hero-badge">
            <span className="pulse-dot" aria-hidden="true" />
            {site.role} · Wietze · Celle · Hannover
          </p>
          <h1 id="hero-title" className="hero-title" aria-label="Vodafone Beratung, persönlich statt Warteschleife.">
            <span className="hero-line" aria-hidden="true"><span>Vodafone Beratung,</span></span>
            <span className="hero-line" aria-hidden="true"><span>persönlich statt</span></span>
            <span className="hero-line" aria-hidden="true">
              <span className="hero-rotator">
                <span>Warteschleife.</span>
                <span>Hotline.</span>
                <span>Tarifchaos.</span>
              </span>
            </span>
          </h1>
          <p className="hero-lead">
            Internet, Glasfaser, Kabel, DSL, Mobilfunk und TV: Jan prüft kostenlos, was an deiner Adresse
            möglich ist – und empfiehlt nur, was wirklich zu deinem Alltag passt.
          </p>
          <HeroStarter />
          <ul className="hero-trust">
            <li><Check aria-hidden="true" /> Kostenlos &amp; unverbindlich</li>
            <li><Check aria-hidden="true" /> Ein fester Ansprechpartner</li>
            <li><Check aria-hidden="true" /> Begleitung bis zur Aktivierung</li>
          </ul>
        </div>

        <div className="hero-visual">
          <figure className="hero-photo">
            <Image
              src="/assets/premium-connectivity-hero.jpg"
              alt="Weißer Router und Smartphone, verbunden durch ein rot leuchtendes Kabel"
              fill
              priority
              sizes="(min-width: 1100px) 46vw, 100vw"
            />
            <span className="hero-photo-shade" aria-hidden="true" />
          </figure>

          <div className="float-card hero-checks">
            <p className="float-label">Deine Prüfung umfasst</p>
            <ul>
              {checks.map((item, index) => (
                <li key={item.label} style={{ "--i": index } as CSSProperties}>
                  <span className="hero-check-icon"><Icon name={item.icon} /></span>
                  <span>{item.label}</span>
                  <span className="hero-check-mark"><Check aria-hidden="true" /></span>
                </li>
              ))}
            </ul>
          </div>

          <div className="float-card hero-advisor">
            <span className="avatar" aria-hidden="true">JM</span>
            <span className="hero-advisor-text">
              <strong>{site.advisor}</strong>
              <small>Dein persönlicher Ansprechpartner</small>
            </span>
            <span className="hero-advisor-actions">
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Jan per WhatsApp schreiben">
                <WhatsAppIcon />
              </a>
              <a href={`tel:${site.phone}`} aria-label="Jan anrufen">
                <PhoneCall aria-hidden="true" />
              </a>
            </span>
          </div>

          <div className="float-card hero-price" aria-hidden="true">
            <strong>0 €</strong>
            <span>für deine<br />Beratung</span>
          </div>
        </div>
      </div>
    </section>
  );
}
