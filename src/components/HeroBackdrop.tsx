import Image from "next/image";
import styles from "./HeroBackdrop.module.css";

/**
 * Shared image treatment for the club's compact information and form heroes.
 *
 * SA CELLPHONE AY WALANG LARAWAN. Ang mga larawang ito ay malapad (landscape);
 * sa makitid na screen ay napuputol nang husto at lumalabo dahil pinalalaki.
 * Kaya sa ibaba ng `sm` (640px) ay malinis na madilim-berdeng gradient na
 * may manipis na gintong guhit sa ibaba ang background — at hindi na rin
 * dina-download ang larawan doon (`sizes`).
 *
 * `shade={false}`: walang madilim na patong sa larawan. Para sa hero na ang
 * teksto ay nasa sariling maliwanag na panel (hal. /plan-your-visit), kaya
 * hindi na kailangang padilimin ang larawan para mabasa ito.
 *
 * `imageSources`: precompressed AVIF/WebP variants with a fixed byte budget.
 * The picture sources only match desktop/tablet, so mobile downloads none.
 * `bottomSurface`: fades the photograph and its shade together with an alpha
 * mask, revealing the next section's background beneath the image.
 */
export default function HeroBackdrop({
  src,
  alt,
  imageClassName = "object-center",
  shade = true,
  shadeClassName = "bg-[linear-gradient(180deg,rgba(7,23,15,0.62)_0%,rgba(7,23,15,0.32)_38%,rgba(7,23,15,0.88)_100%)]",
  imageSources,
  bottomSurface,
  mobileSrc,
}: {
  src: string;
  alt: string;
  imageClassName?: string;
  shade?: boolean;
  shadeClassName?: string;
  bottomSurface?: string;
  /** Larawang pang-cellphone (patayo ang crop). Kapag wala, gradient lang. */
  mobileSrc?: string;
  imageSources?: {
    avif: string;
    webp: string;
    width: number;
    height: number;
  };
}) {
  const media = (
    <>
      {mobileSrc ? (
        <>
          <Image
            src={mobileSrc}
            alt=""
            fill
            sizes="(min-width: 640px) 1px, 100vw"
            className="pointer-events-none -z-20 object-cover object-center sm:hidden"
          />
          <div
            className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(7,23,15,0.55)_0%,rgba(7,23,15,0.35)_35%,rgba(7,23,15,0.9)_100%)] sm:hidden"
            aria-hidden="true"
          />
        </>
      ) : null}
      <div
        className={`pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(120%_80%_at_80%_0%,#2f5a40_0%,#03321b_45%,#122a1d_100%)] sm:hidden ${mobileSrc ? "hidden" : ""}`}
        aria-hidden="true"
      >
        <span className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-[#e2c77a]/50 to-transparent" />
      </div>
      {imageSources ? (
        <picture className="pointer-events-none absolute inset-0 -z-20 hidden sm:block">
          <source media="(min-width: 640px)" type="image/avif" srcSet={imageSources.avif} sizes="100vw" />
          <source media="(min-width: 640px)" type="image/webp" srcSet={imageSources.webp} sizes="100vw" />
          <img
            src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
            alt={alt}
            width={imageSources.width}
            height={imageSources.height}
            fetchPriority="high"
            decoding="async"
            className={`h-full w-full object-cover ${imageClassName}`}
          />
        </picture>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          preload
          sizes="(min-width: 640px) 100vw, 1px"
          className={`pointer-events-none -z-20 hidden object-cover sm:block ${imageClassName}`}
        />
      )}
      {shade ? (
        <div
          className={`pointer-events-none absolute inset-0 -z-10 hidden sm:block ${shadeClassName}`}
          aria-hidden="true"
        />
      ) : null}
    </>
  );

  return bottomSurface ? (
    <div className={styles.surface} style={{ backgroundColor: bottomSurface }}>
      <div className={styles.media}>{media}</div>
    </div>
  ) : media;
}
