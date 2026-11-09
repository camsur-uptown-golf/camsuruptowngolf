import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import HeroBackdrop from "@/components/HeroBackdrop";
import ScrollMotion from "@/components/ScrollMotion";
import { EDITORIAL_SECTION_ALT, EditorialHeading, Kicker, delay } from "@/components/EditorialKit";
import { CLUB_PHONE } from "@/lib/site-content";

/**
 * Ang Pro Shop: ang merchandise ng Brand Guidelines 2026 (kabanata 11,
 * p.81–95), salita sa salita hangga't maaari.
 *
 * WALA PA ANG MGA PRODUKTO. Mga design concept sila sa brand book, kaya
 * "coming to the Pro Shop" ang tono: walang presyo, walang "buy now", at
 * may tala sa ibaba na concept ang mga larawan. Kapag may tunay nang stock
 * at presyo, dito sila idaragdag.
 */
export const metadata: Metadata = {
  title: "Pro Shop | CamSur Uptown Golf",
  description:
    "Shield collections for the course: apparel, headwear, bags and gifts in Uptown Emerald, Pili Ivory and gold — coming to the CamSur Uptown Pro Shop.",
};

const IMG = "/brand-2026/pro-shop";

const COLLECTIONS = [
  {
    id: "women",
    title: "Women",
    intro: "Two pieces, two fine lines, nothing more.",
    items: [
      { image: `${IMG}/women-knit-top.webp`, name: "Sleeveless knit top", detail: "Ivory mock-neck knit; one fine emerald line glides from hem to shoulder." },
      { image: `${IMG}/women-skort.webp`, name: "Pleated skort", detail: "Uptown Emerald knife pleats with built-in shorts and one fine gold line near the hem." },
      { image: `${IMG}/women-sun-top.webp`, name: "Long-sleeve sun top", detail: "UPF emerald jersey with one ivory line down the sleeve." },
    ],
  },
  {
    id: "men",
    title: "Men",
    intro: "Ivory, emerald, sand and navy: one line each, one shield each.",
    items: [
      { image: `${IMG}/men-pique-polo.webp`, name: "Piqué polo", detail: "Ivory piqué with one fine emerald line from hem across the chest to the shoulder." },
      { image: `${IMG}/men-polo-ivory.webp`, name: "Club polo", detail: "Pili Ivory piqué with a green tipped collar and cuffs; the shield on the left chest." },
      { image: `${IMG}/headwear-details.webp`, name: "Caps", detail: "A leather-patch wool cap with a brass buckle, and an ivory rope cap with emerald rope." },
    ],
  },
  {
    id: "bags",
    title: "Bags",
    intro: "A single line around the body and the shield on the pocket.",
    items: [
      { image: `${IMG}/bag-tour-staff.webp`, name: "Tour staff bag", detail: "Emerald pebbled leather, ivory trim and brass hardware; one gold line wraps base to cuff." },
      { image: `${IMG}/bag-tour-leather.webp`, name: "Tour bag and headcovers", detail: "Ivory and green leather with brass hardware; green leather covers with gold embroidery." },
      { image: `${IMG}/headwear-cap.webp`, name: "Structured cap", detail: "Uptown Emerald brushed twill with the shield front-centre in gold thread." },
    ],
  },
  {
    id: "gifts",
    title: "Accessories and gifts",
    intro: "Natural materials, tonal colour and the shield applied with restraint.",
    items: [
      { image: `${IMG}/acc-ball-gift-box.webp`, name: "Golf balls and gift box", detail: "A tour ball with the shield, in a rigid green gift box with a gold-foil shield." },
      { image: `${IMG}/acc-keychain.webp`, name: "Leather keychain", detail: "Full-grain green leather and a brass ring; the shield debossed and gold-foiled." },
      { image: `${IMG}/acc-scorecard-towel.webp`, name: "Scorecard holder and towel", detail: "A leather scorecard holder, an ivory waffle towel, a brass ball marker and wood tees." },
      { image: `${IMG}/acc-umbrella.webp`, name: "Golf umbrella", detail: "A 62-inch double canopy in green and ivory panels, with a wooden shaft and handle." },
    ],
  },
] as const;

export default function ProShopPage() {
  return (
    <>
      <main>
        <ScrollMotion />

        <section
          id="top"
          className="relative isolate flex min-h-[420px] items-end overflow-hidden bg-[#03321b] px-6 pb-14 pt-48 text-white sm:min-h-[600px] sm:px-8 sm:pb-16 sm:pt-52 lg:px-12 lg:pt-56"
        >
          <HeroBackdrop
            src={`${IMG}/hero-bag-range.webp`}
            alt="Pro Shop concept: travel, tour, stand, cart and Sunday bags in emerald, ivory and sand on the terrace"
            imageClassName="object-[50%_60%]"
          />
          <div className="mx-auto w-full max-w-7xl">
            <div className="max-w-2xl">
              <p className="font-navigation text-[11px] font-bold uppercase tracking-[0.24em] text-[#e2c77a] xl:text-[12px]">
                The CamSur Uptown Pro Shop
              </p>
              <h1 className="mt-4 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.045em]">
                Shield collections.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/80 sm:text-lg">
                Pieces that feel like heirlooms: natural materials, tonal colour and the shield applied with restraint.
              </p>
            </div>
          </div>
        </section>

        <div className="bg-[#f3ede1]">
          <Breadcrumbs />
        </div>

        {/* The Fairway Line: ang lagda ng apparel (p.86). */}
        <section id="fairway-line" className={EDITORIAL_SECTION_ALT}>
          <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-12">
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
              <div>
                <Kicker>The Fairway Line</Kicker>
                <h2 data-reveal="up" style={delay(90)} className="mt-3 text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1.02] text-[#03321b]">
                  One fine line through the fabric.
                </h2>
                <p data-reveal="up" style={delay(180)} className="mt-5 text-base leading-[1.75] text-[#34423a] sm:text-[17px]">
                  The winding fairway line from the shield, drawn as a single fine stroke that glides across a top, a skirt, a shirt or a bag. Quiet, continuous, unmistakably ours.
                </p>
                <p data-reveal="up" style={delay(240)} className="mt-4 text-sm leading-7 text-[#5d685f]">
                  One line per garment, edge to edge, always with a small shield. Tonal emerald, emerald on ivory, or Pili Gold on emerald.
                </p>
              </div>
              <div data-reveal="up" style={delay(120)} className="grid grid-cols-[1fr_0.62fr] gap-4">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image src={`${IMG}/women-capsule.webp`} alt="Women’s capsule concept: two tops, two skorts and a visor, each with one line and the shield" fill sizes="(min-width: 1024px) 34vw, 60vw" className="object-cover" />
                </div>
                <div className="relative aspect-[4/5] self-end overflow-hidden rounded-2xl">
                  <Image src={`${IMG}/fairway-line-detail.webp`} alt="A single raised gold line meeting the shield at the waistband of an emerald skort" fill sizes="(min-width: 1024px) 20vw, 36vw" className="object-cover" />
                </div>
              </div>
            </div>
            <div data-reveal="up" className="relative mt-12 aspect-[31/10] overflow-hidden rounded-2xl">
              <Image src={`${IMG}/fairway-line-colourways.webp`} alt="The four Fairway Line colourways: tonal emerald, emerald on ivory, Pili Gold on emerald and gold on ivory" fill sizes="(min-width: 1152px) 1056px, 92vw" className="object-cover" />
            </div>
          </div>
        </section>

        <section id="collections" className="relative isolate bg-[#fbf8f1] py-14 sm:py-20">
          <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-12">
            <EditorialHeading
              kicker="Collections"
              title="Play in the palette."
              intro="Tonal, tailored and comfortable in Camarines Sur’s warm conditions — each piece finished with a small shield."
            />

            {/* Mabilis na talon sa bawat koleksiyon. */}
            <nav aria-label="Pro Shop collections" className="mt-8 flex flex-wrap justify-center gap-2">
              {COLLECTIONS.map((group) => (
                <a
                  key={group.id}
                  href={`#${group.id}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-[#2e5126]/25 bg-white/70 px-4 text-sm font-semibold text-[#03321b] transition-colors hover:border-[#2e5126] hover:bg-[#2e5126] hover:text-white"
                >
                  {group.title}
                </a>
              ))}
            </nav>

            {COLLECTIONS.map((group) => (
              <div key={group.id} id={group.id} className="mt-16 scroll-mt-28">
                <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-2 border-b border-[#03321b]/12 pb-4">
                  <h3 data-reveal="up" className="font-display text-[30px] font-medium leading-none text-[#03321b] sm:text-[36px]">
                    {group.title}
                  </h3>
                  <p data-reveal="up" className="text-[15px] leading-7 text-[#5d685f]">{group.intro}</p>
                </div>
                <ul className={`mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 ${group.items.length > 3 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
                  {group.items.map((item, index) => (
                    <li key={item.name} data-reveal="up" style={delay(index * 80)}>
                      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#ece4d4]">
                        <Image src={item.image} alt={`${item.name} concept`} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw" className="object-cover transition duration-700 hover:scale-[1.03]" />
                      </div>
                      <h4 className="mt-4 text-[19px] font-semibold tracking-[-0.015em] text-[#03321b]">{item.name}</h4>
                      <p className="mt-1.5 text-[15px] leading-7 text-[#34423a]">{item.detail}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <p className="mx-auto mt-16 max-w-2xl text-center text-[13px] leading-6 text-[#5d685f]">
              The collection is in development. Images are design concepts; final pieces, colours and availability may differ.
            </p>
          </div>
        </section>

        <section className="relative isolate overflow-hidden bg-[#03321b] py-14 text-white sm:py-16">
          <div className="mx-auto max-w-xl px-6 text-center xl:max-w-2xl">
            <p data-reveal="up" className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#e2c77a] xl:text-[12px]">
              Coming to the Pro Shop
            </p>
            <h2 data-reveal="up" style={delay(90)} className="mt-3 text-3xl font-medium sm:text-4xl">
              Ask about the collection.
            </h2>
            <p data-reveal="up" style={delay(180)} className="mt-4 text-base leading-8 text-white/75">
              Tell the club which pieces you would like, for yourself, a tournament group or a gift, and the team will be in touch when they are ready.
            </p>
            <div data-reveal="up" style={delay(240)} className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/plan-your-visit"
                className="inline-flex h-12 items-center rounded-full bg-[#e2c77a] px-7 text-[11px] font-bold uppercase tracking-[0.12em] text-[#03321b] transition hover:-translate-y-0.5 hover:bg-[#efd99b] xl:text-[12px]"
              >
                Request a call back
              </Link>
              <a
                href={CLUB_PHONE.href}
                className="inline-flex h-12 items-center rounded-full border border-white/25 px-7 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition hover:border-[#e2c77a] hover:text-[#efd99b] xl:text-[12px]"
              >
                {CLUB_PHONE.label}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
