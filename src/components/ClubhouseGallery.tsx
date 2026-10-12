import Image from "next/image";

/**
 * Extra views for an individual Clubhouse space.
 *
 * Each image is a normal full-screen panel. There is no sticky stage, scroll
 * listener, progress variable, or reversible scrub. The caption uses the
 * site's shared one-time reveal and remains visible after it has entered.
 */
export default function ClubhouseGallery({
  label,
  shots,
}: {
  label: string;
  shots: readonly { readonly src: string; readonly alt: string }[];
}) {
  return (
    <div className="relative w-full bg-[#f7f5ee]">
      {shots.map((shot) => (
        <figure
          key={shot.src}
          data-shot-panel
          className="relative min-h-svh overflow-hidden bg-black"
        >
          <Image src={shot.src} alt={shot.alt} fill sizes="100vw" className="object-cover" />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 78% 82% at 0% 100%, rgba(0,0,0,0.64) 0%, rgba(0,0,0,0.46) 38%, rgba(0,0,0,0.20) 66%, transparent 92%), linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.28) 60%, rgba(0,0,0,0.58) 100%)",
            }}
          />

          <figcaption className="absolute inset-x-0 bottom-0 px-6 pb-6 pt-20 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_2px_10px_rgba(0,0,0,0.6)] sm:px-9 sm:pb-9 sm:pt-24 lg:px-12 lg:pb-12 lg:pt-28">
            <div data-reveal="left" className="max-w-xl">
              <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.18em] text-[#e7d18d] xl:text-[11px]">
                {label}
              </p>
              <p className="mt-3 text-lg leading-8 text-white sm:text-xl xl:text-2xl xl:leading-9">
                {shot.alt}
              </p>
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
