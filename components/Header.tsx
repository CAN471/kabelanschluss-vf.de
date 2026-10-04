"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Mail, PhoneCall } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon, WhatsAppIcon } from "@/components/Icons";
import { navItems, services, shortServiceName, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!servicesOpen) return;
    const close = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent && event.key !== "Escape") return;
      if (event instanceof MouseEvent && dropdownRef.current?.contains(event.target as Node)) return;
      setServicesOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [servicesOpen]);

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

  const isServicePage = services.some((service) => pathname === `/${service.slug}` || pathname === `/${service.slug}/`);

  return (
    <header className={["hdr", scrolled ? "is-scrolled" : "", menuOpen ? "is-open" : ""].filter(Boolean).join(" ")}>
      <div className="hdr-bar">
        <Link className="hdr-brand" href="/" aria-label="Vodafone Beratung – zur Startseite">
          <Image src="/assets/vodafone-mark.svg" alt="" width={38} height={38} priority />
          <span>
            <strong>Vodafone Beratung</strong>
            <small>{site.advisor} · Vertriebspartner</small>
          </span>
        </Link>

        <nav className="hdr-nav" aria-label="Hauptnavigation">
          <div className={servicesOpen ? "hdr-dd is-open" : "hdr-dd"} ref={dropdownRef}>
            <button
              type="button"
              className="hdr-link"
              aria-expanded={servicesOpen}
              aria-controls="hdr-services"
              aria-current={isServicePage ? "page" : undefined}
              onClick={() => setServicesOpen((open) => !open)}
            >
              Leistungen <ChevronDown aria-hidden="true" />
            </button>
            <div className="hdr-dd-panel" id="hdr-services">
              <div className="hdr-dd-grid">
                {services.map((service) => (
                  <Link key={service.slug} href={`/${service.slug}`} className="hdr-dd-item">
                    <span className="hdr-dd-icon"><Icon name={service.icon} /></span>
                    <span>
                      <strong>{shortServiceName(service)}</strong>
                      <small>{service.points[0]}</small>
                    </span>
                  </Link>
                ))}
              </div>
              <Link className="hdr-dd-foot" href="/#kontakt">
                <span>
                  <strong>Nicht sicher, was passt?</strong>
                  <small>Kostenlos beraten lassen – Jan sortiert mit dir.</small>
                </span>
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hdr-link"
              aria-current={pathname.replace(/\/$/, "") === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hdr-actions">
          <a className="hdr-phone" href={`tel:${site.phone}`} aria-label={`Jan Mirzo anrufen: ${site.phoneDisplay}`}>
            <PhoneCall aria-hidden="true" />
            <span>{site.phoneDisplay}</span>
          </a>
          <Link className="btn btn-red btn-sm hdr-cta" href="/#kontakt">
            Beratung starten
          </Link>
          <button
            className="hdr-burger"
            type="button"
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="mnav" inert={!menuOpen}>
        <div className="mnav-inner">
          <p className="mnav-label">Leistungen</p>
          <div className="mnav-services">
            {services.map((service) => (
              <Link key={service.slug} href={`/${service.slug}`}>
                <Icon name={service.icon} />
                <span>{shortServiceName(service)}</span>
              </Link>
            ))}
          </div>
          <nav className="mnav-links" aria-label="Mobile Navigation">
            <Link href="/">Start</Link>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
            <Link href="/#kontakt">Kontakt</Link>
          </nav>
          <div className="mnav-contact">
            <a className="btn btn-red" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> WhatsApp schreiben
            </a>
            <a className="btn btn-ghost" href={`tel:${site.phone}`}>
              <PhoneCall aria-hidden="true" /> {site.phoneDisplay}
            </a>
            <a className="mnav-mail" href={`mailto:${site.email}`}>
              <Mail aria-hidden="true" /> {site.email}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
