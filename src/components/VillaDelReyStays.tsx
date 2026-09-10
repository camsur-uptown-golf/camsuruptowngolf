import Image from "next/image";
import Link from "next/link";
import ScrollMotion from "@/components/ScrollMotion";
import { delay } from "@/components/EditorialKit";

/**
 * Ang apat na uri ng tuluyan sa Villa Del Rey.
 *
 * Dalawang komposisyon ang sinasalitan ng listahang ito — `tall` at `wide` —
 * at hindi ito palamuti: noong pare-pareho ang apat na hilera ay eksaktong
 * 596px ang taas ng bawat isa, kaya parang isang bloke lang silang inuulit.
 * Ang magkaibang aspect ratio ang nagbibigay ng ritmo sa pagbaba ng pahina.
 *
 * Kasama ang <ScrollMotion /> dito: ang data-reveal ay nakatago sa CSS
 * hangga't walang naglalagay ng .is-in, kaya kung mawawala ang motion driver
 * ay mananatiling blangko ang buong section.
 */

const STAY_TYPES = [
  {
    name: "Cabins",
    eyebrow: "Stay option 01",
    description:
      "Contemporary standalone cabins with landscaped outdoor space and a calm, light-filled bedroom.",
    exterior: "/villa-del-rey/stays/cabins-exterior-4k.jpg",
    interior: "/villa-del-rey/stays/cabins-bedroom-4k.jpg",
  },
  {
    name: "Cabana",
    eyebrow: "Stay option 02",
    description:
      "Compact resort cabanas arranged along garden paths, with simple interiors designed for an easy stay.",
    exterior: "/villa-del-rey/stays/cabana-exterior-4k.jpg",
    interior: "/villa-del-rey/stays/cabana-bedroom-4k.jpg",
  },
  {
    name: "Dwell",
    eyebrow: "Stay option 03",
    description:
      "A clean modern retreat pairing a private garden-facing exterior with a warm timber-lined bedroom.",
    exterior: "/villa-del-rey/stays/dwell-exterior-4k.jpg",
    interior: "/villa-del-rey/stays/dwell-bedroom-4k.jpg",
  },
  {
    name: "Villas",
    eyebrow: "Stay option 04",
    description:
      "Spacious villa accommodation with a refined bedroom and a private poolside setting.",
    exterior: "/villa-del-rey/stays/villa-pool-4k.jpg",
    interior: "/villa-del-rey/stays/villa-bedroom-4k.jpg",
  },
] as const;

export default function VillaDelReyStays() {
  return (
    <section id="villa-stays" className="bg-[#f7f5ee] text-[#14271d]">
      <ScrollMotion />

      <div className="mx-auto max-w-7xl px-6 pb-4 pt-16 text-center sm:px-10 sm:pt-20 lg:px-8 lg:pt-24">
        <Image
          src="/villa-del-rey/logo.png"
          alt="Villa Del Rey, CamSur Philippines"
          width={528}
          height={291}
          sizes="(max-width: 639px) 52vw, 280px"
          data-reveal="up"
          className="mx-auto mb-8 h-auto w-[min(52vw,280px)] sm:mb-10"
        />
        <p
          data-reveal="up"
          className="font-navigation text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.24em] text-[#98782f]"
        >
          Ways to stay
        </p>
        <h2
          data-reveal="up"
          style={delay(90)}
          className="mx-auto mt-4 max-w-4xl text-[clamp(2.25rem,4vw,4rem)] font-medium leading-[0.98] tracking-[-0.05em]"
        >
          Your Home for Rest and Adventure
        </h2>
        <p
          data-reveal="up"
          style={delay(180)}
          className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#5d685f] sm:text-lg"
        >
          Relax by the water, live the moment.
        </p>
        {/* Maikling gintong guhit: hudyat na nagsisimula na ang listahan. */}
        <div data-reveal="up" style={delay(270)} className="mx-auto mt-9 h-px w-20 bg-[#98782f]/50" />
      </div>

      {STAY_TYPES.map((stayType, index) => {
        /* Salitan ang panig ng teksto at ang hugis ng pangunahing larawan.
           Magkaiba ang taas ng `tall` at `wide`, kaya walang dalawang
           magkasunod na hilera na pareho ang laki. */
        const flip = index % 2 === 1;

        return (
          <article
            key={stayType.name}
            className={`py-16 sm:py-20 lg:py-24 ${index ? "border-t border-[#173b2a]/10" : ""}`}
          >
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-8">
              <div className={`relative ${flip ? "lg:order-2" : ""}`}>
                {/* Malaking bilang sa likod ng pamagat — palamuti lang, kaya
                    aria-hidden at hindi napipindot. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-10 left-0 select-none font-display text-[clamp(5rem,9vw,8.5rem)] font-medium leading-none tracking-[-0.06em] text-[#0b2419]/[0.06] sm:-top-14"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="relative">
                  <p
                    data-reveal="up"
                    className="font-navigation text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.22em] text-[#98782f]"
                  >
                    {stayType.eyebrow}
                  </p>
                  <h3
                    data-reveal="up"
                    style={delay(90)}
                    className="mt-4 font-display text-[clamp(2.6rem,5vw,4.8rem)] font-medium leading-[0.92] tracking-[-0.055em]"
                  >
                    {stayType.name}
                  </h3>
                  <p
                    data-reveal="up"
                    style={delay(180)}
                    className="mt-6 max-w-xl text-base leading-8 text-[#5d685f] sm:text-lg sm:leading-9"
                  >
                    {stayType.description}
                  </p>
                  <div data-reveal="up" style={delay(270)} className="mt-8 h-px w-14 bg-[#98782f]/45" />
                </div>
              </div>

              {/* Magkapatong ang dalawang larawan: ang panloob ay nakasampa sa
                  gilid ng panlabas. Nasa loob pa rin ng balot ang lahat, kaya
                  walang tumatapon sa section sa ibaba. */}
              <div className={`relative ${flip ? "lg:order-1" : ""}`}>
                <div
                  data-reveal={flip ? "left" : "right"}
                  className={`relative overflow-hidden rounded-[1.5rem] bg-[#d9ded8] shadow-[0_22px_55px_rgba(20,39,29,0.12)] sm:rounded-[2rem] ${
                    flip ? "ml-auto w-[86%] aspect-[5/4]" : "w-[82%] aspect-[4/5]"
                  }`}
                >
                  <Image
                    src={stayType.exterior}
                    alt={`${stayType.name} exterior at Villa Del Rey`}
                    fill
                    sizes="(max-width: 1023px) 82vw, 480px"
                    className="object-cover transition duration-700 hover:scale-[1.03]"
                  />
                </div>

                <div
                  data-reveal="scale"
                  style={delay(200)}
                  className={`absolute bottom-6 overflow-hidden rounded-[1.25rem] bg-[#d9ded8] shadow-[0_18px_45px_rgba(20,39,29,0.16)] ring-4 ring-[#f7f5ee] sm:bottom-8 sm:rounded-[1.5rem] ${
                    flip ? "left-0 w-[38%] aspect-[3/4]" : "right-0 w-[42%] aspect-square"
                  }`}
                >
                  <Image
                    src={stayType.interior}
                    alt={`${stayType.name} room at Villa Del Rey`}
                    fill
                    sizes="(max-width: 1023px) 40vw, 240px"
                    className="object-cover transition duration-700 hover:scale-[1.03]"
                  />
                </div>
              </div>
            </div>
          </article>
        );
      })}

      {/* Wala pang anumang CTA ang pahinang ito bago nito. */}
      <div className="border-t border-[#173b2a]/10">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center sm:px-10 sm:py-20 lg:px-8">
          <p
            data-reveal="up"
            className="font-navigation text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.22em] text-[#98782f]"
          >
            Plan your stay
          </p>
          <h2
            data-reveal="up"
            style={delay(90)}
            className="mx-auto mt-4 max-w-2xl text-[clamp(2.2rem,3.6vw,3.4rem)] font-medium leading-[1.02] tracking-[-0.05em]"
          >
            Reserve your room at Villa Del Rey.
          </h2>
          <p
            data-reveal="up"
            style={delay(180)}
            className="mx-auto mt-5 max-w-xl text-sm leading-7 xl:text-base xl:leading-8 text-[#5d685f]"
          >
            Tell the team your dates and how many are travelling, and they will come back with what is
            available across the four stay types.
          </p>
          <div data-reveal="up" style={delay(270)} className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/#contact"
              className="inline-flex h-12 items-center rounded-full bg-[#2f644b] px-7 text-[11px] xl:text-[12px] font-bold uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:bg-[#3a765a]"
            >
              Inquire about your stay
            </Link>
            <Link
              href="/accommodations"
              className="inline-flex h-12 items-center rounded-full border border-[#174630]/25 px-7 text-[11px] xl:text-[12px] font-bold uppercase tracking-[0.12em] text-[#174630] transition hover:border-[#174630]"
            >
              View all stays
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
