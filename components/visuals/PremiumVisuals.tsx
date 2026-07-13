import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Icon } from "@/components/Icons";
import type { LocationPage } from "@/lib/site";

type ActiveProps = { active?: number };

const hfcStations = [
  { title: "Internet", text: "Backbone", icon: "signal", x: "7%", y: "48%", line: "fiber" },
  { title: "Glasfaser", text: "weite Strecke", icon: "fiber", x: "22%", y: "28%", line: "fiber" },
  { title: "Hub", text: "regionaler Knoten", icon: "node", x: "39%", y: "38%", line: "fiber" },
  { title: "Fiber Node", text: "Verteilung", icon: "node", x: "55%", y: "22%", line: "fiber" },
  { title: "Verstärker", text: "Signal stabilisieren", icon: "amplifier", x: "66%", y: "48%", line: "coax" },
  { title: "Koax", text: "zum Gebäude", icon: "coax", x: "78%", y: "64%", line: "coax" },
  { title: "HÜP", text: "Keller", icon: "hup", x: "88%", y: "42%", line: "home" },
  { title: "Dose", text: "Wohnraum", icon: "outlet", x: "73%", y: "19%", line: "home" },
  { title: "Router", text: "WLAN / LAN", icon: "router", x: "88%", y: "16%", line: "home" }
];

export function HeroConsultingVisual() {
  return (
    <div className="premium-hero-visual" aria-label="Adresse prüfen, Bedarf klären, Empfehlung erhalten">
      <div className="hero-visual-grid" />
      <svg className="hero-signal" viewBox="0 0 720 420" aria-hidden="true">
        <path d="M70 310 C190 120 315 365 450 185 S610 115 665 250" />
        <circle cx="70" cy="310" r="10" />
        <circle cx="450" cy="185" r="10" />
        <circle cx="665" cy="250" r="10" />
      </svg>
      <div className="hero-device hero-device-house">
        <Icon name="home" />
        <span>Adresse</span>
      </div>
      <div className="hero-device hero-device-router">
        <Icon name="router" />
        <span>Router</span>
      </div>
      <div className="hero-device hero-device-pin">
        <Icon name="pin" />
        <span>Region</span>
      </div>
      <div className="hero-check-card">
        <p>Kostenlose Beratung</p>
        <h3>Adresse prüfen. Bedarf klären. Empfehlung erhalten.</h3>
        <div>
          <span>Internet</span>
          <span>Glasfaser</span>
          <span>Kabel</span>
          <span>Mobilfunk</span>
          <span>TV</span>
        </div>
      </div>
      <div className="hero-logo-orbit">
        <Image src="/assets/vodafone-logo.svg" alt="" width={72} height={72} priority />
      </div>
    </div>
  );
}

export function HFCSignalFlowVisual({ active = 0 }: ActiveProps) {
  const station = hfcStations[Math.min(active, hfcStations.length - 1)];
  const progress = `${(Math.min(active, hfcStations.length - 1) / (hfcStations.length - 1)) * 100}%`;

  return (
    <div className="hfc-signal-visual" aria-label="Signalweg im Kabel-Glasfaser-Hybridnetz">
      <header className="hfc-visual-heading">
        <span>{station.line === "fiber" ? "Glasfaserstrecke" : station.line === "coax" ? "Koaxialer Abschnitt" : "Im Gebäude"}</span>
        <div>
          <Icon name={station.icon} />
          <h3>{station.title}</h3>
        </div>
        <p>{station.text}</p>
      </header>

      <div className="hfc-journey">
        <div className="hfc-journey-line" aria-hidden="true">
          <span style={{ width: progress }} />
        </div>
        {hfcStations.map((item, index) => (
          <article
            key={item.title}
            className={[
              `is-${item.line}`,
              index <= active ? "is-past" : "",
              index === active ? "is-active" : ""
            ].filter(Boolean).join(" ")}
          >
            <span><Icon name={item.icon} /></span>
            <b>{item.title}</b>
            <small>{item.text}</small>
          </article>
        ))}
      </div>

      <div className="hfc-legend">
        <span><b className="legend-red" /> Glasfaserstrecke</span>
        <span><b className="legend-black" /> Koaxialer Abschnitt</span>
        <span><b className="legend-soft" /> Zuhause</span>
      </div>
    </div>
  );
}

export function HFCArticleLeadVisual() {
  const phases = [
    { label: "Glasfaser", detail: "Backbone bis Fiber Node", icon: "fiber", tone: "fiber" },
    { label: "Koax", detail: "Letzter Netzabschnitt", icon: "coax", tone: "coax" },
    { label: "Zuhause", detail: "HÜP, Dose und Router", icon: "router", tone: "home" }
  ];

  return (
    <div className="hfc-lead-visual" aria-label="Kabelinternet verbindet Glasfaserstrecke, Koaxialkabel und das Heimnetz">
      <header>
        <span>Hybrid Fiber Coax</span>
        <strong>Ein Netz. Drei klar getrennte Abschnitte.</strong>
      </header>
      <div className="hfc-lead-route">
        {phases.map((phase, index) => (
          <article className={`is-${phase.tone}`} key={phase.label}>
            <div><Icon name={phase.icon} /></div>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{phase.label}</strong>
            <small>{phase.detail}</small>
          </article>
        ))}
      </div>
      <p>Große Strecken laufen über Glasfaser. Je nach Ausbau folgt Koaxialkabel bis ins Gebäude.</p>
    </div>
  );
}

export function CableCrossSectionVisual() {
  return (
    <div className="cable-cross-visual" aria-label="Aufbau eines Koaxialkabels">
      <svg viewBox="0 0 780 360" role="img">
        <defs>
          <linearGradient id="coaxOuter" x1="0" x2="1">
            <stop offset="0%" stopColor="#e60000" />
            <stop offset="100%" stopColor="#9b0000" />
          </linearGradient>
          <pattern id="shield" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
            <path d="M0 8h16" stroke="#9d9d9d" strokeWidth="4" />
          </pattern>
        </defs>
        <path d="M40 150h318c36 0 60 28 60 60s-24 60-60 60H40z" fill="url(#coaxOuter)" />
        <path d="M360 130h150c48 0 86 38 86 86s-38 86-86 86H360c35-38 35-134 0-172Z" fill="url(#shield)" stroke="#d7d7d7" strokeWidth="3" />
        <path d="M510 155h120c34 0 61 27 61 61s-27 61-61 61H510c26-32 26-90 0-122Z" fill="#eeeeee" stroke="#cfcfcf" strokeWidth="3" />
        <path d="M610 182h96c18 0 33 15 33 33s-15 33-33 33h-96z" fill="#1a1a1a" />
        <path d="M650 202h100" stroke="#e60000" strokeWidth="9" strokeLinecap="round" />
        {[
          ["Kabelmantel", 160, 85, 210, 145],
          ["Schirmung", 455, 70, 475, 132],
          ["Dielektrikum", 590, 86, 625, 158],
          ["Innenleiter", 685, 310, 707, 235]
        ].map(([label, x, y, lx, ly]) => (
          <g key={label as string}>
            <path d={`M${x} ${y} L${lx} ${ly}`} stroke="#e60000" strokeWidth="2" strokeDasharray="6 6" />
            <text x={x as number} y={y as number - 12} textAnchor="middle">{label}</text>
          </g>
        ))}
      </svg>
      <p>Koaxialkabel bestehen aus Innenleiter, Dielektrikum, Schirmung und Kabelmantel.</p>
    </div>
  );
}

export function FiberVsCableVisual({ active = 0 }: ActiveProps) {
  return (
    <div className="compare-premium-visual">
      <article className={active < 2 ? "is-active" : ""}>
        <Icon name="coax" />
        <h3>Kabelinternet</h3>
        <p>Glasfaser bis zum Knoten, danach je nach Ausbau Koaxialkabel bis ins Gebäude.</p>
        <div className="path-row"><b /> <span>Glasfaser</span><b className="path-dark" /> <span>Koax</span></div>
      </article>
      <article className={active >= 2 ? "is-active" : ""}>
        <Icon name="fiber" />
        <h3>Glasfaser</h3>
        <p>Je nach Ausbau näher bis ans Gebäude oder direkt in den Anschlussbereich.</p>
        <div className="path-row"><b /> <span>Lichtsignal</span><b /> <span>Hausanschluss</span></div>
      </article>
    </div>
  );
}

export function AvailabilityCheckVisual({ active = 0 }: ActiveProps) {
  const steps = [
    ["Adresse", "PLZ, Ort und Hausnummer", "pin"],
    ["Möglichkeiten", "Netz, Gebäude und Produkt", "check"],
    ["Rückmeldung", "Verständlich und persönlich", "advice"]
  ];
  const technologies = [
    ["Glasfaser", "fiber"],
    ["Kabel", "coax"],
    ["DSL", "signal"]
  ];

  return (
    <div className="availability-visual" aria-label="Von der Adresse zur persönlichen Rückmeldung">
      <div className="availability-console">
        <header className="availability-console-header">
          <span><i /> Persönlich geprüft</span>
          <strong>Kostenlos &amp; unverbindlich</strong>
        </header>

        <div className="availability-address-card">
          <span className="availability-address-icon"><Icon name="pin" /></span>
          <div>
            <small>Dein Standort</small>
            <strong>PLZ · Ort · Straße · Hausnummer</strong>
          </div>
          <b>01</b>
        </div>

        <div className="availability-progress" aria-hidden="true">
          <span className="is-active"><b>1</b><small>Adresse</small></span>
          <i />
          <span className={active >= 1 ? "is-active" : ""}><b>2</b><small>Prüfung</small></span>
          <i />
          <span className={active >= 2 ? "is-active" : ""}><b>3</b><small>Antwort</small></span>
        </div>

        <div className="availability-tech-grid">
          {technologies.map(([label, icon]) => (
            <article key={label}>
              <Icon name={icon} />
              <strong>{label}</strong>
              <small>je Adresse</small>
            </article>
          ))}
        </div>

        <footer className="availability-console-footer">
          <Icon name="advice" />
          <p>
            <span>Persönliche Rückmeldung</span>
            <strong>Jan erklärt dir, was an deinem Standort möglich ist.</strong>
          </p>
        </footer>
      </div>

      <div className="availability-steps">
        {steps.map(([title, text, icon], index) => (
          <article
            key={title}
            className={index === active ? "is-current" : index < active ? "is-complete" : ""}
          >
            <div>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <Icon name={icon} />
            </div>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export function RegionSignalMapVisual({ locations, active = 0 }: { locations: LocationPage[]; active?: number }) {
  const main = ["Wietze", "Celle", "Hannover"];
  const surrounding = locations.filter((location) => !main.includes(location.name));

  return (
    <div className="region-map-visual">
      <div className="region-map-canvas">
        <svg viewBox="0 0 760 500" role="img" aria-label="Beratung in Wietze, Celle, Hannover und Umgebung">
          <g className="region-contours" aria-hidden="true">
            <path d="M20 116C125 48 245 78 336 38s227-5 402 92" />
            <path d="M4 226c118-82 209-28 314-76s258-41 432 58" />
            <path d="M10 342c140-67 224-31 329-71s251-28 408 69" />
            <path d="M65 448c117-56 210-18 305-55s199-32 319 20" />
          </g>
          <path className={active >= 1 ? "region-route is-active" : "region-route"} d="M166 194C246 156 302 159 362 187S492 286 586 338" />
          <path className={active >= 1 ? "region-route region-route-branch is-active" : "region-route region-route-branch"} d="M362 187C414 244 447 274 488 298" />

          <g className="region-town town-wietze" transform="translate(166 194)">
            <circle r="11" /><circle className="pulse" r="27" />
            <text x="0" y="-28">Wietze</text>
          </g>
          <g className="region-town" transform="translate(362 187)">
            <circle r="10" />
            <text x="0" y="-26">Celle</text>
          </g>
          <g className="region-town" transform="translate(586 338)">
            <circle r="10" />
            <text x="0" y="32">Hannover</text>
          </g>

          <g className="region-minor-towns">
            <g transform="translate(240 226)"><circle r="5" /><text x="10" y="4">Hambühren</text></g>
            <g transform="translate(129 279)"><circle r="5" /><text x="10" y="4">Winsen (Aller)</text></g>
            <g transform="translate(432 111)"><circle r="5" /><text x="10" y="4">Bergen</text></g>
            <g transform="translate(509 258)"><circle r="5" /><text x="10" y="4">Burgwedel</text></g>
            <g transform="translate(548 403)"><circle r="5" /><text x="10" y="4">Langenhagen</text></g>
            <g transform="translate(328 344)"><circle r="5" /><text x="10" y="4">Wedemark</text></g>
          </g>
        </svg>
        <div className="region-map-caption">
          <span>Direkt erreichbar</span>
          <strong>{locations.length} Orte in der Region</strong>
        </div>
      </div>

      <div className="region-link-list">
        <span>Weitere Orte</span>
        <div>
          {surrounding.map((location) => (
            <Link href={`/${location.slug}`} key={location.slug}>{location.name}<b aria-hidden="true">↗</b></Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HotlineVsAdviceVisual({ active = 0 }: ActiveProps) {
  const split = ["76%", "62%", "44%", "30%"][Math.min(active, 3)];
  const positive = [
    "Direkter Kontakt",
    "Rückruf ohne Warteschleife",
    "Verständliche Einschätzung",
    "Begleitung bis zur Aktivierung"
  ];

  return (
    <div className="hotline-advice-visual" style={{ "--hotline-split": split } as CSSProperties}>
      <article className="hotline-side">
        <div className="hotline-status">
          <Icon name="callback" />
          <span>Bitte warten</span>
        </div>
        <strong>Hotline</strong>
        <p>warten · wiederholen · weiterverbinden</p>
        <div className="hotline-wave" aria-hidden="true">
          {Array.from({ length: 18 }, (_, index) => <span key={index} style={{ "--wave": index } as CSSProperties} />)}
        </div>
      </article>

      <div className="hotline-reveal-line" aria-hidden="true" />

      <article className="advice-side">
        <div className="advice-person">
          <span>JM</span>
          <div><strong>Jan Mirzo</strong><small>Persönlicher Ansprechpartner</small></div>
        </div>
        <ul>
          {positive.map((item, index) => (
            <li key={item} className={index <= active ? "is-active" : ""}>
              <Icon name="check" /> {item}
            </li>
          ))}
        </ul>
        <div className="advice-message">
          <Icon name="advice" />
          <span>„Ich schaue mir deine Adresse und deinen Bedarf persönlich an.“</span>
        </div>
      </article>
    </div>
  );
}

export function RequestProcessVisual({ active = 0 }: ActiveProps) {
  const steps = [
    ["Anfrage", "advice"],
    ["Bedarf", "home"],
    ["Prüfung", "check"],
    ["Empfehlung", "signal"],
    ["Bestellung", "shield"],
    ["Aktivierung", "router"]
  ];

  return (
    <div className="request-process-visual">
      <div className="process-line">
        {steps.map((step, index) => <span key={step[0]} className={index <= active ? "is-active" : ""} />)}
      </div>
      <div className="process-orbit">
        {steps.map(([label, icon], index) => (
          <article key={label} className={index === active ? "is-active" : ""}>
            <Icon name={icon} />
            <span>{label}</span>
          </article>
        ))}
      </div>
    </div>
  );
}

export function TariffSortVisual({ active = 0 }: ActiveProps) {
  const chips = ["Kabel", "Glasfaser", "DSL", "Mobilfunk", "TV", "Kombi", "Adresse", "Router", "Verfügbarkeit"];
  const phases = [
    ["Adresse", "Gebäude und Ausbau", "pin"],
    ["Nutzung", "Alltag und Geräte", "home"],
    ["Anschluss", "Kabel, Glasfaser oder DSL", "signal"],
    ["Empfehlung", "Persönlich und verständlich", "advice"]
  ];
  const titles = [
    "Viele Begriffe. Keine klare Richtung.",
    "Zuerst zählt die Adresse.",
    "Dann zählt dein Alltag.",
    "Anschlussart prüfen.",
    "Klare Empfehlung."
  ];
  const context = [
    null,
    { icon: "pin", label: "Standort", title: "Adresse und Gebäude", details: ["Ort", "Hausanschluss", "Ausbaustand"] },
    { icon: "home", label: "Alltag", title: "So nutzt du Internet", details: ["Homeoffice", "Streaming", "Geräte"] },
    { icon: "signal", label: "Technik", title: "Mögliche Anschlussart", details: ["Kabel", "Glasfaser", "DSL"] },
    null
  ][active] as null | { icon: string; label: string; title: string; details: string[] };

  return (
    <div className={`tariff-sort-visual tariff-phase-${active}`}>
      <header className="tariff-visual-heading">
        <span>Schritt {String(active + 1).padStart(2, "0")}</span>
        <h3>{titles[active]}</h3>
      </header>

      <div className={active === 0 ? "chaos-chips is-active" : "chaos-chips"}>
        {chips.map((chip, index) => <span key={chip} style={{ "--i": index } as CSSProperties}>{chip}</span>)}
      </div>

      <div className={active === 0 ? "tariff-decision-route" : "tariff-decision-route is-visible"}>
        <span className="tariff-route-line" aria-hidden="true">
          <b style={{ height: `${Math.max(0, ((active - 1) / 3) * 100)}%` }} />
        </span>
        {phases.map(([title, text, icon], index) => (
          <article key={title} className={index < active ? "is-active" : ""}>
            <span><Icon name={icon} /></span>
            <div>
              <b>{title}</b>
              <small>{text}</small>
            </div>
          </article>
        ))}
      </div>

      {context && (
        <aside className="tariff-context">
          <Icon name={context.icon} />
          <span>{context.label}</span>
          <strong>{context.title}</strong>
          <div>{context.details.map((detail) => <small key={detail}>{detail}</small>)}</div>
        </aside>
      )}

      <div className={active === 4 ? "tariff-result is-visible" : "tariff-result"}>
        <Icon name="check" />
        <div>
          <span>Persönliche Rückmeldung</span>
          <strong>Passende Empfehlung statt Tarifdschungel.</strong>
        </div>
      </div>
    </div>
  );
}
