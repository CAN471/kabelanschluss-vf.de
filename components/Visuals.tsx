import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icons";
import {
  AvailabilityCheckVisual,
  FiberVsCableVisual,
  HFCSignalFlowVisual,
  HotlineVsAdviceVisual,
  RequestProcessVisual,
  TariffSortVisual
} from "@/components/visuals/PremiumVisuals";
import { assets } from "@/lib/site";

const hfcSteps = [
  ["Internet / Backbone", "Große Datenstrecken", "signal"],
  ["Glasfaser", "Bis Hub / Verteiler", "fiber"],
  ["Fiber Node", "Übergang ins Kabelnetz", "node"],
  ["Verstärker", "Stabilisierung im Netz", "amplifier"],
  ["Koaxialkabel", "Letzter Abschnitt", "coax"],
  ["HÜP", "Hausübergabepunkt", "hup"],
  ["Multimediadose", "Kabeldose im Haus", "outlet"],
  ["Kabelrouter", "WLAN / LAN", "router"]
];

export function HfcFlow({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "hfc-flow hfc-flow-compact flow-visual" : "hfc-flow flow-visual"}>
      <div className="flow-line" aria-hidden="true" />
      {hfcSteps.map(([title, text, icon], index) => (
        <article key={title} className="flow-step">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <Icon name={icon} />
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
      <div className="flow-legend">
        <span><b className="legend-red" /> Glasfaserstrecke</span>
        <span><b className="legend-dark" /> Koaxialer Abschnitt</span>
        <span><b className="legend-soft" /> Zuhause / WLAN</span>
      </div>
    </div>
  );
}

export function CoaxAnatomy() {
  return (
    <div className="media-diagram article-visual">
      <div className="media-copy">
        <p className="eyebrow">Koaxialkabel</p>
        <h2>Stark abgeschirmt für den letzten Abschnitt.</h2>
        <p>
          Koaxialkabel besteht aus Innenleiter, Dielektrikum, Schirmfolie,
          Schirmgeflecht und Kabelmantel. Es ist deutlich robuster aufgebaut als eine klassische Telefonleitung.
        </p>
      </div>
      <figure className="image-panel image-panel-contain">
        <Image src={assets.coax} alt="Aufbau eines Koaxialkabels mit Innenleiter, Dielektrikum, Schirmung und Kabelmantel" width={1800} height={900} />
        <figcaption>Koaxialkabel bestehen aus mehreren Schichten und sind stark abgeschirmt. Quelle: Vodafone / V-Hub.</figcaption>
      </figure>
    </div>
  );
}

export function FiberDiagram() {
  return (
    <div className="media-diagram article-visual">
      <figure className="image-panel image-panel-contain">
        <Image src={assets.fiberInside} alt="Glasfaserleitungen von innen mit Lichtsignalen" width={1600} height={1200} />
        <figcaption>Glasfaserleitungen übertragen Daten über Lichtsignale. Quelle: Vodafone.</figcaption>
      </figure>
      <div className="fiber-card">
        <Icon name="fiber" />
        <h2>Lichtsignal statt Kupferlogik.</h2>
        <p>Glasfaser überträgt Daten über Lichtimpulse. Buchbarkeit, Hausanschluss und Aktivierung hängen trotzdem von Adresse und Ausbau ab.</p>
      </div>
    </div>
  );
}

export function CompareDiagram() {
  return (
    <div className="compare-diagram compare-visual">
      <article>
        <Icon name="coax" />
        <h3>Kabelinternet / HFC</h3>
        <p>Glasfaser bis Hub oder Fiber Node, danach je nach Ausbau Koaxialkabel bis ins Gebäude.</p>
        <ol>
          <li>Glasfaserstrecke</li>
          <li>Fiber Node</li>
          <li>Koaxialkabel</li>
          <li>HÜP und Kabelrouter</li>
        </ol>
      </article>
      <article>
        <Icon name="fiber" />
        <h3>Glasfaser</h3>
        <p>Glasfaser reicht je nach Ausbau näher bis ans Gebäude oder direkt in den Anschlussbereich.</p>
        <ol>
          <li>Ausbaugebiet</li>
          <li>Hausanschluss</li>
          <li>ONT / Router je nach Setup</li>
          <li>Aktivierung</li>
        </ol>
      </article>
    </div>
  );
}

export function AvailabilityFlow() {
  return (
    <div className="availability-flow">
      {[
        ["Adresse", "PLZ, Ort und Straße", "pin"],
        ["Prüfung", "Technik je Standort", "check"],
        ["Empfehlung", "Passend zum Bedarf", "advice"]
      ].map(([title, text, icon]) => (
        <article key={title}>
          <Icon name={icon} />
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
    </div>
  );
}

export function TariffDecisionStory() {
  const options = ["Kabel", "Glasfaser", "DSL", "Mobilfunk", "TV", "Kombi", "Adresse", "Wechsel", "Router", "Verfügbarkeit"];
  const steps = [
    ["Adresse", "Ort, Straße, Gebäude und Ausbau werden zuerst betrachtet.", "pin"],
    ["Nutzung", "Homeoffice, Familie, Streaming, Gaming, Mobilfunk und TV werden eingeordnet.", "home"],
    ["Anschlussart", "Kabel, Glasfaser oder DSL werden nicht geraten, sondern nach Möglichkeit sortiert.", "coax"],
    ["Empfehlung", "Am Ende steht eine verständliche Einschätzung mit dem passenden nächsten Schritt.", "advice"]
  ];

  return (
    <div className="tariff-story-panel">
      <div className="tariff-cloud" aria-label="Typische Fragen vor der Beratung">
        {options.map((option) => <span key={option}>{option}</span>)}
      </div>
      <div className="tariff-path" aria-label="Von der Adresse zur Empfehlung">
        <div className="story-red-line" aria-hidden="true" />
        {steps.map(([title, text, icon], index) => (
          <article key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <Icon name={icon} />
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="recommendation-card">
        <p className="eyebrow">Ergebnis</p>
        <h3>Adresse prüfen lassen, Bedarf klären, passende Empfehlung erhalten.</h3>
        <Link className="button button-red" href="/#kontakt">Tarifberatung starten</Link>
      </div>
    </div>
  );
}

export function ProcessStory() {
  const steps = [
    ["Anfrage senden", "Du startest per WhatsApp, Telefon oder Formular.", "advice"],
    ["Bedarf klären", "Wir fragen nach Nutzung, Haushalt und gewünschtem Rückruf.", "callback"],
    ["Verfügbarkeit prüfen", "Adresse, Gebäude und Anschlussarten werden eingeordnet.", "check"],
    ["Empfehlung erhalten", "Du bekommst eine verständliche Einschätzung.", "signal"],
    ["Bestellung begleiten", "Die nächsten Schritte werden nachvollziehbar erklärt.", "shield"],
    ["Aktivierung unterstützen", "Auch nach der Entscheidung bleibt der Ablauf klar.", "router"]
  ];

  return (
    <div className="process-story">
      <div className="process-rail" aria-hidden="true" />
      <div className="process-steps">
        {steps.map(([title, text, icon], index) => (
          <article key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <Icon name={icon} />
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
      <aside className="process-live-card">
        <p className="eyebrow">Deine Anfrage</p>
        <h3>Wir prüfen deine Möglichkeiten und melden uns mit einer verständlichen Einschätzung.</h3>
        <Link className="button button-red" href="/#kontakt">Verfügbarkeit prüfen lassen</Link>
      </aside>
    </div>
  );
}

export function RegionStory({ locations }: { locations: Array<{ slug: string; name: string }> }) {
  const primary = locations.filter((location) => ["Wietze", "Celle", "Hannover"].includes(location.name));
  const surrounding = locations.filter((location) => !["Wietze", "Celle", "Hannover"].includes(location.name));

  return (
    <div className="region-story">
      <div className="region-map-panel">
        <RegionSignal />
        <div className="region-primary">
          {primary.map((location) => (
            <Link key={location.slug} href={`/${location.slug}`}>
              <span>{location.name}</span>
              <small>Beratung anfragen</small>
            </Link>
          ))}
        </div>
      </div>
      <div className="region-side">
        <p className="eyebrow">Regional erreichbar</p>
        <h3>Persönliche Beratung für deine Adresse.</h3>
        <p>Ob Kabel, Glasfaser, DSL, Mobilfunk oder TV: Entscheidend ist, was an deinem Standort möglich ist.</p>
        <div className="location-quicklinks">
          {surrounding.map((location) => (
            <Link key={location.slug} href={`/${location.slug}`}>{location.name}</Link>
          ))}
        </div>
        <Link className="button button-red" href="/#kontakt">Beratung in deiner Region anfragen</Link>
      </div>
    </div>
  );
}

export function HouseConnectionVisual() {
  return (
    <div className="house-visual">
      <figure className="image-panel image-panel-contain">
        <Image src={assets.fiberHouse} alt="Hausanschluss-Grafik mit HÜP, Router und WLAN im Gebäude" width={1129} height={667} />
        <figcaption>Vom Hausübergabepunkt geht es zur Dose, zum Router und weiter ins WLAN.</figcaption>
      </figure>
      <div className="house-steps">
        {[
          ["HÜP", "Übergang ins Gebäude", "hup"],
          ["Multimediadose", "Anschluss im Wohnbereich", "outlet"],
          ["Router", "WLAN und LAN im Zuhause", "router"]
        ].map(([title, text, icon]) => (
          <article key={title}>
            <Icon name={icon} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export function UsageMatrix() {
  return (
    <div className="usage-matrix">
      {[
        ["Single", "Surfen, Streaming, Alltag", "phone"],
        ["Familie", "Viele Geräte parallel", "home"],
        ["Homeoffice", "Stabile Videocalls", "laptop"],
        ["TV & Streaming", "Unterhaltung im Setup", "tv"]
      ].map(([title, text, icon]) => (
        <article key={title}>
          <Icon name={icon} />
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
    </div>
  );
}

export function HotlineSplit() {
  return (
    <div className="hotline-split">
      <article className="hotline-bad">
        <p className="eyebrow">Hotline</p>
        <h3>Warteschleife, Wiederholung, Tarifdschungel.</h3>
        <p>Anonym, unklar und selten auf deine konkrete Adresse bezogen.</p>
      </article>
      <article className="hotline-good">
        <p className="eyebrow">Persönlich</p>
        <h3>Direkter Kontakt, klare Empfehlung, Begleitung.</h3>
        <p>Du startest per WhatsApp, Telefon oder Formular und bekommst eine verständliche Rückmeldung.</p>
        <Link className="text-link" href="/#kontakt">Rückruf anfragen</Link>
      </article>
    </div>
  );
}

export function ComboVisual() {
  return (
    <div className="combo-visual">
      {[
        ["Internet zuhause", "router"],
        ["Mobilfunk unterwegs", "phone"],
        ["TV im Wohnzimmer", "tv"]
      ].map(([label, icon]) => (
        <article key={label}>
          <Icon name={icon} />
          <h3>{label}</h3>
        </article>
      ))}
    </div>
  );
}

export function RegionSignal() {
  return (
    <div className="region-signal">
      <svg viewBox="0 0 760 420" role="img" aria-label="Regionale Beratung in Wietze, Celle, Hannover und Umgebung">
        <path d="M180 205 365 145 560 235M365 145 430 300M180 205 430 300" />
        <circle cx="180" cy="205" r="58" />
        <circle cx="365" cy="145" r="46" />
        <circle cx="560" cy="235" r="52" />
        <circle cx="430" cy="300" r="38" />
        <text x="180" y="211">Wietze</text>
        <text x="365" y="151">Celle</text>
        <text className="region-label-small" x="560" y="241">Hannover</text>
        <text className="region-label-small" x="430" y="306">Umkreis</text>
      </svg>
    </div>
  );
}

export function VisualByType({ type }: { type?: string }) {
  if (type === "hfc") return <HFCSignalFlowVisual active={4} />;
  if (type === "fiber") return <FiberVsCableVisual active={3} />;
  if (type === "compare") return <FiberVsCableVisual active={1} />;
  if (type === "availability") return <AvailabilityCheckVisual active={2} />;
  if (type === "usage") return <TariffSortVisual active={2} />;
  if (type === "hotline") return <HotlineVsAdviceVisual active={3} />;
  if (type === "combo") return <RequestProcessVisual active={4} />;
  if (type === "region") return <RegionSignal />;
  return null;
}
