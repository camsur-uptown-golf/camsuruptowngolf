import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import FairwayDivider from "@/components/FairwayDivider";
import Footer from "@/components/Footer";
import ScrollMotion from "@/components/ScrollMotion";
import { CLUB_PHONE } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "VIP Dining & Bar | CamSur Uptown Golf Club",
  description:
    "Fresh plates, fine pours, and course-side views at the VIP Dining & Bar of CamSur Uptown Golf Club.",
};

const DETAILS = [
  {
    image: "/dining/vip-dining-kitchen-v1.png",
    alt: "A plated dish prepared for the VIP dining room",
    caption: "From the kitchen · plated to order",
  },
  {
    image: "/dining/vip-dining-bar-v1.png",
    alt: "Cocktails and fine pours in the VIP bar lounge",
    caption: "At the bar · cocktails & fine pours",
  },
] as const;

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path
        d="M6.5 3.5 9 4l1 3-1.8 1.4a12 12 0 0 0 5.4 5.4L15 12l3 1 .5 2.5A2 2 0 0 1 16.4 18 13 13 0 0 1 6 7.6 2 2 0 0 1 6.5 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function VipDiningBarPage() {
  return (
    <>
      <main className="bg-[#f7f5ee] text-[#14271d]">
        <ScrollMotion />

        <section
          id="top"
          className="relative isolate flex min-h-[660px] items-end overflow-hidden bg-[#102a1e] text-white"
        >
          <Image
            src="/dining/vip-dining-bar-hero-clean-4k-v1.png"
            alt="The VIP dining terrace overlooking the golf course and water"
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover object-center"
          />
          <div
            className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,19,13,0.52)_0%,rgba(5,19,13,0.18)_42%,rgba(5,19,13,0.7)_100%)]"
            aria-hidden="true"
          />
          <FairwayDivider fill="#f7f5ee" />

          <div className="mx-auto w-full max-w-7xl px-6 pb-32 text-center sm:pb-40 lg:px-8">
            <p className="font-navigation text-[9px] font-bold uppercase tracking-[0.24em] text-[#f1d98f] sm:text-[10px]">
              Dining · taste &amp; service
            </p>
            <h1 className="mx-auto mt-4 max-w-3xl text-balance text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.055em]">
              VIP Dining &amp; Bar
            </h1>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#f7f5ee] py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
              <div data-reveal="up">
                <p className="font-navigation text-[9px] font-bold uppercase tracking-[0.24em] text-[#98782f] sm:text-[10px]">
                  Taste &amp; service
                </p>
                <h2 className="mt-4 max-w-lg text-balance text-[clamp(1.9rem,3vw,3.15rem)] font-medium leading-[1.06] tracking-[-0.045em]">
                  An experience elevated by the table.
                </h2>
              </div>

              <p
                data-reveal="up"
                className="max-w-xl text-sm leading-7 text-[#6e746e] sm:text-base sm:leading-8 lg:justify-self-end"
              >
                In the VIP area the experience is elevated not only by design, but by what is served—fresh dishes plated in the directly connected kitchen, and drinks and cocktails poured at the bar.
              </p>
            </div>

            <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-2 lg:gap-6">
              {DETAILS.map((detail, index) => (
                <figure
                  key={detail.caption}
                  data-reveal="up"
                  style={{ "--reveal-delay": `${index * 100}ms` } as CSSProperties}
                  className="min-w-0"
                >
                  <div className="relative aspect-[3/2] overflow-hidden bg-[#d9d4c9]">
                    <Image
                      src={detail.image}
                      alt={detail.alt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="border-b border-[#173b2a]/20 py-4 font-navigation text-[10px] font-medium uppercase tracking-[0.2em] text-[#77776f] sm:text-[11px]">
                    {detail.caption}
                  </figcaption>
                </figure>
              ))}
            </div>

          </div>
        </section>

        <section className="relative isolate overflow-hidden border-t border-[#173b2a]/10 bg-[#1c3b2d] py-14 text-white sm:py-16 lg:py-20">
          <div
            data-parallax="0.14"
            className="pointer-events-none absolute -right-32 top-1/2 -z-10 h-96 w-96 rounded-full bg-[#c9a54e]/[0.07] blur-3xl"
            aria-hidden="true"
          />
          <div className="mx-auto max-w-2xl px-6 text-center lg:px-8">
            <p className="font-navigation text-[9px] font-bold uppercase tracking-[0.24em] text-[#c7a54f] sm:text-[10px]">
              Reserve a table
            </p>
            <h2
              data-reveal="up"
              style={{ "--reveal-delay": "90ms" } as CSSProperties}
              className="mt-3 text-balance text-[clamp(1.8rem,3vw,2.6rem)] font-medium leading-tight tracking-[-0.035em]"
            >
              Eat where you are playing.
            </h2>
            <div data-reveal="up" style={{ "--reveal-delay": "180ms" } as CSSProperties}>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
                Send your dates and how many are eating, and the team will sort the table — including anything the
                kitchen needs to know about heat, allergies, or a group that would rather not share.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link
                  href="/plan-your-visit"
                  className="inline-flex h-11 items-center rounded-full bg-[#e7d18d] px-6 font-navigation text-[10px] font-bold uppercase tracking-[0.12em] text-[#0a2619] transition hover:-translate-y-0.5 hover:bg-[#f3dfa0] sm:text-[11px]"
                >
                  Reserve a table
                </Link>
                <a
                  href={CLUB_PHONE.href}
                  className="inline-flex h-11 items-center gap-2.5 rounded-full border border-white/20 px-6 font-navigation text-[10px] font-bold uppercase tracking-[0.12em] text-white/85 transition hover:border-[#e7d18d]/60 hover:text-[#f1d98f] sm:text-[11px]"
                >
                  <PhoneIcon />
                  {CLUB_PHONE.label}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
