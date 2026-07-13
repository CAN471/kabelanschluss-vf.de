"use client";

import { ScrollStoryShell } from "./ScrollStoryShell";
import { TariffSortVisual } from "@/components/visuals/PremiumVisuals";

const steps = [
  {
    title: "Viele Möglichkeiten",
    text: "Kabel, Glasfaser, DSL, Mobilfunk, TV und Kombi wirken schnell unübersichtlich."
  },
  {
    title: "Adresse zuerst",
    text: "Was möglich ist, hängt zuerst von deiner Adresse und deinem Gebäude ab."
  },
  {
    title: "Nutzung verstehen",
    text: "Streaming, Homeoffice, Gaming oder Familie: dein Alltag entscheidet mit."
  },
  {
    title: "Anschlussart einordnen",
    text: "Kabel, Glasfaser oder DSL werden je nach Standort unterschiedlich bewertet."
  },
  {
    title: "Empfehlung erhalten",
    text: "Wir ordnen die Möglichkeiten und melden uns mit einer verständlichen Einschätzung."
  }
];

export function TariffChaosStory() {
  return (
    <ScrollStoryShell
      id="tarifberatung"
      eyebrow="Was passt zu dir?"
      title="Was passt wirklich zu dir?"
      intro="Wir sortieren Anschlussarten und Verfügbarkeit nach deiner Adresse und deiner tatsächlichen Nutzung."
      steps={steps}
      cta="Tarifberatung starten"
      renderVisual={(active) => <TariffSortVisual active={active} />}
    />
  );
}
