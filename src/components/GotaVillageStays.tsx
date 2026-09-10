import Image from "next/image";
import Link from "next/link";
import ScrollMotion from "@/components/ScrollMotion";
import { delay } from "@/components/EditorialKit";

const GOTA_SPACES = [
  {
    name: "Living Spaces",
    eyebrow: "Resort space 01",
    description: "Warm timber interiors create an easy place to gather, settle in, and slow down after a day outdoors.",
    primary: "/gota-village-resort/gallery/living-room.jpg",
    secondary: "/gota-village-resort/gallery/living-area.jpg",
    primaryAlt: "Timber living room at Gota Village Resort",
    secondaryAlt: "Dining and living area at Gota Village Resort",
  },
  {
    name: "Rest & Welcome",
    eyebrow: "Resort space 02",
    description: "Simple private rooms and a welcoming lodge interior keep the village stay relaxed and connected to its setting.",
    primary: "/gota-village-resort/gallery/minibar-bedroom.jpg",
    secondary: "/gota-village-resort/gallery/lobby.jpg",
    primaryAlt: "Wood-lined bedroom at Gota Village Resort",
    secondaryAlt: "Timber lobby at Gota Village Resort",
  },
  {
    name: "Village Grounds",
    eyebrow: "Resort space 03",
    description: "Cabins follow the contours of the landscape, linked by garden paths and framed by dense tropical hills.",
    primary: "/gota-village-resort/gallery/grounds-village.jpg",
    secondary: "/gota-village-resort/gallery/grounds-rainbow.jpg",
    primaryAlt: "Aerial view of the Gota village grounds",
    secondaryAlt: "Gota cabins beneath a rainbow",
  },
  {
    name: "Bay Outlook",
    eyebrow: "Resort space 04",
    description: "The elevated grounds open toward the sheltered bay, bringing the village, forest, and coastline into one view.",
    primary: "/gota-village-resort/gallery/grounds-bay.jpg",
    secondary: "/gota-village-resort/hero-4k.jpg",
    primaryAlt: "Gota Village Resort overlooking the bay",
    secondaryAlt: "Wide aerial view of Gota Village Resort and its surrounding landscape",
  },
] as const;

export default function GotaVillageStays() {
  return (
    <section id="gota-stays" className="bg-[#f7f5ee] text-[#14271d]">
      <ScrollMotion />

      <div className="mx-auto max-w-7xl px-6 pb-4 pt-10 text-center sm:px-10 sm:pt-12 lg:px-8 lg:pt-14">
        <Image
          src="/gota-village-resort/gota-logo-white.png"
          alt="Gota Village Resort"
          width={2550}
          height={1905}
          sizes="(max-width: 639px) 52vw, 280px"
          data-reveal="up"
          style={{ filter: "brightness(0) saturate(100%) invert(27%) sepia(63%) saturate(1475%) hue-rotate(178deg) brightness(79%) contrast(91%)" }}
          className="mx-auto mb-8 h-auto max-h-48 w-[min(52vw,280px)] object-contain sm:mb-10"
        />
        <p data-reveal="up" className="font-navigation text-[10px] font-bold uppercase tracking-[0.24em] text-[#98782f] xl:text-[11px]">Ways to stay</p>
        <h2 data-reveal="up" style={delay(90)} className="mx-auto mt-4 max-w-4xl text-[clamp(2.25rem,4vw,4rem)] font-medium leading-[0.98] tracking-[-0.05em]">A village retreat shaped by nature</h2>
        <p data-reveal="up" style={delay(180)} className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#5d685f] sm:text-lg">Settle into the landscape, from timber rooms to open views of the bay.</p>
        <div data-reveal="up" style={delay(270)} className="mx-auto mt-9 h-px w-20 bg-[#98782f]/50" />
      </div>

      {GOTA_SPACES.map((space, index) => {
        const flip = index % 2 === 1;
        return (
          <article key={space.name} className={`py-16 sm:py-20 lg:py-24 ${index ? "border-t border-[#173b2a]/10" : ""}`}>
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-8">
              <div className={`relative ${flip ? "lg:order-2" : ""}`}>
                <span aria-hidden="true" className="pointer-events-none absolute -top-10 left-0 select-none font-display text-[clamp(5rem,9vw,8.5rem)] font-medium leading-none tracking-[-0.06em] text-[#0b2419]/[0.06] sm:-top-14">{String(index + 1).padStart(2, "0")}</span>
                <div className="relative">
                  <p data-reveal="up" className="font-navigation text-[10px] font-bold uppercase tracking-[0.22em] text-[#98782f] xl:text-[11px]">{space.eyebrow}</p>
                  <h3 data-reveal="up" style={delay(90)} className="mt-4 font-display text-[clamp(2.6rem,5vw,4.8rem)] font-medium leading-[0.92] tracking-[-0.055em]">{space.name}</h3>
                  <p data-reveal="up" style={delay(180)} className="mt-6 max-w-xl text-base leading-8 text-[#5d685f] sm:text-lg sm:leading-9">{space.description}</p>
                  <div data-reveal="up" style={delay(270)} className="mt-8 h-px w-14 bg-[#98782f]/45" />
                </div>
              </div>

              <div className={`relative ${flip ? "lg:order-1" : ""}`}>
                <div data-reveal={flip ? "left" : "right"} className={`relative overflow-hidden rounded-[1.5rem] bg-[#d9ded8] shadow-[0_22px_55px_rgba(20,39,29,0.12)] sm:rounded-[2rem] ${flip ? "ml-auto aspect-[5/4] w-[86%]" : "aspect-[4/5] w-[82%]"}`}>
                  <Image src={space.primary} alt={space.primaryAlt} fill sizes="(max-width: 1023px) 82vw, 480px" className="object-cover transition duration-700 hover:scale-[1.03]" />
                </div>
                <div data-reveal="scale" style={delay(200)} className={`absolute bottom-6 overflow-hidden rounded-[1.25rem] bg-[#d9ded8] shadow-[0_18px_45px_rgba(20,39,29,0.16)] ring-4 ring-[#f7f5ee] sm:bottom-8 sm:rounded-[1.5rem] ${flip ? "left-0 aspect-[3/4] w-[38%]" : "right-0 aspect-square w-[42%]"}`}>
                  <Image src={space.secondary} alt={space.secondaryAlt} fill sizes="(max-width: 1023px) 40vw, 240px" className="object-cover transition duration-700 hover:scale-[1.03]" />
                </div>
              </div>
            </div>
          </article>
        );
      })}

      <div className="border-t border-[#173b2a]/10">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center sm:px-10 sm:py-20 lg:px-8">
          <p data-reveal="up" className="font-navigation text-[10px] font-bold uppercase tracking-[0.22em] text-[#98782f] xl:text-[11px]">Plan your stay</p>
          <h2 data-reveal="up" style={delay(90)} className="mx-auto mt-4 max-w-2xl text-[clamp(2.2rem,3.6vw,3.4rem)] font-medium leading-[1.02] tracking-[-0.05em]">Stay at Gota Village Resort.</h2>
          <p data-reveal="up" style={delay(180)} className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#5d685f] xl:text-base xl:leading-8">Share your preferred dates and group size with the team to ask about current room availability.</p>
          <div data-reveal="up" style={delay(270)} className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/#contact" className="inline-flex h-12 items-center rounded-full bg-[#2f644b] px-7 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:bg-[#3a765a] xl:text-[12px]">Inquire about your stay</Link>
            <Link href="/accommodations" className="inline-flex h-12 items-center rounded-full border border-[#174630]/25 px-7 text-[11px] font-bold uppercase tracking-[0.12em] text-[#174630] transition hover:border-[#174630] xl:text-[12px]">View all stays</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
