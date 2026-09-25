"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type Shot = { src: string; alt: string; width: number; height: number };

/**
 * Fullscreen na tingin sa mga larawan ng tuluyan.
 *
 * HINDI NITO KAILANGANG GAWING CLIENT ANG MGA PAHINA. Nakikinig ito sa
 * `click` sa buong dokumento at hinahanap ang pinakamalapit na
 * `[data-lightbox]`. Kaya ang mga server component ng tuluyan ay kailangan
 * lang magdagdag ng tatlong attribute sa balot ng larawan:
 *
 *     data-lightbox data-src="/…jpg" data-alt="…"
 *
 * Kung ipinasa ko ang isang function bilang laman nito, kailangang maging
 * client component ang VillaDelReyStays at ang GotaVillageStays — hindi
 * naipapasa ang function mula sa server patungo sa client.
 *
 * ISANG LARAWAN LANG ANG HAWAK NITO. May pasulong at paurong ito sandali,
 * pero iisa ang hinihiling dito: ang malapitang tingin sa pinindot.
 */
export default function ImageLightbox() {
  const [shot, setShot] = useState<Shot | null>(null);
  const close = useCallback(() => setShot(null), []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      /* Ang mga pinindot na may modifier ay para sa bagong tab, at ang
         hindi kaliwang pindot ay para sa menu ng browser. Huwag agawin. */
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target;
      if (!(target instanceof Element)) return;
      const trigger = target.closest<HTMLElement>("[data-lightbox]");
      if (!trigger) return;

      const src = trigger.dataset.src;
      if (!src) return;

      /* Pagkatapos lang ng lahat ng maaaring magpabalik: sa puntong ito ay
         tayo na ang humahawak ng pindot, kaya hindi na dapat sumunod ang
         anumang link sa paligid nito. */
      event.preventDefault();
      const alt = trigger.dataset.alt ?? "";

      /* KAILANGAN ANG TUNAY NA SUKAT BAGO IGUHIT. Sa `fill` ay sumasakop
         ang balot sa buong container at ang `object-contain` na lang ang
         pumipigil sa larawan sa loob — kaya may bakanteng gilid sa magkabila
         na hindi bahagi ng larawan. Doon dumadausdos palabas ang paliwanag,
         at iyon ang dahilan kung bakit ito naputol sa gilid.
         Sa tunay na sukat ay kasinlaki mismo ng larawan ang balot. */
      const probe = new window.Image();
      probe.onload = () => setShot({ src, alt, width: probe.naturalWidth, height: probe.naturalHeight });
      probe.src = src;
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!shot) return;

    /* Nananatili ang Escape kahit walang pindutang pansara: iyon lang ang
       paraan ng gumagamit ng keyboard para makalabas dito. */
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    /* Hindi dapat gumalaw ang pahina sa likod habang bukas ito. Ibinabalik
       ang dating halaga sa halip na `""` — may sariling `overflow` ang
       `body` sa ilang pahina at mawawala iyon. */
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [shot, close]);

  if (!shot) return null;

  return (
    /* NAGSASARA ANG KAHIT SAANG PINDOT, KASAMA ANG LARAWAN MISMO. Walang
       `stopPropagation` kahit saan sa loob nito — walang pindutang pansara,
       kaya ang buong screen ang pindutang pansara.

       MALABONG SALAMIN, HINDI ITIM NA PANTAKIP. Manipis na dilim lang at
       8px na blur: nananatiling nababasa ang pahina sa likod, kaya ramdam
       na nakapatong lang ito at hindi ibang pahina. */
    <div
      data-lightbox-overlay
      role="dialog"
      aria-modal="true"
      aria-label={shot.alt || "Photo"}
      onClick={close}
      className="fixed inset-0 z-[120] flex cursor-zoom-out items-center justify-center bg-[#0b1a12]/45 p-4 backdrop-blur-[8px] sm:p-10"
    >
      {/* `inline-block` at tunay na sukat: kasinlaki ng larawan ang balot,
          kaya tumutugma ang `inset-x-0` ng paliwanag sa gilid nito. */}
      <span className="relative inline-block max-h-full max-w-full leading-none">
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          sizes="100vw"
          priority
          className="h-auto max-h-[86vh] w-auto max-w-full object-contain"
        />

        {/* NASA LOOB NA NG LARAWAN ANG PALIWANAG. Nasa ilalim ito ng larawan
            dati, sa gitna ng malabong background — lumulutang at walang
            kinabibilangan. Ang gradient lang ang nagpapabasa nito; walang
            kahon, walang sariling background. */}
        {shot.alt ? (
          <span className="pointer-events-none absolute inset-x-0 bottom-0 block bg-gradient-to-t from-[#050d09]/85 via-[#050d09]/35 to-transparent px-5 pb-5 pt-16 sm:px-7 sm:pb-6">
            <span className="block text-[13px] font-semibold uppercase leading-tight tracking-[0.08em] text-white sm:text-sm">
              {shot.alt}
            </span>
          </span>
        ) : null}
      </span>
    </div>
  );
}
