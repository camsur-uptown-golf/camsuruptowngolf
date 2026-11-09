import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import HeroBackdrop from "@/components/HeroBackdrop";
import ScrollMotion from "@/components/ScrollMotion";
import { EDITORIAL_SECTION_ALT, EditorialHeading, Kicker, delay } from "@/components/EditorialKit";

/**
 * The Uptown Life: ang editorial campaign ng Brand Guidelines 2026 —
 * social (p.61–73), ang golf cart fleet (p.96–98), ang Club Journal (p.58)
 * at ang print (p.64–67).
 *
 * MGA CONCEPT ITO, HINDI PA LIVE. Wala pang aktibong Instagram ("coming
 * soon" pa sa footer), wala pang naka-print na Journal, at hindi pa
 * kumpirmado ang Uptown Invitational bilang event. Inalis ang "NOW OPEN"
 * ng billboard (walang opening date sa brand-brain). Kapag naging totoo na
 * ang alinman, palitan ang label dito.
 */
export const metadata: Metadata = {
  title: "The Uptown Life | CamSur Uptown Golf",
  description:
    "The club day from first light to the rooftop: the campaign, the golf cart fleet, UPTOWN — the Club Journal, and the club on Instagram.",
};

const IMG = "/brand-2026/uptown-life";

const POSTS = [
  { image: `${IMG}/social-first-tee.webp`, alt: "A golfer walking down a misty fairway at first light", headline: "The first tee.", caption: "Mist, mountain, the whole morning ahead.", cta: "Plan your round", href: "/golf/book" },
  { image: `${IMG}/social-stay-play.webp`, alt: "Towels and glasses beside an infinity pool at dawn", headline: "Stay & play.", caption: "Play in the morning. Stay for the evening.", cta: "See packages", href: "/packages" },
  { image: `${IMG}/social-golden-hour.webp`, alt: "A pin flag on the green at sunrise", headline: "Golden hour.", caption: "Golden hour, every day.", cta: "Reserve", href: "/golf/book" },
  { image: `${IMG}/social-service.webp`, alt: "A club being drawn from an emerald tour bag", headline: "Service, anticipated.", caption: "The right club, before you ask.", cta: "Plan your round", href: "/golf/book" },
] as const;

const FLEET = [
  ["Body", "Gloss Uptown Emerald full wrap."],
  ["Roof", "Pili Ivory canopy; outline shield centred on the front edge."],
  ["Side panels", "The wordmark in Pili Gold on the rear side panel."],
  ["Pinstripe", "A fine gold line running the full length at the panel waist."],
  ["Numbering", "Gold Cormorant numerals on the rear and front-right corner."],
  ["Line-up", "Carts staged nose-out by the first tee each morning, cleaned before every tee time."],
] as const;

const PRINT = [
  { image: `${IMG}/print-billboard.webp`, alt: "The clubhouse reflected in the lake at dusk", kind: "Billboard", headline: "Eighteen holes. One mountain. Your escape.", wide: true },
  { image: `${IMG}/print-stay-play-linger.webp`, alt: "A villa with a private pool at Villa Del Rey", kind: "Poster ad", headline: "Stay. Play. Linger.", wide: false },
  { image: `${IMG}/print-invitational.webp`, alt: "A candlelit table set for an evening event on the rooftop", kind: "Event poster", headline: "The Uptown Invitational", wide: false },
] as const;

export default function UptownLifePage() {
  return (
    <>
      <main>
        <ScrollMotion />

        <section
          id="top"
          className="relative isolate flex min-h-[420px] items-end overflow-hidden bg-[#03321b] px-6 pb-14 pt-48 text-white sm:min-h-[600px] sm:px-8 sm:pb-16 sm:pt-52 lg:px-12 lg:pt-56"
        >
          <HeroBackdrop src={`${IMG}/hero-lakeside-dusk.webp`} alt="Clubhouse concept reflected in the lake at dusk" imageClassName="object-[50%_55%]" />
          <div className="mx-auto w-full max-w-7xl">
            <div className="max-w-2xl">
              <p className="font-navigation text-[11px] font-bold uppercase tracking-[0.24em] text-[#e2c77a] xl:text-[12px]">
                Editorial campaign
              </p>
              <h1 className="mt-4 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.045em]">
                The Uptown Life.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/80 sm:text-lg">
                People make the place. The club day, from first light to the rooftop.
              </p>
            </div>
          </div>
        </section>

        <div className="bg-[#f3ede1]">
          <Breadcrumbs />
        </div>

        {/* Social: larawan sa itaas, ilang salita at isang CTA sa ibaba —
            walang tekstong nakapatong sa tao (p.61). */}
        <section id="social" className={EDITORIAL_SECTION_ALT}>
          <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-12">
            <EditorialHeading
              kicker="The club’s feed · @camsuruptowngolf"
              title="A few words, one frame."
              intro="Moments from the club, one frame at a time — first light, golden hour, and the days in between."
            />
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {POSTS.map((post, index) => (
                <li key={post.headline} data-reveal="up" style={delay(index * 80)} className="rounded-2xl bg-[#03321b] p-3 pb-6 text-center text-white">
                  <Image src="/branding/camsur-uptown-golf-shield.png" alt="" width={770} height={1076} className="mx-auto mb-3 mt-2 h-7 w-auto" />
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                    <Image src={post.image} alt={post.alt} fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 46vw, 92vw" className="object-cover" />
                  </div>
                  <p className="font-display mt-5 text-[28px] leading-none">{post.headline}</p>
                  <p className="mt-3 px-3 text-[14px] leading-6 text-white/75">{post.caption}</p>
                  {/* Totoong link na ang CTA — `<p>` lang ito dati, kaya mukhang pindutan
                      pero walang nangyayari sa pagpindot. */}
                  <Link href={post.href} className="mt-4 inline-flex min-h-10 items-center font-navigation text-[11px] font-bold uppercase tracking-[0.2em] text-[#e2c77a] underline-offset-4 transition hover:text-[#efd99b] hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e2c77a]">
                    {post.cta}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Ang golf cart fleet (p.96–98). */}
        <section id="fleet" className="relative isolate bg-[#fbf8f1] py-14 sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-12">
            <div data-reveal="up" className="relative aspect-[16/9] overflow-hidden rounded-2xl sm:aspect-[2/1]">
              <Image src={`${IMG}/cart-fleet-mist.webp`} alt="Fleet livery concept: emerald golf carts staged by the first tee in the morning mist" fill sizes="(min-width: 1152px) 1056px, 92vw" className="object-cover" />
            </div>
            <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
              <div>
                <Kicker>The fleet</Kicker>
                <h2 data-reveal="up" style={delay(90)} className="mt-3 text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1.02] text-[#03321b]">
                  Arrive in style.
                </h2>
                <p data-reveal="up" style={delay(180)} className="mt-5 text-base leading-[1.75] text-[#34423a] sm:text-[17px]">
                  Every cart should look like it belongs to a private club. A first-tee line-up each morning turns the fleet into part of the welcome.
                </p>
                <div data-reveal="up" style={delay(240)} className="mt-8 grid grid-cols-2 gap-4">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <Image src={`${IMG}/cart-arrival.webp`} alt="Fleet livery concept: an emerald cart waiting at the clubhouse arrival" fill sizes="(min-width: 1024px) 22vw, 44vw" className="object-cover" />
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <Image src={`${IMG}/cart-line-up.webp`} alt="Fleet livery concept: carts lined up nose-out by the first tee" fill sizes="(min-width: 1024px) 22vw, 44vw" className="object-cover" />
                  </div>
                </div>
              </div>
              <dl className="border-t border-[#03321b]/12">
                {FLEET.map(([term, detail], index) => (
                  <div key={term} data-reveal="up" style={delay(index * 60)} className="grid gap-1 border-b border-[#03321b]/12 py-4 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-6">
                    <dt className="font-navigation text-[12px] font-bold uppercase tracking-[0.16em] text-[#7d6224]">{term}</dt>
                    <dd className="text-[16px] leading-7 text-[#34423a]">{detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="mt-6 text-[13px] text-[#5d685f]">Fleet livery concept.</p>
          </div>
        </section>

        {/* UPTOWN — the Club Journal (p.58). */}
        <section id="journal" className="relative isolate overflow-hidden bg-[#03321b] py-14 text-white sm:py-20">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 sm:px-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:px-12">
            <div data-reveal="up" className="mx-auto w-full max-w-sm rounded-sm bg-[#f3ede1] p-4 pb-6 text-center text-[#03321b] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
              <p className="font-display text-[44px] leading-none tracking-[0.12em]">UPTOWN</p>
              <p className="mt-2 font-navigation text-[11px] font-bold uppercase tracking-[0.22em]">The Journal of CamSur Uptown Golf · Issue 01</p>
              <div className="relative mt-4 aspect-[4/5] overflow-hidden">
                <Image src={`${IMG}/journal-cover.webp`} alt="Journal cover concept: a guest at the wheel of an emerald golf cart" fill sizes="384px" className="object-cover" />
              </div>
              <p className="font-display mt-4 text-[24px] leading-tight">Golden hour, every day.</p>
            </div>
            <div>
              <p data-reveal="up" className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#e2c77a] xl:text-[12px]">
                UPTOWN — the Club Journal
              </p>
              <h2 data-reveal="up" style={delay(90)} className="mt-3 text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1.02]">
                The club, in print.
              </h2>
              <p data-reveal="up" style={delay(180)} className="mt-5 text-base leading-[1.75] text-white/80 sm:text-[17px]">
                A quarterly journal: hole profiles, member stories, the chef’s table, Bicol travel, the Pro Shop lookbook and the event calendar. In print for villa rooms and the lounge, and as a flip-book on this website.
              </p>
              {/* Aksyon sa halip na "First issue in preparation": tumuturo sa
                  newsletter sa footer, kung saan ipapadala ang unang isyu. */}
              <a href="#footer-newsletter-title" data-reveal="up" style={delay(240)} className="mt-6 inline-flex rounded-full border border-[#e2c77a]/40 px-4 py-2 font-navigation text-[11px] font-bold uppercase tracking-[0.18em] text-[#efd99b] transition hover:border-[#e2c77a] hover:bg-[#e2c77a] hover:text-[#03321b]">
                Get the first issue by email
              </a>
            </div>
          </div>
        </section>

        {/* Print (p.64–67). Inalis ang "NOW OPEN" ng billboard. */}
        <section id="print" className={EDITORIAL_SECTION_ALT}>
          <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-12">
            <EditorialHeading
              kicker="Campaign concepts"
              title="Where the fairway meets the mountain."
              intro="The launch idea: our course and our mountain in one frame. Framed photographs, a short headline, a gold hairline and one call to action."
            />
            <ul className="mt-10 grid gap-6 lg:grid-cols-2">
              {PRINT.map((piece, index) => (
                <li key={piece.headline} data-reveal="up" style={delay(index * 90)} className={piece.wide ? "lg:col-span-2" : ""}>
                  <figure className="rounded-2xl bg-white p-4 shadow-[0_18px_40px_-30px_rgba(3,50,27,0.5)] sm:p-5">
                    <div className={`relative overflow-hidden rounded-xl ${piece.wide ? "aspect-[2.35/1]" : "aspect-[4/3]"}`}>
                      <Image src={piece.image} alt={piece.alt} fill sizes={piece.wide ? "(min-width: 1280px) 1184px, 92vw" : "(min-width: 1024px) 46vw, 92vw"} className="object-cover" />
                    </div>
                    <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 px-1 pt-5">
                      <span className="font-display text-[26px] leading-tight text-[#03321b] sm:text-[30px]">{piece.headline}</span>
                      <span className="font-navigation text-[11px] font-bold uppercase tracking-[0.18em] text-[#7d6224]">{piece.kind} · Concept</span>
                    </figcaption>
                    <div className="mx-1 mt-4 h-px w-16 bg-[#c5a35c]" />
                  </figure>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-center">
              <Link href="/pro-shop" className="font-navigation text-[12px] font-bold uppercase tracking-[0.18em] text-[#2e5126] underline-offset-4 hover:underline">
                See the Pro Shop collections →
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
