"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Mail, PhoneCall, RotateCcw } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type InputHTMLAttributes,
  type ReactNode
} from "react";
import { Icon, WhatsAppIcon } from "@/components/Icons";
import { CONSULT_EVENT, consultTopics, takeStoredPrefill, type ConsultPrefill } from "@/lib/consult";
import { locations, site } from "@/lib/site";

type Data = {
  topics: string[];
  plz: string;
  ort: string;
  strasse: string;
  wohnform: string;
  haushalt: string;
  nutzung: string[];
  anbieter: string;
  name: string;
  telefon: string;
  email: string;
  kanal: string;
  zeitraum: string;
  nachricht: string;
  datenschutz: boolean;
};

type Errors = Partial<Record<keyof Data, string>>;

const steps = [
  { label: "Thema", title: "Worum geht es dir?", hint: "Wähle alles aus, was dich interessiert – Mehrfachauswahl ist möglich." },
  { label: "Adresse", title: "Wo soll geprüft werden?", hint: "Die Adresse entscheidet, welche Anschlussarten bei dir möglich sind." },
  { label: "Bedarf", title: "Wie nutzt ihr Internet & Co.?", hint: "Alles optional – hilft Jan aber bei einer wirklich passenden Empfehlung." },
  { label: "Kontakt", title: "Wie erreicht Jan dich?", hint: "Pflichtfelder sind mit * markiert." }
];

const housing = ["Haus", "Wohnung"];
const households = ["1 Person", "2 Personen", "3–4 Personen", "5+ Personen"];
const usages = [
  { id: "Streaming", icon: "stream" },
  { id: "Homeoffice", icon: "office" },
  { id: "Gaming", icon: "gaming" },
  { id: "Smart Home", icon: "home" },
  { id: "Surfen & Mails", icon: "laptop" }
];
const channels = [
  { id: "WhatsApp", icon: "advice" },
  { id: "Anruf", icon: "callback" },
  { id: "E-Mail", icon: "mail" }
];
const timeslots = ["Vormittags", "Nachmittags", "Abends"];

const emptyData: Data = {
  topics: [],
  plz: "",
  ort: "",
  strasse: "",
  wohnform: "",
  haushalt: "",
  nutzung: [],
  anbieter: "",
  name: "",
  telefon: "",
  email: "",
  kanal: "WhatsApp",
  zeitraum: "",
  nachricht: "",
  datenschutz: false
};

function validate(step: number, data: Data): Errors {
  const errors: Errors = {};
  if (step === 0 && data.topics.length === 0) errors.topics = "Bitte wähle mindestens ein Thema aus.";
  if (step === 1) {
    if (!/^\d{5}$/.test(data.plz.trim())) errors.plz = "Bitte gib eine PLZ mit 5 Ziffern ein.";
    if (!data.ort.trim()) errors.ort = "Bitte gib deinen Ort an.";
  }
  if (step === 3) {
    if (!data.name.trim()) errors.name = "Bitte gib deinen Namen an.";
    if (data.telefon.replace(/\D/g, "").length < 6) errors.telefon = "Bitte gib eine erreichbare Telefonnummer an.";
    if (data.email.trim() && !/^\S+@\S+\.\S+$/.test(data.email.trim())) errors.email = "Diese E-Mail-Adresse sieht nicht vollständig aus.";
    if (!data.datenschutz) errors.datenschutz = "Bitte bestätige den Hinweis zum Datenschutz.";
  }
  return errors;
}

const BREAK = "\u2028";

function buildMessage(data: Data) {
  const lines = [
    "Hallo Jan, ich möchte eine kostenlose Vodafone Beratung anfragen.",
    BREAK,
    `Thema: ${data.topics.join(", ")}`,
    `Ort: ${data.plz} ${data.ort}`.trim(),
    data.strasse && `Adresse: ${data.strasse}`,
    data.wohnform && `Wohnsituation: ${data.wohnform}`,
    data.haushalt && `Haushalt: ${data.haushalt}`,
    data.nutzung.length > 0 && `Nutzung: ${data.nutzung.join(", ")}`,
    data.anbieter && `Aktueller Anbieter: ${data.anbieter}`,
    BREAK,
    `Name: ${data.name}`,
    `Telefon: ${data.telefon}`,
    data.email && `E-Mail: ${data.email}`,
    `Bevorzugter Kontakt: ${data.kanal}${data.zeitraum ? ` (${data.zeitraum})` : ""}`,
    data.nachricht && `Nachricht: ${data.nachricht}`
  ];
  return lines
    .filter((line): line is string => typeof line === "string" && line !== "")
    .map((line) => (line === BREAK ? "" : line))
    .join("\n");
}

function whatsappUrl(data: Data) {
  return `https://wa.me/${site.phone.replace(/\D/g, "")}?text=${encodeURIComponent(buildMessage(data))}`;
}

function mailUrl(data: Data) {
  const subject = `Beratungsanfrage: ${data.topics.join(", ")} – ${data.plz} ${data.ort}`.trim();
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMessage(data))}`;
}

function ChipGroup({
  label,
  options,
  value,
  onToggle,
  multiple = false,
  error,
  name
}: {
  label: string;
  options: Array<{ id: string; label?: string; icon?: string }>;
  value: string | string[];
  onToggle: (id: string) => void;
  multiple?: boolean;
  error?: string;
  name: string;
}) {
  const selected = (id: string) => (Array.isArray(value) ? value.includes(id) : value === id);
  return (
    <fieldset className="field field-chips" aria-describedby={error ? `${name}-error` : undefined}>
      <legend>{label}</legend>
      <div className={multiple ? "chips" : "chips chips-single"}>
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            className="chip"
            aria-pressed={selected(option.id)}
            onClick={() => onToggle(option.id)}
          >
            {option.icon && <Icon name={option.icon} />}
            {option.label ?? option.id}
          </button>
        ))}
      </div>
      {error && <p className="field-error" id={`${name}-error`} role="alert">{error}</p>}
    </fieldset>
  );
}

function TextField({
  label,
  name,
  value,
  onChange,
  error,
  optional,
  wide,
  children,
  ...inputProps
}: {
  label: string;
  name: keyof Data;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  optional?: boolean;
  wide?: boolean;
  children?: ReactNode;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "name">) {
  return (
    <label className={wide ? "field field-wide" : "field"}>
      <span className="field-label">
        {label} {optional ? <em>optional</em> : <b aria-hidden="true">*</b>}
      </span>
      <input
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        required={!optional}
        {...inputProps}
      />
      {children}
      {error && <span className="field-error" id={`${name}-error`} role="alert">{error}</span>}
    </label>
  );
}

export function ConsultWizard({
  title = "Lass uns sprechen.",
  lead = "In vier kurzen Schritten zu deiner persönlichen Anfrage. Jan prüft deine Angaben und meldet sich mit einer verständlichen Empfehlung.",
  initialTopics = [],
  initialOrt = ""
}: {
  title?: string;
  lead?: string;
  initialTopics?: string[];
  initialOrt?: string;
}) {
  const [data, setData] = useState<Data>({ ...emptyData, topics: initialTopics, ort: initialOrt });
  const [step, setStep] = useState(0);
  const [visited, setVisited] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [sentVia, setSentVia] = useState<"WhatsApp" | "E-Mail" | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const shouldFocus = useRef(false);

  const set = useCallback(<K extends keyof Data>(key: K, value: Data[K]) => {
    setData((current) => ({ ...current, [key]: value }));
    setErrors((current) => (current[key] ? { ...current, [key]: undefined } : current));
  }, []);

  const toggleIn = (key: "topics" | "nutzung", id: string) => {
    const list = data[key];
    set(key, list.includes(id) ? list.filter((item) => item !== id) : [...list, id]);
  };

  const toggleOne = (key: "wohnform" | "haushalt" | "zeitraum" | "kanal", id: string) => {
    set(key, data[key] === id && key !== "kanal" ? "" : id);
  };

  const goTo = useCallback((next: number) => {
    shouldFocus.current = true;
    setStep(next);
    setVisited((current) => Math.max(current, next));
  }, []);

  const applyPrefill = useCallback(
    (prefill: ConsultPrefill | null) => {
      if (!prefill) return;
      setSentVia(null);
      setData((current) => ({
        ...current,
        topics: prefill.topics && prefill.topics.length > 0 ? prefill.topics : current.topics,
        plz: prefill.plz || current.plz,
        ort: prefill.ort || current.ort
      }));
      if (prefill.topics && prefill.topics.length > 0) {
        setStep(1);
        setVisited((current) => Math.max(current, 1));
      }
    },
    []
  );

  useEffect(() => {
    applyPrefill(takeStoredPrefill());
    const listener = (event: Event) => applyPrefill((event as CustomEvent<ConsultPrefill>).detail);
    window.addEventListener(CONSULT_EVENT, listener);
    return () => window.removeEventListener(CONSULT_EVENT, listener);
  }, [applyPrefill]);

  useEffect(() => {
    if (!shouldFocus.current) return;
    shouldFocus.current = false;
    headingRef.current?.focus({ preventScroll: true });
  }, [step, sentVia]);

  /** Prüft alle Schritte bis einschließlich `upTo` und springt zum ersten unvollständigen. */
  const ensureValid = (upTo: number) => {
    for (let index = 0; index <= upTo; index += 1) {
      const found = validate(index, data);
      if (Object.keys(found).length > 0) {
        setErrors(found);
        if (index !== step) goTo(index);
        return false;
      }
    }
    setErrors({});
    return true;
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!ensureValid(step)) return;
    if (step < steps.length - 1) {
      goTo(step + 1);
      return;
    }
    window.open(whatsappUrl(data), "_blank", "noopener,noreferrer");
    shouldFocus.current = true;
    setSentVia("WhatsApp");
  };

  const sendMail = () => {
    if (!ensureValid(steps.length - 1)) return;
    window.location.href = mailUrl(data);
    shouldFocus.current = true;
    setSentVia("E-Mail");
  };

  const restart = () => {
    setData({ ...emptyData, topics: initialTopics, ort: initialOrt });
    setErrors({});
    setVisited(0);
    setSentVia(null);
    goTo(0);
  };

  const current = steps[step];

  return (
    <section className="consult" id="kontakt" aria-labelledby="consult-title">
      <div className="wrap consult-layout">
        <aside className="consult-aside" data-reveal>
          <p className="eyebrow">Beratungs-Assistent</p>
          <h2 id="consult-title">{title}</h2>
          <p className="lead">{lead}</p>

          <div className="consult-person">
            <span className="avatar avatar-lg" aria-hidden="true">JM</span>
            <span>
              <strong>{site.advisor}</strong>
              <small>{site.role} · persönlich für dich da</small>
            </span>
          </div>

          <div className="consult-channels">
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
              <span className="consult-channel-icon is-wa"><WhatsAppIcon /></span>
              <span><small>WhatsApp</small>Direkt schreiben</span>
              <ArrowRight aria-hidden="true" />
            </a>
            <a href={`tel:${site.phone}`}>
              <span className="consult-channel-icon"><PhoneCall aria-hidden="true" /></span>
              <span><small>Telefon</small>{site.phoneDisplay}</span>
              <ArrowRight aria-hidden="true" />
            </a>
            <a href={`mailto:${site.email}`}>
              <span className="consult-channel-icon"><Mail aria-hidden="true" /></span>
              <span><small>E-Mail</small>{site.email}</span>
              <ArrowRight aria-hidden="true" />
            </a>
          </div>

          <div className="consult-next">
            <p>Was danach passiert</p>
            <ol>
              <li>Jan prüft deine Angaben und die Möglichkeiten an deiner Adresse.</li>
              <li>Du bekommst eine persönliche Rückmeldung – auf dem Weg, den du wählst.</li>
              <li>Klare Empfehlung, ohne Verpflichtung. Auf Wunsch bis zur Aktivierung begleitet.</li>
            </ol>
          </div>
        </aside>

        <div className="consult-card" data-reveal style={{ "--d": "120ms" } as CSSProperties}>
          {sentVia ? (
            <div className="consult-done">
              <span className="consult-done-icon" aria-hidden="true"><Check /></span>
              <h3 tabIndex={-1} ref={headingRef}>Fast geschafft!</h3>
              <p>
                {sentVia === "WhatsApp"
                  ? "WhatsApp hat sich mit deiner vorbereiteten Anfrage geöffnet. Tippe dort auf „Senden“ – Jan meldet sich dann persönlich bei dir."
                  : "Dein E-Mail-Programm hat sich mit deiner vorbereiteten Anfrage geöffnet. Sende die E-Mail ab – Jan meldet sich dann persönlich bei dir."}
              </p>
              <div className="consult-done-fallback">
                <span>Hat sich nichts geöffnet?</span>
                <a href={whatsappUrl(data)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> WhatsApp erneut öffnen</a>
                <a href={mailUrl(data)}><Mail aria-hidden="true" /> Per E-Mail senden</a>
                <a href={`tel:${site.phone}`}><PhoneCall aria-hidden="true" /> Jan anrufen</a>
              </div>
              <button type="button" className="btn btn-ghost" onClick={restart}>
                <RotateCcw aria-hidden="true" /> Neue Anfrage starten
              </button>
            </div>
          ) : (
            <form className="consult-form" onSubmit={submit} noValidate>
              <div className="consult-progress">
                <ol>
                  {steps.map((item, index) => {
                    const state = index === step ? "is-current" : index < step || index <= visited ? "is-done" : "";
                    return (
                      <li key={item.label} className={state}>
                        <button
                          type="button"
                          disabled={index > visited || index === step}
                          onClick={() => {
                            if (index < step || ensureValid(index - 1)) goTo(index);
                          }}
                          aria-current={index === step ? "step" : undefined}
                        >
                          <span className="consult-step-num">{index < step ? <Check aria-hidden="true" /> : index + 1}</span>
                          <span className="consult-step-label">{item.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
                <div className="consult-bar" aria-hidden="true">
                  <span style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
                </div>
              </div>

              <div className="consult-step" key={step}>
                <p className="consult-count">Schritt {step + 1} von {steps.length}</p>
                <h3 tabIndex={-1} ref={headingRef}>{current.title}</h3>
                <p className="consult-hint">{current.hint}</p>

                {step === 0 && (
                  <fieldset className="topic-grid" aria-describedby={errors.topics ? "topics-error" : undefined}>
                    <legend className="sr-only">Themen</legend>
                    {consultTopics.map((topic) => (
                      <button
                        key={topic.id}
                        type="button"
                        className="topic"
                        aria-pressed={data.topics.includes(topic.id)}
                        onClick={() => toggleIn("topics", topic.id)}
                      >
                        <span className="topic-icon"><Icon name={topic.icon} /></span>
                        <span className="topic-label">{topic.label}</span>
                        <span className="topic-check" aria-hidden="true"><Check /></span>
                      </button>
                    ))}
                    {errors.topics && <p className="field-error field-wide" id="topics-error" role="alert">{errors.topics}</p>}
                  </fieldset>
                )}

                {step === 1 && (
                  <div className="fields">
                    <TextField
                      label="PLZ"
                      name="plz"
                      value={data.plz}
                      onChange={(value) => set("plz", value.replace(/\D/g, "").slice(0, 5))}
                      error={errors.plz}
                      inputMode="numeric"
                      autoComplete="postal-code"
                      placeholder="z. B. 29323"
                    />
                    <TextField
                      label="Ort"
                      name="ort"
                      value={data.ort}
                      onChange={(value) => set("ort", value)}
                      error={errors.ort}
                      autoComplete="address-level2"
                      placeholder="z. B. Wietze"
                      list="consult-orte"
                    >
                      <datalist id="consult-orte">
                        {locations.map((location) => <option key={location.slug} value={location.name} />)}
                      </datalist>
                    </TextField>
                    <TextField
                      label="Straße & Hausnummer"
                      name="strasse"
                      value={data.strasse}
                      onChange={(value) => set("strasse", value)}
                      optional
                      wide
                      autoComplete="street-address"
                      placeholder="Für eine genauere Prüfung"
                    />
                    <div className="field-wide">
                      <ChipGroup
                        label="Wohnsituation (optional)"
                        name="wohnform"
                        options={housing.map((id) => ({ id, icon: id === "Haus" ? "home" : "building" }))}
                        value={data.wohnform}
                        onToggle={(id) => toggleOne("wohnform", id)}
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="fields">
                    <div className="field-wide">
                      <ChipGroup
                        label="Personen im Haushalt"
                        name="haushalt"
                        options={households.map((id) => ({ id }))}
                        value={data.haushalt}
                        onToggle={(id) => toggleOne("haushalt", id)}
                      />
                    </div>
                    <div className="field-wide">
                      <ChipGroup
                        label="Wofür wird viel genutzt?"
                        name="nutzung"
                        options={usages}
                        value={data.nutzung}
                        onToggle={(id) => toggleIn("nutzung", id)}
                        multiple
                      />
                    </div>
                    <TextField
                      label="Aktueller Anbieter"
                      name="anbieter"
                      value={data.anbieter}
                      onChange={(value) => set("anbieter", value)}
                      optional
                      wide
                      placeholder="Falls vorhanden"
                    />
                  </div>
                )}

                {step === 3 && (
                  <div className="fields">
                    <div className="consult-summary field-wide">
                      <span><Icon name="check" /> {data.topics.join(", ")}</span>
                      <span><Icon name="pin" /> {data.plz} {data.ort}</span>
                      <button type="button" onClick={() => goTo(0)}>Ändern</button>
                    </div>
                    <TextField
                      label="Name"
                      name="name"
                      value={data.name}
                      onChange={(value) => set("name", value)}
                      error={errors.name}
                      autoComplete="name"
                    />
                    <TextField
                      label="Telefonnummer"
                      name="telefon"
                      value={data.telefon}
                      onChange={(value) => set("telefon", value)}
                      error={errors.telefon}
                      type="tel"
                      autoComplete="tel"
                    />
                    <TextField
                      label="E-Mail"
                      name="email"
                      value={data.email}
                      onChange={(value) => set("email", value)}
                      error={errors.email}
                      type="email"
                      autoComplete="email"
                      optional
                      wide
                    />
                    <ChipGroup
                      label="Bevorzugter Kontakt"
                      name="kanal"
                      options={channels}
                      value={data.kanal}
                      onToggle={(id) => toggleOne("kanal", id)}
                    />
                    <ChipGroup
                      label="Am besten erreichbar (optional)"
                      name="zeitraum"
                      options={timeslots.map((id) => ({ id }))}
                      value={data.zeitraum}
                      onToggle={(id) => toggleOne("zeitraum", id)}
                    />
                    <label className="field field-wide">
                      <span className="field-label">Nachricht <em>optional</em></span>
                      <textarea
                        name="nachricht"
                        rows={3}
                        value={data.nachricht}
                        onChange={(event) => set("nachricht", event.target.value)}
                        placeholder="Gibt es etwas, das Jan vorab wissen sollte?"
                      />
                    </label>
                    <label className={errors.datenschutz ? "consent field-wide has-error" : "consent field-wide"}>
                      <input
                        type="checkbox"
                        checked={data.datenschutz}
                        onChange={(event) => set("datenschutz", event.target.checked)}
                        aria-invalid={errors.datenschutz ? true : undefined}
                        aria-describedby={errors.datenschutz ? "datenschutz-error" : undefined}
                      />
                      <span className="consent-box" aria-hidden="true"><Check /></span>
                      <span>
                        Ich stimme zu, dass meine Angaben zur Bearbeitung der Anfrage genutzt werden. Mehr in der{" "}
                        <Link href="/datenschutz">Datenschutzerklärung</Link>. *
                      </span>
                      {errors.datenschutz && <span className="field-error" id="datenschutz-error" role="alert">{errors.datenschutz}</span>}
                    </label>
                  </div>
                )}
              </div>

              <div className="consult-nav">
                {step > 0 ? (
                  <button type="button" className="btn btn-quiet" onClick={() => goTo(step - 1)}>
                    <ArrowLeft aria-hidden="true" /> Zurück
                  </button>
                ) : (
                  <span className="consult-nav-note">Dauert etwa 1 Minute</span>
                )}
                <div className="consult-nav-main">
                  {step === steps.length - 1 && (
                    <button type="button" className="btn btn-ghost" onClick={sendMail}>
                      <Mail aria-hidden="true" /> Per E-Mail
                    </button>
                  )}
                  <button type="submit" className={step === steps.length - 1 ? "btn btn-red" : "btn btn-ink"}>
                    {step === steps.length - 1 ? (
                      <><WhatsAppIcon /> Per WhatsApp senden</>
                    ) : (
                      <>Weiter <ArrowRight aria-hidden="true" /></>
                    )}
                  </button>
                </div>
              </div>
              <p className="consult-foot">
                Kostenlos und unverbindlich. Nach dem Absenden öffnet sich WhatsApp bzw. dein E-Mail-Programm mit deinen
                Angaben – du entscheidest dort selbst, ob du sie versendest.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
