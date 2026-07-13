"use client";

import { ScrollStoryShell } from "./ScrollStoryShell";
import { HotlineVsAdviceVisual } from "@/components/visuals/PremiumVisuals";

const steps = [
  {
    title: "Nicht wieder alles erklären",
    text: "Bei einer Hotline fehlt oft der Zusammenhang aus Adresse, Bedarf und nächstem Schritt."
  },
  {
    title: "Rückruf statt Warten",
    text: "Du startest per WhatsApp, Telefon oder Formular und bekommst eine persönliche Rückmeldung."
  },
  {
    title: "Verständliche Einschätzung",
    text: "Die Beratung ordnet ein, welche Lösung zu Adresse, Haushalt und Nutzung passt."
  },
  {
    title: "Bis zur Aktivierung",
    text: "Auch nach der ersten Empfehlung bleibt der Ablauf nachvollziehbar."
  }
];

export function AdviceVsHotlineStory() {
  return (
    <ScrollStoryShell
      id="persoenlich"
      eyebrow="Persönlich statt anonym"
      title="Persönliche Beratung statt Warteschleife."
      intro="Du bekommst keine anonyme Tarifflut, sondern einen direkten Ansprechpartner für deine Anfrage."
      steps={steps}
      cta="Rückruf anfragen"
      renderVisual={(active) => <HotlineVsAdviceVisual active={active} />}
    />
  );
}
