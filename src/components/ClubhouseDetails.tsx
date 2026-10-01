import Image from "next/image";
import Link from "next/link";
import ScrollMotion from "@/components/ScrollMotion";
import ClubhouseRooms from "@/components/ClubhouseRooms";
import { EDITORIAL_SECTION_ALT, EditorialHeading, Shell, delay } from "@/components/EditorialKit";
import { CLUBHOUSE_DAY } from "@/lib/clubhouse";

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

      {/* Ang mga area bilang scrollytelling tour — ito na ang unang malaking
          bahagi: nauuna ang nakikita (mga larawan ng espasyo) bago ang mas
          teknikal na breakdown kada palapag sa ibaba. Hiwalay na section ang
          ulo nito dahil ang ClubhouseRooms ay naka-sticky, at sinisira iyon ng
          `overflow-hidden` ng EDITORIAL_SECTION. */}
      <section className="relative isolate scroll-mt-24 bg-[#f7f5ee] pb-10 pt-4 sm:pb-12 sm:pt-6">
        <div className="relative mx-auto w-full max-w-4xl px-6 sm:px-10 lg:px-12 xl:max-w-5xl">
          <EditorialHeading size="lg" title="Nine ways to experience the clubhouse." />
        </div>
      </section>

      {/* Ang `id` ng bawat kuwarto ay nananatiling anchor ng mega menu —
          nasa loob ng ClubhouseRooms. */}
      <ClubhouseRooms />

      <section className={EDITORIAL_SECTION_ALT}>
        <Shell>
          {/* Sadyang hindi EditorialHeading: gusto ng parehong sans (Manrope)
              na mukha ng mga pamagat ng bahagi sa ibaba (Practice & play,
              Lounge, Rooftop & bar), hindi ang Cormorant SC serif na ipinapataw
              ng `main h2` sa globals.css — kaya inline ang font-family (nananalo
              ito sa unlayered na element rule). Mas malaki rin ang sukat. */}
                    <EditorialHeading
            size="lg"
            kicker="The experience"
            title="How a day here runs."
    
          />
        </Shell>

        {/* Editorial alternating rows — salitan ang panig ng larawan sa bawat
            hilera. (Inalis ang dating malaking numero sa likod ng teksto.) */}
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
                  <p className="relative font-navigation text-[10px] font-bold uppercase tracking-[0.2em] text-[#98782f] xl:text-[11px]">
                    {part.time}
                  </p>
                  <h3 className="relative mt-3 font-display text-[clamp(1.85rem,2.8vw,2.75rem)] font-medium leading-[1.03] tracking-[-0.04em] text-[#14271d]">
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
            kicker=""
            title="Come and see it."
            intro="Opening hours, dress code, and visitor access are still being finalized. Plan your visit and we’ll help you prepare."
          />

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <Link
              href="/plan-your-visit"
              data-reveal="up"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#e7d18d] px-7 font-navigation text-[10px] font-bold uppercase tracking-[0.1em] text-[#14271d] transition hover:-translate-y-0.5 hover:bg-[#f3dfa0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#98782f] xl:text-[11px]"
            >
              Plan your visit
            </Link>
          </div>

        </Shell>
      </section>

    </>
  );
}
