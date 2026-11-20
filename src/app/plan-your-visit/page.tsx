import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import GroupInquiry from "@/components/GroupInquiry";
import HeroBackdrop from "@/components/HeroBackdrop";
import QuickBook from "@/components/QuickBook";
import ScrollMotion from "@/components/ScrollMotion";
import { CLUB_EMAIL, CLUB_PHONE } from "@/lib/site-content";

/**
 * Ang "Plan Your Visit" — ang panimulang pahina ng bisita.
 *
 * HUB NA, HINDI ISANG MAHABANG FORM. Dati ay 10-field na call-back form ang
 * buong pahina. Ngayong nabo-book na online ang tee time (/golf/book) at
 * nakikita na ang availability ng villa, karamihan ng bisita ay kailangan
 * lang ituro sa tamang pahina:
 *   1. Tatlong pagpipilian — Play a round, Stay the night, Packages
 *   2. Maikling form PARA LANG sa grupo at event (GroupInquiry, 7 tanong)
 *   3. Good to know — direksyon, FAQ, telepono, email
 *
 * Wala nang /contact — ang email at telepono ay nasa "Good to know".
 *
 * IISANG GILID ANG BUONG PAHINA. Lahat ng section ay nasa `CONTAINER`, kaya
 * iisang patayong linya ang kaliwa at kanan mula hero hanggang dulo. Dati ay
 * lima ang magkakaibang gilid. Malapad ito (`max-w-[1600px]`, makitid na
 * gutter) — kapareho ng /packages at /golf — para hindi masayang ang puwang
 * sa kaliwa at kanan. Ang Breadcrumbs at Footer lang ang nasa mas makitid na
 * `max-w-7xl` (shared ang mga iyon sa buong site).
 */
export const metadata: Metadata = {
  title: "Plan your visit | CamSur Uptown Golf",
  description:
    "Book a tee time, find a stay at Villa Del Rey, choose a package, or tell the club about your group or event.",
};

const CHOICES = [
  {
    title: "Play a round",
    text: "Choose your date and tee time, add a caddie or a cart, and book online.",
    cta: "Reserve your round",
    href: "/golf/book",
    image: "/hero-images/tee-time-2027-logo.webp",
    alt: "Golf ball with the CamSur Uptown Golf logo beside a driver on the fairway",
  },
  {
    title: "Stay the night",
    text: "Villas, cabins, and cabanas a short walk from the first tee at Villa Del Rey.",
    cta: "See the stays",
    href: "/accommodations/villa-del-rey",
    image: "/villa-del-rey/stays/villa-pool-4k.jpg",
    alt: "Private pool beside a villa at Villa Del Rey",
  },
  {
    title: "Packages",
    text: "Rounds and nights together — Stay & Play, or a getaway for your golf group.",
    cta: "View packages",
    href: "/packages",
    image: "/packages-stay-play-hero-v2.png",
    alt: "Golfers walking toward the clubhouse at sunset",
  },
] as const;

const CONTAINER = "mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8";
const EYEBROW = "font-navigation text-xs font-semibold uppercase tracking-[0.24em] sm:text-sm";
const SECTION_TITLE = "mt-3 font-display text-[clamp(2.25rem,4vw,3.75rem)] font-medium leading-[0.98] tracking-[-0.045em]";

const GOOD_TO_KNOW = [
  { label: "Getting here", text: "Driving times from Naga Airport, Naga City, and Legazpi.", href: "/getting-here", icon: "M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z M12 12.3a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6Z" },
  { label: "FAQs", text: "Rates, dress code, caddies, cancellations, and more.", href: "/faq", icon: "M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14 M12 17.5h.01 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" },
  { label: "Call the club", text: CLUB_PHONE.label, href: CLUB_PHONE.href, icon: "M6.5 3.5 9 4l1 3-1.8 1.4a12 12 0 0 0 5.4 5.4L15 12l3 1 .5 2.5A2 2 0 0 1 16.4 18 13 13 0 0 1 6 7.6 2 2 0 0 1 6.5 3.5Z" },
  { label: "Email", text: CLUB_EMAIL.label, href: CLUB_EMAIL.href, icon: "M3 6.5h18v11H3z M3.5 7l8.5 6 8.5-6" },
];

function InfoIcon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PlanYourVisitPage() {
  return (
    <>
      <main>
        <ScrollMotion />

        {/* The panoramic photo has its own frame, independent of form height.
            The panel overlaps only the empty driveway beneath the golfers.
            Keep overflow visible so the date picker can open below the panel. */}
        <section id="top" className="relative isolate z-20 flow-root bg-[#f3ede1] text-[#03321b]">
          <div className="relative isolate h-36 bg-[#03321b] sm:aspect-[2.5/1] sm:h-auto">
            <HeroBackdrop
              src="/plan-your-visit-arrival-v2.webp"
              alt="Clubhouse arrival concept: a concierge welcomes two golfers beside their cart beneath the bronze canopy"
              imageClassName="object-center"
              shade={false}
            />
            {/* A short top shade keeps navigation readable without dimming the guests. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 -z-10 hidden h-72 bg-[linear-gradient(180deg,rgba(7,23,15,0.62)_0%,rgba(7,23,15,0.36)_50%,transparent_100%)] sm:block"
            />
          </div>

          {/* PAGBOOK ANG UNA. Petsa, round, manlalaro, "Find tee times" —
              isang pindot lang papunta sa mga bakanteng oras. */}
          <div className={`${CONTAINER} relative z-10 -mb-24 sm:-mt-12 lg:-mt-24`}>
            <div className="rounded-2xl bg-[#f3ede1] p-6 shadow-[0_28px_70px_rgba(7,23,15,0.28)] sm:p-8 lg:p-10">
              <div className="lg:flex lg:items-end lg:justify-between lg:gap-12">
                <div>
                  <p className={`${EYEBROW} text-[#7d6224]`}>Plan your visit</p>
                  <h1 className="mt-3 font-display text-[clamp(2.75rem,5.2vw,4.75rem)] font-medium leading-[0.95] tracking-[-0.05em] text-[#17251e]">
                    Book your round.
                  </h1>
                </div>
                <p className="mt-4 max-w-md text-sm font-normal leading-7 text-[#3f4c45] sm:text-base sm:leading-8 lg:mt-0 lg:pb-1">
                  Pick a date and see open tee times in seconds. Secure it with a small downpayment.
                </p>
              </div>
              <div className="mt-7 border-t border-[#03321b]/12 pt-7">
                <QuickBook plain />
              </div>
            </div>
          </div>
        </section>

        <div className="bg-[#f3ede1] pt-24">
          <Breadcrumbs />
        </div>

        {/* 1. Iba pang puwedeng i-book */}
        <section className="bg-[#f3ede1] pb-16 pt-6 text-[#03321b] sm:pb-20 lg:pb-24">
          <div className={CONTAINER}>
            <p data-reveal="up" className={`${EYEBROW} text-center text-[#7d6224]`}>
              Or plan the whole trip
            </p>
            <h2 data-reveal="up" className={`${SECTION_TITLE} text-center text-[#17251e]`}>
              Make a trip of it.
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3 lg:mt-10 lg:gap-6">
              {CHOICES.map((choice, index) => (
                <Link
                  key={choice.href}
                  href={choice.href}
                  data-reveal="up"
                  style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
                  /* BUONG CARD AY LARAWAN — gaya ng Clubhouse at Experiences.
                     Madilim na gradient sa ibaba para mabasa ang puting teksto;
                     lumalapit ang larawan at umaangat ang gintong linya sa hover. */
                  className="group relative isolate flex aspect-[5/5.2] flex-col justify-end overflow-hidden rounded-2xl bg-[#03321b] text-white shadow-[0_18px_44px_rgba(20,39,29,0.14)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(20,39,29,0.22)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2e5126] md:aspect-[4/5]"
                >
                  <Image
                    src={choice.image}
                    alt={choice.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="-z-20 object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                  />
                  <span
                    className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(7,23,15,0)_30%,rgba(7,23,15,0.55)_60%,rgba(7,23,15,0.92)_100%)] transition-opacity duration-500 group-hover:opacity-95"
                    aria-hidden="true"
                  />
                  <span className="block p-6 lg:p-8">
                    <span className="block font-display text-[2rem] font-medium leading-none tracking-[-0.035em] [text-shadow:0_2px_12px_rgba(0,0,0,0.4)] lg:text-[2.5rem]">{choice.title}</span>
                    <span className="mt-3 block text-sm font-normal leading-6 text-white/85">{choice.text}</span>
                    <span className="mt-5 flex items-center gap-3 font-navigation text-[11px] font-bold uppercase tracking-[0.16em] text-[#efd99b] xl:text-[11px]">
                      {choice.cta}
                      <span className="h-px w-8 bg-[#e2c77a] transition-all duration-500 group-hover:w-16" aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Grupo at event — isang buong banda sa berde ng club. Nakatiklop
            pa rin ang form para hindi makasagabal sa pagbook; bumubukas lang
            kapag pinindot, sa sariling maliwanag na panel para mabasa. */}
        {/* Kaparehong anyo ng CtaPanel: bilugang berdeng panel sa loob ng cream. */}
        <section id="groups" className="relative scroll-mt-24 bg-[#f3ede1] py-12 sm:py-16">
          <div className={CONTAINER}>
          <details className="group/groups relative isolate overflow-hidden rounded-3xl bg-[#03321b] bg-[radial-gradient(90%_120%_at_100%_0%,#2f5a40_0%,rgba(47,90,64,0)_60%)] p-7 text-white shadow-[0_28px_60px_rgba(8,27,18,0.18)] ring-1 ring-inset ring-[#e2c77a]/15 sm:p-10 xl:p-16">
            <summary className="relative isolate flex cursor-pointer list-none flex-col gap-7 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#e2c77a] md:flex-row md:items-end md:justify-between md:gap-12 [&::-webkit-details-marker]:hidden">
              {/* Ang marka ng club bilang watermark sa kanan — kapareho ng nasa
                  CtaPanel. Nakaangkla sa summary (hindi sa buong section) para
                  hindi ito gumalaw kapag bumukas ang form sa ilalim. Lumalampas
                  ito pataas at pababa; pinuputol ng `overflow-hidden` ng section. */}
              <Image
                src="/camsur-uptown-mark-transparent.png"
                alt=""
                width={911}
                height={1251}
                aria-hidden="true"
                className="pointer-events-none absolute right-[3%] top-1/2 -z-10 hidden h-[135%] w-auto max-w-none -translate-y-1/2 opacity-[0.16] md:block"
              />
              <span className="block max-w-3xl">
                <span className={`${EYEBROW} block text-[#e2c77a]`}>Groups &amp; events</span>
                <span className={`${SECTION_TITLE} block text-balance`}>Bringing a group or planning an event?</span>
                <span className="mt-5 block max-w-2xl text-sm font-normal leading-7 text-white/80 sm:text-base sm:leading-8">
                  Company golf days, tournaments, weddings, and group trips — the events team replies within 48 hours.
                </span>
              </span>
              <span className="inline-flex h-12 shrink-0 items-center justify-center self-start rounded-full bg-[#e2c77a] px-7 font-navigation text-[11px] font-bold uppercase tracking-[0.14em] text-[#03321b] transition group-hover/groups:bg-[#efd99b] group-open/groups:hidden md:self-auto xl:text-[12px]">
                Send an enquiry
              </span>
            </summary>
            {/* `relative`: para pumatong ito sa watermark ng summary, na
                lumalampas pababa kapag bukas ang form. */}
            <div className="relative mt-10 rounded-2xl bg-[#f3ede1] p-6 text-[#03321b] sm:p-10">
              <GroupInquiry />
            </div>
          </details>
          </div>
        </section>

        {/* 3. Good to know */}
        <section className="bg-[#f3ede1] py-16 text-[#03321b] sm:py-20">
          <div className={CONTAINER}>
            <p className={`${EYEBROW} text-center text-[#7d6224]`}>Good to know</p>
            <h2 className={`${SECTION_TITLE} text-center text-[#17251e]`}>Before you arrive.</h2>
            {/* Apat na hanay mula `xl` lang: sa `lg` (1024px) ay ~190px lang
                ang loob ng bawat card, kulang sa email address. */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:gap-5 xl:grid-cols-4">
              {GOOD_TO_KNOW.map((item) => {
                const external = item.href.startsWith("tel:") || item.href.startsWith("mailto:");
                const inner = (
                  <>
                    <span className="mx-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#b49343]/35 bg-[#fbf8ef] text-[#2e5126] transition group-hover:border-[#2e5126]/50">
                      <InfoIcon d={item.icon} />
                    </span>
                    <span className="mt-5 block text-lg font-semibold tracking-[-0.01em]">{item.label}</span>
                    <span translate={external ? "no" : undefined} className="mt-1.5 block text-sm leading-6 text-[#56625a] [overflow-wrap:anywhere]">
                      {item.text}
                    </span>
                  </>
                );
                const className =
                  "group block rounded-2xl border border-[#03321b]/12 bg-white p-6 text-center transition hover:-translate-y-0.5 hover:border-[#2e5126]/40 hover:shadow-[0_18px_40px_rgba(20,39,29,0.1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2e5126]";
                return external ? (
                  <a key={item.label} href={item.href} className={className}>
                    {inner}
                  </a>
                ) : (
                  <Link key={item.label} href={item.href} className={className}>
                    {inner}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
