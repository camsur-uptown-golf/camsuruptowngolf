import Image from "next/image";
import Link from "next/link";
import ScrollMotion from "@/components/ScrollMotion";
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

      <div className="mx-auto max-w-[1600px] px-4 pb-3 pt-12 text-center sm:px-8 sm:pt-14 lg:pt-16">
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
            className={`py-14 sm:py-16 lg:py-20 ${index ? "border-t border-[#1f3f2e]/10" : ""}`}
          >
            <div
              className={`mx-auto grid max-w-[1800px] items-center gap-10 px-5 sm:px-10 lg:gap-14 lg:px-14 xl:px-20 ${
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
                  className="font-display text-[clamp(2.8rem,5.5vw,5.5rem)] font-medium leading-[0.9] tracking-[-0.055em]"
                >
                  {stayType.name}
                </h3>
                <p
                  data-reveal="up"
                  style={delay(140)}
                  className="mt-6 max-w-xl text-base leading-8 text-[#5d685f] sm:text-lg sm:leading-9"
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
                      <p className="mt-2 text-sm font-medium text-[#26362e] sm:text-base">{stayType.setting}</p>
                    </div>
                    <div className="border-l border-[#1f3f2e]/12 pl-5">
                      <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.18em] text-[#98782f]">
                        Gallery
                      </p>
                      <p className="mt-2 text-sm font-medium text-[#26362e] sm:text-base">Exterior &amp; room</p>
                    </div>
                  </div>
                </div>

                <div data-reveal="up" style={delay(230)} className="mt-6">
                  <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.18em] text-[#98782f]">
                    Highlights
                  </p>
                  <ul className="mt-4 grid gap-3 text-sm text-[#5d685f] sm:text-base">
                    {stayType.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-center gap-3">
                        <span className="size-1.5 shrink-0 rounded-full bg-[#98782f]" aria-hidden="true" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/plan-your-visit"
                  data-reveal="up"
                  style={delay(270)}
                  className="mt-8 inline-flex h-12 items-center justify-center gap-3 rounded-full border border-[#265136]/25 px-7 font-navigation text-[11px] font-bold uppercase tracking-[0.12em] text-[#265136] transition hover:-translate-y-0.5 hover:border-[#265136] hover:bg-[#265136] hover:text-white xl:text-[12px]"
                >
                  Ask about availability <span aria-hidden="true">→</span>
                </Link>
              </div>

              {/* Isang larawan lang ang nakikita sa page. Nasa parehong
                  lightbox group ang nakatagong room photo para ma-next ito
                  kapag binuksan ang pangunahing larawan. */}
              <div className={`${flip ? "lg:order-1" : ""}`}>
                <div
                  data-reveal={flip ? "left" : "right"}
                  data-lightbox
                  data-lightbox-group={`villa-${stayType.name.toLowerCase()}`}
                  data-src={stayType.exterior}
                  data-alt={`${stayType.name} exterior at Villa Del Rey`}
                  className="group relative aspect-[4/3] cursor-zoom-in overflow-hidden rounded-[1.5rem] bg-[#d9ded8] shadow-[0_28px_70px_rgba(20,39,29,0.16)] sm:aspect-[16/9] sm:rounded-[2rem]"
                >
                  <div data-parallax="0.05" className="absolute -inset-y-[14%] inset-x-0">
                    <Image
                      src={stayType.exterior}
                      alt={`${stayType.name} exterior at Villa Del Rey`}
                      fill
                      sizes="(max-width: 1023px) calc(100vw - 2rem), 920px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <span className="pointer-events-none absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-[#10251a]/75 px-4 py-2 font-navigation text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md sm:bottom-6 sm:right-6 sm:text-[11px]">
                    View gallery <span aria-hidden="true">↗</span>
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
              </div>
            </div>
          </article>
        );
      })}

      {/* Wala pang anumang CTA ang pahinang ito bago nito. */}
      <div className="border-t border-[#1f3f2e]/10 bg-[#f7f5ee] text-[#14271d]">
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
          <div data-reveal="up" style={delay(270)} className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/plan-your-visit"
              className="inline-flex h-12 items-center rounded-full bg-[#e7d18d] px-7 text-[11px] xl:text-[12px] font-bold uppercase tracking-[0.12em] text-[#14271d] transition hover:-translate-y-0.5 hover:bg-[#f3dfa0]"
            >
              Inquire about your stay
            </Link>
            <Link
              href="/accommodations"
              className="inline-flex h-12 items-center rounded-full border border-[#1f3f2e]/25 px-7 text-[11px] xl:text-[12px] font-bold uppercase tracking-[0.12em] text-[#14271d] transition hover:border-[#265136] hover:text-[#265136]"
            >
              View all stays
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
