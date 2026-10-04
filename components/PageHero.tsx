import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/Section";

export function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  actions,
  aside,
  meta,
  compact = false
}: {
  crumbs: Array<{ name: string; href?: string }>;
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  meta?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section className={compact ? "phero phero-compact" : "phero"}>
      <div className="phero-bg" aria-hidden="true">
        <span className="hero-glow hero-glow-a" />
        <span className="hero-grid" />
      </div>
      <div className={aside ? "wrap phero-layout has-aside" : "wrap phero-layout"}>
        <div className="phero-copy">
          <Breadcrumbs items={crumbs} />
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1>{title}</h1>
          {lead && <p className="phero-lead">{lead}</p>}
          {meta && <div className="phero-meta">{meta}</div>}
          {actions && <div className="phero-actions">{actions}</div>}
        </div>
        {aside && <div className="phero-aside">{aside}</div>}
      </div>
    </section>
  );
}
