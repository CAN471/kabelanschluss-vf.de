"use client";

import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

export function ZoomableImage({
  src,
  alt,
  caption,
  aspectRatio = "16 / 10"
}: {
  src: string;
  alt: string;
  caption: string;
  aspectRatio?: string;
}) {
  const [open, setOpen] = useState(false);
  const captionId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeLightbox = useCallback(() => {
    setOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [closeLightbox, open]);

  return (
    <>
      <figure className="zoomable-image">
        <button
          ref={triggerRef}
          type="button"
          className="zoomable-image-frame"
          style={{ "--image-aspect": aspectRatio } as CSSProperties}
          onClick={() => setOpen(true)}
          aria-label={`${alt} vergrößern`}
        >
          <Image src={src} alt={alt} fill sizes="(min-width: 1100px) 760px, 100vw" />
          <span className="zoomable-image-action"><Maximize2 aria-hidden="true" /> Vergrößern</span>
        </button>
        <figcaption id={captionId}>{caption}</figcaption>
      </figure>

      {open && (
        <div className="image-lightbox" role="dialog" aria-modal="true" aria-describedby={captionId} onClick={closeLightbox}>
          <button type="button" className="image-lightbox-close" onClick={closeLightbox} aria-label="Ansicht schließen" autoFocus>
            <X aria-hidden="true" />
          </button>
          <div className="image-lightbox-stage" onClick={(event) => event.stopPropagation()}>
            <Image src={src} alt={alt} fill sizes="96vw" priority />
          </div>
          <p>{caption}</p>
        </div>
      )}
    </>
  );
}
