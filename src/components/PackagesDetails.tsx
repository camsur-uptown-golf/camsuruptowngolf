import Image from "next/image";
import Link from "next/link";
import ScrollMotion from "@/components/ScrollMotion";
import ScrollReveal from "@/components/ScrollReveal";
import { EDITORIAL_SECTION_ALT, delay } from "@/components/EditorialKit";
import CtaPanel from "@/components/CtaPanel";

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
    who: "One night · One round",
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
    who: "Two nights · Two rounds",
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

/* MAS MALAPAD KAYSA SA IBANG PAHINA (`max-w-[1600px]`, hindi `max-w-7xl`):
   sadyang maliit ang puwang sa kaliwa at kanan dito para lumaki ang mga
   larawan ng package. Kapareho ito ng lapad ng mga section sa homepage. */
const CONTAINER = "relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8";
const EYEBROW = "font-navigation text-xs font-semibold uppercase tracking-[0.24em] text-[#7d6224] sm:text-sm";

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
      <div className={CONTAINER}>
        <div className="grid gap-6 border-b border-[#03321b]/15 pb-10 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-12">
          <div>
            <p data-reveal="up" className={EYEBROW}>
              Packages
            </p>
            <h2
              data-reveal="up"
              style={delay(110)}
              className="mt-3 font-display text-[clamp(2.5rem,4.6vw,4.625rem)] font-medium leading-[0.98] tracking-[-0.045em] text-[#17251e]"
            >
              Two ways to put a trip together.
            </h2>
          </div>
          <p
            data-reveal="up"
            style={delay(220)}
            className="max-w-xl text-base font-semibold leading-8 text-[#3f4c45] lg:justify-self-end lg:pb-2"
          >
            Choose the format that fits your stay, then open its itinerary for the full day-by-day plan.
          </p>
        </div>

        <div className="mt-10 space-y-16 lg:mt-16 lg:space-y-24">
          {PACKAGES.map((pack, index) => {
            const imageOnRight = index % 2 === 1;
            return (
              <article
                key={pack.slug}
                id={pack.slug}
                className={`${imageOnRight ? "lg:grid-cols-[1fr_2.3fr]" : "lg:grid-cols-[2.3fr_1fr]"} grid scroll-mt-28 items-center gap-8 lg:gap-12 xl:gap-16`}
              >
                {/* Scroll reveal via IntersectionObserver (ScrollReveal.tsx):
                    galing sa sariling panig ang larawan, nag-a-animate ulit sa
                    bawat pasok — scroll down man o pataas. */}
                <Link
                  href={pack.href}
                  data-scroll-anim={imageOnRight ? "slide-right" : "slide-left"}
                  className={`${imageOnRight ? "lg:order-2" : ""} group relative isolate block aspect-[3/2] overflow-hidden rounded-2xl bg-[#03321b] shadow-[0_22px_54px_rgba(20,50,35,0.16)]`}
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
                    alt={`${pack.name} at CamSur Uptown Golf`}
                    fill
                    sizes="(max-width: 1023px) calc(100vw - 2rem), 1060px"
                    style={pack.slug === "buddy-trip" ? { objectPosition: "right" } : undefined}
                    className="object-cover transition duration-700 group-hover:scale-[1.02]"
                  />
                </Link>

                {/* Umaangat na teksto (data-scroll-anim="rise"), kasabay ng
                    side-slide ng larawan; nag-a-animate ulit sa bawat pasok. */}
                <div data-scroll-anim="rise" className={`${imageOnRight ? "lg:order-1" : ""} relative`}>
                  <p className={EYEBROW}>{pack.who}</p>
                  <h3 className="relative mt-3 font-display text-[clamp(2.25rem,3.4vw,3.25rem)] font-medium leading-[0.98] tracking-[-0.045em] text-[#17251e]">
                    {pack.name}
                  </h3>
                  <p className="relative mt-4 text-[17px] font-semibold leading-8 text-[#3f4c45]">{pack.summary}</p>

                  <ul className="relative mt-6 border-t border-[#03321b]/12">
                    {pack.inclusions.map((item) => (
                      <li key={item} className="flex gap-3 border-b border-[#03321b]/12 py-3 text-[15px] leading-6 text-[#3f4c45]">
                        <span className="text-[#2e5126]">
                          <CheckIcon />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="relative mt-6 font-navigation text-[11px] font-bold uppercase tracking-[0.16em] text-[#7d6224] xl:text-[12px]">
                    Rate on request
                  </p>
                  <Link
                    href={pack.href}
                    className="relative mt-5 inline-flex h-12 items-center rounded-full bg-[#e2c77a] px-7 font-navigation text-[11px] font-bold uppercase tracking-[0.14em] text-[#03321b] transition-colors hover:bg-[#efd99b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#98782f] xl:text-[12px]"
                  >
                    View itinerary
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

/* Pangwakas na CTA: berdeng panel sa loob ng cream, hindi buong banda —
   madilim-berde rin ang Footer na kasunod, kaya kung buong lapad ay
   magdidikit ang dalawa. Kapareho ng dulo ng /clubhouse. */
function PackagesCta() {
  return (
    <section className="relative isolate bg-[#f3ede1] pb-16 text-[#03321b] sm:pb-20">
      <div className={CONTAINER}>
        <CtaPanel
          reveal
          eyebrow="Request a quote"
          title="Send us your dates."
          text="Tell the club your dates, how many are playing, and which package is closest to what you want. You will get back a quote built around those three things."
          primary={{ label: "Request a quote", href: "/plan-your-visit" }}
        />
      </div>
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
