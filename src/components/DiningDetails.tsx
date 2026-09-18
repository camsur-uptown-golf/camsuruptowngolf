import Image from "next/image";
import Link from "next/link";
import ScrollMotion from "@/components/ScrollMotion";
import { EDITORIAL_SECTION_ALT, EditorialHeading, Kicker, Shell, Watermark, delay } from "@/components/EditorialKit";
import { CLUB_PHONE } from "@/lib/site-content";

/**
 * The Dining page.
 *
 * Tungkol sa lutuing Bicol ang laman nito — mga putaheng talagang mula sa
 * rehiyon, hindi inimbento. Sinasadyang walang pangalan ng kainan, oras ng
 * bukas, ni presyo dito: wala pa niyang kumpirmasyon, at mas mabuti nang
 * walang sabihin kaysa magpahayag ng maling impormasyon.
 *
 * TODO (para sa club): kumpirmahin bago i-publish —
 *  - pangalan ng bawat kainan at kung saan sila sa property
 *  - oras ng bukas at kung kailangan ng reservation
 *  - kumpletong menu at presyo
 *  - kung alin sa mga putahe ang laging available at alin ang pana-panahon
 *  - larawan ng pagkain at ng mga kainan (wala pa sa `public/dining/`)
 */

const DISHES = [
  [
    "Bicol Express",
    "Pork simmered in coconut milk with shrimp paste and long green chilies. The best-known dish of the region, and the one most first-time visitors ask for by name.",
  ],
  [
    "Laing",
    "Dried taro leaves cooked slowly in coconut milk until they collapse into something rich, dark, and faintly smoky.",
  ],
  [
    "Pinangat",
    "Taro leaves wrapped around a filling and tied into parcels, then simmered in coconut milk. The more patient cousin of laing.",
  ],
  [
    "Kinunot",
    "Flaked fish in coconut milk with malunggay leaves, finished with a squeeze of calamansi to cut the richness.",
  ],
  [
    "Tinutungang manok",
    "Chicken in coconut milk made from toasted coconut, which is what gives the broth its colour and its smoke.",
  ],
  [
    "Sili ice cream",
    "Chili ice cream. Sweet first, warm afterwards, and the local way to finish a meal — order it even if you think you will not like it.",
  ],
] as const;

const GOOD_TO_KNOW = [
  [
    "Say how you take your heat",
    "Chili and coconut milk carry most of this cooking, and the balance between them is easy to adjust. Tell the kitchen where you sit before the food is made rather than after.",
  ],
  [
    "It is food built for a table, not a plate",
    "Bicol cooking is shared by design — several dishes down the middle, rice in front of everyone. Send your numbers ahead for a group and the kitchen will scale it properly.",
  ],
  [
    "Outlets and hours are still being confirmed",
    "Restaurant names, opening hours, and full menus will be published here once the club confirms them. Until then, ask the team what is open on your dates.",
  ],
] as const;

const DINING_VENUES = [
  {
    name: "VIP Dining & Bar",
    eyebrow: "Taste & service",
    description:
      "An elevated dining experience with fresh dishes from the connected kitchen and cocktails poured at the bar.",
    image: "/dining/vip-dining-bar-hero-clean-4k-v1.png",
    href: "/dining/vip-dining-bar",
    action: "Explore VIP Dining",
  },
  {
    name: "Clubhouse",
    eyebrow: "Gather at the club",
    description:
      "A relaxed gathering place for meals and drinks, close to the activities and the wider resort grounds.",
    image: "/dining/clubhouse.webp",
    href: "https://visitcamsur.com/facilities/clubhouse",
    action: "View the Clubhouse",
  },
] as const;

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path
        d="M6.5 3.5 9 4l1 3-1.8 1.4a12 12 0 0 0 5.4 5.4L15 12l3 1 .5 2.5A2 2 0 0 1 16.4 18 13 13 0 0 1 6 7.6 2 2 0 0 1 6.5 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DiningVenues() {
  return (
    <section id="dining-venues" className={EDITORIAL_SECTION_ALT}>
      <Watermark speed={0.12} />
      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-12">
        <EditorialHeading
          kicker="Where to dine"
          title="Two places to settle in."
          intro="From an elevated meal at VIP Dining & Bar to relaxed gatherings at the Clubhouse, choose the setting that suits the day."
        />

        <div className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-2">
          {DINING_VENUES.map((venue, index) => (
            <article
              key={venue.name}
              data-reveal="up"
              style={delay(index * 100)}
              className="group relative isolate aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-[#173b2a]/12 bg-[#173b2a] shadow-[0_18px_55px_rgba(20,39,29,0.1)] sm:aspect-[3/2]"
            >
              <Image
                src={venue.image}
                alt={venue.name}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="-z-20 object-cover transition duration-700 ease-out group-hover:scale-[1.035] group-focus-within:scale-[1.035]"
              />
              <div
                className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(4,20,13,0.04)_22%,rgba(4,20,13,0.88)_100%)] transition duration-500 lg:group-hover:bg-[linear-gradient(180deg,rgba(4,20,13,0.3)_0%,rgba(4,20,13,0.94)_100%)] lg:group-focus-within:bg-[linear-gradient(180deg,rgba(4,20,13,0.3)_0%,rgba(4,20,13,0.94)_100%)]"
                aria-hidden="true"
              />

              <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#e7d18d] xl:text-[11px]">
                  {venue.eyebrow}
                </p>
                <h3 className="mt-3 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
                  {venue.name}
                </h3>

                <div className="mt-4 max-h-52 translate-y-0 overflow-hidden opacity-100 transition-[max-height,opacity,transform] duration-500 ease-out lg:max-h-0 lg:translate-y-5 lg:opacity-0 lg:group-hover:max-h-52 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-within:max-h-52 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100">
                  <p className="max-w-xl text-sm leading-7 text-white/78 xl:text-base xl:leading-8">
                    {venue.description}
                  </p>
                  <Link
                    href={venue.href}
                    {...(venue.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="mt-6 inline-flex h-11 w-fit items-center gap-3 rounded-full bg-[#e7d18d] px-6 text-[10px] font-bold uppercase tracking-[0.13em] text-[#10281e] transition duration-300 hover:-translate-y-0.5 hover:bg-[#f3dfa0] hover:shadow-[0_12px_30px_rgba(0,0,0,0.22)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white xl:text-[11px]"
                  >
                    {venue.action}
                    <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TheTable() {
  return (
    <section id="bicol-table" className={EDITORIAL_SECTION_ALT}>
      <Watermark speed={0.12} />
      <Shell>
        <EditorialHeading
          kicker="The Bicol table"
          title="Cooked the way the region cooks."
          intro="Almost everything here starts with coconut milk and chili. That is not a house style — it is simply how Camarines Sur has always eaten, and the kitchen sees no reason to translate it for visitors."
        />

        <div className="mt-10 border-t border-[#173b2a]/12">
          {DISHES.map(([name, description], index) => (
            <div
              key={name}
              data-reveal="up"
              style={delay((index % 3) * 90)}
              className={`grid gap-4 py-5 sm:grid-cols-[44px_minmax(0,1fr)] sm:gap-7 ${
                index ? "border-t border-[#173b2a]/12" : ""
              }`}
            >
              <p className="text-[10px] xl:text-[11px] font-bold tracking-[0.14em] text-[#98782f]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div className="min-w-0">
                <h3 className="text-base font-semibold tracking-[-0.02em] text-[#14271d]">{name}</h3>
                <p className="mt-1.5 text-sm leading-7 xl:text-base xl:leading-8 text-[#667269]">{description}</p>
              </div>
            </div>
          ))}
        </div>

        <p data-reveal="up" className="mt-8 text-sm leading-7 xl:text-base xl:leading-8 text-[#8a938c]">
          Dishes available on any given day depend on the market and the season.
        </p>
      </Shell>
    </section>
  );
}

function GoodToKnow() {
  return (
    <section id="good-to-know" className={EDITORIAL_SECTION_ALT}>
      <Watermark speed={-0.09} offsetY="16%" />
      <Shell>
        <EditorialHeading
          kicker="Good to know"
          title="Before you sit down."
          intro="Three things worth knowing, particularly if this is your first time eating your way through Bicol."
        />

        <div className="mt-10 border-t border-[#173b2a]/12">
          {GOOD_TO_KNOW.map(([title, description], index) => (
            <div
              key={title}
              data-reveal="up"
              style={delay(index * 90)}
              className={`grid gap-4 py-5 sm:grid-cols-[44px_minmax(0,1fr)] sm:gap-7 ${
                index ? "border-t border-[#173b2a]/12" : ""
              }`}
            >
              <p className="text-[10px] xl:text-[11px] font-bold tracking-[0.14em] text-[#98782f]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div className="min-w-0">
                <h3 className="text-base font-semibold tracking-[-0.02em] text-[#14271d]">{title}</h3>
                <p className="mt-1.5 text-sm leading-7 xl:text-base xl:leading-8 text-[#667269]">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </Shell>
    </section>
  );
}

function DiningCta() {
  return (
    <section className="relative isolate overflow-hidden border-t border-[#173b2a]/10 bg-[#1c3b2d] py-14 text-white sm:py-16">
      <div
        data-parallax="0.14"
        className="pointer-events-none absolute -right-32 top-1/2 -z-10 h-96 w-96 rounded-full bg-[#c9a54e]/[0.07] blur-3xl"
        aria-hidden="true"
      />
      <Shell>
        <div className="mx-auto max-w-xl text-center xl:max-w-2xl">
          <div>
            <Kicker>Reserve a table</Kicker>
            <h2
              data-reveal="up"
              style={delay(90)}
              className="mt-3 text-2xl font-medium tracking-[-0.035em] sm:text-3xl xl:text-4xl"
            >
              Eat where you are playing.
            </h2>
          </div>
          <div data-reveal="up" style={delay(180)}>
            <p className="text-sm leading-7 xl:text-base xl:leading-8 text-white/60">
              Send your dates and how many are eating, and the team will sort the table — including anything the
              kitchen needs to know about heat, allergies, or a group that would rather not share.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/plan-your-visit"
                className="inline-flex h-11 items-center rounded-full bg-[#e7d18d] px-6 text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.12em] text-[#0a2619] transition hover:-translate-y-0.5 hover:bg-[#f3dfa0]"
              >
                Reserve a table
              </Link>
              <a
                href={CLUB_PHONE.href}
                className="inline-flex h-11 items-center gap-2.5 rounded-full border border-white/22 px-6 text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.12em] text-white/85 transition hover:border-[#e7d18d]/60 hover:text-[#f1d98f]"
              >
                <PhoneIcon />
                {CLUB_PHONE.label}
              </a>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}

export default function DiningDetails() {
  return (
    <>
      <ScrollMotion />
      <DiningVenues />
      <TheTable />
      <GoodToKnow />
      <DiningCta />
    </>
  );
}
