import Image from "next/image";

/**
 * Shared image treatment for the club's compact information and form heroes.
 *
 * SA CELLPHONE AY WALANG LARAWAN. Ang mga larawang ito ay malapad (landscape);
 * sa makitid na screen ay napuputol nang husto at lumalabo dahil pinalalaki.
 * Kaya sa ibaba ng `sm` (640px) ay malinis na madilim-berdeng gradient na
 * may manipis na gintong guhit sa ibaba ang background — at hindi na rin
 * dina-download ang larawan doon (`sizes`).
 */
export default function HeroBackdrop({
  src,
  alt,
  imageClassName = "object-center",
}: {
  src: string;
  alt: string;
  imageClassName?: string;
}) {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(120%_80%_at_80%_0%,#2f5a40_0%,#1f3f2e_45%,#122a1d_100%)] sm:hidden"
        aria-hidden="true"
      >
        <span className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d8b65b]/50 to-transparent" />
      </div>
      <Image
        src={src}
        alt={alt}
        fill
        preload
        sizes="(min-width: 640px) 100vw, 1px"
        className={`pointer-events-none -z-20 hidden object-cover sm:block ${imageClassName}`}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 hidden bg-[linear-gradient(180deg,rgba(7,23,15,0.62)_0%,rgba(7,23,15,0.32)_38%,rgba(7,23,15,0.88)_100%)] sm:block"
        aria-hidden="true"
      />
    </>
  );
}
