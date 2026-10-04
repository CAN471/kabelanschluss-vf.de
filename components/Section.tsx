import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ChevronRight, PhoneCall } from "lucide-react";
import { WhatsAppIcon } from "@/components/Icons";
import { site } from "@/lib/site";

export function SectionHead({
  eyebrow,
  title,
  lead,
  align = "split",
  id,
  children
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "split" | "center" | "stack";
  id?: string;
  children?: ReactNode;
}) {
  return (
    <header className={`shead shead-${align}`} data-reveal>
      <div className="shead-main">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id}>{title}</h2>
      </div>
      {(lead || children) && (
        <div className="shead-side">
          {lead && <p className="lead">{lead}</p>}
          {children}
        </div>
      )}
    </header>
  );
}

export function Breadcrumbs({ items }: { items: Array<{ name: string; href?: string }> }) {
  return (
    <nav className="crumbs" aria-label="Brotkrumen">
      <ol>
        {items.map((item, index) => (
          <li key={item.name}>
            {item.href && index < items.length - 1 ? <Link href={item.href}>{item.name}</Link> : <span aria-current="page">{item.name}</span>}
            {index < items.length - 1 && <ChevronRight aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function CtaBand({
  title = "Bereit für eine klare Empfehlung?",
  text = "Schick Jan deine Adresse und dein Anliegen – du bekommst eine persönliche, verständliche Rückmeldung."
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="wrap cta-band-wrap">
      <div className="cta-band" data-reveal>
        <span className="cta-band-mark" aria-hidden="true" />
        <div>
          <p className="eyebrow eyebrow-on-red">Kostenlose Beratung</p>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="cta-band-actions">
          <Link className="btn btn-white btn-lg" href="#kontakt">
            Beratung starten <ArrowRight aria-hidden="true" />
          </Link>
          <a className="btn btn-on-red btn-lg" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon /> WhatsApp
          </a>
          <a className="cta-band-phone" href={`tel:${site.phone}`}>
            <PhoneCall aria-hidden="true" /> {site.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
