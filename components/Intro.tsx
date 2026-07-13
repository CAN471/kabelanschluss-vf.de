"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const INTRO_DURATION = 2350;

export function Intro() {
  const [visible, setVisible] = useState(false);
  const previousOverflow = useRef("");

  const finishIntro = useCallback(() => {
    window.sessionStorage.setItem("vf-intro-seen", "1");
    document.body.style.overflow = previousOverflow.current;
    setVisible(false);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadySeen = window.sessionStorage.getItem("vf-intro-seen") === "1";
    if (reduced || alreadySeen) return;

    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setVisible(true);

    const leave = window.setTimeout(finishIntro, INTRO_DURATION);
    return () => {
      window.clearTimeout(leave);
      document.body.style.overflow = previousOverflow.current;
    };
  }, [finishIntro]);

  if (!visible) return null;

  return (
    <div className="vf-brand-reveal" aria-hidden="true">
      <div className="vf-brand-reveal-panel vf-brand-reveal-panel-top" />
      <div className="vf-brand-reveal-panel vf-brand-reveal-panel-bottom" />

      <div className="vf-brand-reveal-line">
        <span />
      </div>

      <div className="vf-brand-reveal-lockup">
        <Image src="/assets/vodafone-mark.svg" alt="" width={68} height={68} priority />
        <strong>Vodafone Beratung</strong>
      </div>

      <div className="vf-brand-reveal-copy">
        <p>Beratung statt Warteschleife.</p>
        <span>Persönlich&nbsp;&nbsp;·&nbsp;&nbsp;Regional&nbsp;&nbsp;·&nbsp;&nbsp;Verständlich</span>
      </div>
    </div>
  );
}
