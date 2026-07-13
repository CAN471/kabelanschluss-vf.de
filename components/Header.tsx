"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, PhoneCall, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Kabelanschluss VF Startseite">
        <span className="brand-logo">
          <Image src="/assets/vodafone-mark.svg" alt="Vodafone Logo" width={42} height={42} priority />
        </span>
        <span>
          <strong>Vodafone Beratung</strong>
          <small>{site.advisor} · Vertriebspartner</small>
        </span>
      </Link>

      <nav className="desktop-nav" aria-label="Hauptnavigation">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} aria-current={item.href === pathname ? "page" : undefined}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="header-actions">
        <Link className="icon-button" href={`tel:${site.phone}`} aria-label="Jan Mirzo anrufen">
          <PhoneCall aria-hidden="true" />
        </Link>
        <Link className="button button-dark header-call" href={`tel:${site.phone}`}>
          <PhoneCall aria-hidden="true" /> Anrufen
        </Link>
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={menuOpen ? "Navigation schließen" : "Navigation öffnen"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <nav id="mobile-navigation" className={menuOpen ? "mobile-navigation is-open" : "mobile-navigation"} aria-label="Mobile Navigation">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} aria-current={item.href === pathname ? "page" : undefined}>
            {item.label}
          </Link>
        ))}
        <Link href={`tel:${site.phone}`}>
          <PhoneCall aria-hidden="true" /> {site.phoneDisplay}
        </Link>
      </nav>
    </header>
  );
}
