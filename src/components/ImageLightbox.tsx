"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Shot = { src: string; alt: string; width: number; height: number };
type GalleryShot = Pick<Shot, "src" | "alt">;

/**
 * Reusable fullscreen lightbox. Server components only need data-lightbox,
 * data-src, and data-alt. Triggers with the same data-lightbox-group become
 * one gallery with previous/next controls.
 */
export default function ImageLightbox() {
  const [shot, setShot] = useState<Shot | null>(null);
  const [gallery, setGallery] = useState<GalleryShot[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const loadToken = useRef(0);

  const loadShot = useCallback((nextShot: GalleryShot) => {
    const token = ++loadToken.current;
    const probe = new window.Image();

    probe.onload = () => {
      if (token !== loadToken.current) return;
      setShot({
        ...nextShot,
        width: probe.naturalWidth,
        height: probe.naturalHeight,
      });
    };
    probe.onerror = () => {
      if (token !== loadToken.current) return;
      setShot({ ...nextShot, width: 1600, height: 1000 });
    };
    probe.src = nextShot.src;
  }, []);

  const close = useCallback(() => {
    loadToken.current += 1;
    setShot(null);
    setGallery([]);
    setActiveIndex(0);
  }, []);

  const move = useCallback(
    (direction: -1 | 1) => {
      if (gallery.length < 2) return;
      const nextIndex = (activeIndex + direction + gallery.length) % gallery.length;
      setActiveIndex(nextIndex);
      loadShot(gallery[nextIndex]);
    },
    [activeIndex, gallery, loadShot],
  );

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target;
      if (!(target instanceof Element)) return;
      const trigger = target.closest<HTMLElement>("[data-lightbox]");
      if (!trigger) return;

      const src = trigger.dataset.src;
      if (!src) return;

      event.preventDefault();
      const groupName = trigger.dataset.lightboxGroup;
      const triggers = groupName
        ? Array.from(document.querySelectorAll<HTMLElement>("[data-lightbox]")).filter(
            (item) => item.dataset.lightboxGroup === groupName,
          )
        : [trigger];
      const nextGallery = triggers.flatMap((item) => {
        const itemSrc = item.dataset.src;
        return itemSrc ? [{ src: itemSrc, alt: item.dataset.alt ?? "" }] : [];
      });
      const nextIndex = Math.max(0, triggers.indexOf(trigger));
      const nextShot = nextGallery[nextIndex] ?? { src, alt: trigger.dataset.alt ?? "" };

      setGallery(nextGallery);
      setActiveIndex(nextIndex);
      loadShot(nextShot);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [loadShot]);

  useEffect(() => {
    if (!shot) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [shot, close, move]);

  if (!shot) return null;

  const hasMultipleShots = gallery.length > 1;

  return (
    <div
      data-lightbox-overlay
      role="dialog"
      aria-modal="true"
      aria-label={shot.alt || "Photo gallery"}
      onClick={close}
      className="fixed inset-0 z-[120] flex cursor-zoom-out items-center justify-center bg-[#0b1a12]/45 p-4 backdrop-blur-[8px] sm:p-10"
    >
      <button
        type="button"
        aria-label="Close photo"
        onClick={(event) => {
          event.stopPropagation();
          close();
        }}
        className="absolute right-4 top-4 z-20 grid size-11 cursor-pointer place-items-center rounded-full border border-white/35 bg-[#10251a]/70 text-2xl leading-none text-white transition hover:bg-[#10251a] sm:right-7 sm:top-7"
      >
        <span aria-hidden="true">×</span>
      </button>

      {hasMultipleShots ? (
        <button
          type="button"
          aria-label="Previous photo"
          onClick={(event) => {
            event.stopPropagation();
            move(-1);
          }}
          className="absolute left-3 top-1/2 z-20 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-white/35 bg-[#10251a]/70 text-3xl leading-none text-white transition hover:bg-[#10251a] sm:left-7 sm:size-13"
        >
          <span aria-hidden="true">‹</span>
        </button>
      ) : null}

      <span
        onClick={(event) => event.stopPropagation()}
        className="relative inline-block max-h-full max-w-full cursor-default leading-none"
      >
        <Image
          key={shot.src}
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          sizes="100vw"
          priority
          className="h-auto max-h-[86vh] w-auto max-w-full object-contain"
        />

        {shot.alt ? (
          <span className="pointer-events-none absolute inset-x-0 bottom-0 block bg-gradient-to-t from-[#050d09]/85 via-[#050d09]/35 to-transparent px-5 pb-5 pt-16 sm:px-7 sm:pb-6">
            <span className="block text-[13px] font-semibold uppercase leading-tight tracking-[0.08em] text-white sm:text-sm">
              {shot.alt}
            </span>
          </span>
        ) : null}
      </span>

      {hasMultipleShots ? (
        <button
          type="button"
          aria-label="Next photo"
          onClick={(event) => {
            event.stopPropagation();
            move(1);
          }}
          className="absolute right-3 top-1/2 z-20 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-white/35 bg-[#10251a]/70 text-3xl leading-none text-white transition hover:bg-[#10251a] sm:right-7 sm:size-13"
        >
          <span aria-hidden="true">›</span>
        </button>
      ) : null}
    </div>
  );
}
