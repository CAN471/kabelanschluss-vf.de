"use client";

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

export type StoryStep = {
  title: string;
  text: string;
};

export function ScrollStoryShell({
  eyebrow,
  title,
  intro,
  steps,
  cta,
  ctaHref = "/#kontakt",
  dark = false,
  id,
  renderVisual
}: {
  eyebrow: string;
  title: string;
  intro: string;
  steps: StoryStep[];
  cta?: string;
  ctaHref?: string;
  dark?: boolean;
  id?: string;
  renderVisual: (active: number) => ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [active, setActive] = useState(0);

  const updateActiveStep = useCallback(() => {
    if (window.innerWidth <= 1100 || !trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const scrollable = Math.max(rect.height - window.innerHeight, 1);
    const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
    setActive(Math.min(steps.length - 1, Math.floor(progress * steps.length)));
  }, [steps.length]);

  const scheduleUpdate = useCallback(() => {
    if (frameRef.current !== null) return;
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      updateActiveStep();
    });
  }, [updateActiveStep]);

  useEffect(() => {
    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, [scheduleUpdate]);

  const goToStep = (index: number) => {
    setActive(index);
    if (window.innerWidth <= 1100 || !trackRef.current) return;

    const start = window.scrollY + trackRef.current.getBoundingClientRect().top;
    const range = Math.max(trackRef.current.offsetHeight - window.innerHeight, 1);
    const ratio = steps.length === 1 ? 0 : index / (steps.length - 1);
    window.scrollTo({ top: start + range * ratio, behavior: "smooth" });
  };

  const current = steps[active];

  return (
    <section id={id} className={dark ? "chapter-story chapter-story-dark" : "chapter-story"}>
      <header className="chapter-story-header">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{intro}</p>
      </header>

      <div
        ref={trackRef}
        className="chapter-story-track"
        style={{ "--story-steps": steps.length } as CSSProperties}
      >
        <div className="chapter-story-pin">
          <div className="chapter-story-narrative">
            <nav className="chapter-story-nav" aria-label="Kapitel auswählen">
              {steps.map((step, index) => (
                <button
                  type="button"
                  key={step.title}
                  className={index === active ? "is-active" : ""}
                  onClick={() => goToStep(index)}
                  aria-label={`${index + 1}: ${step.title}`}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </button>
              ))}
            </nav>

            <article className="chapter-story-current" aria-live="polite" aria-atomic="true">
              <span>{String(active + 1).padStart(2, "0")}</span>
              <h3>{current.title}</h3>
              <p>{current.text}</p>
            </article>
          </div>

          <aside className="chapter-story-stage">
            <div className="chapter-story-progress" aria-label={`Schritt ${active + 1} von ${steps.length}`}>
              <span style={{ width: `${((active + 1) / steps.length) * 100}%` }} />
            </div>
            <div className="chapter-story-visual">{renderVisual(active)}</div>
            {cta && <Link className="button button-red" href={ctaHref}>{cta}</Link>}
          </aside>
        </div>
      </div>

      <div className="chapter-story-mobile">
        <div className="chapter-story-mobile-tabs" role="tablist" aria-label="Kapitel auswählen">
          {steps.map((step, index) => (
            <button
              key={step.title}
              type="button"
              role="tab"
              aria-selected={index === active}
              className={index === active ? "is-active" : ""}
              onClick={() => setActive(index)}
            >
              {String(index + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
        <article>
          <h3>{current.title}</h3>
          <p>{current.text}</p>
        </article>
        <div className="chapter-story-mobile-visual">{renderVisual(active)}</div>
        {cta && <Link className="button button-red" href={ctaHref}>{cta}</Link>}
      </div>
    </section>
  );
}
