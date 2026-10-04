import type { CSSProperties } from "react";
import { Icon } from "@/components/Icons";

export type SegmentKind = "fiber" | "coax" | "copper" | "home";
export type PathNode = { icon: string; label: string; sub: string };

export type ConnectionPreset = {
  id: "glasfaser" | "kabel" | "dsl";
  label: string;
  sub: string;
  icon: string;
  title: string;
  text: string;
  points: string[];
  nodes: PathNode[];
  segments: SegmentKind[];
  href: string;
  hrefLabel: string;
};

export const connectionPresets: ConnectionPreset[] = [
  {
    id: "glasfaser",
    label: "Glasfaser",
    sub: "Licht in Fasern",
    icon: "fiber",
    title: "Daten als Lichtsignal – bis ins Gebäude oder in die Wohnung.",
    text:
      "Glasfaser überträgt Daten über Lichtimpulse in hauchdünnen Fasern. Je nach Ausbau reicht sie bis ins Gebäude (FTTB) oder bis in die Wohnung (FTTH).",
    points: [
      "Ausbau, Buchbarkeit und Aktivierung sind getrennte Schritte",
      "FTTH: bis in die Wohnung · FTTB: bis ins Gebäude",
      "In Wietze liegt der Fokus klar auf Glasfaser"
    ],
    nodes: [
      { icon: "signal", label: "Internet", sub: "Backbone" },
      { icon: "node", label: "Verteiler", sub: "im Ausbaugebiet" },
      { icon: "building", label: "Hausanschluss", sub: "FTTB / FTTH" },
      { icon: "hup", label: "Glasfaser-Modem", sub: "ONT" },
      { icon: "router", label: "Router", sub: "WLAN & LAN" }
    ],
    segments: ["fiber", "fiber", "fiber", "home"],
    href: "/ratgeber/wie-funktioniert-glasfaser",
    hrefLabel: "So funktioniert Glasfaser"
  },
  {
    id: "kabel",
    label: "Kabel",
    sub: "Glasfaser + Koax",
    icon: "coax",
    title: "Glasfaser bis zum Knoten, Koax auf den letzten Metern.",
    text:
      "Kabelinternet nutzt ein Kabel-Glasfaser-Hybridnetz (HFC). Große Strecken laufen über Glasfaser bis zum Fiber Node, der letzte Abschnitt zum Gebäude häufig über Koaxialkabel.",
    points: [
      "HFC steht für Hybrid Fiber Coax",
      "HÜP im Keller, Multimediadose im Wohnraum",
      "Verfügbar je nach Adresse – in Wietze nicht für Zuhause"
    ],
    nodes: [
      { icon: "signal", label: "Internet", sub: "Backbone" },
      { icon: "node", label: "Fiber Node", sub: "Ende der Glasfaser" },
      { icon: "amplifier", label: "Verstärker", sub: "Koaxialnetz" },
      { icon: "hup", label: "HÜP", sub: "im Keller" },
      { icon: "outlet", label: "Multimediadose", sub: "im Wohnraum" },
      { icon: "router", label: "Kabelrouter", sub: "WLAN & LAN" }
    ],
    segments: ["fiber", "coax", "coax", "coax", "home"],
    href: "/ratgeber/wie-funktioniert-kabel-internet",
    hrefLabel: "So funktioniert Kabelinternet"
  },
  {
    id: "dsl",
    label: "DSL",
    sub: "Telefonleitung",
    icon: "router",
    title: "Über die vorhandene Telefonleitung ins Haus.",
    text:
      "DSL nutzt die Telefonleitung. Es kann eine sinnvolle Alternative sein, wenn Glasfaser oder Kabel an der Adresse nicht verfügbar oder nicht passend sind.",
    points: [
      "Leistung hängt unter anderem von Leitung und Standort ab",
      "Anschluss über die Telefondose (TAE)",
      "Alternativen werden sauber verglichen"
    ],
    nodes: [
      { icon: "signal", label: "Internet", sub: "Backbone" },
      { icon: "node", label: "Verteiler", sub: "je nach Ausbau" },
      { icon: "home", label: "Hausanschluss", sub: "Telefonleitung" },
      { icon: "outlet", label: "TAE-Dose", sub: "Telefondose" },
      { icon: "router", label: "DSL-Router", sub: "WLAN & LAN" }
    ],
    segments: ["fiber", "copper", "copper", "home"],
    href: "/dsl",
    hrefLabel: "Mehr zur DSL Beratung"
  }
];

const legendLabels: Record<SegmentKind, string> = {
  fiber: "Glasfaser",
  coax: "Koaxialkabel",
  copper: "Telefonleitung",
  home: "Heimnetz"
};

export function ConnectionPath({ nodes, segments }: { nodes: PathNode[]; segments: SegmentKind[] }) {
  return (
    <ol className="cpath" style={{ "--n": nodes.length } as CSSProperties}>
      {nodes.map((node, index) => (
        <li
          key={node.label}
          className={index === nodes.length - 1 ? "cpath-node is-home" : "cpath-node"}
          style={{ "--i": index } as CSSProperties}
        >
          <span className="cpath-dot"><Icon name={node.icon} /></span>
          <span className="cpath-text">
            <b>{node.label}</b>
            <small>{node.sub}</small>
          </span>
          {segments[index] && (
            <span className={`cpath-seg cpath-seg-${segments[index]}`} aria-hidden="true">
              <i />
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

export function PathLegend({ segments }: { segments: SegmentKind[] }) {
  const kinds = Array.from(new Set(segments));
  return (
    <ul className="cpath-legend" aria-label="Legende">
      {kinds.map((kind) => (
        <li key={kind}><i className={`cpath-key cpath-key-${kind}`} aria-hidden="true" /> {legendLabels[kind]}</li>
      ))}
    </ul>
  );
}

/** Statische Darstellung eines Signalwegs, z. B. in Ratgeber-Artikeln. */
export function ConnectionDiagram({ preset, caption }: { preset: ConnectionPreset["id"]; caption?: string }) {
  const data = connectionPresets.find((item) => item.id === preset)!;
  return (
    <figure className="diagram-card">
      <header>
        <span className="diagram-kicker"><Icon name={data.icon} /> Signalweg · {data.label}</span>
        <PathLegend segments={data.segments} />
      </header>
      <ConnectionPath nodes={data.nodes} segments={data.segments} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
