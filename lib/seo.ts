import type { Metadata } from "next";
import { faqItems, locations, services, site } from "@/lib/site";

export function absoluteUrl(path = "/") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${site.domain}${clean}`;
}

export function pageMetadata({
  title,
  description,
  path,
  image = "/assets/vodafone-glasfaser-baustelle.jpeg"
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      type: "website",
      locale: "de_DE",
      url: absoluteUrl(path),
      title,
      description,
      siteName: site.name,
      images: [{ url: absoluteUrl(image), alt: title }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(image)]
    }
  };
}

export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${site.name} - ${site.advisor}`,
    url: site.domain,
    logo: absoluteUrl("/assets/vodafone-logo.svg"),
    image: absoluteUrl("/assets/vodafone-glasfaser-baustelle.jpeg"),
    telephone: site.phone,
    email: site.email,
    description: site.description,
    areaServed: locations.map((location) => ({ "@type": "Place", name: location.name })),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phone,
      email: site.email,
      contactType: "customer service",
      availableLanguage: "de"
    }
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.domain,
    inLanguage: "de"
  };
}

export function breadcrumbSchema(items: Array<{ name: string; href: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href)
    }))
  };
}

export function faqSchema(items = faqItems) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  };
}

export function serviceSchema(serviceSlug?: string, locationName?: string) {
  const selected = serviceSlug ? services.find((service) => service.slug === serviceSlug) : undefined;
  const path = selected?.slug
    ? `/${selected.slug}`
    : locationName
      ? `/${locations.find((location) => location.name === locationName)?.slug ?? ""}`
      : "/";
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: selected?.h1 ?? "Vodafone Beratung",
    serviceType: selected?.h1 ?? "Vodafone Beratung",
    provider: { "@type": "ProfessionalService", name: `${site.name} - ${site.advisor}` },
    url: absoluteUrl(path),
    areaServed: locationName
      ? { "@type": "Place", name: locationName }
      : locations.map((location) => ({ "@type": "Place", name: location.name })),
    description: selected?.description ?? (locationName
      ? `Kostenlose persönliche Vodafone Beratung in ${locationName} für Internet, Glasfaser, Kabel je nach Adresse, DSL, Mobilfunk und TV.`
      : site.description)
  };
}

export function articleSchema({
  title,
  description,
  path,
  image
}: {
  title: string;
  description: string;
  path: string;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    mainEntityOfPage: absoluteUrl(path),
    image: absoluteUrl(image),
    datePublished: "2026-06-25",
    dateModified: "2026-07-13",
    author: { "@type": "Person", name: site.advisor },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: absoluteUrl("/assets/vodafone-logo.svg") }
    }
  };
}
