import Image from "next/image";
import Link from "next/link";
import ScrollMotion from "@/components/ScrollMotion";
import ClubhouseRooms from "@/components/ClubhouseRooms";
import { EDITORIAL_SECTION_ALT, EditorialHeading, Shell, delay } from "@/components/EditorialKit";
import {
  CLUBHOUSE_DAY,
  CLUBHOUSE_LEVELS,
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

export default function ClubhouseDetails() {
  return (
    <>
      <ScrollMotion />

      {/* Anong nasa bawat palapag. Ito ang pinakamalapit na sagot sa
          "ano ang nasa loob", kaya ito ang unang malaking bahagi. */}
      <section className={EDITORIAL_SECTION_ALT}>
        <Shell>
          <EditorialHeading
            size="lg"
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

      {/* Ang ulo ng seksyon. Hiwalay ito sa mismong mga kuwarto: ang
          ClubhouseRooms ay scrollytelling na naka-pin ang larawan habang
          kusang lumilitaw ang teksto, at hindi iyon pwede sa loob ng
          EDITORIAL_SECTION dahil sinisira ng `overflow-hidden` nito ang
          `position: sticky`. Kaya walang-overflow na section ang ulo, at
          sariling seksyon na ng ClubhouseRooms ang mga larawan. */}
      <section className="relative isolate scroll-mt-24 bg-[#f7f5ee] pb-10 pt-14 sm:pb-12 sm:pt-16">
        <div className="relative mx-auto w-full max-w-4xl px-6 sm:px-10 lg:px-12 xl:max-w-5xl">
          <EditorialHeading size="lg" kicker="Inside" title={`${roomCountWord()} rooms in the building.`} />
        </div>
      </section>

      {/* Ang `id` ng bawat kuwarto ay nananatiling anchor ng mega menu —
          nasa loob ng ClubhouseRooms. */}
      <ClubhouseRooms />

      <section className={EDITORIAL_SECTION_ALT}>
        <Shell>
          <EditorialHeading kicker="The experience" title="How a day here runs." />
        </Shell>

        {/* Editorial alternating rows — kaparehong wika ng Packages:
            malaking numero sa likod ng teksto, salitan ang panig ng larawan. */}
        <div className="mx-auto mt-12 w-full max-w-7xl space-y-16 px-6 sm:mt-16 sm:px-10 lg:mt-20 lg:space-y-28 lg:px-12">
          {CLUBHOUSE_DAY.map((part, index) => {
            const imageOnRight = index % 2 === 1;
            return (
              <div
                key={part.time}
                data-reveal="up"
                style={delay(index * 120)}
                className={`${imageOnRight ? "lg:grid-cols-[1fr_2.4fr]" : "lg:grid-cols-[2.4fr_1fr]"} grid items-center gap-10 lg:gap-14`}
              >
                <div
                  className={`${imageOnRight ? "lg:order-2" : ""} relative aspect-[3/2] overflow-hidden rounded-2xl bg-[#1f3f2e] shadow-[0_22px_54px_rgba(20,50,35,0.16)]`}
                >
                  <Image
                    src={part.image}
                    alt={`${part.title} at the CamSur Uptown clubhouse`}
                    fill
                    sizes="(max-width: 1023px) calc(100vw - 3rem), 760px"
                    className="object-cover"
                  />
                </div>

                <div className={`${imageOnRight ? "lg:order-1" : ""} relative`}>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-10 left-0 select-none font-display text-[clamp(4.5rem,7vw,7rem)] font-medium leading-none tracking-[-0.05em] text-[#1f3f2e]/[0.07]"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="relative font-navigation text-[10px] font-bold uppercase tracking-[0.2em] text-[#98782f] xl:text-[11px]">
                    {part.time}
                  </p>
                  <h3 className="relative mt-3 text-[clamp(1.85rem,2.8vw,2.75rem)] font-medium leading-[1.03] tracking-[-0.04em] text-[#14271d]">
                    {part.title}
                  </h3>
                  <p className="relative mt-4 text-[17px] leading-8 text-[#3f4c45]">{part.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bawal ang dobleng padding: kasunod ito ng cream na "experience"
          section, kaya makitid na top padding lang para hindi lumalawak ang
          puwang sa pagitan ng cards at ng pangwakas na CTA. */}
      <section className="relative isolate scroll-mt-24 overflow-hidden bg-[#f7f5ee] pb-14 pt-2 sm:pb-16 sm:pt-4">
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

    </>
  );
}
