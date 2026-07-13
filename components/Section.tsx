import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/Icons";

export function SectionIntro({
  eyebrow,
  title,
  children,
  align = "split"
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  align?: "split" | "center";
}) {
  return (
    <div className={align === "center" ? "section-intro section-intro-center" : "section-intro"}>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <div className="intro-text">{children}</div>
    </div>
  );
}

export function CtaBand() {
  return (
    <section className="cta-band">
      <div>
        <p className="eyebrow">Nächster Schritt</p>
        <h2>Verfügbarkeit prüfen lassen, ohne Tarifchaos.</h2>
        <p>Wir prüfen deine Möglichkeiten und melden uns mit einer passenden Empfehlung.</p>
      </div>
      <Link className="button button-red" href="/#kontakt">
        Beratung anfragen
      </Link>
    </section>
  );
}

export function FactCard({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <article className="fact-card">
      <Icon name={icon} />
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}
