import Image from "next/image";
import Link from "next/link";
import ScrollMotion from "@/components/ScrollMotion";
import { EDITORIAL_SECTION, EditorialHeading, Shell, delay } from "@/components/EditorialKit";
import {
  CLUBHOUSE_DAY,
  CLUBHOUSE_DESIGNER,
  CLUBHOUSE_FACTS,
  CLUBHOUSE_LEVELS,
  CLUBHOUSE_SPACES,
  roomCountWord,
} from "@/lib/clubhouse";
import { CLUB_PHONE } from "@/lib/site-content";

/**
 * Ang pahina ng Clubhouse: kung ano ang nasa loob ng gusali.
 *
 * Sinasagot lang nito ang tanong ng bisita — anong mga kuwarto ang
 * naroon, nasaan sila, at ano ang gagawin mo sa kanila. Ang materyal ng
 * arkitekto — ang brief, ang palette, ang area schedule sa metro
 * kuwadrado, at ang credit — ay nasa `/clubhouse/architecture`. Nandito
 * dati ang lahat at kapansin-pansin iyon sa gitna ng pahinang pambisita.
 *
 * Iisa ang pinagmulan ng dalawang pahina: `lib/clubhouse.ts`, na galing
 * naman sa mga dokumento ng VM·STUDIO.
 *
 * Magkaiba ito sa Clubhouse Lodge sa Accommodations. Tirahan iyon; ang
 * mga ito ay bahagi ng gusali ng club.
 */

/* Ang 2,695 m² ay hindi kasama: sukat iyon ng arkitekto, at nasa pahina
   ng arkitektura kasama ang buong area schedule. */
const VISITOR_FACTS = CLUBHOUSE_FACTS.filter((fact) => fact.label !== "Square metres");

export default function ClubhouseDetails() {
  return (
    <>
      <ScrollMotion />

      <section className={EDITORIAL_SECTION}>
        <Shell>
          <EditorialHeading
            kicker="The building"
            title="One place to start the day, and to finish it."
            intro="Everything that happens around a round is in this one building — arriving, getting ready, warming up, and sitting down afterwards."
          />

          <dl className="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#1f3f2e]/10 bg-[#1f3f2e]/10 sm:mt-14 sm:grid-cols-4">
            {VISITOR_FACTS.map((fact, index) => (
              <div key={fact.label} data-reveal="up" style={delay(index * 70)} className="bg-white px-4 py-6 text-center">
                <dt className="font-display text-3xl font-medium leading-none tracking-[-0.04em] text-[#14271d] sm:text-4xl">
                  {fact.value}
                </dt>
                <dd className="mt-3 font-navigation text-[9px] font-bold uppercase leading-4 tracking-[0.14em] text-[#5d685f] xl:text-[10px]">
                  {fact.label}
                </dd>
              </div>
            ))}
          </dl>
        </Shell>
      </section>

      {/* Anong nasa bawat palapag. Ito ang pinakamalapit na sagot sa
          "ano ang nasa loob", kaya ito ang unang malaking bahagi. */}
      <section className={EDITORIAL_SECTION}>
        <Shell>
          <EditorialHeading
            kicker="Floor by floor"
            title="What is on each level."
            intro="Three floors and a roof terrace. The practice bays are lowest, closest to the grass; the bar is highest, looking back over the holes you have just played."
          />

          <div className="mt-12 space-y-px overflow-hidden rounded-2xl border border-[#1f3f2e]/10 bg-[#1f3f2e]/10 sm:mt-14">
            {CLUBHOUSE_LEVELS.map((level, index) => (
              <div
                key={level.code}
                data-reveal="up"
                style={delay(index * 80)}
                className="grid gap-5 bg-white p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10"
              >
                <div className={level.plan.length === 0 ? "lg:col-span-2" : undefined}>
                  <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.16em] text-[#98782f] xl:text-[11px]">
                    {level.code} · {level.level}
                  </p>
                  <h3 className="mt-3 text-xl font-medium tracking-[-0.035em] text-[#14271d] sm:text-2xl">
                    {level.name}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#5d685f]">{level.summary}</p>
                </div>
                {level.plan.length > 0 ? (
                <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5 self-start border-t border-[#1f3f2e]/10 pt-5 text-sm leading-6 text-[#56625b] lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                  {level.plan.map((room) => (
                    <li key={room}>{room}</li>
                  ))}
                </ul>
                ) : null}
              </div>
            ))}
          </div>
        </Shell>
      </section>

      {/* Ang mga kuwartong may larawan. Ang `id` ay galing sa
          CLUBHOUSE_SPACES — iyon din ang anchor na tinuturo ng mega menu,
          kaya hindi sila naghihiwalay kapag may idinagdag o inalis doon. */}
      {/* Mas malapad ang hanay na ito kaysa sa `Shell`: ang larawan ang
          pangunahing laman dito, at dating 480px lang ito sa dalawang
          haligi. Buong lapad na ngayon at nasa 1152px — mahigit dalawang
          beses — kaya hindi na kailangan ng maximize o lightbox. */}
      <section className={EDITORIAL_SECTION}>
        <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-12">
          <EditorialHeading kicker="Inside" title={`${roomCountWord()} rooms in the building.`} />

          <div className="mt-12 space-y-16 sm:mt-14 sm:space-y-24">
            {CLUBHOUSE_SPACES.map((space) => (
              <article key={space.id} id={space.id} className="scroll-mt-28">
                <div data-reveal="up" className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#1f3f2e] sm:aspect-[16/9]">
                  <Image
                    src={space.image}
                    alt={space.imageAlt}
                    fill
                    sizes="(max-width: 1151px) calc(100vw - 3rem), 1104px"
                    className="object-cover"
                  />
                </div>

                <div data-reveal="up" style={delay(110)} className="mt-7 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
                  <div>
                    <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.16em] text-[#98782f] xl:text-[11px]">
                      {space.floor}
                    </p>
                    <h3 className="mt-3 text-2xl font-medium tracking-[-0.04em] text-[#14271d] sm:text-3xl">
                      {space.name}
                    </h3>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5d685f] xl:text-base xl:leading-8">
                      {space.description}
                    </p>
                  </div>
                  {/* Ang `id` ang slug ng sariling ruta — tingnan ang
                      CLUBHOUSE_SPACES. Nananatili rin itong anchor dito. */}
                  <Link
                    href={`/clubhouse/${space.id}`}
                    className="inline-flex h-11 shrink-0 items-center justify-center justify-self-start whitespace-nowrap rounded-full border border-[#1f3f2e]/25 px-6 font-navigation text-[10px] font-bold uppercase tracking-[0.12em] text-[#14271d] transition-colors hover:border-[#265136] hover:bg-[#265136] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#265136] xl:text-[11px]"
                  >
                    See {space.name.toLowerCase()}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={EDITORIAL_SECTION}>
        <Shell>
          <EditorialHeading kicker="The experience" title="How a day here runs." />

          <div className="mt-12 grid gap-8 sm:mt-14 sm:grid-cols-3 sm:gap-10">
            {CLUBHOUSE_DAY.map((part, index) => (
              <div key={part.time} data-reveal="up" style={delay(index * 110)}>
                <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-2xl bg-[#1f3f2e]">
                  <Image
                    src={part.image}
                    alt={`${part.title} at the CamSur Uptown clubhouse`}
                    fill
                    sizes="(max-width: 639px) calc(100vw - 3rem), 320px"
                    className="object-cover"
                  />
                </div>
                <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.16em] text-[#98782f] xl:text-[11px]">
                  {part.time}
                </p>
                <h3 className="mt-3 text-lg font-medium tracking-[-0.035em] text-[#14271d] sm:text-xl">{part.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#5d685f]">{part.detail}</p>
              </div>
            ))}
          </div>
        </Shell>
      </section>

      <section className={EDITORIAL_SECTION}>
        <Shell>
          <EditorialHeading
            kicker="Plan a visit"
            title="Come and see it."
            intro="Opening hours, dress code, and which rooms visitors can use are not settled yet — call the club and we will tell you what is."
          />

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <Link
              href="/plan-your-visit"
              data-reveal="up"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#265136] px-7 font-navigation text-[10px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#1f3f2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#265136] xl:text-[11px]"
            >
              Plan your visit
            </Link>
            <a
              href={CLUB_PHONE.href}
              data-reveal="up"
              style={delay(90)}
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#1f3f2e]/20 px-7 font-navigation text-[10px] font-bold uppercase tracking-[0.1em] text-[#14271d] transition-colors hover:border-[#265136] hover:text-[#265136] xl:text-[11px]"
            >
              {CLUB_PHONE.label}
            </a>
          </div>

        </Shell>
      </section>

      {/* Kung sino ang nagdisenyo, sa ibaba ng pahina. Buo ang bersyon
          nito sa `/clubhouse/architecture` kasama ang brief, ang palette
          at ang area schedule; ito ang maikling anyo, at ito rin ang
          pinto papunta roon. Iisa ang pinagmulan: CLUBHOUSE_DESIGNER. */}
      <section className={EDITORIAL_SECTION}>
        <Shell>
          <div className="border-t border-[#1f3f2e]/12 pt-12 text-center sm:pt-14">
            <p
              data-reveal="up"
              className="font-navigation text-[10px] font-bold uppercase tracking-[0.2em] text-[#98782f] xl:text-[11px]"
            >
              Architecture, interiors and landscape by
            </p>
            <p
              data-reveal="up"
              style={delay(90)}
              className="mt-4 font-display text-3xl font-medium tracking-[-0.04em] text-[#14271d] sm:text-4xl"
            >
              {CLUBHOUSE_DESIGNER.name}
            </p>
            <p data-reveal="up" style={delay(160)} className="mt-4 text-sm leading-7 text-[#5d685f]">
              {CLUBHOUSE_DESIGNER.practice}. {CLUBHOUSE_DESIGNER.based}.
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
              <a
                data-reveal="up"
                style={delay(220)}
                href={CLUBHOUSE_DESIGNER.websiteHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-navigation text-[10px] font-bold uppercase tracking-[0.14em] text-[#98782f] transition-colors hover:text-[#265136] xl:text-[11px]"
              >
                {CLUBHOUSE_DESIGNER.website} <span aria-hidden="true">↗</span>
              </a>
              <Link
                data-reveal="up"
                style={delay(280)}
                href="/clubhouse/architecture"
                className="inline-flex items-center gap-2 font-navigation text-[10px] font-bold uppercase tracking-[0.14em] text-[#98782f] transition-colors hover:text-[#265136] xl:text-[11px]"
              >
                The architecture behind it <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </Shell>
      </section>
    </>
  );
}
