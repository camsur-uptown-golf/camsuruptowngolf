import Image from "next/image";
import Link from "next/link";
import ScrollMotion from "@/components/ScrollMotion";

const SHOP_FEATURES = [
  {
    id: "apparel",
    number: "01",
    title: "Course-ready apparel",
    description: "Polos, layers, caps, and essentials selected for comfort in Camarines Sur’s warm playing conditions.",
  },
  {
    id: "equipment",
    number: "02",
    title: "Golf equipment",
    description: "Trusted clubs, balls, gloves, and on-course essentials for a confident round from the first tee onward.",
  },
  {
    id: "accessories",
    number: "03",
    title: "Player accessories",
    description: "Practical details for the course, from headwear and towels to bags, covers, and everyday carry pieces.",
  },
  {
    id: "club-gifts",
    number: "04",
    title: "Signature club gifts",
    description: "Thoughtful CamSur Uptown keepsakes made for members, guests, tournament groups, and special occasions.",
  },
] as const;

export default function ShopExperience() {
  return (
    <>
      <ScrollMotion />
      <section id="top" className="relative isolate flex min-h-[720px] items-end overflow-hidden bg-[#071d13] text-white sm:min-h-[780px] lg:min-h-svh">
        <Image
          src="/camsur-pro-shop.png"
          alt="Interior of the CamSur Uptown Pro Shop"
          fill
          priority
          sizes="100vw"
          className="hero-image -z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(3,14,9,0.62)_0%,rgba(3,14,9,0.12)_42%,rgba(3,14,9,0.9)_100%)]" />

        <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-64 text-center sm:px-10 sm:pb-20 lg:px-12 lg:pb-24">
          <p className="text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.28em] text-[#efd98f]">
            CamSur Uptown Golf Club · Opening 2026
          </p>
          <h1 className="mx-auto mt-5 max-w-5xl font-serif text-[clamp(3.2rem,7.2vw,7rem)] font-normal leading-[0.9] tracking-[-0.055em]">
            The CamSur Uptown Pro Shop
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 xl:text-base xl:leading-8 text-white/76 sm:text-base">
            A refined retail destination for performance golf, personal service, and pieces that carry the club beyond the course.
          </p>
          <a
            href="#shop-story"
            aria-label="Explore the pro shop"
            className="mx-auto mt-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/45 text-white transition hover:border-[#efd98f] hover:bg-[#efd98f] hover:text-[#0b281b]"
          >
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <article id="shop-story" className="bg-white text-[#14271d]">
        <section className="mx-auto max-w-4xl px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
          <p data-reveal="up" className="text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.24em] text-[#98782f]">
            More than a stop before the first tee
          </p>
          <div className="mt-6 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <h2 data-reveal="up" className="font-serif text-[clamp(2.6rem,5vw,4.8rem)] leading-[0.96] tracking-[-0.045em]">
              Made for the round ahead.
            </h2>
            <div data-reveal="up" className="space-y-5 text-[15px] leading-7 text-[#536159] sm:text-base sm:leading-8">
              <p>
                The CamSur Uptown Pro Shop brings together performance apparel, dependable golf equipment, and signature club pieces in one calm, welcoming space.
              </p>
              <p>
                Located at the heart of the clubhouse, it is designed to make every visit easier—whether you need a last-minute essential, advice before a round, or a meaningful reminder of your time at the club.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-reveal="scale" className="relative aspect-[16/10] overflow-hidden bg-[#10281e] sm:aspect-[16/8.5] lg:aspect-[16/7]">
            <Image
              src="/shop/camsur-equipment-display.png"
              alt="CamSur Uptown branded golf bag, clubs, caps, balls, gloves, and accessories"
              fill
              sizes="(max-width: 1280px) calc(100vw - 2rem), 1280px"
              className="object-cover"
            />
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
          <blockquote data-reveal="up" className="border-l-2 border-[#c9a54e] pl-6 sm:pl-9">
            <p className="font-serif text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.04] tracking-[-0.04em] text-[#10281e]">
              “Everything you need for the course, selected with the same care as the course itself.”
            </p>
          </blockquote>
        </section>

        <section className="bg-[#f5f3ec] py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-9 border-b border-[#173b2a]/15 pb-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <div>
                <p data-reveal="up" className="text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.24em] text-[#98782f]">Inside the shop</p>
                <h2 data-reveal="up" className="mt-4 font-serif text-[clamp(2.8rem,5vw,5rem)] leading-[0.95] tracking-[-0.05em]">
                  Selected for every kind of player.
                </h2>
              </div>
              <p data-reveal="up" className="max-w-xl text-[15px] leading-7 text-[#59655d] lg:justify-self-end sm:text-base sm:leading-8">
                A concise, considered collection keeps the experience simple: reliable gear, polished apparel, and personal service without the clutter.
              </p>
            </div>

            <div className="mt-10 grid gap-x-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div data-reveal="left" className="relative min-h-[430px] overflow-hidden bg-[#153626] sm:min-h-[560px]">
                <Image
                  src="/clubhouse/pro-shop.jpg"
                  alt="Apparel displays and fitting area inside the pro shop"
                  fill
                  sizes="(max-width: 1023px) calc(100vw - 3rem), 640px"
                  className="object-cover"
                />
              </div>

              <div className="border-t border-[#173b2a]/15 lg:border-t-0">
                {SHOP_FEATURES.map((feature) => (
                  <div key={feature.id} id={feature.id} className="scroll-mt-32 grid grid-cols-[2.5rem_1fr] gap-4 border-b border-[#173b2a]/15 py-7 sm:grid-cols-[3rem_1fr] sm:py-8">
                    <p className="pt-1 text-[10px] xl:text-[11px] font-bold tracking-[0.16em] text-[#a07d30]">{feature.number}</p>
                    <div>
                      <h3 className="text-xl font-semibold tracking-[-0.035em] sm:text-2xl">{feature.title}</h3>
                      <p className="mt-3 text-sm leading-7 xl:text-base xl:leading-8 text-[#647068]">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#0b281b] px-6 py-16 text-white sm:px-10 sm:py-20 lg:px-12 lg:py-24">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p data-reveal="up" className="text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.24em] text-[#e4c86f]">Visit the pro shop</p>
              <h2 data-reveal="up" className="mt-5 max-w-3xl font-serif text-[clamp(2.8rem,5.5vw,5.4rem)] leading-[0.94] tracking-[-0.05em]">
                Begin your next round here.
              </h2>
              <p data-reveal="up" className="mt-6 max-w-2xl text-sm leading-7 xl:text-base xl:leading-8 text-white/62 sm:text-base">
                Ask about merchandise, tournament orders, and opening updates from CamSur Uptown Golf Club.
              </p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex min-h-12 items-center justify-between gap-8 rounded-full bg-[#e8d28e] px-6 text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.14em] text-[#10281e] transition hover:bg-[#f3dfa0] sm:px-8"
            >
              Contact the club <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
