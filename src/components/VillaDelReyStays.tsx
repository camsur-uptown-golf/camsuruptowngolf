import Image from "next/image";
import Link from "next/link";
import ScrollMotion from "@/components/ScrollMotion";
import ScrollReveal from "@/components/ScrollReveal";
import StayFeatures from "@/components/StayFeatures";
import { delay } from "@/components/EditorialKit";
import { VILLA_DEL_REY_STAYS } from "@/lib/villa-del-rey";

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

export default function VillaDelReyStays() {
  return (
    <section id="villa-stays" className="bg-[#f7f5ee] text-[#14271d]">
      <ScrollMotion />
      <ScrollReveal />

      <div className="mx-auto max-w-[1600px] px-4 pb-3 pt-12 text-center sm:px-8 sm:pt-14 lg:pt-16">
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
          A convenient resort option for golf groups, families, and guests exploring Camarines Sur.
        </p>
        {/* Maikling gintong guhit: hudyat na nagsisimula na ang listahan. */}
        <div data-reveal="up" style={delay(270)} className="mx-auto mt-9 h-px w-20 bg-[#98782f]/50" />
      </div>

      {VILLA_DEL_REY_STAYS.map((stayType, index) => {
        /* Salitan ang panig ng teksto at ng larawan pababa sa apat na hilera. */
        const flip = index % 2 === 1;
        return (
          <article
            key={stayType.name}
            className="py-14 sm:py-16 lg:py-20"
          >
            <div
              className={`mx-auto grid max-w-[1800px] gap-10 px-5 sm:px-10 lg:gap-14 lg:px-14 xl:px-20 ${
                // Ang stay na may amenities toggle (Villa) ay top-aligned para
                // hindi gumalaw ang larawan kapag lumaki ang kaliwang column sa
                // pagpindot ng Amenities. Ang iba ay naka-gitna gaya ng dati.
                "amenities" in stayType ? "items-start" : "items-center"
              } ${
                flip
                  ? "lg:grid-cols-[minmax(0,1.38fr)_minmax(320px,0.62fr)]"
                  : "lg:grid-cols-[minmax(320px,0.62fr)_minmax(0,1.38fr)]"
              }`}
            >
              {/* Pangalan agad ang simula ng panig na ito. */}
              <div className={`relative ${flip ? "lg:order-2" : ""}`}>
                <h3
                  data-reveal="up"
                  style={delay(70)}
                  className="font-display text-[clamp(2.5rem,4.3vw,4.5rem)] font-medium leading-[0.92] tracking-[-0.05em]"
                >
                  {stayType.name}
                </h3>
                <p
                  data-reveal="up"
                  style={delay(140)}
                  className="mt-5 max-w-xl text-sm leading-7 text-[#5d685f] sm:text-base sm:leading-8"
                >
                  {stayType.description}
                </p>

                <div
                  data-reveal="up"
                  style={delay(190)}
                  className="mt-8 border-y border-[#1f3f2e]/12 py-5"
                >
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.18em] text-[#98782f]">
                        Setting
                      </p>
                      <p className="mt-2 text-sm font-medium text-[#26362e]">{stayType.setting}</p>
                    </div>
                    <div className="border-l border-[#1f3f2e]/12 pl-5">
                      <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.18em] text-[#98782f]">
                        Gallery
                      </p>
                      <p className="mt-2 text-sm font-medium text-[#26362e]">Exterior &amp; room</p>
                    </div>
                  </div>
                </div>

                {/* Highlights at Amenities sa isang row ng label. Default ay
                    Highlights; naka-hide ang Amenities hangga't hindi pinipindot
                    (Villa lang ang may amenities). Client toggle — nasa wrapper
                    ang data-reveal, hindi sa nagpapalit na listahan. */}
                <div data-reveal="up" style={delay(230)} className="mt-6">
                  <StayFeatures
                    highlights={stayType.highlights}
                    amenities={"amenities" in stayType ? stayType.amenities : undefined}
                  />
                </div>

                {/* Same-page anchor papunta sa <section id="availability"> ng
                    accommodation page — doon ang form, hindi na /plan-your-visit. */}
                <Link
                  href="#availability"
                  data-reveal="up"
                  style={delay(270)}
                  className="mt-8 inline-flex h-12 max-w-full items-center justify-center gap-3 whitespace-nowrap rounded-full border border-[#265136]/25 px-5 font-navigation text-[10px] font-bold uppercase tracking-[0.1em] text-[#265136] transition hover:-translate-y-0.5 hover:border-[#265136] hover:bg-[#265136] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#98782f] sm:px-7 sm:text-[11px] sm:tracking-[0.12em] xl:text-[12px]"
                >
                  Ask about availability <span aria-hidden="true">→</span>
                </Link>
              </div>

              {/* Isang larawan lang ang nakikita sa page. Nasa parehong
                  lightbox group ang nakatagong room photo para ma-next ito
                  kapag binuksan ang pangunahing larawan. */}
              <div className={`${flip ? "lg:order-1" : ""}`}>
                {/* Scroll reveal via IntersectionObserver (ScrollReveal.tsx):
                    galing sa sariling panig ang larawan (flip → kaliwa),
                    nag-a-animate ulit sa bawat pasok — scroll down man o pataas. */}
                <div
                  data-scroll-anim={flip ? "slide-left" : "slide-right"}
                  className={`group relative h-[320px] cursor-zoom-in overflow-hidden rounded-[1.5rem] bg-[#d9ded8] shadow-[0_28px_70px_rgba(20,39,29,0.16)] sm:h-[460px] sm:rounded-[2rem] lg:h-[560px] xl:h-[620px]`}
                  data-lightbox
                  data-lightbox-group={`villa-${stayType.name.toLowerCase()}`}
                  data-src={stayType.exterior}
                  data-alt={`${stayType.name} exterior at Villa Del Rey`}
                >
                  <div className="absolute inset-0">
                    <Image
                      src={stayType.exterior}
                      alt={`${stayType.name} exterior at Villa Del Rey`}
                      fill
                      sizes="(max-width: 1023px) calc(100vw - 2rem), 920px"
                      className="object-cover transition-[filter] duration-500 ease-out group-hover:brightness-[0.86] group-hover:saturate-[0.82]"
                    />
                  </div>
                  {/* Lightbox "zoom" badge. Salamin-na-may-plus (zoom in), hindi
                      tanda ng "+" — tugma ito sa `cursor-zoom-in` at malinaw na
                      "palakihin ang larawan," hindi "magdagdag." Walang frame,
                      walang bg — lumulutang lang ang icon; ang drop-shadow ang
                      nagpapakita nito sa maliliwanag na larawan (neutral, walang
                      green). */}
                  <span className="pointer-events-none absolute bottom-4 right-4 grid size-9 place-items-center text-white sm:bottom-6 sm:right-6 sm:size-10">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-6 drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)] sm:size-7">
                      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.1" />
                      <path d="M16.5 16.5 21 21M11 8.4v5.2M8.4 11h5.2" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
                    </svg>
                  </span>
                </div>
                <span
                  data-lightbox
                  data-lightbox-group={`villa-${stayType.name.toLowerCase()}`}
                  data-src={stayType.interior}
                  data-alt={`${stayType.name} room at Villa Del Rey`}
                  className="hidden"
                  aria-hidden="true"
                />
                {stayType.gallery.map((photo) => (
                  <span
                    key={photo.src}
                    data-lightbox
                    data-lightbox-group={`villa-${stayType.name.toLowerCase()}`}
                    data-src={photo.src}
                    data-alt={photo.alt}
                    className="hidden"
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
          </article>
        );
      })}

      {/* Wala pang anumang CTA ang pahinang ito bago nito. */}
      <div className="bg-[#f7f5ee] text-[#14271d]">
        <div className="mx-auto max-w-[1600px] px-4 py-12 text-center sm:px-8 sm:py-14 lg:px-8">
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
            className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#5d685f] xl:text-base xl:leading-8"
          >
            Tell the team your dates and how many are travelling, and they will come back with what is
            available across the four stay types.
          </p>
          <div data-reveal="up" style={delay(270)} className="mt-8 flex justify-center">
            <Link
              href="/plan-your-visit"
              className="inline-flex h-12 items-center rounded-full bg-[#e7d18d] px-7 text-[11px] xl:text-[12px] font-bold uppercase tracking-[0.12em] text-[#14271d] transition hover:-translate-y-0.5 hover:bg-[#f3dfa0]"
            >
              Inquire about your stay
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
