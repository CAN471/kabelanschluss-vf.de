"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import { ConnectionPath, PathLegend, connectionPresets } from "@/components/ConnectionPath";
import { Icon } from "@/components/Icons";

export function ConnectionExplorer() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const preset = connectionPresets[active];

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next = active;
    if (event.key in keys) next = (active + keys[event.key] + connectionPresets.length) % connectionPresets.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = connectionPresets.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="explorer-body" data-reveal>
      <div className="explorer-tabs" role="tablist" aria-label="Anschlussart wählen" onKeyDown={onKeyDown}>
        {connectionPresets.map((item, index) => (
          <button
            key={item.id}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`explorer-tab-${item.id}`}
            aria-selected={index === active}
            aria-controls="explorer-panel"
            tabIndex={index === active ? 0 : -1}
            className="explorer-tab"
            onClick={() => setActive(index)}
          >
            <span className="explorer-tab-icon"><Icon name={item.icon} /></span>
            <span>
              <strong>{item.label}</strong>
              <small>{item.sub}</small>
            </span>
          </button>
        ))}
      </div>

      <div
        className="explorer-panel"
        role="tabpanel"
        id="explorer-panel"
        aria-labelledby={`explorer-tab-${preset.id}`}
        key={preset.id}
      >
        <div className="explorer-copy">
          <h3>{preset.title}</h3>
          <p>{preset.text}</p>
          <ul className="ticks ticks-dark">
            {preset.points.map((point) => (
              <li key={point}><Check aria-hidden="true" /> {point}</li>
            ))}
          </ul>
          <Link className="link-arrow link-arrow-light" href={preset.href}>
            {preset.hrefLabel} <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="explorer-stage">
          <div className="explorer-stage-head">
            <span>Signalweg bis zu dir</span>
            <PathLegend segments={preset.segments} />
          </div>
          <ConnectionPath nodes={preset.nodes} segments={preset.segments} />
          <p className="explorer-note">Vereinfachte Darstellung – was an deiner Adresse möglich ist, prüft Jan persönlich.</p>
        </div>
      </div>
    </div>
  );
}
