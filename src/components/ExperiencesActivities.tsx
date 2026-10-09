import Image from "next/image";

type Activity = {
  readonly id: string;
  readonly name: string;
  readonly image: string;
  /* Opsyonal na background video (lokal na MP4 sa /public). Kapag may nito,
     tumutugtog ito sa ibabaw ng larawan; ang larawan ang nananatiling poster
     habang nilo-load o kung mabigo ang video. Dapat muted + loop + playsInline
     para payagan ng browser ang autoplay. */
  readonly video?: string;
  readonly href: string;
  readonly description: string;
};

export default function ExperiencesActivities({ kicker, items }: { kicker: string; items: readonly Activity[] }) {
  return (
    <div className="relative w-full bg-[#f7f5ee]">
      {items.map((item) => (
        <article
          key={item.id}
          id={item.id}
          data-activity-panel
          className="relative min-h-svh scroll-mt-28 overflow-hidden bg-black"
        >
          {/* Larawan: nasa likod bilang poster/fallback. Kapag may video ang
              activity, tumutugtog ito sa ibabaw; kung mabigo (404 o hindi
              suportado), nananatiling kita ang larawan sa likod. */}
          <Image src={item.image} alt={item.name} fill sizes="100vw" className="object-cover" />
          {item.video ? (
            <video
              src={item.video}
              poster={item.image}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
              tabIndex={-1}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : null}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 78% 82% at 0% 100%, rgba(0,0,0,0.64) 0%, rgba(0,0,0,0.46) 38%, rgba(0,0,0,0.20) 66%, transparent 92%), linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.28) 60%, rgba(0,0,0,0.58) 100%)",
            }}
          />

          <div className="absolute inset-x-0 bottom-0 px-6 pb-6 pt-32 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_2px_10px_rgba(0,0,0,0.62)] sm:px-9 sm:pb-9 sm:pt-40 lg:px-12 lg:pb-12 lg:pt-48">
            <div data-reveal="left" className="max-w-2xl">
              <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.2em] text-[#f0d98f] xl:text-[11px]">
                {kicker}
              </p>
              <h3 className="mt-3 font-display text-3xl font-medium tracking-[-0.04em] text-white sm:text-4xl xl:text-5xl">
                {item.name}
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/90 sm:text-base sm:leading-8">
                {item.description}
              </p>
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex h-11 items-center gap-3 rounded-full border border-[#e7d18d]/70 px-6 font-navigation text-[10px] font-bold uppercase tracking-[0.12em] text-[#f0d98f] transition-colors hover:border-[#e7d18d] hover:bg-[#e7d18d] hover:text-[#14271d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e7d18d] xl:text-[11px]"
              >
                View facility <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
