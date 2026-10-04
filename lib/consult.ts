export const CONSULT_EVENT = "vf:consult";
const STORAGE_KEY = "vf-consult-prefill";

export type ConsultPrefill = {
  topics?: string[];
  plz?: string;
  ort?: string;
};

/** Themen, die im Beratungs-Assistenten ausgewählt werden können. */
export const consultTopics = [
  { id: "Internet", label: "Internet & WLAN", icon: "wifi" },
  { id: "Glasfaser", label: "Glasfaser", icon: "fiber" },
  { id: "Kabel", label: "Kabelinternet", icon: "coax" },
  { id: "DSL", label: "DSL", icon: "router" },
  { id: "Mobilfunk", label: "Mobilfunk", icon: "phone" },
  { id: "TV", label: "TV & GigaTV", icon: "tv" },
  { id: "Kombi", label: "Kombi-Lösung", icon: "signal" },
  { id: "Noch unsicher", label: "Noch unsicher", icon: "idea" }
];

export const serviceTopics: Record<string, string[]> = {
  "internet-kabel": ["Internet", "Kabel"],
  glasfaser: ["Glasfaser"],
  dsl: ["DSL"],
  mobilfunk: ["Mobilfunk"],
  "tv-gigatv": ["TV"],
  "kombi-beratung": ["Kombi"]
};

/**
 * Übergibt Vorauswahlen an den Beratungs-Assistenten. Ist er auf der aktuellen
 * Seite vorhanden, wird direkt dorthin gescrollt, sonst geht es zur Startseite.
 */
export function startConsultation(prefill: ConsultPrefill) {
  const target = document.getElementById("kontakt");
  if (target) {
    window.dispatchEvent(new CustomEvent<ConsultPrefill>(CONSULT_EVENT, { detail: prefill }));
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(prefill));
  } catch {
    // Ohne Speicher startet der Assistent einfach leer.
  }
  window.location.href = "/#kontakt";
}

export function takeStoredPrefill(): ConsultPrefill | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    window.sessionStorage.removeItem(STORAGE_KEY);
    return JSON.parse(raw) as ConsultPrefill;
  } catch {
    return null;
  }
}
