"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useMemo, useState, type CSSProperties } from "react";
import { coordinates, hubSlugs, locations, type LocationPage } from "@/lib/site";

const LON0 = 9.55;
const LAT0 = 52.95;
const KX = 640;
const KY = 1060;
const PAD = 24;
const WIDTH = 560;
const HEIGHT = 690;

/** Seite, auf der das Ortslabel steht – vermeidet Überschneidungen im Raum Celle. */
const labelSide: Record<string, "l" | "t" | "b"> = {
  "vodafone-beratung-hambuehren": "b",
  "vodafone-beratung-winsen-aller": "t",
  "vodafone-beratung-suedheide": "t",
  "vodafone-beratung-unterluess": "l",
  "vodafone-beratung-eschede": "l",
  "vodafone-beratung-nienhagen": "l",
  "vodafone-beratung-adelheidsdorf": "l",
  "vodafone-beratung-wedemark": "l",
  "vodafone-beratung-langenhagen": "l"
};

type Point = { location: LocationPage; x: number; y: number; hub: boolean };

function project(slug: string) {
  const [lat, lon] = coordinates[slug] ?? [52.6, 9.9];
  return { x: (lon - LON0) * KX + PAD, y: (LAT0 - lat) * KY + PAD };
}

function usePoints() {
  return useMemo<Point[]>(
    () =>
      locations.map((location) => ({
        location,
        ...project(location.slug),
        hub: hubSlugs.includes(location.slug)
      })),
    []
  );
}

export function RegionMap({
  focus,
  hovered,
  onHover,
  labels = "focus",
  className = ""
}: {
  labels?: "all" | "focus";
  focus?: string;
  hovered?: string | null;
  onHover?: (slug: string | null) => void;
  className?: string;
}) {
  const points = usePoints();
  const hubs = points.filter((point) => point.hub);
  const focusPoint = points.find((point) => point.location.slug === focus);
  const nearbyNames = focusPoint?.location.nearby ?? [];

  const links = points
    .filter((point) => !point.hub)
    .map((point) => {
      const nearest = hubs.reduce((best, hub) =>
        Math.hypot(hub.x - point.x, hub.y - point.y) < Math.hypot(best.x - point.x, best.y - point.y) ? hub : best
      );
      return { from: point, to: nearest };
    });

  const backbone = [
    [hubs[0], hubs[1]],
    [hubs[0], hubs[2]],
    [hubs[1], hubs[2]]
  ];

  const highlighted = hovered ?? focus ?? null;

  return (
    <svg
      className={`rmap ${className}`}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="group"
      aria-label="Karte der Beratungsregion zwischen Südheide, Celle, Wietze und Hannover"
    >
      <defs>
        <radialGradient id="rmap-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e60000" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#e60000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {hubs.map((hub) => (
        <circle key={hub.location.slug} cx={hub.x} cy={hub.y} r="150" fill="url(#rmap-glow)" />
      ))}

      <g className="rmap-links">
        {links.map(({ from, to }) => (
          <line
            key={from.location.slug}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            className={highlighted === from.location.slug ? "is-active" : undefined}
          />
        ))}
      </g>
      <g className="rmap-backbone">
        {backbone.map(([a, b]) => (
          <g key={`${a.location.slug}-${b.location.slug}`}>
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
            <line className="rmap-flow" x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
          </g>
        ))}
      </g>

      {points.map((point) => {
        const slug = point.location.slug;
        const isActive = highlighted === slug;
        const isNearby = nearbyNames.includes(point.location.name);
        const showLabel = labels === "all" || point.hub || isActive || isNearby;
        const side = point.hub ? "r" : labelSide[slug] ?? "r";
        const labelX = side === "l" ? point.x - 12 : side === "r" ? point.x + (point.hub ? 14 : 11) : point.x;
        const labelY = side === "t" ? point.y - 13 : side === "b" ? point.y + 22 : point.y + 4.5;
        const anchor = side === "l" ? "end" : side === "r" ? "start" : "middle";
        return (
          <Link
            key={slug}
            href={`/${slug}`}
            className={["rmap-pin", point.hub ? "is-hub" : "", isActive ? "is-active" : "", isNearby ? "is-nearby" : ""]
              .filter(Boolean)
              .join(" ")}
            onMouseEnter={() => onHover?.(slug)}
            onMouseLeave={() => onHover?.(null)}
            onFocus={() => onHover?.(slug)}
            onBlur={() => onHover?.(null)}
            aria-label={`Vodafone Beratung ${point.location.name}`}
          >
            {(point.hub || isActive) && <circle className="rmap-ring" cx={point.x} cy={point.y} r={point.hub ? 15 : 12} />}
            <circle className="rmap-hit" cx={point.x} cy={point.y} r="16" />
            <circle className="rmap-marker" cx={point.x} cy={point.y} r={point.hub ? 7.5 : 5} />
            {showLabel && (
              <text
                x={labelX}
                y={labelY}
                textAnchor={anchor}
                className={point.hub || isActive || isNearby || labels === "focus" ? "rmap-label" : "rmap-label is-minor"}
              >
                {point.location.name}
              </text>
            )}
          </Link>
        );
      })}
    </svg>
  );
}

export function RegionExplorer() {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <div className="region-explorer">
      <div className="region-map-card" data-reveal>
        <RegionMap hovered={hovered} onHover={setHovered} labels="all" />
        <div className="region-map-legend" aria-hidden="true">
          <span><i className="is-hub" /> Schwerpunkt</span>
          <span><i /> Beratung vor Ort</span>
        </div>
      </div>
      <div className="region-list" data-reveal style={{ "--d": "120ms" } as CSSProperties}>
        <p className="region-list-title">{locations.length} Orte mit eigener Beratungsseite</p>
        <ul>
          {locations.map((location) => (
            <li key={location.slug}>
              <Link
                href={`/${location.slug}`}
                className={[
                  "region-chip",
                  hubSlugs.includes(location.slug) ? "is-hub" : "",
                  hovered === location.slug ? "is-active" : ""
                ]
                  .filter(Boolean)
                  .join(" ")}
                onMouseEnter={() => setHovered(location.slug)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(location.slug)}
                onBlur={() => setHovered(null)}
              >
                {location.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link className="region-more" href="/#kontakt">
          <span>
            <strong>Dein Ort ist nicht dabei?</strong>
            <small>Frag trotzdem – jede Adresse wird persönlich geprüft.</small>
          </span>
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
