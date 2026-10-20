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
    cta: "Reserve a tee time",
    href: "/golf/book",
    image: "/hero-images/tee-time-v3-logo.webp",
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

        <section id="top" className="relative isolate z-20 flex min-h-[520px] items-end bg-[#14271d] px-6 pb-14 pt-40 text-white sm:min-h-[660px] sm:pb-16 lg:px-12">
          <HeroBackdrop
            src="/plan-your-visit-hero-v1.png"
            alt="Guests arriving with golf bags at the clubhouse drop-off entrance"
            imageClassName="object-[58%_center] sm:object-center"
          />

          {/* Walang `overflow-hidden` ang hero: kailangang lumabas sa ibaba ang
              calendar ng petsa. Nasa `inset-0` ang larawan, kaya hindi ito
              lumalampas. */}
          {/* PAGBOOK ANG UNA. Ang quick-book ay nasa hero mismo — petsa,
              round, manlalaro, "Find tee times" — kaya isang pindot lang
              papunta sa mga bakanteng oras. */}
          <div className="mx-auto w-full max-w-6xl">
            <div className="max-w-2xl">
              <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.2em] text-[#d8b65b] xl:text-[11px]">Plan your visit</p>
              <h1 className="mt-4 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.055em]">
                Book your round.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
                Pick a date and see open tee times in seconds. Secure it with a small downpayment.
              </p>
            </div>
            <div className="mt-8">
              <QuickBook />
            </div>
          </div>
        </section>

        <div className="bg-[#f7f5ee]">
          <Breadcrumbs />
        </div>

        {/* 1. Iba pang puwedeng i-book */}
        <section className="bg-[#f7f5ee] pb-16 pt-4 text-[#14271d]">
          <p className="mx-auto mb-6 w-full max-w-[1400px] px-6 font-navigation text-[10px] font-bold uppercase tracking-[0.2em] text-[#98782f] lg:px-8 xl:text-[11px]">
            Or book your visit
          </p>
          <div className="mx-auto grid w-full max-w-[1400px] gap-5 px-6 md:grid-cols-3 lg:gap-6 lg:px-8">
            {CHOICES.map((choice, index) => (
              <Link
                key={choice.href}
                href={choice.href}
                data-reveal="up"
                style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
                /* BUONG CARD AY LARAWAN — gaya ng Clubhouse at Experiences.
                   Madilim na gradient sa ibaba para mabasa ang puting teksto;
                   lumalapit ang larawan at umaangat ang gintong linya sa hover. */
                className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl bg-[#14271d] text-white shadow-[0_18px_44px_rgba(20,39,29,0.14)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(20,39,29,0.22)] md:aspect-[3/4.4]"
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
                <span className="block p-6 sm:p-8">
                  <span className="text-2xl font-semibold lg:text-3xl tracking-[-0.02em] [text-shadow:0_2px_12px_rgba(0,0,0,0.4)]">{choice.title}</span>
                  <span className="mt-2 block text-sm leading-6 text-white/80">{choice.text}</span>
                  <span className="mt-5 flex items-center gap-3 font-navigation text-[10px] font-bold uppercase tracking-[0.16em] text-[#f3dda0] xl:text-[11px]">
                    {choice.cta}
                    <span className="h-px w-8 bg-[#e7d18d] transition-all duration-500 group-hover:w-16" aria-hidden="true" />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 2. Grupo at event — nakatiklop, para hindi makasagabal sa pagbook.
            Bumubukas lang ang form kapag pinindot. */}
        <section id="groups" className="scroll-mt-24 border-t border-[#1f3f2e]/10 bg-white py-12 text-[#14271d] sm:py-14">
          <details className="group/groups mx-auto w-full max-w-4xl px-6 sm:px-10">
            <summary className="flex cursor-pointer list-none flex-col gap-4 rounded-2xl border border-[#1f3f2e]/12 bg-[#f7f5ee] p-6 transition hover:border-[#265136]/35 sm:flex-row sm:items-center sm:justify-between sm:p-7 [&::-webkit-details-marker]:hidden">
              <span>
                <span className="block font-navigation text-[10px] font-bold uppercase tracking-[0.2em] text-[#98782f] xl:text-[11px]">Groups &amp; events</span>
                <span className="mt-2 block text-xl font-semibold tracking-[-0.02em]">Bringing a group or planning an event?</span>
                <span className="mt-1 block text-sm leading-6 text-[#5d685f]">
                  Company golf days, tournaments, weddings, and group trips — the events team replies within 48 hours.
                </span>
              </span>
              <span className="inline-flex h-11 shrink-0 items-center justify-center rounded-full border border-[#b8963f]/55 px-6 font-navigation text-[10px] font-bold uppercase tracking-[0.14em] text-[#8a681f] transition group-open/groups:hidden xl:text-[11px]">
                Send an inquiry
              </span>
            </summary>
            <div className="mt-8">
              <GroupInquiry />
            </div>
          </details>
        </section>

        {/* 3. Good to know */}
        <section className="border-t border-[#1f3f2e]/10 bg-[#f7f5ee] py-14 text-[#14271d]">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
            <p className="text-center font-navigation text-[10px] font-bold uppercase tracking-[0.2em] text-[#98782f] xl:text-[11px]">Good to know</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Getting here", text: "Driving times from Naga Airport, Naga City, and Legazpi.", href: "/getting-here", icon: "M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z M12 12.3a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6Z" },
                { label: "FAQs", text: "Rates, dress code, caddies, cancellations, and more.", href: "/faq", icon: "M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14 M12 17.5h.01 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" },
                { label: "Call the club", text: CLUB_PHONE.label, href: CLUB_PHONE.href, icon: "M6.5 3.5 9 4l1 3-1.8 1.4a12 12 0 0 0 5.4 5.4L15 12l3 1 .5 2.5A2 2 0 0 1 16.4 18 13 13 0 0 1 6 7.6 2 2 0 0 1 6.5 3.5Z" },
                { label: "Email", text: CLUB_EMAIL.label, href: CLUB_EMAIL.href, icon: "M3 6.5h18v11H3z M3.5 7l8.5 6 8.5-6" },
              ].map((item) => {
                const external = item.href.startsWith("tel:") || item.href.startsWith("mailto:");
                const inner = (
                  <>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#b49343]/30 bg-[#fbf8ef] text-[#265136]">
                      <InfoIcon d={item.icon} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold">{item.label}</span>
                      <span
                        translate={external ? "no" : undefined}
                        className={`mt-1 block text-xs leading-5 text-[#667269] ${item.href.startsWith("mailto:") ? "whitespace-nowrap text-[11px] tracking-[-0.01em]" : ""}`}
                      >
                        {item.text}
                      </span>
                    </span>
                  </>
                );
                const className = "flex gap-4 border border-[#1f3f2e]/12 bg-white p-5 transition hover:border-[#265136]/40";
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
