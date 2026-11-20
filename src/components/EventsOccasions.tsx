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
 * Ang mga okasyon: BUONG-LAPAD NA LARAWAN, na ang teksto ay nasa loob nito sa
 * kaliwang-ibaba — kapareho ng mga kuwarto sa /clubhouse.
 *
 * WALANG MADILIM NA PATONG SA BUONG LARAWAN. Dati ay may itim na scrim na
 * sumasakop sa halos buong kaliwang-ibaba. Ngayon ay dalawa lang ang
 * nagpapabasa sa puting teksto: ang text-shadow nito, at isang lilim sa ibaba
 * (`h-2/5`, `lg:h-3/5`) na naglalaho pataas. Walang patong ang itaas.
 *
 * ANG PAGLALARAWAN AT MGA KASAMA AY NASA LOOB NG LARAWAN MULA `lg` LANG. Sa
 * cellphone at tablet ay maikli ang larawan (~220–430px), kaya roon ay nasa ILALIM
 * sila, sa cream; ang eyebrow at pamagat lang ang nasa loob.
 *
 * `aspect-[16/9]`: iyan ang totoong hugis ng tatlong larawan, kaya walang
 * napuputol. Ang `max-h-[88svh]` ay para lang sa napakalapad na screen.
 *
 * Normal document flow; minsan lang pumapasok ang caption (`data-reveal`) at
 * nananatiling kita pagkatapos.
 */
export default function EventsOccasions({ occasions }: { occasions: readonly Occasion[] }) {
  return (
    <div className="relative w-full bg-[#f3ede1]">
      {occasions.map((occasion) => (
        <article key={occasion.title} data-occasion-panel className="scroll-mt-20">
          <div className="relative aspect-[16/9] max-h-[88svh] w-full overflow-hidden bg-[radial-gradient(120%_80%_at_70%_20%,#2f5a40_0%,#03321b_50%,#102419_100%)]">
            <Image src={occasion.image} alt={occasion.imageAlt} fill quality={90} sizes="100vw" className="object-cover" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(180deg,transparent_0%,rgba(7,23,15,0.22)_45%,rgba(7,23,15,0.55)_100%)] lg:h-3/5 lg:bg-[linear-gradient(180deg,transparent_0%,rgba(7,23,15,0.3)_40%,rgba(7,23,15,0.68)_100%)]"
            />

            <div className="absolute inset-x-0 bottom-0">
              <div
                data-reveal="left"
                className="mx-auto w-full max-w-7xl px-6 pb-5 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.85),0_2px_14px_rgba(0,0,0,0.55)] sm:pb-8 lg:px-8 lg:pb-12"
              >
                <p className="font-navigation text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f0d98f] sm:text-sm">
                  {occasion.kicker}
                </p>
                <h3 className="mt-2 font-display text-[clamp(1.75rem,4.4vw,4.25rem)] font-medium leading-[0.98] tracking-[-0.045em] sm:mt-3">
                  {occasion.title}
                </h3>
                <p className="mt-4 hidden max-w-xl text-[15px] leading-7 text-white/95 lg:block lg:text-base lg:leading-8">
                  {occasion.description}
                </p>
                <ul className="mt-4 hidden flex-wrap gap-x-6 gap-y-1.5 text-sm text-white/95 lg:flex">
                  {occasion.inclusions.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-[#f0d98f]">
                        <CheckIcon />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="px-6 pb-9 pt-4 text-[#3f4c45] lg:hidden">
            <p className="text-[15px] leading-7">{occasion.description}</p>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              {occasion.inclusions.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="text-[#2e5126]">
                    <CheckIcon />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}
