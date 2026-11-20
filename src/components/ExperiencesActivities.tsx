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

/**
 * Ang mga activity: BUONG-LAPAD NA LARAWAN, na ang eyebrow, pamagat, at
 * paglalarawan ay nasa loob nito sa kaliwang-ibaba — kapareho ng mga kuwarto
 * sa /clubhouse (ClubhouseRooms).
 *
 * - Walang mga tuldok sa gilid, walang pindutan, walang underline sa hover.
 *   Ang buong larawan ang link papunta sa pahina ng pasilidad (bagong tab).
 * - WALANG MADILIM NA PATONG SA BUONG LARAWAN: text-shadow at isang lilim sa
 *   ibaba (`h-2/5`, `lg:h-3/5`) lang ang nagpapabasa sa puting teksto.
 * - Ang paglalarawan ay nasa loob ng larawan mula `lg` lang. Mahahaba ang ilan
 *   dito (hanggang anim na linya), kaya sa cellphone at tablet — kung saan
 *   maikli ang larawan — ay nasa ILALIM ito, sa cream.
 * - `aspect-[2560/1429]`: ang hugis ng siyam sa sampung larawan (1.79:1), kaya
 *   buo ang mga iyon. Mas malapad ang wakepark (2.46:1), kaya napuputol pa rin
 *   ang mga gilid nito gaya ng dati.
 */
export default function ExperiencesActivities({ kicker, items }: { kicker: string; items: readonly Activity[] }) {
  return (
    <div id="experiences-activities" className="relative w-full bg-[#f3ede1]">
      {items.map((item) => (
        <article key={item.id} id={item.id} data-activity-panel className="scroll-mt-20">
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${item.name} — view facility (opens in a new tab)`}
            className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#e2c77a]"
          >
            <span className="relative block aspect-[2560/1429] max-h-[88svh] w-full overflow-hidden bg-[radial-gradient(120%_80%_at_70%_20%,#2f5a40_0%,#03321b_50%,#102419_100%)]">
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
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(180deg,transparent_0%,rgba(7,23,15,0.22)_45%,rgba(7,23,15,0.55)_100%)] lg:h-3/5 lg:bg-[linear-gradient(180deg,transparent_0%,rgba(7,23,15,0.3)_40%,rgba(7,23,15,0.68)_100%)]"
              />

              <span className="absolute inset-x-0 bottom-0 block">
                <span
                  data-reveal="left"
                  className="mx-auto block w-full max-w-7xl px-6 pb-5 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.85),0_2px_14px_rgba(0,0,0,0.55)] sm:pb-8 lg:px-8 lg:pb-12"
                >
                  <span className="block font-navigation text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f0d98f] sm:text-sm">
                    {kicker}
                  </span>
                  <h3 className="mt-2 font-display text-[clamp(1.75rem,4.4vw,4.25rem)] font-medium leading-[0.98] tracking-[-0.045em] sm:mt-3">
                    {item.name}
                  </h3>
                  <span className="mt-4 hidden max-w-xl text-[15px] font-normal leading-7 text-white/95 lg:block lg:text-base lg:leading-8">
                    {item.description}
                  </span>
                </span>
              </span>
            </span>

            <span className="block px-6 pb-8 pt-4 text-[15px] font-normal leading-7 text-[#3f4c45] lg:hidden">{item.description}</span>
          </a>
        </article>
      ))}
    </div>
  );
}
