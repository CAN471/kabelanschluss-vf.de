"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { Mail, MessageCircle, PhoneCall } from "lucide-react";
import { site } from "@/lib/site";

const interests = ["Internet", "Glasfaser", "Kabel", "DSL", "Mobilfunk", "TV", "Kombi"];

export function ContactForm() {
  const submitToWhatsApp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const selectedInterests = data.getAll("interesse").join(", ") || "Noch offen";
    const message = [
      "Hallo Jan, ich möchte eine kostenlose Vodafone Beratung anfragen.",
      "",
      `Name: ${data.get("name") || ""}`,
      `Telefon: ${data.get("telefon") || ""}`,
      data.get("email") ? `E-Mail: ${data.get("email")}` : "",
      `PLZ / Ort: ${data.get("plz") || ""} ${data.get("ort") || ""}`.trim(),
      data.get("adresse") ? `Adresse: ${data.get("adresse")}` : "",
      `Interesse: ${selectedInterests}`,
      data.get("anbieter") ? `Aktueller Anbieter: ${data.get("anbieter")}` : "",
      data.get("rueckrufzeitraum") ? `Rückruf: ${data.get("rueckrufzeitraum")}` : "",
      data.get("nachricht") ? `Nachricht: ${data.get("nachricht")}` : ""
    ].filter(Boolean).join("\n");

    const number = site.phone.replace(/\D/g, "");
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="contact-section" id="kontakt" aria-labelledby="contact-title">
      <div className="section-copy contact-copy">
        <p className="eyebrow">Kostenlose Beratung</p>
        <h2 id="contact-title">Direkt mit Jan sprechen.</h2>
        <p>
          Schick deine Angaben per WhatsApp. Jan prüft die Möglichkeiten und meldet sich persönlich.
        </p>

        <div className="contact-person">
          <span aria-hidden="true">JM</span>
          <div>
            <strong>Jan Mirzo</strong>
            <small>Persönlicher Vodafone Ansprechpartner</small>
          </div>
        </div>

        <div className="contact-direct">
          <Link href={site.whatsapp} target="_blank" rel="noopener noreferrer">
            <MessageCircle aria-hidden="true" />
            <span><small>WhatsApp</small>Chat starten</span>
          </Link>
          <Link href={`tel:${site.phone}`}>
            <PhoneCall aria-hidden="true" />
            <span><small>Telefon</small>{site.phoneDisplay}</span>
          </Link>
          <Link href={`mailto:${site.email}`}>
            <Mail aria-hidden="true" />
            <span><small>E-Mail</small>{site.email}</span>
          </Link>
        </div>
      </div>

      <form className="contact-form" onSubmit={submitToWhatsApp}>
        <div className="contact-form-intro form-wide">
          <span>In wenigen Schritten</span>
          <h3>Was können wir für dich prüfen?</h3>
          <p>Pflichtfelder sind mit einem Stern markiert.</p>
        </div>

        <label>
          Name *
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          Telefonnummer *
          <input name="telefon" type="tel" autoComplete="tel" required />
        </label>
        <label>
          E-Mail <span className="field-optional">optional</span>
          <input name="email" type="email" autoComplete="email" />
        </label>
        <div className="form-location-row">
          <label>
            PLZ *
            <input name="plz" inputMode="numeric" autoComplete="postal-code" pattern="[0-9]{5}" required />
          </label>
          <label>
            Ort *
            <input name="ort" autoComplete="address-level2" required />
          </label>
        </div>
        <label className="form-wide">
          Adresse für die Prüfung <span className="field-optional">optional</span>
          <input name="adresse" autoComplete="street-address" />
        </label>
        <fieldset className="form-wide">
          <legend>Worum geht es?</legend>
          <div className="check-grid">
            {interests.map((interest) => (
              <label key={interest}>
                <input name="interesse" value={interest} type="checkbox" />
                <span>{interest}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <label>
          Aktueller Anbieter <span className="field-optional">optional</span>
          <input name="anbieter" />
        </label>
        <label>
          Rückrufzeitraum <span className="field-optional">optional</span>
          <select name="rueckrufzeitraum" defaultValue="">
            <option value="" disabled>Bitte wählen</option>
            <option>Vormittags</option>
            <option>Nachmittags</option>
            <option>Abends</option>
          </select>
        </label>
        <label className="form-wide">
          Nachricht <span className="field-optional">optional</span>
          <textarea name="nachricht" rows={4} />
        </label>
        <label className="privacy form-wide">
          <input type="checkbox" name="datenschutz" required />
          <span>
            Ich stimme zu, dass meine Angaben zur Bearbeitung der Anfrage genutzt werden.
            Mehr dazu in der <Link href="/datenschutz">Datenschutzerklärung</Link>.
          </span>
        </label>
        <button className="button button-red form-wide" type="submit">
          Anfrage per WhatsApp senden
        </button>
        <p className="contact-form-note form-wide">
          Kostenlos und unverbindlich. Nach dem Absenden öffnet sich WhatsApp mit deinen Angaben.
        </p>
      </form>
    </section>
  );
}
