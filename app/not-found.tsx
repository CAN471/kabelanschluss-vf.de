import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";

export default function NotFound() {
  return (
    <PageHero
      crumbs={[{ name: "Start", href: "/" }, { name: "Seite nicht gefunden" }]}
      eyebrow="Fehler 404"
      title={<>Diese Leitung führt <span className="text-red">ins Leere.</span></>}
      lead="Die Seite wurde nicht gefunden. Zurück zur Vodafone Beratung oder direkt eine Anfrage stellen."
      actions={
        <>
          <Link className="btn btn-red btn-lg" href="/">
            Zur Startseite <ArrowRight aria-hidden="true" />
          </Link>
          <Link className="btn btn-ghost btn-lg" href="/#kontakt">
            Beratung anfragen
          </Link>
        </>
      }
    />
  );
}
