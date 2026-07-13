import type { MetadataRoute } from "next";
import { guides, locations, services, site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-07-13");
  const routes = [
    "",
    "ratgeber",
    "faq",
    "impressum",
    "datenschutz",
    ...guides.map((guide) => `ratgeber/${guide.slug}`),
    ...services.map((service) => service.slug),
    ...locations.map((location) => location.slug)
  ];

  return routes.map((route) => ({
    url: `${site.domain}/${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("vodafone-beratung") ? 0.82 : 0.76
  }));
}
