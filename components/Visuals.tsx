import type { CSSProperties } from "react";
import { Check, Clock3, X } from "lucide-react";
import { ConnectionPath } from "@/components/ConnectionPath";
import { Icon } from "@/components/Icons";

/** Querschnitt eines Koaxialkabels mit beschrifteten Schichten. */
export function CoaxCrossSection() {
  const layers = [
    { label: "Kabelmantel", text: "Schützt das Kabel von außen", className: "is-jacket" },
    { label: "Schirmung", text: "Folie und Geflecht gegen Störungen", className: "is-shield" },
    { label: "Dielektrikum", text: "Isoliert den Innenleiter", className: "is-dielectric" },
    { label: "Innenleiter", text: "Transportiert das Signal", className: "is-core" }
  ];
  return (
    <figure className="coax-figure">
      <div className="coax-visual" aria-hidden="true">
        <svg viewBox="0 0 640 220">
          <defs>
            <pattern id="coax-braid" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="10" height="10" fill="#e7e1d9" />
              <path d="M0 5h10" stroke="#a59c90" strokeWidth="3" />
            </pattern>
          </defs>
          <rect x="10" y="40" width="300" height="140" rx="70" className="coax-jacket" />
          <rect x="230" y="56" width="210" height="108" rx="54" fill="url(#coax-braid)" />
          <rect x="380" y="70" width="150" height="80" rx="40" className="coax-dielectric" />
          <rect x="480" y="100" width="150" height="20" rx="10" className="coax-core" />
          <circle cx="612" cy="110" r="9" className="coax-signal" />
        </svg>
      </div>
      <ol className="coax-legend">
        {layers.map((layer, index) => (
          <li key={layer.label} className={layer.className}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{layer.label}</strong>
            <small>{layer.text}</small>
          </li>
        ))}
      </ol>
      <figcaption>Koaxialkabel sind deutlich dicker und stärker abgeschirmt als eine klassische Telefonleitung.</figcaption>
    </figure>
  );
}

/** Internet, Mobilfunk und TV als drei Kreise um den Haushalt. */
export function ComboVisual({ highlight }: { highlight?: "internet" | "mobilfunk" | "tv" }) {
  const circles = [
    { id: "internet", label: "Internet", sub: "zuhause", icon: "wifi" },
    { id: "mobilfunk", label: "Mobilfunk", sub: "unterwegs", icon: "phone" },
    { id: "tv", label: "TV & GigaTV", sub: "im Wohnzimmer", icon: "tv" }
  ];
  return (
    <figure className="combo-visual">
      <div className="combo-rings">
        {circles.map((circle) => (
          <div
            key={circle.id}
            className={["combo-ring", `combo-${circle.id}`, highlight === circle.id ? "is-active" : ""].filter(Boolean).join(" ")}
          >
            <Icon name={circle.icon} />
            <strong>{circle.label}</strong>
            <small>{circle.sub}</small>
          </div>
        ))}
        <div className="combo-core">
          <Icon name="users" />
          <span>Dein Haushalt</span>
        </div>
      </div>
      <figcaption>Kombiniert wird nur, was im Alltag wirklich zusammen passt – jedes Thema kann auch einzeln beraten werden.</figcaption>
    </figure>
  );
}

/** Von der Adresse zur persönlichen Rückmeldung. */
export function AvailabilityVisual() {
  const steps = [
    { icon: "pin", title: "Adresse", text: "PLZ, Ort, Straße und Hausnummer" },
    { icon: "check", title: "Persönliche Prüfung", text: "Netz, Gebäude und Produktwunsch" },
    { icon: "advice", title: "Rückmeldung", text: "Verständlich und mit Empfehlung" }
  ];
  const technologies = [
    { label: "Glasfaser", icon: "fiber" },
    { label: "Kabel", icon: "coax" },
    { label: "DSL", icon: "router" },
    { label: "Mobilfunk", icon: "phone" }
  ];
  return (
    <figure className="avail-visual">
      <div className="avail-address">
        <span className="avail-pin"><Icon name="pin" /></span>
        <span>
          <small>Deine Adresse</small>
          <strong>Musterstraße 1 · 29323 Wietze</strong>
        </span>
      </div>
      <ol className="avail-steps">
        {steps.map((step, index) => (
          <li key={step.title} style={{ "--i": index } as CSSProperties}>
            <span className="avail-step-icon"><Icon name={step.icon} /></span>
            <span>
              <strong>{step.title}</strong>
              <small>{step.text}</small>
            </span>
          </li>
        ))}
      </ol>
      <div className="avail-tech">
        {technologies.map((tech) => (
          <span key={tech.label}>
            <Icon name={tech.icon} />
            {tech.label}
            <em>je Adresse</em>
          </span>
        ))}
      </div>
      <figcaption>Beispielhafte Darstellung – keine automatische Live-Prüfung, sondern persönliche Einordnung.</figcaption>
    </figure>
  );
}

/** Typische Nutzungsprofile und worauf es dabei ankommt. */
export function UsageGrid() {
  const profiles = [
    { icon: "users", title: "Familie", text: "Viele Geräte gleichzeitig, stabiles WLAN in allen Räumen." },
    { icon: "office", title: "Homeoffice", text: "Zuverlässiger Upload, Videocalls und LAN am Arbeitsplatz." },
    { icon: "stream", title: "Streaming", text: "Mehrere Streams parallel, TV und Smart-TV im Blick." },
    { icon: "gaming", title: "Gaming", text: "Stabile Verbindung und kurze Reaktionszeiten zählen." },
    { icon: "laptop", title: "Surfen & Mails", text: "Solider Anschluss ohne Überdimensionierung." },
    { icon: "home", title: "Smart Home", text: "Viele kleine Geräte, die dauerhaft online sind." }
  ];
  return (
    <div className="usage-grid">
      {profiles.map((profile) => (
        <div key={profile.title}>
          <span><Icon name={profile.icon} /></span>
          <strong>{profile.title}</strong>
          <p>{profile.text}</p>
        </div>
      ))}
    </div>
  );
}

/** Vom Hausübergabepunkt bis zu den Geräten. */
export function HouseConnectionDiagram() {
  return (
    <figure className="diagram-card">
      <header>
        <span className="diagram-kicker"><Icon name="home" /> Im Gebäude</span>
      </header>
      <ConnectionPath
        nodes={[
          { icon: "hup", label: "HÜP", sub: "Hausübergabepunkt" },
          { icon: "coax", label: "Hausverkabelung", sub: "zur Wohnung" },
          { icon: "outlet", label: "Multimediadose", sub: "im Wohnraum" },
          { icon: "router", label: "Kabelrouter", sub: "WLAN & LAN" },
          { icon: "laptop", label: "Geräte", sub: "Laptop, TV, Smartphone" }
        ]}
        segments={["coax", "coax", "coax", "home"]}
      />
      <figcaption>Der HÜP sitzt häufig im Keller oder Technikbereich und markiert den Übergang vom Netz ins Gebäude.</figcaption>
    </figure>
  );
}

/** Kompakter Vergleich Hotline vs. persönliche Beratung. */
export function HotlineMini() {
  return (
    <div className="hotline-mini">
      <div className="hotline-mini-card">
        <p><Clock3 aria-hidden="true" /> Hotline</p>
        <ul>
          <li><X aria-hidden="true" /> Warteschleife</li>
          <li><X aria-hidden="true" /> Alles neu erklären</li>
          <li><X aria-hidden="true" /> Wechselnde Zuständigkeit</li>
        </ul>
      </div>
      <div className="hotline-mini-card is-personal">
        <p><span className="avatar avatar-light" aria-hidden="true">JM</span> Persönlich</p>
        <ul>
          <li><Check aria-hidden="true" /> Direkter Ansprechpartner</li>
          <li><Check aria-hidden="true" /> Adresse und Bedarf im Blick</li>
          <li><Check aria-hidden="true" /> Begleitung bis zur Aktivierung</li>
        </ul>
      </div>
    </div>
  );
}
