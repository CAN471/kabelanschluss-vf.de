"use client";

import { ArrowRight, MapPin } from "lucide-react";
import { useState, type FormEvent } from "react";
import { startConsultation } from "@/lib/consult";

const quickTopics = ["Internet", "Glasfaser", "Mobilfunk", "TV", "Kombi"];

export function HeroStarter() {
  const [topics, setTopics] = useState<string[]>(["Internet"]);
  const [plz, setPlz] = useState("");

  const toggle = (topic: string) =>
    setTopics((current) => (current.includes(topic) ? current.filter((item) => item !== topic) : [...current, topic]));

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startConsultation({ topics, plz: plz.trim() });
  };

  return (
    <form className="starter" onSubmit={submit} aria-label="Beratung schnell starten">
      <p className="starter-label" id="starter-label">Was möchtest du prüfen lassen?</p>
      <div className="starter-chips" role="group" aria-labelledby="starter-label">
        {quickTopics.map((topic) => (
          <button
            key={topic}
            type="button"
            className="chip"
            aria-pressed={topics.includes(topic)}
            onClick={() => toggle(topic)}
          >
            {topic}
          </button>
        ))}
      </div>
      <div className="starter-row">
        <label className="starter-plz">
          <MapPin aria-hidden="true" />
          <span className="sr-only">Deine Postleitzahl</span>
          <input
            value={plz}
            onChange={(event) => setPlz(event.target.value.replace(/\D/g, "").slice(0, 5))}
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="Deine PLZ"
            aria-describedby="starter-hint"
          />
        </label>
        <button className="btn btn-red" type="submit">
          Beratung starten <ArrowRight aria-hidden="true" />
        </button>
      </div>
      <p className="starter-hint" id="starter-hint">Kostenlos · unverbindlich · persönliche Rückmeldung von Jan</p>
    </form>
  );
}
