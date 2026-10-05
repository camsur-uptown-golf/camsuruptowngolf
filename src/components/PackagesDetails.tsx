import Image from "next/image";
import Link from "next/link";
import ScrollMotion from "@/components/ScrollMotion";
import ScrollReveal from "@/components/ScrollReveal";
import { EDITORIAL_SECTION_ALT, Shell, delay } from "@/components/EditorialKit";

/**
 * The Packages page, sa parehong editorial na wika ng Visit at Events.
 *
 * Ang balangkas ng mga package ay sumusunod sa karaniwang ginagawa ng mga
 * resort-golf club — stay-and-play, unlimited golf, buddies trip, corporate
 * day, at twilight — at iniangkop sa mga akomodasyong meron na dito.
 *
 * TODO (para sa club): kumpirmahin bago i-publish —
 *  - lahat ng presyo (nakalagay muna ang "On request"; walang inimbentong halaga)
 *  - bilang ng gabi at round sa bawat package
 *  - pinakamaliit na bilang ng tao sa Group at Corporate
 *  - kung anong panahon ang tinuturing na peak season
 */

/* Ang slug ang anchor target ng mega menu sa header. Kapag may idinagdag o
   pinalitan dito, sundan ang links ng "packages" sa site-content.ts. */
const PACKAGES = [
  {
    slug: "stay-and-play",
    href: "/packages/stay-and-play",
    image: "/packages-stay-play-hero-v2.png",
    name: "Stay & Play",
    summary: "A one-night stay with a round of golf",
    who: "",
    inclusions: [
      "One night in the accommodation of your choice",
      "One round with a caddie",
      "Breakfast the following morning",
      "Range balls on arrival",
    ],
  },
  {
    slug: "buddy-trip",
    href: "/packages/buddy-trip",
    image: "/packages-group-getaway-hero-v2.jpeg",
    name: "Group Golf Getaway",
    summary: "A two-night group getaway with two rounds of golf",
    who: "",
    inclusions: [
      "A flexible three-day itinerary for your group",
      "Two rounds with caddies",
      "Daily breakfast and one group dinner",
      "Stay and transfers arranged around your dates",
    ],
  },
] as const;

/* NASA /faq NA ANG DATING "Before you enquire". Tatlong tanong tungkol sa
   buong club ang mga iyon — presyo, abiso, at kung nababago ang package —
   at hindi lang sa mga package. Nasa FAQ_GROUPS sila ngayon sa
   site-content.ts, at may pindutan ang footer papunta roon. */

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="mt-1 h-3.5 w-3.5 shrink-0" fill="none" aria-hidden="true">
      <path d="m4.5 10.5 3.2 3.1 7.8-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ThePackages() {
  return (
    <section id="packages" className={EDITORIAL_SECTION_ALT}>
      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="grid gap-8 border-b border-[#1f3f2e]/15 pb-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <h2
              data-reveal="up"
              style={delay(110)}
              className="mt-4 text-[clamp(2.25rem,4vw,4rem)] font-medium leading-none tracking-[-0.055em] text-[#14271d]"
            >
              Two ways to put a trip together.
            </h2>
          </div>
          <p
            data-reveal="up"
            style={delay(220)}
            className="max-w-2xl text-base leading-8 text-[#56625b] lg:justify-self-end"
          >
            Choose the format that fits your stay, then open its itinerary for the full day-by-day plan.
          </p>
        </div>

        <div className="mt-12 space-y-20 lg:mt-20 lg:space-y-32">
          {PACKAGES.map((pack, index) => {
            const imageOnRight = index % 2 === 1;
            return (
              <article
                key={pack.slug}
                id={pack.slug}
                className={`${imageOnRight ? "lg:grid-cols-[1fr_3fr]" : "lg:grid-cols-[3fr_1fr]"} grid scroll-mt-28 items-center gap-10 lg:gap-12`}
              >
                {/* Scroll reveal via IntersectionObserver (ScrollReveal.tsx):
                    galing sa sariling panig ang larawan, nag-a-animate ulit sa
                    bawat pasok — scroll down man o pataas. */}
                <Link
                  href={pack.href}
                  data-scroll-anim={imageOnRight ? "slide-right" : "slide-left"}
                  className={`${imageOnRight ? "lg:order-2" : ""} group relative isolate block aspect-[3/2] overflow-hidden bg-[#1f3f2e] shadow-[0_22px_54px_rgba(20,50,35,0.16)]`}
                >
                  {/* Napakalapad na panorama ang getaway hero (2.36:1), at nasa
                      kanang bahagi nakatipon ang apat na manlalaro. Sa 3/2 na
                      frame ay pinuputol ng default na object-center ang isa sa
                      kanila — tatlo lang ang nakikita. Itinutok sa kanan ang
                      buddy-trip para buo ang grupo; nasa gitna pa rin ang iba.

                      INLINE STYLE, HINDI `object-right` NA KLASE. Bagong klase
                      ito sa proyekto, at minsang hindi nire-regenerate ng dev
                      ang CSS para sa ganitong bago — kaya nananatili sa gitna
                      ang larawan at tatlo pa rin ang kita. Gaya ng inline na
                      transform sa [section]/page.tsx, tiyak itong tumatalab. */}
                  <Image
                    src={pack.image}
                    alt={`${pack.name} at CamSur Uptown Golf Club`}
                    fill
                    sizes="(max-width: 1023px) calc(100vw - 3rem), 800px"
                    style={pack.slug === "buddy-trip" ? { objectPosition: "right" } : undefined}
                    className="object-cover transition duration-700 group-hover:scale-[1.02]"
                  />
                </Link>

                {/* Umaangat na teksto (data-scroll-anim="rise"), kasabay ng
                    side-slide ng larawan; nag-a-animate ulit sa bawat pasok. */}
                <div data-scroll-anim="rise" className={`${imageOnRight ? "lg:order-1" : ""} relative`}>
                  <p className="relative text-[10px] font-bold uppercase tracking-[0.2em] text-[#98782f] xl:text-[11px]">
                    {pack.who}
                  </p>
                  <h3 className="relative mt-3 font-display text-[clamp(1.85rem,2.8vw,2.75rem)] font-medium leading-[1.03] tracking-[-0.04em] text-[#14271d]">
                    {pack.name}
                  </h3>
                  <p className="relative mt-4 text-[17px] leading-8 text-[#3f4c45]">{pack.summary}</p>

                  <ul className="relative mt-7 border-t border-[#1f3f2e]/12">
                    {pack.inclusions.map((item) => (
                      <li key={item} className="flex gap-3 border-b border-[#1f3f2e]/12 py-3 text-[13px] font-semibold uppercase leading-6 tracking-[0.06em] text-[#3f4c45]">
                        <span className="text-[#265136]">
                          <CheckIcon />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="relative mt-6 font-navigation text-[10px] font-bold uppercase tracking-[0.16em] text-[#98782f] xl:text-[11px]">
                    Rate on request
                  </p>
                  <Link
                    href={pack.href}
                    className="relative mt-5 inline-flex h-11 items-center rounded-full bg-[#e7d18d] px-6 font-navigation text-[10px] font-bold uppercase tracking-[0.14em] text-[#14271d] transition-colors hover:bg-[#f3dfa0] xl:text-[11px]"
                  >
                    View itinerary →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PackagesCta() {
  return (
    <section className="relative isolate overflow-hidden border-t border-[#1f3f2e]/10 bg-[#f7f5ee] py-14 text-[#14271d] sm:py-16">
      <Shell>
        <div className="mx-auto max-w-xl text-center xl:max-w-2xl">
          <div>
            <h2
              data-reveal="up"
              style={delay(90)}
              className="text-2xl font-medium tracking-[-0.035em] sm:text-3xl xl:text-4xl"
            >
              Send us your dates.
            </h2>
          </div>
          <div data-reveal="up" style={delay(180)}>
            <p className="text-sm leading-7 xl:text-base xl:leading-8 text-[#5d685f]">
              Tell the club your dates, how many are playing, and which package is closest to what you want. You will
              get back a quote built around those three things.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/plan-your-visit"
                className="inline-flex h-11 items-center rounded-full bg-[#265136] px-6 text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:bg-[#1f3f2e]"
              >
                Request a quote
              </Link>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}

export default function PackagesDetails() {
  return (
    <>
      <ScrollMotion />
      <ScrollReveal />
      <ThePackages />
      <PackagesCta />
    </>
  );
}
