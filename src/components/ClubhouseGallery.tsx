import Image from "next/image";

/**
 * Mga dagdag na kuha ng isang espasyo sa Clubhouse.
 *
 * BUONG-LAPAD NA LARAWAN, kapareho ng mga kuwarto sa /clubhouse: buo ang
 * bawat render (`aspect-[2600/1451]` — ang hugis ng lahat ng kuha), at ang
 * caption ay nasa loob nito sa kaliwang-ibaba, sa gilid ng pahina.
 *
 * WALANG MADILIM NA PATONG SA BUONG LARAWAN: text-shadow at isang lilim sa
 * ibaba lang ang nagpapabasa sa puting caption.
 *
 * Normal document flow; minsan lang pumapasok ang caption (`data-reveal`).
 */
export default function ClubhouseGallery({
  label,
  shots,
}: {
  label: string;
  shots: readonly { readonly src: string; readonly alt: string }[];
}) {
  return (
    <div className="relative w-full bg-[#f3ede1]">
      {shots.map((shot) => (
        <figure
          key={shot.src}
          data-shot-panel
          className="relative aspect-[2600/1451] max-h-[88svh] w-full overflow-hidden bg-[radial-gradient(120%_80%_at_70%_20%,#2f5a40_0%,#03321b_50%,#102419_100%)]"
        >
          <Image src={shot.src} alt={shot.alt} fill sizes="100vw" className="object-cover" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,transparent_0%,rgba(7,23,15,0.26)_40%,rgba(7,23,15,0.62)_100%)]"
          />

          <figcaption className="absolute inset-x-0 bottom-0">
            <div
              data-reveal="left"
              className="mx-auto w-full max-w-7xl px-6 pb-5 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.85),0_2px_14px_rgba(0,0,0,0.55)] sm:pb-8 lg:px-8 lg:pb-12"
            >
              <p className="font-navigation text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f0d98f] sm:text-sm">
                {label}
              </p>
              <p className="mt-2 max-w-3xl font-display text-[clamp(1.25rem,2.8vw,2.5rem)] font-medium leading-[1.1] tracking-[-0.03em] sm:mt-3">
                {shot.alt}
              </p>
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
