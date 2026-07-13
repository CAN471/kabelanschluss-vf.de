import Link from "next/link";

export default function NotFound() {
  return (
    <section className="sub-hero">
      <p className="eyebrow">404</p>
      <h1>Diese Seite wurde nicht gefunden.</h1>
      <p>Zurück zur Vodafone Beratung oder direkt eine Anfrage stellen.</p>
      <div className="hero-actions">
        <Link className="button button-red" href="/">Zur Startseite</Link>
        <Link className="button button-soft" href="/#kontakt">Beratung anfragen</Link>
      </div>
    </section>
  );
}
