import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Datenschutz | Kabelanschluss VF",
  description: "Datenschutzhinweise zu Kontaktanfragen, WhatsApp, technischer Bereitstellung und Betroffenenrechten auf kabelanschluss-vf.de.",
  path: "/datenschutz"
});

export default function DatenschutzPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Start", href: "/" }, { name: "Datenschutz", href: "/datenschutz" }])} />
      <PageHero crumbs={[{ name: "Start", href: "/" }, { name: "Datenschutz" }]} eyebrow="Datenschutz" title="Datenschutzerklärung" compact />
      <section className="section section-tight">
        <div className="wrap wrap-narrow legal">
          <div className="legal-card">
            <h2>Verantwortlicher</h2>
            <p>{site.advisor}</p>
            <p>Vodafone Vertriebspartner / persönliche Beratung</p>
            <p>E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a></p>
          </div>
          <div className="legal-card">
            <h2>Anfragen und Kontakt</h2>
            <p>
              Wenn du per E-Mail, Telefon oder WhatsApp Kontakt aufnimmst, werden die von dir
              übermittelten Angaben zur Bearbeitung und Beantwortung deiner Anfrage genutzt.
            </p>
          </div>
          <div className="legal-card">
            <h2>Beratungs-Assistent, WhatsApp und E-Mail</h2>
            <p>
              Die Angaben aus dem Beratungs-Assistenten werden nicht automatisch an einen eigenen
              Website-Server übermittelt. Beim Absenden öffnet sich WhatsApp oder dein E-Mail-Programm
              mit einer vorbereiteten Nachricht. Du entscheidest dort selbst, ob du sie versendest.
              Für die weitere Verarbeitung in WhatsApp gelten die Datenschutzbestimmungen des Anbieters.
            </p>
          </div>
          <div className="legal-card">
            <h2>Schriftarten</h2>
            <p>
              Die verwendete Schriftart wird direkt von dieser Website ausgeliefert. Es werden dafür
              keine Verbindungen zu externen Schriftanbietern aufgebaut.
            </p>
          </div>
          <div className="legal-card">
            <h2>Server-Logs und technische Bereitstellung</h2>
            <p>
              Beim Aufruf der Website können technisch notwendige Zugriffsdaten verarbeitet werden,
              damit die Seite sicher und stabil ausgeliefert wird.
            </p>
          </div>
          <div className="legal-card">
            <h2>Rechte betroffener Personen</h2>
            <p>
              Du hast im gesetzlichen Rahmen Rechte auf Auskunft, Berichtigung, Löschung,
              Einschränkung der Verarbeitung und Widerspruch.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
