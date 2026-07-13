"use client";

import { ScrollStoryShell } from "./ScrollStoryShell";
import { CableCrossSectionVisual, HFCSignalFlowVisual } from "@/components/visuals/PremiumVisuals";

const steps = [
  {
    title: "Backbone und Glasfaser",
    text: "Große Datenstrecken laufen über leistungsfähige Glasfaserverbindungen."
  },
  {
    title: "Hub und Fiber Node",
    text: "Am Knoten wird das Signal für die weiteren Netzabschnitte verteilt."
  },
  {
    title: "Koaxialer Abschnitt",
    text: "Im letzten Abschnitt zum Gebäude kommt je nach Ausbau häufig Koaxialkabel zum Einsatz."
  },
  {
    title: "HÜP und Multimediadose",
    text: "Im Gebäude geht es über den Hausübergabepunkt zur Dose und zum Kabelrouter."
  },
  {
    title: "Router und Geräte",
    text: "Der Router verteilt das Signal per WLAN oder LAN an Smartphone, TV und Laptop."
  }
];

export function HfcNetworkStory() {
  const activeStations = [1, 3, 5, 7, 8];

  return (
    <ScrollStoryShell
      id="kabelinternet"
      eyebrow="Kabelinternet einfach erklärt"
      title="So kommt Kabelinternet ins Haus."
      intro="Kabelinternet nutzt ein Kabel-Glasfaser-Hybridnetz. Entscheidend ist, was an deiner Adresse und im Gebäude möglich ist."
      steps={steps}
      dark
      cta="Verfügbarkeit prüfen lassen"
      renderVisual={(active) => active === 2 ? <CableCrossSectionVisual /> : <HFCSignalFlowVisual active={activeStations[active]} />}
    />
  );
}
