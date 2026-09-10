import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FairwayDivider from "@/components/FairwayDivider";
import Footer from "@/components/Footer";
import ScrollMotion from "@/components/ScrollMotion";
import { CLUB_PHONE } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Buddy Golf Trip | CamSur Uptown Golf Club",
  description: "A flexible three-day golf getaway for friends, with rounds, course-side stays, dining, and time to enjoy Camarines Sur together.",
};

const ITINERARY = [
  {
    day: "Arrival day",
    title: "Settle in, loosen up, and start the friendly rivalry.",
    intro: "Arrive without rushing the first tee. Check in, leave the bags, and give everyone time to shift into golf-trip mode.",
    moments: [
      ["First", "Check in at your chosen CamSur stay, collect the group’s welcome details, and arrange clubs and transfers for the days ahead."],
      ["Next", "Head to the practice ground for a relaxed warm-up, then play an optional twilight round if your arrival time allows."],
      ["Then", "Meet at the clubhouse for a Bicol-inspired dinner, the first scorecard debate, and an easy evening with the group."],
    ],
  },
  {
    day: "Course and CamSur day",
    title: "Golf first, then see where the day takes the group.",
    intro: "Pair a morning round with time to recover, explore, or add another friendly challenge before dinner.",
    moments: [
      ["First", "Begin with breakfast and a full round across CamSur Uptown’s tropical fairways."],
      ["Next", "Break for lunch, then choose a relaxed resort activity, practice session, or extra team game."],
      ["Then", "Gather for dinner and reset before the trip’s featured round the following morning."],
    ],
  },
  {
    day: "Signature golf day",
    title: "Make the main round the story everyone takes home.",
    intro: "This is the competitive heart of the trip: a full round beneath Mt. Isarog, with enough breathing room before and after play.",
    moments: [
      ["First", "Start with an unhurried range session before the group’s featured 18-hole round."],
      ["Next", "Return to the clubhouse for lunch, compare cards, and settle the day’s friendly wagers."],
      ["Then", "Finish with a group dinner built around the best shots, worst bounces, and one more possible rematch."],
    ],
  },
  {
    day: "Final morning",
    title: "One last game before the road home.",
    intro: "Keep the last morning flexible so the group can chase another score or simply slow down before departure.",
    moments: [
      ["First", "Enjoy breakfast and check out, with luggage held while the group makes the most of the morning."],
      ["Next", "Play a shorter team format or use the practice facilities to settle the weekend’s final competition."],
      ["Then", "Share a farewell lunch, take the group photo, and depart with transfers arranged toward Naga or your next CamSur stop."],
    ],
  },
] as const;

const INCLUSIONS = [
  "Two nights in your choice of available accommodation",
  "Two scheduled 18-hole rounds with caddies",
  "Daily breakfast and one group dinner",
  "Range access and practice balls before the main round",
  "Shared transfers between accommodation and the golf club",
  "A flexible itinerary adjusted to group size and arrival time",
] as const;

export default function BuddyTripPage() {
  return (
    <>
      <main className="bg-[#f7f5ee] text-[#14271d]">
        <ScrollMotion />
        <section id="top" className="relative isolate flex min-h-[660px] items-center overflow-hidden bg-[#102a1e] text-white">
          <Image
            src="/buddy-golf-trip-hero-v2.png"
            alt="A group of friends enjoying a golf trip beneath Mt. Isarog"
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover object-center"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,19,13,0.64)_0%,rgba(5,19,13,0.18)_42%,rgba(5,19,13,0.72)_100%)]" />
          <FairwayDivider fill="#f7f5ee" />
          <div className="mx-auto w-full max-w-7xl px-6 pb-28 pt-44 text-center sm:pb-36 lg:px-8">
            <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.26em] text-[#f1d98f] sm:text-[11px]">
              Golf packages · friends getaway
            </p>
            <h1 className="mx-auto mt-5 max-w-3xl text-balance text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.055em]">
              Your Buddy Golf Trip Itinerary
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
              Three easy-going days of golf, good food, and friendly competition—planned around your group and set beneath Mt. Isarog.
            </p>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#f7f5ee] py-14 sm:py-18 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-[250px_minmax(0,1fr)] lg:gap-16 lg:px-8">
            <aside className="border-[#173b2a]/55 md:border-r md:pr-10">
              <h2 className="text-2xl font-semibold tracking-[-0.025em]">Itineraries</h2>
              <div className="mt-7 h-px w-36 bg-[#173b2a]/70" />
              <nav className="mt-7 space-y-4 font-navigation text-[10px] font-bold uppercase leading-[1.35] tracking-[0.08em] text-[#455249]" aria-label="Package itineraries">
                <Link href="/packages/stay-and-play" className="block transition hover:text-[#2f644b]">Stay &amp; Play</Link>
                <span className="block text-[#2f644b]">— Your Buddy Golf Trip</span>
              </nav>
            </aside>

            <div className="min-w-0 md:pt-12">
              <div className="max-w-4xl border-b border-[#173b2a]/18 pb-10">
                <p className="text-sm font-medium leading-7 text-[#46554c]">
                  Bring a foursome or a larger circle of friends and turn the group chat into a real CamSur golf escape. Play together, stay close to the course, share the table, and leave room for the unplanned moments that make a buddy trip memorable.
                </p>
                <p className="mt-5 text-sm leading-7 text-[#59665e]">
                  This suggested itinerary balances two full rounds with practice time, relaxed meals, and an easy final morning. Every part can be adjusted around your dates, group size, accommodation, and preferred pace.
                </p>
                <p className="mt-5 text-sm leading-7 text-[#59665e]">
                  With 18 holes beneath Mt. Isarog, the only real question is how many rematches your group can fit into the stay.
                </p>
                <Link href="/packages" className="mt-7 inline-flex h-10 items-center rounded-full bg-[#2f644b] px-6 font-navigation text-[9px] font-bold uppercase tracking-[0.13em] text-white transition hover:-translate-y-0.5 hover:bg-[#3a765a]">
                  Compare packages
                </Link>
              </div>

              <div className="max-w-4xl">
                {ITINERARY.map((item, index) => (
                  <details key={item.day} id={`day-${index + 1}`} className="group scroll-mt-28 border-b border-[#173b2a]/25">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 marker:hidden">
                      <span className="font-navigation text-xl font-semibold uppercase tracking-[-0.02em] text-[#24342b] sm:text-2xl">Day {index + 1}</span>
                      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#173b2a]/55 transition group-open:rotate-180" aria-hidden="true">
                        <span className="h-2.5 w-2.5 -translate-y-0.5 rotate-45 border-b border-r border-current" />
                      </span>
                    </summary>
                    <div className="pb-8 pr-2 sm:pr-14">
                      <p className="font-navigation text-[9px] font-bold uppercase tracking-[0.2em] text-[#98782f]">{item.day}</p>
                      <h3 className="mt-3 text-xl font-semibold leading-snug tracking-[-0.025em] sm:text-2xl">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-[#5d685f]">{item.intro}</p>
                      <div className="mt-6 space-y-4">
                        {item.moments.map(([label, copy]) => (
                          <div key={label} className="grid gap-1 sm:grid-cols-[70px_1fr] sm:gap-4">
                            <p className="font-navigation text-[9px] font-bold uppercase tracking-[0.15em] text-[#2f644b]">{label}</p>
                            <p className="text-sm leading-7 text-[#59665e]">{copy}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f7f5ee] py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:items-start lg:px-8">
            <div>
              <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.24em] text-[#98782f]">Package starting point</p>
              <h2 className="mt-4 text-[clamp(2rem,3.4vw,3.25rem)] font-medium leading-none tracking-[-0.05em]">What your group can build around.</h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-[#5d685f]">Final inclusions and rates depend on dates, availability, accommodation, and the number of golfers.</p>
            </div>
            <ul className="divide-y divide-[#173b2a]/10 border-y border-[#173b2a]/10">
              {INCLUSIONS.map((item) => <li key={item} className="flex gap-3 py-4 text-sm leading-7 text-[#46554c] sm:text-base"><span className="text-[#98782f]">✓</span>{item}</li>)}
            </ul>
          </div>
        </section>

        <section className="bg-[#173b2a] px-6 py-16 text-center text-white sm:py-20">
          <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.24em] text-[#f1d98f]">Bring the group</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-medium tracking-[-0.045em] sm:text-4xl">Choose the dates. We’ll shape the trip.</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/#contact" className="inline-flex h-12 items-center rounded-full bg-[#e7d18d] px-7 font-navigation text-[10px] font-bold uppercase tracking-[0.14em] text-[#14271d] transition hover:-translate-y-0.5 hover:bg-[#f3dfa0]">Request a group quote</Link>
            <a href={CLUB_PHONE.href} className="inline-flex h-12 items-center rounded-full border border-white/30 px-7 font-navigation text-[10px] font-bold uppercase tracking-[0.14em] transition hover:border-[#e7d18d] hover:text-[#f1d98f]">Call {CLUB_PHONE.label}</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
