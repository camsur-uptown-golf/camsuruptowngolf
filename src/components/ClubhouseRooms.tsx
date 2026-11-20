import Image from "next/image";
import Link from "next/link";
import { CLUBHOUSE_SPACES } from "@/lib/clubhouse";

/**
 * Ang mga kuwarto: BUONG-LAPAD NA LARAWAN, na ang eyebrow at pamagat ay nasa
 * LOOB ng larawan, sa kaliwang-ibaba.
 *
 * Eyebrow, pamagat, at paglalarawan: walang listahan ng features o "View the
 * space" na pindutan. Para manatiling abot ang sariling pahina ng bawat
 * kuwarto (`/clubhouse/<id>`), ang buong larawan ang link.
 *
 * ANG PAGLALARAWAN AY NASA LOOB NG LARAWAN MULA `md` LANG. Sa cellphone ay
 * ~220px lang ang taas ng larawan — kapag isinama roon ang tatlo-apat na
 * linya ng paglalarawan ay matatakpan na ang buong render. Kaya roon ay nasa
 * ILALIM ito ng larawan, sa cream.
 *
 * WALANG MADILIM NA PATONG SA BUONG LARAWAN. Dalawang bagay lang ang
 * nagpapabasa sa puting teksto: ang text-shadow nito, at isang MAIKLING
 * lilim sa ibaba (`h-2/5`, `md:h-1/2`) na naglalaho pataas — kung wala iyon ay
 * nawawala ang teksto sa maliliwanag na render (pool, rooftop). Ang itaas na
 * 60% ng larawan ay walang anumang patong.
 *
 * Nasa iisang gilid ng buong pahina ang teksto (`max-w-7xl` — kapareho ng
 * Breadcrumbs at Footer).
 *
 * `aspect-[2600/1451]`: iyan ang totoong hugis ng lahat ng sampung render
 * (1.79:1), kaya walang napuputol. Ang `max-h-[88svh]` ay para lang sa
 * napakalapad na screen, kung saan lalampas na sa taas ng tanaw ang larawan.
 */

export default function ClubhouseRooms() {
  return (
    <div id="clubhouse-rooms" className="relative w-full bg-[#f3ede1]">
      {CLUBHOUSE_SPACES.map((space) => (
        <article key={space.id} id={space.id} className="scroll-mt-20">
          <Link
            href={`/clubhouse/${space.id}`}
            className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#e2c77a]"
          >
            <span className="relative block aspect-[2600/1451] max-h-[88svh] w-full overflow-hidden bg-[radial-gradient(120%_80%_at_70%_20%,#2f5a40_0%,#03321b_50%,#102419_100%)]">
              <Image src={space.image} alt={space.imageAlt} fill sizes="100vw" className="object-cover" />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(180deg,transparent_0%,rgba(7,23,15,0.22)_45%,rgba(7,23,15,0.55)_100%)] md:h-1/2 md:bg-[linear-gradient(180deg,transparent_0%,rgba(7,23,15,0.26)_40%,rgba(7,23,15,0.62)_100%)]"
              />

              <span className="absolute inset-x-0 bottom-0 block">
                <span
                  data-reveal="up"
                  className="mx-auto block w-full max-w-7xl px-6 pb-5 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.85),0_2px_14px_rgba(0,0,0,0.55)] sm:pb-8 lg:px-8 lg:pb-12"
                >
                  <span className="block font-navigation text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f0d98f] sm:text-sm">
                    {space.floor}
                  </span>
                  <h3 className="mt-2 font-display text-[clamp(1.75rem,4.4vw,4.25rem)] font-medium leading-[0.98] tracking-[-0.045em] sm:mt-3">
                    {space.name}
                  </h3>
                  <span className="mt-4 hidden max-w-xl text-[15px] font-normal leading-7 text-white/95 md:block lg:text-base lg:leading-8">
                    {space.description}
                  </span>
                </span>
              </span>
            </span>

            <span className="block px-6 pb-8 pt-4 text-[12px] font-normal leading-6 text-[#3f4c45] md:hidden">{space.description}</span>
          </Link>
        </article>
      ))}
    </div>
  );
}
