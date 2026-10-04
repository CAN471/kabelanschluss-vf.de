"use client";

import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { FaqList } from "@/components/Faq";
import { site } from "@/lib/site";

type FaqItem = { question: string; answer: string };

function normalize(value: string) {
  return value.toLocaleLowerCase("de").normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export function FaqSearch({ items }: { items: FaqItem[] }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    if (terms.length === 0) return items;
    return items.filter((item) => {
      const haystack = normalize(`${item.question} ${item.answer}`);
      return terms.every((term) => haystack.includes(term));
    });
  }, [items, query]);

  return (
    <div className="faq-search">
      <label className="faq-search-field">
        <Search aria-hidden="true" />
        <span className="sr-only">Fragen durchsuchen</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Frage suchen, z. B. „HÜP“ oder „Glasfaser“"
        />
        {query && (
          <button type="button" onClick={() => setQuery("")} aria-label="Suche leeren">
            <X aria-hidden="true" />
          </button>
        )}
      </label>
      <p className="faq-search-count" aria-live="polite">
        {results.length === items.length ? `${items.length} Fragen` : `${results.length} von ${items.length} Fragen`}
      </p>
      {results.length > 0 ? (
        <FaqList items={results} />
      ) : (
        <div className="faq-empty">
          <strong>Keine passende Antwort gefunden.</strong>
          <p>
            Frag Jan einfach direkt – per{" "}
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a> oder unter{" "}
            <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>.
          </p>
        </div>
      )}
    </div>
  );
}
