import Image from "next/image";

type Occasion = {
  readonly title: string;
  readonly kicker: string;
  readonly description: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly inclusions: readonly string[];
};

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="mt-[3px] h-3.5 w-3.5 shrink-0" fill="none" aria-hidden="true">
      <path d="m4.5 10.5 3.2 3.1 7.8-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Event occasions as normal full-screen panels.
 *
 * Images move with the document instead of remaining pinned in 220vh stages.
 * Captions use the shared one-time reveal and stay visible after entering, so
 * scrolling upward cannot rewind or hide them.
 */
export default function EventsOccasions({ occasions }: { occasions: readonly Occasion[] }) {
  return (
    <div className="relative w-full bg-[#f7f5ee]">
      {occasions.map((occasion) => (
        <article
          key={occasion.title}
          data-occasion-panel
          className="relative min-h-svh scroll-mt-28 overflow-hidden bg-black"
        >
          <Image src={occasion.image} alt={occasion.imageAlt} fill sizes="100vw" className="object-cover" />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 78% 82% at 0% 100%, rgba(0,0,0,0.64) 0%, rgba(0,0,0,0.46) 38%, rgba(0,0,0,0.20) 66%, transparent 92%), linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.28) 60%, rgba(0,0,0,0.58) 100%)",
            }}
          />

          <div className="absolute inset-x-0 bottom-0 px-6 pb-6 pt-40 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_2px_10px_rgba(0,0,0,0.62)] sm:px-9 sm:pb-9 sm:pt-48 lg:px-12 lg:pb-12 lg:pt-56">
            <div data-reveal="left" className="max-w-2xl">
              <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.2em] text-[#f0d98f] xl:text-[11px]">
                {occasion.kicker}
              </p>
              <h3 className="mt-3 font-display text-2xl font-medium tracking-[-0.04em] text-white sm:text-3xl xl:text-4xl">
                {occasion.title}
              </h3>
              <p className="mt-4 max-w-xl line-clamp-4 text-sm leading-7 text-white/90 sm:line-clamp-none xl:text-base xl:leading-8">
                {occasion.description}
              </p>
              <ul className="mt-5 flex flex-col gap-2 sm:mt-6">
                {occasion.inclusions.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[13px] leading-6 text-white/85 xl:text-sm">
                    <span className="text-[#f0d98f]">
                      <CheckIcon />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
