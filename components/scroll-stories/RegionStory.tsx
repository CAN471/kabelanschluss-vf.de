"use client";

import { ScrollStoryShell } from "./ScrollStoryShell";
import { RegionSignalMapVisual } from "@/components/visuals/PremiumVisuals";
import type { LocationPage } from "@/lib/site";

const steps = [
  {
    title: "Wietze",
    text: "In Wietze liegt der Beratungsfokus klar auf Glasfaser und adressbezogener Prüfung."
  },
  {
    title: "Celle",
    text: "In Celle werden Internet, Kabel je nach Adresse, Glasfaser, Mobilfunk und TV eingeordnet."
  },
  {
    title: "Hannover",
    text: "Für Hannover und den Umkreis zählt die konkrete Adresse genauso wie deine Nutzung."
  },
  {
    title: "Umgebung",
    text: "Auch umliegende Orte werden über eigene Seiten und eine persönliche Anfrage abgedeckt."
  }
];

export function RegionStory({ locations }: { locations: LocationPage[] }) {
  return (
    <ScrollStoryShell
      id="region"
      eyebrow="Wietze · Celle · Hannover"
      title="Persönlich in deiner Region."
      intro="Ob Internet, Glasfaser, Mobilfunk oder TV: Wir prüfen die Möglichkeiten passend zu deiner Adresse."
      steps={steps}
      cta="Beratung in deiner Region anfragen"
      renderVisual={(active) => <RegionSignalMapVisual locations={locations} active={active} />}
    />
  );
}
