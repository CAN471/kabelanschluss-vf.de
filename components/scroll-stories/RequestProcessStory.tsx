"use client";

import { ScrollStoryShell } from "./ScrollStoryShell";
import { RequestProcessVisual } from "@/components/visuals/PremiumVisuals";

const steps = [
  { title: "Anfrage senden", text: "Du nennst Ort, Kontaktweg und dein Interesse." },
  { title: "Bedarf klären", text: "Wir schauen auf Haushalt, Nutzung, Router, TV und Mobilfunk." },
  { title: "Verfügbarkeit prüfen", text: "Adresse, Gebäude und Anschlussarten werden realistisch eingeordnet." },
  { title: "Empfehlung erhalten", text: "Du bekommst eine verständliche Einschätzung statt Tarifdschungel." },
  { title: "Bestellung begleiten", text: "Die nächsten Schritte werden klar und nachvollziehbar erklärt." },
  { title: "Aktivierung unterstützen", text: "Auch nach der Entscheidung bleibt der Ablauf im Blick." }
];

export function RequestProcessStory() {
  return (
    <ScrollStoryShell
      id="ablauf"
      eyebrow="So einfach startet es"
      title="So läuft deine Anfrage ab."
      intro="Die Beratung beginnt mit wenigen Angaben und endet nicht beim ersten Formularfeld."
      steps={steps}
      cta="Verfügbarkeit prüfen lassen"
      renderVisual={(active) => <RequestProcessVisual active={active} />}
    />
  );
}
