"use client";

import Link from "next/link";
import { PhoneCall, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/Icons";
import { site } from "@/lib/site";

/** Schnellkontakt am unteren Bildschirmrand auf Smartphones. */
export function MobileDock() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const targets = [document.getElementById("kontakt"), document.querySelector(".ftr")].filter(
      (element): element is HTMLElement => Boolean(element)
    );
    const visible = new Set<Element>();
    let scrolledEnough = window.scrollY > 240;

    const update = () => setHidden(!scrolledEnough || visible.size > 0);
    const onScroll = () => {
      scrolledEnough = window.scrollY > 240;
      update();
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });
      update();
    });
    targets.forEach((target) => observer.observe(target));
    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return (
    <div className={hidden ? "dock is-hidden" : "dock"} aria-hidden={hidden} inert={hidden}>
      <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="dock-wa">
        <WhatsAppIcon /> WhatsApp
      </a>
      <a href={`tel:${site.phone}`}>
        <PhoneCall aria-hidden="true" /> Anrufen
      </a>
      <Link href="/#kontakt" className="dock-main">
        <Sparkles aria-hidden="true" /> Beratung
      </Link>
    </div>
  );
}
