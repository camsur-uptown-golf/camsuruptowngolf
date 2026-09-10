import Image from "next/image";
import Link from "next/link";
import ScrollMotion from "@/components/ScrollMotion";
import { delay } from "@/components/EditorialKit";

const LODGE_SPACES = [
  {
    name: "Arrival & Welcome",
    eyebrow: "Lodge experience 01",
    description:
      "A sheltered arrival leads into a warm welcome hall, creating a calm transition from the course to the lodge.",
    primary: "/clubhouse/arrival.jpg",
    secondary: "/clubhouse/welcome-hall.jpg",
    primaryAlt: "Sheltered arrival at Clubhouse Lodge",
    secondaryAlt: "Welcome hall at Clubhouse Lodge",
  },
  {
    name: "Golf & Lounge",
    eyebrow: "Lodge experience 02",
    description:
      "The golf shop and members’ lounge keep equipment, coffee, conversation, and fairway views within easy reach.",
    primary: "/clubhouse/pro-shop.jpg",
    secondary: "/clubhouse/members-lounge.jpg",
    primaryAlt: "Golf shop at Clubhouse Lodge",
    secondaryAlt: "Members lounge overlooking the course",
  },
  {
    name: "Practice & Rooftop",
    eyebrow: "Lodge experience 03",
    description:
      "Open-air practice bays support the day’s play, while rooftop gardens and dining create an easy place to finish it.",
    primary: "/clubhouse/practice-bays.jpg",
    secondary: "/clubhouse/rooftop-garden.jpg",
    primaryAlt: "Open-air golf practice bays",
    secondaryAlt: "Rooftop garden and dining at sunset",
  },
] as const;

export default function ClubhouseVision() {
  return (
    <section id="clubhouse-stays" className="bg-[#f7f5ee] text-[#14271d]">
      <ScrollMotion />

      <div className="mx-auto max-w-7xl px-6 pb-4 pt-10 text-center sm:px-10 sm:pt-12 lg:px-8 lg:pt-14">
        <div data-reveal="up" className="relative mx-auto mb-8 h-48 w-60 overflow-hidden sm:mb-10">
          <Image
            src="/camsur-uptown-logo.png"
            alt="CamSur Uptown Golf Club emblem"
            width={720}
            height={958}
            sizes="230px"
            className="absolute left-1/2 top-0 h-auto w-[230px] max-w-none -translate-x-1/2"
          />
        </div>
        <p data-reveal="up" className="font-navigation text-[10px] font-bold uppercase tracking-[0.24em] text-[#98782f] xl:text-[11px]">
          At the heart of the club
        </p>
        <h2 data-reveal="up" style={delay(90)} className="mx-auto mt-4 max-w-4xl text-[clamp(2.25rem,4vw,4rem)] font-medium leading-[0.98] tracking-[-0.05em]">
          Stay close to every part of the day.
        </h2>
        <p data-reveal="up" style={delay(180)} className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#5d685f] sm:text-lg">
          From the first arrival to the last drink upstairs, Clubhouse Lodge keeps the full club experience around you.
        </p>
        <div data-reveal="up" style={delay(270)} className="mx-auto mt-9 h-px w-20 bg-[#98782f]/50" />
      </div>

      {LODGE_SPACES.map((space, index) => {
        const flip = index % 2 === 1;

        return (
          <article key={space.name} className={`py-16 sm:py-20 lg:py-24 ${index ? "border-t border-[#173b2a]/10" : ""}`}>
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-8">
              <div className={`relative ${flip ? "lg:order-2" : ""}`}>
                <span aria-hidden="true" className="pointer-events-none absolute -top-10 left-0 select-none font-display text-[clamp(5rem,9vw,8.5rem)] font-medium leading-none tracking-[-0.06em] text-[#0b2419]/[0.06] sm:-top-14">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="relative">
                  <p data-reveal="up" className="font-navigation text-[10px] font-bold uppercase tracking-[0.22em] text-[#98782f] xl:text-[11px]">
                    {space.eyebrow}
                  </p>
                  <h3 data-reveal="up" style={delay(90)} className="mt-4 font-display text-[clamp(2.6rem,5vw,4.8rem)] font-medium leading-[0.92] tracking-[-0.055em]">
                    {space.name}
                  </h3>
                  <p data-reveal="up" style={delay(180)} className="mt-6 max-w-xl text-base leading-8 text-[#5d685f] sm:text-lg sm:leading-9">
                    {space.description}
                  </p>
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
          <h2 data-reveal="up" style={delay(90)} className="mx-auto mt-4 max-w-2xl text-[clamp(2.2rem,3.6vw,3.4rem)] font-medium leading-[1.02] tracking-[-0.05em]">Reserve your room at Clubhouse Lodge.</h2>
          <p data-reveal="up" style={delay(180)} className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#5d685f] xl:text-base xl:leading-8">Tell the team your dates and group size, and they will help arrange a stay close to the course and club facilities.</p>
          <div data-reveal="up" style={delay(270)} className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/#contact" className="inline-flex h-12 items-center rounded-full bg-[#2f644b] px-7 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:bg-[#3a765a] xl:text-[12px]">Inquire about your stay</Link>
            <Link href="/accommodations" className="inline-flex h-12 items-center rounded-full border border-[#174630]/25 px-7 text-[11px] font-bold uppercase tracking-[0.12em] text-[#174630] transition hover:border-[#174630] xl:text-[12px]">View all stays</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
