import Image from "next/image";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { guides, locations, services, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Image src="/assets/vodafone-mark.svg" alt="Vodafone Logo" width={54} height={54} />
          <div>
            <strong>Vodafone Beratung</strong>
            <p>Persönliche Vodafone Beratung für Internet, Glasfaser, Kabel je nach Adresse, DSL, Mobilfunk und TV.</p>
          </div>
        </div>
        <Link className="button button-red footer-cta" href="/#kontakt">
          Verfügbarkeit prüfen lassen
        </Link>
      </div>

      <div className="footer-grid">
        <div>
          <h2>Leistungen</h2>
          {services.map((service) => (
            <Link key={service.slug} href={`/${service.slug}`}>{service.h1}</Link>
          ))}
        </div>
        <div>
          <h2>Ratgeber</h2>
          {guides.slice(0, 6).map((guide) => (
            <Link key={guide.slug} href={`/ratgeber/${guide.slug}`}>{guide.h1}</Link>
          ))}
          <Link href="/ratgeber">Alle Ratgeber</Link>
        </div>
        <div>
          <h2>Region</h2>
          {locations.slice(0, 9).map((location) => (
            <Link key={location.slug} href={`/${location.slug}`}>Vodafone Beratung {location.name}</Link>
          ))}
          <Link href="/#region">Alle Orte ansehen</Link>
        </div>
        <div>
          <h2>Kontakt</h2>
          <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <Link href="/faq">FAQ</Link>
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-copy">
          <span>Persönliche Vodafone Beratung · Region Wietze, Celle, Hannover und Umgebung</span>
          <span>Keine offizielle Vodafone-Konzernseite. Beratung und Vertriebspartner-Kommunikation.</span>
        </div>
        <a
          className="footer-credit"
          href="https://lunavo.media"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Website von Lunavo Media öffnen"
        >
          <span>Design &amp; Entwicklung</span>
          <strong>lunavo.media</strong>
        </a>
        <Link className="footer-back-top" href="#main-content" aria-label="Zum Seitenanfang" title="Zum Seitenanfang">
          <ArrowUp aria-hidden="true" />
        </Link>
      </div>
    </footer>
  );
}
