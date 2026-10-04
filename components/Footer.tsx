import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Mail, PhoneCall } from "lucide-react";
import { WhatsAppIcon } from "@/components/Icons";
import { guides, locations, services, shortServiceName, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="ftr">
      <div className="ftr-glow" aria-hidden="true" />
      <div className="wrap">
        <div className="ftr-cta">
          <div>
            <p className="eyebrow eyebrow-on-dark">Kostenlos &amp; unverbindlich</p>
            <p className="ftr-cta-title">
              Lass uns über dein Internet <span>reden.</span>
            </p>
          </div>
          <div className="ftr-cta-actions">
            <a className="btn btn-red btn-lg" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> Per WhatsApp schreiben
            </a>
            <a className="btn btn-glass btn-lg" href={`tel:${site.phone}`}>
              <PhoneCall aria-hidden="true" /> {site.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="ftr-grid">
          <div className="ftr-brand">
            <Link href="/" className="ftr-logo" aria-label="Vodafone Beratung – zur Startseite">
              <Image src="/assets/vodafone-mark.svg" alt="" width={44} height={44} />
              <span>
                <strong>Vodafone Beratung</strong>
                <small>{site.advisor} · {site.role}</small>
              </span>
            </Link>
            <p>
              Persönliche Beratung für Internet, Glasfaser, Kabel je nach Adresse, DSL, Mobilfunk und TV –
              in Wietze, Celle, Hannover und Umgebung.
            </p>
            <div className="ftr-contact">
              <a href={`tel:${site.phone}`}><PhoneCall aria-hidden="true" /> {site.phoneDisplay}</a>
              <a href={`mailto:${site.email}`}><Mail aria-hidden="true" /> {site.email}</a>
            </div>
          </div>

          <div className="ftr-col">
            <h2>Leistungen</h2>
            {services.map((service) => (
              <Link key={service.slug} href={`/${service.slug}`}>{shortServiceName(service)}</Link>
            ))}
          </div>

          <div className="ftr-col">
            <h2>Ratgeber</h2>
            {guides.slice(0, 6).map((guide) => (
              <Link key={guide.slug} href={`/ratgeber/${guide.slug}`}>{guide.h1}</Link>
            ))}
            <Link href="/ratgeber" className="ftr-more">Alle Ratgeber</Link>
          </div>

          <div className="ftr-col ftr-col-region">
            <h2>Region</h2>
            <div>
              {locations.map((location) => (
                <Link key={location.slug} href={`/${location.slug}`}>{location.name}</Link>
              ))}
            </div>
          </div>
        </div>

        <div className="ftr-bottom">
          <div className="ftr-legal">
            <Link href="/impressum">Impressum</Link>
            <Link href="/datenschutz">Datenschutz</Link>
            <Link href="/faq">FAQ</Link>
          </div>
          <p className="ftr-note">
            {site.advisor} ist {site.role}. Dies ist keine offizielle Website der Vodafone GmbH.
            Preise, Aktionen und Verfügbarkeit werden individuell je Adresse geprüft.
          </p>
          <a className="ftr-credit" href="https://lunavo.media" target="_blank" rel="noopener noreferrer">
            Design &amp; Entwicklung <strong>lunavo.media</strong>
          </a>
          <a className="ftr-top" href="#top" aria-label="Zum Seitenanfang">
            <ArrowUp aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
