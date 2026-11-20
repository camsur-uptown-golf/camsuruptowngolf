import Image from "next/image";
import ScrollMotion from "@/components/ScrollMotion";
import BackToHeroButton from "@/components/BackToHeroButton";
import ClubhouseRooms from "@/components/ClubhouseRooms";
import { CLUBHOUSE_DAY, roomCountWord } from "@/lib/clubhouse";
import CtaPanel from "@/components/CtaPanel";
import GolfDivider from "@/components/GolfDivider";

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
 *
 * IISANG GILID ANG BUONG PAHINA: lahat ng section ay nasa `CONTAINER` —
 * kapareho ng Breadcrumbs, Footer, at /plan-your-visit. Kaliwa ang hanay ng
 * mga pamagat at kasinlaki ng sa homepage, hindi ang nakasentrong 30px ng
 * EditorialHeading.
 */

const CONTAINER = "mx-auto w-full max-w-7xl px-6 lg:px-8";
/* Para sa "How a day here runs": mas malapad at makitid ang puwang sa kaliwa
   at kanan, para lumaki ang mga larawan — kapareho ng /packages. */
const WIDE = "mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8";
const EYEBROW = "font-navigation text-xs font-semibold uppercase tracking-[0.24em] text-[#7d6224] sm:text-sm";
const SECTION_TITLE = "mt-3 font-display text-[clamp(2.5rem,4.6vw,4.625rem)] font-medium leading-[0.98] tracking-[-0.045em] text-[#17251e]";

export default function ClubhouseDetails() {
  return (
    <>
      <ScrollMotion />

      {/* Ang mga area bilang visual tour — ito na ang unang malaking bahagi:
          nauuna ang nakikita (mga larawan ng espasyo). */}
      <section className="relative isolate scroll-mt-24 bg-[#f3ede1] pb-10 pt-4 sm:pb-14 sm:pt-6">
        <div className={CONTAINER}>
          <p data-reveal="up" className={`${EYEBROW} text-center`}>
            Inside the clubhouse
          </p>
          <h2 data-reveal="up" className={`${SECTION_TITLE} mx-auto max-w-4xl text-balance text-center`}>
            {`${roomCountWord()} ways to experience the clubhouse.`}
          </h2>
        </div>
      </section>

      {/* Ang `id` ng bawat kuwarto ay nananatiling anchor ng mega menu —
          nasa loob ng ClubhouseRooms. */}
      <ClubhouseRooms />

      {/* Golf divider sa pagitan ng mga kuwarto at ng "How a day here runs" —
          parehong cream ang dalawa. Buong lapad ang cream na balot; ang pt ay
          para pantay ang layo ng bandila sa teksto sa itaas at sa "The
          experience" sa ibaba. */}
      <div className="bg-[#f3ede1]">
        <GolfDivider className="pt-16 sm:pt-20 lg:pt-24" />
      </div>

      <section className="relative isolate scroll-mt-24 overflow-hidden bg-[#f3ede1] py-16 sm:py-20 lg:py-28">
        <div className={WIDE}>
          <p data-reveal="up" className={`${EYEBROW} text-center`}>
            The experience
          </p>
          <h2 data-reveal="up" className={`${SECTION_TITLE} text-center`}>
            How a day here runs.
          </h2>

          {/* Editorial alternating rows — salitan ang panig ng larawan sa bawat
              hilera. ~60/40 ang hati: dati ay 2.4:1, kaya naiipit ang teksto
              sa makitid na hanay. */}
          <div className="mt-12 space-y-16 sm:mt-16 lg:mt-20 lg:space-y-24">
            {CLUBHOUSE_DAY.map((part, index) => {
              const imageOnRight = index % 2 === 1;
              return (
                <div
                  key={part.time}
                  className={`${imageOnRight ? "lg:grid-cols-[1fr_1.5fr]" : "lg:grid-cols-[1.5fr_1fr]"} grid items-center gap-8 lg:gap-16`}
                >
                  {/* One-time timed reveal. Pagkatapos pumasok, hindi na ito
                      nire-reset o binabaligtad kapag nag-scroll pataas. */}
                  <div
                    data-reveal={imageOnRight ? "right" : "left"}
                    className={`${imageOnRight ? "lg:order-2" : ""} relative aspect-[3/2] overflow-hidden rounded-2xl bg-[#03321b] shadow-[0_22px_54px_rgba(20,50,35,0.16)]`}
                  >
                    <Image
                      src={part.image}
                      alt={`${part.title} at the CamSur Uptown clubhouse`}
                      fill
                      sizes="(max-width: 1023px) calc(100vw - 2rem), 920px"
                      className="object-cover"
                    />
                  </div>

                  <div data-reveal="up" className={imageOnRight ? "lg:order-1" : ""}>
                    <p className={EYEBROW}>{part.time}</p>
                    <h3 className="mt-3 font-display text-[clamp(2.25rem,3.4vw,3.25rem)] font-medium leading-[0.98] tracking-[-0.045em] text-[#17251e]">
                      {part.title}
                    </h3>
                    <p className="mt-5 max-w-md text-[12px] font-normal leading-6 text-[#3f4c45]">{part.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pangwakas na CTA: isang berdeng panel sa loob ng cream, hindi buong
          banda — madilim-berde rin ang Footer na kasunod nito, kaya kung
          buong lapad ay magdidikit ang dalawa at mawawala ang hangganan. */}
      <section className="relative isolate scroll-mt-24 bg-[#f3ede1] pb-16 sm:pb-20 lg:pb-24">
        <div className={WIDE}>
          <CtaPanel
            reveal
            eyebrow="Visit the club"
            title="Come and see it."
            text="Plan your visit and the team will send opening hours, dress code, and visitor access before your day."
            primary={{ label: "Plan your visit", href: "/plan-your-visit" }}
          />
        </div>
      </section>

      <BackToHeroButton />
    </>
  );
}
